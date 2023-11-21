import React, { useState } from 'react'
import {Typography} from '@mui/material'
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Form from '../Form';


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const {setIsAuthentify} = useAuth()
    const navigate = useNavigate()


    
        

    const handleSubmit =  () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }

        axios.post('http://localhost:4000/user/login', { email, password })
            .then(res => {
                const token = res.data?.user?.token
                localStorage.setItem('token', token)
                setIsAuthentify(res.data.auth);
                navigate('/')
            })
            .catch(error => {
                console.error(error.response?.data);
                setError(error.response?.data.error);
            });
            setEmail('')
            setPassword('')
    }


    return (
        <>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} setUserName={function (value: React.SetStateAction<string>): void {
                throw new Error('Function not implemented.');
            } }/>
        </>
    )
}

export default Login