import React, { useState } from 'react'
import Form from '../../components/Form';


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>();
    // const {setIsAuthentify} = useAuth()
    // const navigate = useNavigate()

    const handleSubmit =  async () => {
        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return;
        }
    }

    return (
        <>
            <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleSubmit={handleSubmit} setUserName={undefined}/>
        </>
    )
}

export default Login