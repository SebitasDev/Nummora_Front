"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ethers } from "ethers";
import { SelfAppBuilder, type SelfApp } from "@selfxyz/qrcode";
import { getUniversalLink } from "@selfxyz/core";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface SelfVerificationButtonProps {
  onSessionId?: (sid: string) => void;
}

export default function SelfVerificationButton({ onSessionId }: SelfVerificationButtonProps) {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [universalLink, setUniversalLink] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const pollRef = useRef<number | null>(null);

  // Base local SOLO para polling (/api/status/:sid)
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/+$/, "");
  // Dominio público HTTPS (ngrok) para el callback de Self
  const publicBase = (process.env.NEXT_PUBLIC_SELF_CALLBACK || "https://4bfc01bb466c.ngrok-free.app").replace(/\/+$/, "");

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  const startPolling = useCallback((sid: string) => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    pollRef.current = window.setInterval(async () => {
      try {
        const resp = await fetch(`${apiBase}/api/status/${sid}`, { cache: "no-store" });
        const data: any = await resp.json().catch(() => null);
        if (!data) return;
        const ok = data?.status === "success" || data?.result === true || data?.verified === true;
        if (ok) {
          setResultMessage("✅ Verificación exitosa");
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
  }, [apiBase]);

  const buildCallbackUrl = (base: string, sid: string) => {
    if (!base || !base.startsWith("https://")) return "";
    // Acepta tanto que la env venga con o sin /api/verify-self
    let url = base;
    if (!/\/api\/verify-self$/i.test(url)) url = `${url}/api/verify-self`;
    // Anexamos el sid en query (clave del fix)
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
        console.error("[Self] NEXT_PUBLIC_SELF_CALLBACK faltante o inválido (debe ser https). Valor:", publicBase);
        setResultMessage("❌ Configuración inválida del endpoint público (SELF_CALLBACK)");
        return;
      }

      const userId = ethers.ZeroAddress;

      const app = new SelfAppBuilder({
        version: 2,
        appName: "Nummora Front",
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || "nummora-front",
        endpoint, // <- aquí va con ?sid=...
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

      // Debug utilísimo en consola del navegador
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
    <div style={{ maxWidth: 420, margin: "30px auto", textAlign: "center", fontFamily: "Inter, system-ui, Arial" }}>
      <h3 style={{ marginBottom: 6 }}>Verificación con Self</h3>
      <p style={{ color: "#666", marginTop: 0 }}>Escaneá el QR con la app de Self.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button
          onClick={generarQR}
          style={{ padding: "10px 18px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}
        >
          Generar QR
        </button>
        {universalLink && (
          <button
            onClick={openUniversalLink}
            style={{ padding: "10px 18px", background: "#059669", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}
          >
            Abrir en la app
          </button>
        )}
      </div>

      {resultMessage && (
        <div style={{
          marginTop: 14,
          padding: 10,
          borderRadius: 8,
          fontWeight: 600
        }}>
        </div>
      )}

      {showQR && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16
        }}>
          <div style={{ width: "min(92vw,420px)", background: "#fff", padding: 18, borderRadius: 12, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Escaneá con Self</strong>
              <button onClick={cerrarQR} style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ marginTop: 12 }}>
              {qrImgSrc ? (
                <img src={qrImgSrc} alt="QR Self" width={220} height={220} style={{ borderRadius: 8 }} />
              ) : <div style={{ height: 220, display: "grid", placeItems: "center" }}>Generando…</div>}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={openUniversalLink} style={{ padding: "8px 12px", background: "#059669", color: "#fff", border: "none", borderRadius: 8 }}>Abrir en la app</button>
              <button onClick={cerrarQR} style={{ padding: "8px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8 }}>Cerrar</button>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: "#444" }}>
              Session: <code style={{ background: "#f4f4f4", padding: "2px 6px", borderRadius: 4 }}>{sessionId}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
