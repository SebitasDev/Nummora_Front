"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ethers } from "ethers";
import { SelfAppBuilder, type SelfApp } from "@selfxyz/qrcode";
import { getUniversalLink } from "@selfxyz/core";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface SelfVerificationButtonProps {
  onSessionId?: (sid: string) => void;
  onResult?: (data: any) => void;
}

export default function SelfVerificationButton({
  onSessionId,
  onResult,
}: SelfVerificationButtonProps) {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [universalLink, setUniversalLink] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const pollRef = useRef<number | null>(null);

  const apiBase = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");
  const publicBase = (
    process.env.NEXT_PUBLIC_SELF_CALLBACK ||
    "https://673db36e43c3.ngrok-free.app"
  ).replace(/\/+$/, "");

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  const startPolling = useCallback(
    (sid: string) => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      pollRef.current = window.setInterval(async () => {
        try {
          const resp = await fetch(`${apiBase}/api/status/${sid}`, {
            cache: "no-store",
          });
          const data: any = await resp.json().catch(() => null);
          if (!data) return;
          const ok =
            data?.status === "success" ||
            data?.result === true ||
            data?.verified === true;
          if (ok) {
            setResultMessage("✅ Verificación exitosa");
            setShowQR(false);
            onResult?.(data);
            if (pollRef.current) {
              window.clearInterval(pollRef.current);
              pollRef.current = null;
            }
          } else if (data?.status === "error") {
            setResultMessage("❌ Error en la verificación");
            setShowQR(false);
            if (pollRef.current) {
              window.clearInterval(pollRef.current);
              pollRef.current = null;
            }
          }
        } catch {}
      }, 1500);
    },
    [apiBase]
  );

  const buildCallbackUrl = (base: string, sid: string) => {
    if (!base || !base.startsWith("https://")) return "";
    let url = base;
    if (!/\/api\/verify-self$/i.test(url)) url = `${url}/api/verify-self`;
    url += (url.includes("?") ? "&" : "?") + `sid=${encodeURIComponent(sid)}`;
    return url;
  };

  const generarQR = useCallback(() => {
    try {
      const sid = uuid();
      setSessionId(sid);
      onSessionId?.(sid);

      const endpoint = buildCallbackUrl(publicBase, sid);
      if (!endpoint) {
        console.error(
          "[Self] NEXT_PUBLIC_SELF_CALLBACK faltante o inválido (debe ser https). Valor:",
          publicBase
        );
        setResultMessage(
          "❌ Configuración inválida del endpoint público (SELF_CALLBACK)"
        );
        return;
      }

      const userId = ethers.ZeroAddress;

      const app = new SelfAppBuilder({
        version: 2,
        appName: "Nummora Front",
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || "nummora-front",
        endpoint,
        logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
        userId,
        endpointType: "staging_https",
        userIdType: "hex",
        disclosures: { minimumAge: 18, nationality: true, gender: true },
      }).build();

      const link = getUniversalLink(app);
      setSelfApp(app);
      setUniversalLink(link);
      setResultMessage(null);
      setShowQR(true);
      startPolling(sid);

      console.log("[Self] QR listo", { sid, endpoint, apiBase });
    } catch (err) {
      console.error("Error creando SelfApp", err);
      setResultMessage("❌ Error generando QR");
    }
  }, [onSessionId, publicBase, startPolling, apiBase]);

  const cerrarQR = useCallback(() => {
    setShowQR(false);
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const openUniversalLink = useCallback(() => {
    if (universalLink) window.open(universalLink, "_blank");
  }, [universalLink]);

  const qrImgSrc = useMemo(() => {
    if (!universalLink) return "";
    const data = encodeURIComponent(universalLink);
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${data}`;
  }, [universalLink]);

  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "30px auto",
        textAlign: "center",
        fontFamily: "Inter, system-ui, Arial",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          minWidth: 350,
          minHeight: 50,
          flexDirection: "column",
        }}
      >
        <Button
          onClick={generarQR}
          variant="contained"
          startIcon={<QrCode2Icon />}
          fullWidth
          sx={{
            backgroundColor: "#2563eb",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Login con Self
        </Button>
        {universalLink && (
          <Button
            onClick={openUniversalLink}
            sx={{
              backgroundColor: "#059669",
              color: "#fff",
              px: 2,
              "&:hover": { backgroundColor: "#047857" },
            }}
          >
            Abrir en la app
          </Button>
        )}
      </Box>

      {resultMessage && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 1,
            fontWeight: 600,
          }}
        >
          <Typography>{resultMessage}</Typography>
        </Box>
      )}

      <Dialog
        open={showQR}
        onClose={cerrarQR}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <QrCode2Icon color="primary" fontSize="small" />
            Verificación con Self
          </Box>
          <IconButton onClick={cerrarQR} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 3, pb: 2 }}>
          <Box sx={{ mt: 1 }}>
            {qrImgSrc ? (
              <Box
                component="img"
                src={qrImgSrc}
                alt="QR Self"
                width={220}
                height={220}
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <Box sx={{ height: 220, display: "grid", placeItems: "center" }}>
                <CircularProgress />
              </Box>
            )}
          </Box>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
            Verifícate con Self
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Escanea este código QR con tu aplicación Self para verificar tu
            identidad
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 2,
              justifyContent: "center",
            }}
          >
            <CircularProgress size={16} sx={{ color: "#2196f3" }} />
            <Typography variant="body2" color="#2196f3">
              Esperando verificación...
            </Typography>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#EFF6FF",
              borderColor: "#EFF6FF",
              textAlign: "left",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} color="primary">
              ¿No tienes Self?
            </Typography>
            <Typography variant="body2" color="#2196f3" sx={{ mt: 0.5 }}>
              Self es una aplicación de identidad digital segura que protege tu
              privacidad.
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1.5, borderRadius: 2, textTransform: "none" }}
              onClick={openUniversalLink}
            >
              Descargar Self
            </Button>
          </Paper>

          <Button
            onClick={cerrarQR}
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              color: "black",
              borderColor: "#898989ff",
              mt: 2,
            }}
          >
            Cancelar
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
