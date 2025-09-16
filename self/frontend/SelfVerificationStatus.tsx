"use client";
import React, { useEffect, useState, useRef } from "react";

interface Props {
  sessionId: string;
}

export default function SelfVerificationStatus({ sessionId }: Props) {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState<string>("Esperando verificación...");
  const pollRef = useRef<number | null>(null);

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/+$/, "");

  useEffect(() => {
    if (!sessionId) return;

    const poll = async () => {
      try {
        const resp = await fetch(`${apiBase}/api/status/${sessionId}`, { cache: "no-store" });
        const data = await resp.json().catch(() => null);
        if (!data) return;

        if (data.status === "success" || data.result === true || data.verified === true) {
          setStatus("success");
          setMessage("✅ Verificación exitosa");
          if (pollRef.current) clearInterval(pollRef.current);
        } else if (data.status === "error") {
          setStatus("error");
          setMessage("❌ Error en la verificación");
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch (e) {
      }
    };

    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = window.setInterval(poll, 1500);

    poll();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [sessionId, apiBase]);

  const colorMap = {
    pending: "rgba(0, 0, 0, 1)",
    success: "#009436ff",
    error: "#882020ff",
  } as const;

  return (
    <div style={{
      marginTop: 8,
      padding: "6px 12px",
      borderRadius: 8,
      background: "#f4f4f4",
      color: colorMap[status],
      fontWeight: 600,
      textAlign: "center",
    }}>
      {message}
    </div>
  );
}
