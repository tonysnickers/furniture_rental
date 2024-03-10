import React, { useState } from 'react'
import Form from '../../components/Form';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
    const { setIsAuthentify } = useAuth();
    const navigate = useNavigate()

    const handleSubmit =  async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
        try {
            axios.post('http://localhost:4000/user/login', { email, password })
            .then(res => {
                const token = res.data.user.token
                localStorage.setItem('token', token)
                setIsAuthentify(res.data?.auth);
                setIsAuthentify(res.data.auth);
                navigate('/')
            })
        } catch (error) {
            console.error(error);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
        };
        setEmail('')
        setPassword('')
    }

    return (
        <>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} setUserName={setUserName} username={userName}/>
        </>
    )
}

export default Login