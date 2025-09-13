'use client'

import {Box, TextField, InputAdornment, Button, Typography} from "@mui/material";
import {useState} from "react";
import { AttachMoney } from "@mui/icons-material";
import Theme from "@/theme/theme";
import {useBorrowerDashboard} from "@/app/borrower/dashboard/hooks/useBorrowerDashboard";
import {formatEther} from "viem";

export default function BorrowerPage() {
    const [loanId, setLoanId] = useState(0);
    const theme = Theme
    const { searchLoanById, loan, payInstallment, payEarly } = useBorrowerDashboard();
    
    return (
        <>
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
            </Box>
        </>
    )
}