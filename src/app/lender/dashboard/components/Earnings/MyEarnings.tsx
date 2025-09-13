import {Box, Typography} from "@mui/material";
import SectionHeader from "@/components/atoms/SectionHeader";
import React from "react";
import {MonthToggle} from "@/app/lender/dashboard/components/Earnings/MonthToggle";
import PriceLabel from "@/components/atoms/PriceLabel";
import {Currency} from "@/enums";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {EarningChart} from "@/app/lender/dashboard/components/Earnings/EarningChart";
import {useMediaQuery, useTheme} from "@mui/system";
import {useEarningStore} from "@/app/lender/dashboard/store";
import Theme from "@/theme/theme";
import {CustomCard} from "@/components/atoms/CustomCard";
import {CustomButton} from "@/components/atoms/CustomButton";

export const MyEarnings = () => {
    const themeMUI = useTheme();
    const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
    const { period } = useEarningStore();
    const theme = Theme;
    return (
        <CustomCard 
            sx={{
                gridColumn: {
                    xs: "1 / -1",
                    md: "span 8"
                },
                order: {
                    xs: 3,
                    md: 'initial'
                },
                width : '100%',
                height: "470px",
                padding: 2.9
            }}
        >
            <Box 
                sx={{ 
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <SectionHeader
                    title={"Mis ganancias"}
                    subtitle={
                        isMdUp ? `Evaluacion de ingresos en los ultimos ${period} meses` : ""
                    }
                />

                <Box sx={{marginLeft: "auto"}}>
                    <MonthToggle/>
                </Box>
                
            </Box>

            <PriceLabel
                number={"150.000"}
                currency={Currency.COP}
                sx={{
                    color: theme.palette.primary.dark,
                    mt: 2,
                    width: 'fit-content'
                }}
            />

            <Box sx={{ display: "flex", gap: 1, mt: isMdUp ? 1 : 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <TrendingUpIcon sx={{ color: theme.palette.primary.main, fontSize: "15px", fontWeight: "bold" }}/>
                    <Typography
                        color={theme.palette.primary.main}
                        variant={"body1"}
                        fontSize={14}
                        fontWeight={"600"}
                    >
                        +12% este mes
                    </Typography>
                </Box>

                <CustomButton>
                    Expandir
                </CustomButton>
            </Box>

            <EarningChart/>
        </CustomCard>
    )
}