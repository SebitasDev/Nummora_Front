import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box} from "@mui/material";
import React from "react";
import {useEarningPredictions} from "@/app/lender/dashboard/hooks";

export const EarningPredictionChart = () => {
    const { isMdDown, data } = useEarningPredictions();
    
    return (
        <Box sx={{ mt: 2 }}>
            <ResponsiveContainer width="100%" height={isMdDown ? 200 : 250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorConservador" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="gray" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="gray" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="colorOptimista" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />

                    <Area
                        type="monotone"
                        dataKey="conservador"
                        stroke="gray"
                        fill="url(#colorConservador)"
                    />
                    <Area
                        type="monotone"
                        dataKey="predicción"
                        stroke="#3b82f6"
                        fill="url(#colorPrediccion)"
                    />
                    <Area
                        type="monotone"
                        dataKey="optimista"
                        stroke="#22c55e"
                        fill="url(#colorOptimista)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    )
}