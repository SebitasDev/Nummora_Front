import {CustomCard} from "@/components/atoms/CustomCard"
import {Box, Button, Divider, Typography} from "@mui/material"
import PriceLabel from "@/components/atoms/PriceLabel";
import {useRequestMoneyStore} from "@/app/borrower/request-money/store/requestMoneyStore";
import {Currency} from "@/enums";
import {calculateInterest} from "@/utilities";
import {generateLoan} from "@/api/loan/generateLoan";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {Address} from "viem";
import {toast} from "react-toastify";

export const SummaryOfMoneyRequest = () => {

    const { amountRequest, numberOfMonths, numberOfQuotes, descriptionOfRequest } = useRequestMoneyStore();
    const interest = calculateInterest(numberOfQuotes, amountRequest);
    const { user } = useWalletAccount();

    const onRequestLoan = async () => {
        try {
            if (!user) {
                throw new Error("Wallet not connected");
            }

            const response = await generateLoan({
                borrowerAddress: user!,
                amount: amountRequest,
                token: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS! as Address,
                installments: numberOfQuotes,
                months: numberOfMonths,
                description: descriptionOfRequest
            })

            toast.success(response.message);

        } catch (e: any) {
            toast.error(`❌ Error al invertir en la plataforma: ${e?.message ?? 'Error desconocido'}`);
            return { success: false, error: e?.message ?? 'Error desconocido' };
        }
    }

    return (
        <>
            <Box
                sx={{
                    gridColumn: { xs: "1 / -1", md: "span 4" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    order: { xs: 2, md: "initial" },
                    height: 550,
                }}
            >
                <CustomCard
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        p: 4,
                        border: "1px solid rgba(34,197,94,0.2)", // borde verde suave
                        borderRadius: 3,
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
                    }}
                >
                    {/* Header */}
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#22c55e", mb: 2 }}>
                        Resumen del Préstamo
                    </Typography>

                    {/* Contenido principal */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Monto Solicitado
                            </Typography>
                            <PriceLabel
                                number={amountRequest.toString()}
                                currency={Currency.COP}
                            />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Plazo
                            </Typography>
                            <Typography fontWeight={600}>
                                {numberOfMonths} {numberOfMonths === 1 ? "mes" : "meses"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Tasa de Interés
                            </Typography>
                            <Typography fontWeight={600}>fixed%</Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Interés Total
                            </Typography>
                            <Typography fontWeight={600} sx={{ color: "#f97316" }}>
                                {interest}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Monto Total a Pagar
                            </Typography>
                            <Typography fontWeight={600}>
                                <PriceLabel
                                    number={(amountRequest + interest).toString()}
                                    currency={Currency.COP}
                                />
                            </Typography>
                        </Box>

                        {/* Cuota mensual */}
                        <Box
                            sx={{
                                backgroundColor: "rgba(34,197,94,0.1)",
                                borderRadius: 2,
                                p: 2,
                                mt: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Cuota Mensual
                            </Typography>
                            <Typography variant="h4" fontWeight={700} sx={{ color: "#22c55e" }}>
                                <PriceLabel
                                    number={((amountRequest + interest) / numberOfQuotes).toString()}
                                    currency={Currency.COP}
                                    color={"#22c55e"}
                                />
                            </Typography>
                        </Box>

                        {/* Botón */}
                        <Button
                            onClick={async() => await onRequestLoan()}
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: "#22c55e",
                                "&:hover": {
                                    backgroundColor: "#16a34a",
                                },
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                py: 1.2,
                            }}
                        >
                            Solicitar Préstamo
                        </Button>
                    </Box>
                </CustomCard>


                <CustomCard
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 3,
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Tu Score Crediticio
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: "bold", color: "success.main" }}>
                            720
                        </Typography>

                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Bueno
                        </Typography>

                        <Typography variant="caption" sx={{ color: "text.secondary", mt: 1 }}>
                            Tienes alta probabilidad de aprobación
                        </Typography>
                    </Box>
                </CustomCard>

            </Box>
        </>
    )
}