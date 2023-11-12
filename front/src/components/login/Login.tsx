import React, { useState } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'

const Login = () => {
    const [email, setEmail] = useState<string>()
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mt: '140px',  alignItems: 'center'}}>
            <Typography sx={{textAlign: 'center',}}>Login</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column',  width: 500, backgroundColor: '#00284b', px: 3, py: 5, borderRadius: 3}}>
                <TextField
                    error
                    id="outlined-error"
                    label="email"
                    defaultValue="Hello World"
                    sx={{
                        my: 3
                    }}
                />
                <TextField
                    error
                    id="outlined-error"
                    label="password"
                    defaultValue="Hello World"
                    sx={{
                        my: 3
                    }}
                />
                <Button variant="contained" color="primary" sx={{my: 3}}>
                    Login
                </Button>
                <Typography>Créer un compte</Typography>
            </Box>
        </Box>
    )
}

export default Login