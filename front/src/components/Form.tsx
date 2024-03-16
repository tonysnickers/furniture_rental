import React, { useEffect, useState } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { FORMTITLE } from '../models/FormTitle'

interface UserDataIPros {
    email: string,
    password: string,
    username: string,
    error: string | null | undefined,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: () => void
}

const Form = (props: UserDataIPros) => {
    const {email, password, setEmail, setPassword, error, handleSubmit, username, setUserName} = props
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
        <Box sx={{display: 'flex', flexFlow: 'colum', height: '100%',   justifyContent: 'center', mx: 1, mt: 15}}>
            <Box sx={{display: 'flex', flexFlow: 'column', justifyContent: 'center',  width: 500, backgroundColor: '#DFF5FF', px: 5, py: 5, borderRadius: 3}}>
            <Typography variant='h5' sx={{ textAlign: 'center',  color: '#1664C0' }}>{formTitle}</Typography>
            {formTitle === FORMTITLE.Register && (
                <TextField
                    error
                    id="outlined-error"
                    label="username"
                    value={username}
                    sx={{
                        my: 3,
                    }}
                    inputProps={{ sx: { color: "#1664C0"} }}
                    onChange={ (e) => setUserName(e.target.value)}
                />
            )}
                <TextField
                    error
                    label="email"
                    variant="outlined"
                    value={email}
                    
                    sx={{
                        my: 3,
                        borderRadius: 3,
                    }}
                    inputProps={{ sx: { color: "#1664C0"} }}
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
                    inputProps={{ sx: { color: "#1664C0" } }}
                    onChange={ (e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button onClick={handleSubmit} variant='contained' sx={{m: '15px auto', width: 100, textAlign: 'center', color: "#ffff"}}>
                    Continuer
                </Button>
                {formTitle !== FORMTITLE.Login && (
                    <Typography variant='button' sx={{textDecoration:'none', width: 45, color: '#000'}} component={Link} to='/login'>Login</Typography>
                )} 
                {formTitle !== FORMTITLE.Register && (
                    <Typography sx={{textDecoration:'none', width: 75, color: '#000'}} component={Link} to='/register'>S'inscrire</Typography>
                )}
            </Box>
        </Box>
    )
}

export default Form