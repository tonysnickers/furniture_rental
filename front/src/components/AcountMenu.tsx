import { Article, Checklist, Logout, Settings } from "@mui/icons-material"
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { NavLink } from "react-router-dom"

interface AccountMenuProps {
    open: boolean,
    close: () => void
    anchorEl: HTMLElement | null
    handleNavigate: (link: string) => void
    isAuthentify: boolean
}

export const AccountMenu = ({open, close, anchorEl, handleNavigate, isAuthentify}:AccountMenuProps) => {
    return (
        <Menu 
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={close}
            onClick={close}
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
            <MenuItem onClick={close}>
                <Avatar />Mon compte
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                <ListItemIcon>
                    <Article fontSize="small"/>
                </ListItemIcon>
                    Mes articles
                </MenuItem>
                <MenuItem onClick={close}>
                <ListItemIcon>
                    <Checklist /> 
                </ListItemIcon>
                Mes réservations
                </MenuItem>
                <MenuItem onClick={close}>
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
                    <MenuItem component={NavLink} to="/login" onClick={close}>
                        <ListItemIcon>
                            <Logout  fontSize="small" />
                        </ListItemIcon>
                            Se connecter
                    </MenuItem> 
                )
            }
        </Menu>
    )
}