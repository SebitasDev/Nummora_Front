"use client";

import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { useLenderLayout } from "@/hooks";
import { CustomChip } from "@/components/atoms/CustomChip";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function LenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, setValue, shouldHideNav, navigationItems, isMobile, theme, themeMUI } = useLenderLayout();
  
  return (
    <Box sx={{ pb: isMobile ? 7 : 0, pt: !isMobile ? 8 : 0 }}>
      {!isMobile && !shouldHideNav && (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#fff",
            color: "black",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "25px",
                }}
              >
                Nummora
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box sx={{ display: "flex", gap: 3.5 }}>
                {navigationItems.map((item, index) => (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: value === index ? "#00C707" : "black",
                      fontWeight: value === index ? "600" : "500",
                      fontSize: "14px",
                      textTransform: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      minWidth: "auto",
                      "&:hover": {
                        backgroundColor: "rgba(0, 199, 7, 0.05)",
                        color: "#00C707",
                      },
                      ...(value === index && {
                        backgroundColor: "rgba(0, 199, 7, 0.1)",
                      }),
                    }}
                    onClick={() => setValue(index)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* User Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.7 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src="https://i.postimg.cc/k5tRM8Gn/77c54bad-b949-4ba7-b26e-1a22158b4768.png"
                  alt="Descripción"
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
                    Pepito
                  </Typography>
                  <CustomChip
                    sx={{
                      fontSize: "12px",
                      backgroundColor: "#DCFCE7",
                      color: theme.palette.primary.dark,
                      px: 1,
                    }}
                  >
                    ✓ Inversionista
                  </CustomChip>
                </Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  Verificado
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  ml: 2.5,
                }}
              >
                <SettingsOutlinedIcon />
                <LogoutOutlinedIcon />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Box
        sx={{
          paddingX: "7rem",
          p: 1,
          backgroundColor: "#F9FAFB",
          [themeMUI.breakpoints.down("md")]: {
            paddingX: "0rem",
          },
        }}
      >
        {children}
      </Box>

      {isMobile && !shouldHideNav && (
        <Box>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: "1px solid #eee",
              backgroundColor: "#fff",
            }}
            elevation={3}
          >
            <BottomNavigation
              showLabels={true}
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
              sx={{
                "& .MuiBottomNavigationAction-root": {
                  "& .MuiBottomNavigationAction-label": {
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "black",
                    marginTop: "2px",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "black",
                  },
                },
                "& .MuiBottomNavigationAction-root.Mui-selected": {
                  "& .MuiBottomNavigationAction-label": {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#00C707",
                    marginTop: "4px",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#00C707",
                  },
                },
              }}
            >
              {navigationItems.map((item, index) => (
                <BottomNavigationAction
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 199, 7, 0.05)",
                      color: "#00C707",
                    },
                    ...(value === index && {
                      backgroundColor: "rgba(0, 199, 7, 0.1)",
                    }),
                  }}
                  key={item.label}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </BottomNavigation>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
