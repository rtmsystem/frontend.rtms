import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';

export const MainLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    // In MUI v6/v5, breakpoints work with standard keys. 'sm' is typically 600px.
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                open={mobileOpen}
                onClose={handleDrawerToggle}
                isMobile={isMobile}
            />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
            >
                <Toolbar /> {/* Spacer for keeping content below AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
};
