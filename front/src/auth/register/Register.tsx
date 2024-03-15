import { Box } from '@mui/material'
import React, { useState } from 'react'
import Form from '../../components/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const {setIsAuthentify, isAuthentify} = useAuth()
    const navigate = useNavigate()
    console.log(email);
    console.log(password);
    console.log(username);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }

        try {
            axios.post('http://localhost:4000/user/register', { email, password, username })
            .then(res => {
                // const token = res.data?.user?.token
                // localStorage.setItem('token', token)
                setIsAuthentify(res.data.registred);
                if (isAuthentify) {
                    navigate('/')
                }
            })
        } catch(error)  {
            console.error(error);
            setError('Une erreur s\'est produite lors de la création de l\'utilisateur.');
        };
        setEmail('')
        setPassword('')
    }

    return (
        <Box>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} username={username} setUserName={setUsername}/>

        </Box>
        
    )
}

export default Register