"use client";

import {useAuthGuard} from "@/hooks/useAuthGuard";
import React, {useState} from "react";
import Theme from "@/theme/theme";
import {useBorrowerDashboard} from "@/app/borrower/dashboard/hooks/useBorrowerDashboard";
import { Box, Button, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { formatEther } from "viem";
import SectionHeader from "@/components/atoms/SectionHeader";
import {CustomCard} from "@/components/atoms/CustomCard";
import {useRouter} from "next/navigation";

export const BorrowerDashboardTemplate = () => {
    const themeMUI = useTheme();
    const { push } = useRouter();
    //const isMobile = useMediaQuery(themeMUI.breakpoints.down("md"));

    useAuthGuard();

    const [loanId, setLoanId] = useState(0);
    const theme = Theme
    const { searchLoanById, loan, payInstallment, payEarly, payInstallmentSignature } = useBorrowerDashboard();

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
                <Box
                    sx={{
                        gridColumn: {
                            xs: "1 / -1",
                            md: "span 12",
                        },
                        order: {
                            xs: 1,
                            md: "initial",
                        },
                        width: "100%",
                        height: "80px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        [themeMUI.breakpoints.down("md")]: {
                            display: "none",
                        },
                    }}
                >
                    <SectionHeader
                        title={"Mi Dashboard"}
                        subtitle={"Panel de control de préstamos"}
                        titleSize={35}
                        subtitleSize={17}
                    />
                </Box>

                {/* Cards principales pedir y solicitar dinero */}
                <Box
                    sx={{
                        gridColumn: { xs: "1 / -1", md: "span 12" },
                        display: "grid",
                        gap: 2.5,
                        gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
                    }}
                >
                    {/* Caja izquierda - Verde */}
                    <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                        <CustomCard
                            onClick={() => push("/borrower/request-money")}
                            sx={{
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#22c55e",
                                    boxShadow: "0px 4px 12px rgba(34, 197, 94, 0.15)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ color: "#22c55e" }}
                                    >
                                        <path d="M7 7h10v10" />
                                        <path d="M7 17 17 7" />
                                    </svg>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Solicitar Dinero
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Crear nueva solicitud de préstamo
                                    </Typography>
                                </Box>
                            </Box>
                        </CustomCard>
                    </Box>

                    {/* Caja derecha - Azul */}
                    <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                        <CustomCard
                            onClick={() => push("/borrower/payment")}
                            sx={{
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#3b82f6",
                                    boxShadow: "0px 4px 12px rgba(59, 130, 246, 0.25)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ color: "#3b82f6" }}
                                    >
                                        <path d="m7 7 10 10" />
                                        <path d="M17 7v10H7" />
                                    </svg>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                        Pagar Deuda
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Realizar pago de cuotas pendientes
                                    </Typography>
                                </Box>
                            </Box>
                        </CustomCard>
                    </Box>
                </Box>

            </Box>

            <Box
                sx={{

                }}
            >
                Id loan
            </Box>

            <TextField
                fullWidth
                type="number"
                placeholder="0"
                value={loanId}
                onChange={(e) => setLoanId(Number(e.target.value))}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoney sx={{ color: "gray" }} />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 1.7,
                        borderColor: "rgb(143,147,143, 0.3)",
                        height: 48,
                        fontSize: theme.fontSize.input,
                    },
                }}
            />

            <Button
                sx={{
                    mt: 2,
                    textTransform: "none",
                    borderRadius: 1.7,
                    height: 48,
                }}
                variant={"outlined"}
                onClick={async() => await searchLoanById(BigInt(loanId))}
            >
                Buscar
            </Button>

            {loan != null ? (
                <Box>
                    <Typography>
                        Monto: ${Number(formatEther(loan.amount)).toLocaleString('es-CO')}
                    </Typography>

                    <Typography>
                        active: {loan.active.toString()}
                    </Typography>

                    <Typography>
                        Borrower address: {loan.borrower.toString()}
                    </Typography>

                    <Typography>
                        installment amount: ${Number(formatEther(loan.installmentAmount)).toLocaleString('es-CO')}
                    </Typography>

                    <Typography>
                        installments: {loan.installments}
                    </Typography>

                    <Typography>
                        installments paid: {loan.installmentsPaid}
                    </Typography>

                    <Typography>
                        lender address: {loan.lender.toString()}
                    </Typography>

                    <Typography>
                        total paid: ${Number(formatEther(loan.totalPaid)).toLocaleString('es-CO')}
                    </Typography>

                    <Typography>
                        total to pay: ${Number(formatEther(loan.totalToPay)).toLocaleString('es-CO')}
                    </Typography>

                    <Typography>
                        Interest platform: ${Number(formatEther(loan.platformFee)).toLocaleString('es-CO')}
                    </Typography>

                </Box>
            ) : "No se ha encontrado ningun prestamo"}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center"
                }}
            >
                <Button
                    sx={{
                        mt: 2,
                        textTransform: "none",
                        borderRadius: 1.7,
                        height: 48,
                    }}
                    variant={"outlined"}
                    color={"success"}
                    onClick={async() => await payInstallment(BigInt(loanId))}
                >
                    Pagar una cuota
                </Button>

                <Button
                    sx={{
                        mt: 2,
                        textTransform: "none",
                        borderRadius: 1.7,
                        height: 48,
                    }}
                    variant={"outlined"}
                    onClick={async() => await payEarly(BigInt(loanId))}
                >
                    Pagar completamente
                </Button>

                <Button
                    sx={{
                        mt: 2,
                        textTransform: "none",
                        borderRadius: 1.7,
                        height: 48,
                    }}
                    variant={"outlined"}
                    color={"success"}
                    onClick={async () => {
                        if (!loan) return;

                        await payInstallmentSignature(
                            BigInt(loanId),
                            "d0029b55-8634-4b45-a789-69a0b73380d4",
                            loan.installmentAmount
                        );
                    }}
                >
                    Pagar una cuota con firma
                </Button>
            </Box>
        </>
    )
}