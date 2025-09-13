"use client";

import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import SectionHeader from "@/components/atoms/SectionHeader";
import {MyEarnings} from "@/app/lender/dashboard/components/Earnings/MyEarnings";
import {PortfolioDistribution} from "@/app/lender/dashboard/components/PortafolioDistribution";
import {FinancialSummary} from "@/app/lender/dashboard/components/FinancialSummary";
import React from "react";
import {EarningPrediction} from "@/app/lender/dashboard/components/EarningPredictions";
import {PerformanceMetrics} from "@/app/lender/dashboard/components/PerformanceMetrics";
import {RecentActivities} from "@/app/lender/dashboard/components/RecentActivity";
import {MonthSummary} from "@/app/lender/dashboard/components/MonthSummary";
import {UserProfileDashboard} from "@/app/lender/dashboard/components/UserProfileDashboard";
import {useDashboard} from "@/app/lender/dashboard/hooks/useDashboard";
import {CustomCard} from "@/components/atoms/CustomCard";
import PriceLabel from "@/components/atoms/PriceLabel";
import {Currency} from "@/enums";

export const LenderDashboardTemplate = () => {
    const themeMUI = useTheme();
    const isMobile = useMediaQuery(themeMUI.breakpoints.down("md"));
    const { balance, formatWithDecimals } = useDashboard();
    
    return (
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
            {isMobile && <UserProfileDashboard />}
            
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
                    title={"Mis prestamos"}
                    subtitle={"Panel de control con analisis detallado de tu portafolio"}
                    titleSize={35}
                    subtitleSize={17}
                />
            </Box>
            
            <CustomCard
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1.5,
                    gridColumn: {
                        xs: "1 / -1",
                        md: "span 12",
                    },
                    order: {
                        xs: 2,
                        md: "initial",
                    },
                }}
            >
                <Typography>
                    Mi balance :
                </Typography>

                <Box>
                    {balance != null ?
                        <PriceLabel number={formatWithDecimals(balance)} currency={Currency.COP}/>
                        : "No tienes balance disponible"}
                </Box>
            </CustomCard>
            
            {/* Mis ganancias */}
            <MyEarnings />

            {/* Distribuicion del portafolio */}
            <PortfolioDistribution />

            {/* Resumen financiero en cards */}
            <FinancialSummary />

            {/* Prediccion de ganancias a futuro */}
            <EarningPrediction />

            {/* Metricas de rendimiento */}
            <PerformanceMetrics />

            {/* Actividad reciente */}
            <RecentActivities />

            {/* Resumen del mes */}
            <MonthSummary />
        </Box>
    );
};