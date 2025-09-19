'use client';

import {CssBaseline, Container, Box} from '@mui/material';
import ReactQueryProvider from '@/lib/react-query/provaider';
import LenderLayout from '@/components/layouts/LenderLayout';
import { WagmiProvider } from "wagmi";
import React from "react";
import { ToastContainer } from "react-toastify";
import {wagmiConfig} from "../../../wagmi.config";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <CssBaseline/>
            <LenderLayout>
                <Container maxWidth="xl">
                    <ReactQueryProvider>
                        <WagmiProvider config={wagmiConfig}>
                            {children}
                        </WagmiProvider>
                    </ReactQueryProvider>
                    <ToastContainer />
                </Container>
            </LenderLayout>
        </Box>
    );
}
