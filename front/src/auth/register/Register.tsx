import React, { useState } from 'react'
import Form from '../../components/Form'
import { useNavigate } from 'react-router-dom'
import { UseRegister } from '../../hooks/use-register'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const {register } = UseRegister()

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
        try {
            await register({email, password})
            setEmail('')
            setPassword('')
            navigate("/login")
        } catch(error)  {
            console.error(error);
            setError('Une erreur s\'est produite ');
        };
    }

    return (
        <>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} />
        </>
        
    )
}

export default Register