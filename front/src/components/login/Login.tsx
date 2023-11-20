import React, { useState, createContext } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    let token: string 
        

    const handleSubmit =  () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
    const role = 'user';

        axios.post('http://localhost:4000/user/login', { email, password, role })
            .then(res => {
                token = res.data?.user?.token
                localStorage.setItem('token', token)
                setIsAuthentify(res.data?.auth);
            })
            .catch(error => {
                console.error(error.response?.data);
                setError('Erreur lors de la connexion. Veuillez réessayer.');
            });

            setEmail('')
            setPassword('')
        
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mt: '140px',  alignItems: 'center'}}>
            <Typography sx={{textAlign: 'center',}}>Login</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column',  width: 500, backgroundColor: '#00284b', px: 3, py: 5, borderRadius: 3}}>
                <TextField
                    error
                    id="outlined-error"
                    label="email"
                    value={email}
                    sx={{
                        my: 3
                    }}
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <TextField
                    error
                    id="outlined-error"
                    label="password"
                    value={password}
                    sx={{
                        my: 3
                    }}
                    onChange={ (e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{my: 3}}>
                    Login
                </Button>
                {/* <Typography>Créer un compte</Typography> */}
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </Box>
    )
}

export default Login