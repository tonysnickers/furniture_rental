import { Box } from '@mui/material'
import React, { useState } from 'react'
import Form from '../../components/Form'
import axios from 'axios'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const {setIsAuthentify, isAuthentify} = useAuth()
    const navigate = useNavigate()

    const handleSubmit =  () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }

        axios.post('http://localhost:4000/user/register', { email, password, username })
            .then(res => {
                const token = res.data?.user?.token
                localStorage.setItem('token', token)
                setIsAuthentify(res.data.registred);
                if (isAuthentify) {
                    navigate('/')
                }
            })
            .catch(error => {
                console.error(error.response?.data);
                setError(error.response?.data.error);
            });
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