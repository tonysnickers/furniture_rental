import { AppBar, Avatar, Box } from '@mui/material'
import React from 'react'
import { IconMenu } from './IconMenu'
import { SearchBar } from './SearchBar'

export const Header = () => {
    return (
        <AppBar 
            position="fixed"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 64,
                px: 3,
                py: 5,
                backgroundColor: 'primary.contrastText',
                borderBottom: 1,
                borderBottomColor: 'action.disabledBackground',
                boxShadow: 'none',
                width: '100%',
                zIndex: theme => theme.zIndex.drawer + 1,
            }}
        >
            <Avatar alt="Logo" src={'https://res.cloudinary.com/do9ctd3bd/image/upload/v1710856245/house-3_acwtyn.png'} sx={{ width: 50, height: 50, marginRight: 2 }} />
            <SearchBar/>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <IconMenu/> 
            </Box>
        </AppBar>
    )
}

