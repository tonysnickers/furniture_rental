import { Logout, Settings, Checklist, Article } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AccountMenu = () => {
    const { isAuthentify } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (link: string) => {
        navigate(link)
        setAnchorEl(null);

    }
    console.log(isAuthentify);
    

    return (
        <>
            <Tooltip title="AccountMenu">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: isAuthentify ? "green" : "red" }}>M</Avatar>
                </IconButton>
            </Tooltip>
            <Menu 
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{  
                    paper: {
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            width: 250,
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        }
                    }
                }} 
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar />Mon compte
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Article fontSize="small"/>
                    </ListItemIcon>
                        Mes articles
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Checklist /> 
                    </ListItemIcon>

                    Mes réservations
                    </MenuItem>
                    
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    {isAuthentify ? (
                        <MenuItem onClick={() => handleNavigate('/login')}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                                Se déconnecter
                        </MenuItem>
                    ) : (
                        <MenuItem component={NavLink} to="/login" onClick={handleClose}>
                            <ListItemIcon>
                                <Logout  fontSize="small" />
                            </ListItemIcon>
                                Se connecter
                        </MenuItem> 
                    )
                }

            </Menu>
        
        </>
    )
}

export default AccountMenu