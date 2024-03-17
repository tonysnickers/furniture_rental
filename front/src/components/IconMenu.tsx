import { Avatar, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { AccountMenu } from './AcountMenu';

export const IconMenu = () => {
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
            <AccountMenu close={handleClose} open={open} anchorEl={anchorEl} handleNavigate={handleNavigate} isAuthentify={isAuthentify}/>
        </>
    )
}

