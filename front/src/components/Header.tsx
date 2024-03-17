import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { IconMenu } from './IconMenu'

const Header = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3,  backgroundColor: '#0F00'}}>
            <Typography>Logo</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <TextField/>
                <IconMenu/>
            </Box>
        </Box>
    )
}

export default Header