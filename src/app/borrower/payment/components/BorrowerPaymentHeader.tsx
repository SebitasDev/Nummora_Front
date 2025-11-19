import { Box, IconButton, useTheme } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SectionHeader from "@/components/atoms/SectionHeader";
import {useRouter} from "next/navigation";


export const BorrowerPaymentHeader = () => {
    const themeMUI = useTheme();
    const { push } = useRouter();

    return (
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
                flexDirection: "row",
                justifyContent: "initial",
                [themeMUI.breakpoints.down("md")]: {
                    display: "none",
                },
                gap: 1
            }}
        >
            <IconButton
                onClick={() => push("/borrower/dashboard")}
                sx={{
                    mt: 0.2,
                    height: "50%"
                }}
            >
                <ArrowBackIcon/>
            </IconButton>

            <SectionHeader
                title={"Realizar Pago"}
                subtitle={"Paga tus cuotas pendientes"}
                titleSize={35}
                subtitleSize={17}
            />
        </Box>
    )
}