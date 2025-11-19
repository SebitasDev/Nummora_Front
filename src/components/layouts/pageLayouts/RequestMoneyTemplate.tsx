"use client";

import {useAuthGuard} from "@/hooks/useAuthGuard";
import React from "react";
import {Box, useTheme} from "@mui/material";
import {RequestMoneyHeader} from "@/app/borrower/request-money/components/RequestMoneyHeader";
import LoanConfigCard from "@/app/borrower/request-money/components/LoanConfigCard";
import {SummaryOfMoneyRequest} from "@/app/borrower/request-money/components/SummaryOfMoneyRequest";

export const RequestMoneyTemplate = () => {
    useAuthGuard();
    const themeMUI = useTheme();

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
                <RequestMoneyHeader/>

                {/* Configuracion del prestamo */}
                <LoanConfigCard/>

                {/* Resumen del dinero prestado */}
                <SummaryOfMoneyRequest/>

            </Box>
        </>
    )
}