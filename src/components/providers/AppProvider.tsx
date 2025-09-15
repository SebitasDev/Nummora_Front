'use client';

import {CssBaseline, Container, Box} from '@mui/material';
import ReactQueryProvider from '@/lib/react-query/provaider';
import LenderLayout from '@/components/layouts/LenderLayout';
import {QueryClientProvider} from "@tanstack/react-query";
import {WagmiProvider} from "wagmi";
import React from "react";
import {WalletConnection} from "@/lib/reown/WalletConnection";
import {ToastContainer} from "react-toastify";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const { wagmiAdapter } = WalletConnection();
    
    return (
        <Box>
            <CssBaseline/>
            <LenderLayout>
                <Container maxWidth="xl">
                    <ReactQueryProvider>
                        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                            {children}
                        </WagmiProvider>
                    </ReactQueryProvider>
                    <ToastContainer />
                </Container>
            </LenderLayout>
        </Box>
    );
}
