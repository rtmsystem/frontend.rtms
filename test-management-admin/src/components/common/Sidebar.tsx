import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Box,
    Avatar,
    Typography,
    Collapse
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { LayoutDashboard, Users, FileText, Settings, User as UserIcon } from 'lucide-react'; // Example icons
import { useAppSelector } from '../../store';

// Routes Configuration
interface RouteConfig {
    path: string;
    name: string;
    icon?: React.ReactNode;
    children?: RouteConfig[];
    protected?: boolean;
}

export const routesConfig: RouteConfig[] = [
    {
        path: '/',
        name: 'Dashboard',
        icon: <LayoutDashboard size={20} />,
    },
    {
        path: '/tests',
        name: 'Tests Management',
        icon: <FileText size={20} />,
        children: [
            { path: '/tests/active', name: 'Active Tests' },
            { path: '/tests/archived', name: 'Archived Tests' }
        ]
    },
    {
        path: '/users',
        name: 'Users',
        icon: <Users size={20} />,
        protected: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: <Settings size={20} />,
    },
];

const drawerWidth = 240;

const SidebarItem = ({ route, depth = 0 }: { route: RouteConfig; depth?: number }) => {
    const [open, setOpen] = React.useState(false);
    const hasChildren = route.children && route.children.length > 0;

    const handleClick = () => {
        setOpen(!open);
    };

    const itemContent = (
        <ListItemButton
            sx={{ pl: 2 + 2 * depth }}
            component={hasChildren ? 'div' : NavLink}
            to={hasChildren ? undefined : route.path}
            onClick={hasChildren ? handleClick : undefined}
            {...(hasChildren ? {} : { end: true } as any)}
            style={({ isActive }: any) => {
                return {
                    backgroundColor: isActive && !hasChildren ? 'rgba(0, 0, 0, 0.08)' : undefined,
                };
            }}
        >
            {route.icon && <ListItemIcon sx={{ minWidth: 40 }}>{route.icon}</ListItemIcon>}
            <ListItemText primary={route.name} />
            {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItemButton>
    );

    if (hasChildren) {
        return (
            <>
                {itemContent}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {route.children?.map((child) => (
                            <SidebarItem key={child.path} route={child} depth={depth + 1} />
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }

    return <ListItem disablePadding>{itemContent}</ListItem>;
};


export const Sidebar: React.FC<{ open: boolean, onClose: () => void, isMobile: boolean }> = ({ open, onClose, isMobile }) => {
    const { user } = useAppSelector((state) => state.auth);

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ flexGrow: 1 }}>
                {routesConfig.map((route) => (
                    <SidebarItem key={route.path} route={route} />
                ))}
            </List>
            <Divider />
            {user && (
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar alt={user.name} src={user.avatar}>
                        <UserIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {/* Mobile Drawer */}
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={onClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                /* Desktop Drawer */
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            )}
        </Box>
    );
};
