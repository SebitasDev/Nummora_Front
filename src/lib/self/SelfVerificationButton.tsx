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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ethers } from "ethers";
import { SelfAppBuilder, type SelfApp } from "@selfxyz/common";
import { getUniversalLink } from "@selfxyz/core";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface SelfVerificationButtonProps {
  onSessionId?: (sid: string) => void;
  onResult?: (data: any) => void;
  isWalletConnected: boolean;
  selfVerified: boolean;
}

export default function SelfVerificationButton({
  onSessionId,
  onResult,
  isWalletConnected,
  selfVerified,
}: SelfVerificationButtonProps) {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [universalLink, setUniversalLink] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
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
            onResult?.(data);
            setShowQR(false);
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

      //TODO: Change with real user address
      const userId = ethers.ZeroAddress;

      const app = new SelfAppBuilder({
        version: 2,
        appName: "Nummora Front",
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || "nummora-front",
        endpoint,
        logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
        userId,
        endpointType: "https",
        userIdType: "hex",
        disclosures: { minimumAge: 18, nationality: true, gender: true },
        userDefinedData: "Welcome to Nummora",
        chainID: 11142220,
      } as any).build();

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
        margin: "30px auto",
        textAlign: "center",
        fontFamily: "Inter, system-ui, Arial",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Button
          onClick={generarQR}
          variant="contained"
          startIcon={selfVerified ? <TaskAltIcon /> : <QrCode2Icon />}
          fullWidth
          disabled={!isWalletConnected}
          sx={{
            backgroundColor: selfVerified ? "#8AD1A4" : "#2563eb",
            textTransform: "none",
            fontWeight: 500,
            height: 45,
            fontSize: isMdUp ? 20 : 14,
            "&.Mui-disabled": {
              backgroundColor: selfVerified ? "#8AD1A4" : "#2563eb",
              color: "#fff",
              opacity: 0.7,
            },
          }}
        >
          {selfVerified ? "Verificado con Self" : "Login con Self"}
        </Button>
      </Box>
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
              my: 1.5,
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
            onClick={openUniversalLink}
            sx={{
              backgroundColor: "#059669",
              color: "#fff",
              borderRadius: 2,
              px: 2,
              "&:hover": { backgroundColor: "#047857" },
              width: "100%",
            }}
          >
            Abrir en la app
          </Button>

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
