import axios from "axios";

interface Register {
    email: string,
    password: string, 
}

const register = async ({email, password, }: Register) => {
    try {
        const response = axios.post('http://localhost:4000/user/register', { email, password })
        .then(res => {
            return res.data
        })
        return response
    } catch(error)  {
        console.error(error);
        return('Une erreur s\'est produite lors de la création de l\'utilisateur.');
    };
}

export const UseRegister = () => {
    return {
        register
    }
}