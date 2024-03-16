import React, { useState } from 'react'
import Form from '../../components/Form';
import { useLogin } from '../../hooks/use-login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const {login} = useLogin()
    const navigate = useNavigate()
    const {setIsAuthentify} = useAuth()


    const handleLogin =  async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
        try {
            const res = await login(email, password)
            console.log(res);
            setIsAuthentify(res.auth)
            const token = res.user.token
            localStorage.setItem('token', token)
            setEmail('')
            setPassword('')
            navigate("/")
        } catch (error) {
            setError('Erreur lors de la connexion. Veuillez réessayer.')
        }   
    }

    return (
        <>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleLogin} />
        </>
    )
}

export default Login