"use client";
import React, {
  useCallback,
  useEffect,
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
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {DarkTheme, PassportScoreWidget, usePassportScore} from "@human.tech/passport-embed";
import { useAccount } from "wagmi";


interface SelfVerificationButtonProps {
  onSessionId?: (sid: string) => void;
  onResult?: (data: any) => void;
  isWalletConnected: boolean;
  selfVerified: boolean;
}

export default function HumanTechVerificationButton({
  onResult,
  isWalletConnected,
  selfVerified,
}: SelfVerificationButtonProps) {
  const [showQR, setShowQR] = useState(false);
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
    const { address, isConnected } = useAccount()
    const [verifiedScore, setVerifiedScore] = useState<{ score: number; isPassing: boolean } | null>(null)

    const signMessage = async (message: string): Promise<string> => {
        if (!window.ethereum) throw new Error('No wallet found')

        const accounts = await (window.ethereum as any).request({
            method: 'eth_requestAccounts'
        }) as string[]

        return await (window.ethereum as any).request({
            method: 'personal_sign',
            params: [message, accounts[0]]
        }) as string
    }

    const { data: passportData, isError: passportError, error } = usePassportScore({
        apiKey: process.env.NEXT_PUBLIC_PASSPORT_API_KEY!,
        scorerId: process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID!,
        address: address,
    })

  const generarQR = useCallback(() => {
      setShowQR(true);
  }, []);

  const cerrarQR = useCallback(() => {
    setShowQR(false);
  }, []);

    useEffect(() => {
        if (address && isConnected && passportData?.passingScore && !verifiedScore) {
            console.log('🔍 Client-side shows passing score, starting server-side verification for address:', address)
            console.log('📊 Client-side data:', { score: passportData.score, passing: passportData.passingScore })

            fetch('/api/verify-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address })
            })
                .then(res => res.json())
                .then(data => {
                    console.log('📊 Server-side verification response:', data)
                    if (data.verified) {
                        const numericScore = parseFloat(data.score)
                        setVerifiedScore({
                            score: numericScore,
                            isPassing: numericScore >= 0.5
                        })
                        console.log('✅ Server-side score verified:', { score: numericScore, isPassing: numericScore >= 20 })
                        if (numericScore >= 0.5) {
                            console.log("entro aqui")
                            onResult!({
                                status: "success",
                                verified: true,
                                score: numericScore,
                            });
                        } else {
                            console.log("entro aqui x2")
                            onResult!({
                                status: "failed",
                                verified: false,
                                score: numericScore,
                            });
                        }
                    } else {
                        console.log('❌ Server-side score verification failed:', data)
                        setVerifiedScore(null)
                    }
                })
                .catch(err => {
                    console.error('🚨 Server-side score verification error:', err)
                    setVerifiedScore(null)
                })
        } else if (!address || !isConnected) {
            console.log('⏸️ No address or not connected - clearing verified score')
            setVerifiedScore(null)
        }
    }, [address, isConnected, passportData?.passingScore, verifiedScore])

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
          {selfVerified ? "Verificado con human.tech" : "Login con human.tech"}
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
            Verificación con human.tech
          </Box>
          <IconButton onClick={cerrarQR} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 3, pb: 2 }}>
          <Box sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
              <PassportScoreWidget
                  apiKey={process.env.NEXT_PUBLIC_PASSPORT_API_KEY!}
                  scorerId={process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID!}
                  address={address}
                  generateSignatureCallback={signMessage}
                  theme={DarkTheme}
              />
          </Box>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
            Verifícate con human.tech
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Verificate con human.tech completa el KYC para verificar tu identidad
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
