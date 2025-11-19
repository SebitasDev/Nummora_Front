import React, { useState } from "react";
import {
    CardContent,
    CardHeader,
    Typography,
    Box,
    Slider,
    TextField,
    Divider,
} from "@mui/material";
import {CustomCard} from "@/components/atoms/CustomCard";
import {useRequestMoneyStore} from "@/app/borrower/request-money/store/requestMoneyStore";

export default function LoanConfigCard() {
    const { amountRequest, setAmountRequest, numberOfMonths, setNumberOfMonths, numberOfQuotes, setNumberOfQuotes, setDescriptionOfRequest, descriptionOfRequest } = useRequestMoneyStore();

    return (
        <CustomCard
            sx={{
                gridColumn: { xs: "1 / -1", md: "span 8" },
                display: "grid",
                gap: 2.5,
                p: 3,
                order: { xs: 2, md: "initial" },
                gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
                overflow: "visible",
            }}
        >
            <Box
                sx={{
                    gridColumn: "1 / -1",
                    width: "100%",
                    height: "auto",
                }}
            >
                <CardHeader
                    title={
                        <Typography variant="h6" fontWeight={600}>
                            Configurar Préstamo
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" color="text.secondary">
                            Selecciona el monto y las condiciones que necesitas
                        </Typography>
                    }
                    sx={{ pb: 1 }}
                />

                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {/* Monto a solicitar */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                            Monto a Solicitar
                        </Typography>

                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                $1
                            </Typography>
                            <Slider
                                value={amountRequest}
                                min={1}
                                max={500}
                                step={1}
                                onChange={(_, val) => setAmountRequest(val as number)}
                                sx={{ flex: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                $500
                            </Typography>
                        </Box>

                        <Box textAlign="center" mt={2}>
                            <TextField
                                type="number"
                                variant="outlined"
                                value={amountRequest}
                                onChange={(e) => setAmountRequest(Number(e.target.value))}
                                inputProps={{ min: 1, max: 500, step: 1 }}
                                sx={{
                                    width: 160,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "background.paper",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        transition: "all 0.2s ease-in-out",

                                        "& fieldset": { border: "none" },

                                        "&:hover": {
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                        },
                                        "&.Mui-focused": {
                                            boxShadow: "0 0 0 3px rgba(25,118,210,0.25)",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: 22,
                                        padding: "6px 8px",
                                        height: "1.5rem",
                                    },
                                }}
                            />

                        </Box>
                    </Box>

                    <Divider />

                    {/* Plazo del préstamo */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                            Plazo del Préstamo
                        </Typography>

                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                1 mes
                            </Typography>
                            <Slider
                                value={numberOfMonths}
                                min={1}
                                max={24}
                                step={1}
                                onChange={(_, val) => setNumberOfMonths(val as number)}
                                sx={{ flex: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                24 meses
                            </Typography>
                        </Box>

                        <Box textAlign="center" mt={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {numberOfMonths} {numberOfMonths === 1 ? "mes" : "meses"}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Numero de cuotas */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                            Cantidad de cuotas
                        </Typography>

                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                1 cuota
                            </Typography>
                            <Slider
                                value={numberOfQuotes}
                                min={1}
                                max={24}
                                step={1}
                                onChange={(_, val) => setNumberOfQuotes(val as number)}
                                sx={{ flex: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                12 cuotas
                            </Typography>
                        </Box>

                        <Box textAlign="center" mt={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {numberOfQuotes} {numberOfQuotes === 1 ? "cuota" : "cuotas"}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Propósito del préstamo */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                            Propósito del Préstamo
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Ej: Expansión de negocio, educación, emergencia..."
                            value={descriptionOfRequest}
                            onChange={(e) => setDescriptionOfRequest(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    backgroundColor: "background.paper",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    transition: "all 0.2s ease-in-out",
                                    "& fieldset": { border: "none" },

                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                    },
                                    "&.Mui-focused": {
                                        boxShadow: "0 0 0 3px rgba(25,118,210,0.25)",
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    height: "1.5rem",
                                    padding: "6px 8px",
                                },
                            }}
                        />

                    </Box>
                </CardContent>
            </Box>
        </CustomCard>
    );
}
