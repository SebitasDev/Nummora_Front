"use client";

import {useAuthGuard} from "@/hooks/useAuthGuard";
import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Radio, RadioGroup, SvgIcon, Typography, useTheme} from "@mui/material";
import {BorrowerPaymentHeader} from "@/app/borrower/payment/components/BorrowerPaymentHeader";
import { CustomCard } from "@/components/atoms/CustomCard";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {getPendingBorrowerLoan} from "@/api/loan/getPendingBorrowerLoan";
import {LoanEntity} from "@/api/types/LoanEntity";
import {useBorrowerDashboard} from "@/app/borrower/dashboard/hooks/useBorrowerDashboard";
import {toWei} from "@/utilities/toWei";

export const PaymentBorrowerTemplate = () => {
    useAuthGuard();
    const themeMUI = useTheme();
    const { user } = useWalletAccount();
    const [pendingLoan, setPendingLoan] = useState<LoanEntity | null>(null);
    const { payEarly, payInstallmentSignature } = useBorrowerDashboard();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getPendingBorrowerLoan(user!);
                if (data?.data) {
                    setPendingLoan(data.data);
                }
            } catch (error) {
                console.error("Error fetching pending loan:", error);
            }
        };
        fetchLoans();
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gap: 3.5,
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(12, 1fr)",
                    },
                    [themeMUI.breakpoints.down("md")]: {
                        gap: 1.7,
                    },
                }}
            >
                {/* Titulo */}
                <BorrowerPaymentHeader/>

                <Box
                    sx={{
                        display: "grid",
                        gridColumn: "1 / -1",
                        gridTemplateColumns: { xs: "1fr", md: "70% 30%" },
                        gap: 3,
                        width: "100%",
                        alignItems: "start",
                    }}
                >
                    <Box
                        sx={{
                            height: "fit-content",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <CustomCard
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                p: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 2,
                                    p: 2.5,
                                }}
                            >
                                {/* Círculo tipo radio (solo decorativo) */}
                                <Box
                                    sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        border: "2px solid",
                                        borderColor: "primary.main",
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            backgroundColor: "primary.main",
                                            transform: "translate(-50%, -50%)",
                                        },
                                    }}
                                />

                                {/* Contenido del préstamo */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flex: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        {pendingLoan ? (
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                Prestamo #{pendingLoan.loanIdBlockchain}
                                            </Typography>
                                        ) : (
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Cargando préstamo...
                                            </Typography>
                                        )}
                                        <Typography variant="body2" color="text.secondary">
                                            Cuota 3 de 12
                                        </Typography>
                                    </Box>

                                    <Box textAlign="right">
                                        {pendingLoan ? (
                                            <Typography variant="subtitle1" fontWeight={700}>
                                                    ${pendingLoan.installments_list[0].amount}
                                            </Typography>
                                        ) : <> </> }
                                        <Typography variant="caption" color="warning.main">
                                            Vence: 15 Nov 2024
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CustomCard>

                        <CustomCard
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 3,
                            }}
                        >
                            {/* Header */}
                            <Box sx={{ px: 3, mb: 1 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    Monto a Pagar
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Puedes pagar la cuota completa o un monto parcial
                                </Typography>
                            </Box>

                            {/* Input del monto */}
                            <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Typography
                                    component="label"
                                    htmlFor="amount"
                                    variant="body2"
                                    fontWeight={500}
                                >
                                    Monto
                                </Typography>
                                <input
                                    id="amount"
                                    type="number"
                                    disabled={true}
                                    defaultValue={pendingLoan ? pendingLoan.installments_list[0].amount : 0}
                                    style={{
                                        height: "2.5rem",
                                        width: "100%",
                                        borderRadius: 6,
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        padding: "0.25rem 0.75rem",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        outline: "none",
                                        backgroundColor: "transparent",
                                    }}
                                />
                            </Box>

                            {/* Botones */}
                            <Box
                                sx={{
                                    px: 3,
                                    display: "flex",
                                    gap: 1.5,
                                    mt: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        height: 32,
                                        fontSize: "0.875rem",
                                        px: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    Cuota Completa
                                </Button>

                                <Button
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        height: 32,
                                        fontSize: "0.875rem",
                                        px: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    Pago Parcial
                                </Button>
                            </Box>
                        </CustomCard>

                        <CustomCard>
                            {/* Título */}
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Método de Pago
                            </Typography>

                            {/* Opciones */}
                            <RadioGroup defaultValue="wallet">
                                {/* Opción 1: Wallet */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Radio
                                        value="wallet"
                                        checked
                                        sx={{
                                            color: "primary.main",
                                            "&.Mui-checked": { color: "primary.main" },
                                        }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography fontWeight={600}>Wallet Blockchain</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    0x742d...8f3a
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "9999px",
                                                    backgroundColor: "success.light",
                                                    color: "success.main",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Conectada
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Opción 2: Tarjeta (deshabilitada) */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        opacity: 0.5,
                                    }}
                                >
                                    <Radio value="card" disabled />
                                    <Box>
                                        <Typography fontWeight={600}>Tarjeta de Crédito</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Próximamente
                                        </Typography>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </CustomCard>

                    </Box>

                    <Box
                        sx={{
                            height: "fit-content",
                            gap: 3,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CustomCard>
                            {/* Header */}
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                color="primary.main"
                                sx={{ mb: 2 }}
                            >
                                Resumen del Pago
                            </Typography>

                            {/* Contenido */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Préstamo
                                    </Typography>
                                    {pendingLoan ? (
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            Prestamo #{pendingLoan.loanIdBlockchain}
                                        </Typography>
                                    ) : (
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Cargando préstamo...
                                        </Typography>
                                    )}
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Cuota
                                    </Typography>
                                    <Typography fontWeight={600}>3 de 12</Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha de Vencimiento
                                    </Typography>
                                    <Typography fontWeight={600}>15 Nov 2024</Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Monto a Pagar
                                    </Typography>
                                    {pendingLoan ? (
                                        <Typography variant="h5" fontWeight={700}>
                                            ${pendingLoan.installments_list[0].amount}
                                        </Typography>
                                    ) : <> </> }
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    py: 1,
                                    "&:hover": { backgroundColor: "success.dark" },
                                }}
                                onClick={async () => {
                                    if (!pendingLoan) return;

                                    await payInstallmentSignature(
                                        BigInt(pendingLoan?.loanIdBlockchain),
                                        pendingLoan?.id,
                                        toWei(pendingLoan?.installments_list[0].amount)
                                    );
                                }}
                            >
                                Confirmar pago
                            </Button>

                            {/* Botón */}
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    py: 1,
                                    "&:hover": { backgroundColor: "success.dark" },
                                }}
                            >
                                Pago Completo
                            </Button>
                        </CustomCard>

                        <CustomCard
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1.5,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: "rgba(34,197,94,0.05)",
                                border: "1px solid rgba(34,197,94,0.2)",
                            }}
                        >
                            <SvgIcon
                                sx={{
                                    color: "success.main",
                                    fontSize: 24,
                                    mt: "2px",
                                }}
                            >
                                <circle cx="12" cy="12" r="10" fill="none" />
                                <path d="M9 12l2 2 4-4" />
                            </SvgIcon>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Pago Seguro
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tu pago está protegido por blockchain y será procesado instantáneamente
                                </Typography>
                            </Box>
                        </CustomCard>

                        <CustomCard>
                            {/* Título */}
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Progreso del Préstamo
                            </Typography>

                            {/* Contenido */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Pagado
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        3 / 12 cuotas
                                    </Typography>
                                </Box>

                                {/* Barra de progreso */}
                                <Box
                                    sx={{
                                        height: 8,
                                        width: "100%",
                                        borderRadius: 9999,
                                        overflow: "hidden",
                                        backgroundColor: "action.hover", // similar a bg-muted
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: "25%", // progreso dinámico
                                            backgroundColor: "success.main",
                                        }}
                                    />
                                </Box>
                            </Box>
                        </CustomCard>
                    </Box>

                </Box>
            </Box>
        </>
    )
}