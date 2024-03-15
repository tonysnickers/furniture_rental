import { Box } from '@mui/material'
import React, { useState } from 'react'
import Form from '../../components/Form'
import { useNavigate } from 'react-router-dom'
import { UseRegister } from '../../hooks/use-register'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const {register } = UseRegister()

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
        try {
            await register({email, password, username})
            setEmail('')
            setPassword('')
            navigate("/login")
        } catch(error)  {
            console.error(error);
            setError('Une erreur s\'est produite ');
        };
    }

    return (
        <Box>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} username={username} setUserName={setUsername}/>
        </Box>
        
    )
}

export default Register