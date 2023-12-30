import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import AccountMenu from './Menu'

const Header = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 3,  backgroundColor: '#FFFFEC'}}>
            <Typography>Logo</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <TextField/>
                <AccountMenu/>
            </Box>
        </Box>
    )
}

export default Header