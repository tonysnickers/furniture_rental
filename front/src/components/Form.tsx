import React, { useEffect, useState } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { FORMTITLE } from '../models/FormTitle'

interface UserDataIPros {
    email: string,
    password: string,
    username?: string,
    error: string | null,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: () => void
}

const Form = ({email, password, setEmail, setPassword, error, handleSubmit, username, setUserName}: UserDataIPros) => {
    const [formTitle, setFormTitle] = useState<string>('')
    const url = window.location.pathname

    useEffect(() => {
        switch (url) {
            case '/login':
                setFormTitle(`${FORMTITLE.Login}`)
                break;
            case '/register':
                setFormTitle(`${FORMTITLE.Register}`)
                break;
        
        }
    },[url])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mt: '140px',  alignItems: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column',  width: 500, backgroundColor: '#00284b', px: 3, py: 5, borderRadius: 3}}>
            <Typography sx={{ textAlign: 'center', }}>{formTitle}</Typography>
            {formTitle !== FORMTITLE.Login && (
                <TextField
                    error
                    id="outlined-error"
                    label="username"
                    value={username}
                    sx={{
                        my: 3
                    }}
                    onChange={ (e) => setUserName(e.target.value)}
                />
            )}
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
                {error && <Typography color="error">{error}</Typography>}
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{m: '0 auto', width: 100, textAlign: 'center'}}>
                    {formTitle}
                </Button>
                {formTitle !== FORMTITLE.Login ? (
                    <Typography sx={{textDecoration:'none'}} component={Link} to='/login'>Login</Typography>
                ) : (
                    <Typography sx={{textDecoration:'none'}} component={Link} to='/register'>S'inscrire</Typography>
                )}
            </Box>
        </Box>
    )
}

export default Form