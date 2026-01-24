import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon, Moon, Sun } from 'lucide-react';
import { useAppTheme } from '../../theme/AppThemeProvider';

interface HeaderProps {
    handleDrawerToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
    const { mode, toggleColorMode } = useAppTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: `240px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <IconButton color="inherit" onClick={toggleColorMode}>
                    {mode === 'dark' ? <Sun /> : <Moon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
