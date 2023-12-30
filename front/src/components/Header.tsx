import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 3,  backgroundColor: '#FFFFEC'}}>
            <Typography>Logo</Typography>
            <TextField/>
            <Typography>
                menu
            </Typography>
        </Box>
    )
}

export default Header