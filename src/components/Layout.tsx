import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { muiTheme } from "../theme/muiTheme";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Safe resets for browser cross-compatibility */}
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <RestaurantMenuIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            Chef's Ledger — Recipe System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 4, minHeight: "calc(100vh - 64px)" }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </ThemeProvider>
  );
};
