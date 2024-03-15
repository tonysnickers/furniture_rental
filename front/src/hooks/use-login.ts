import axios from "axios"

const login = async (email: string, password: string ) => {
    try {
        const response =  await axios.post('http://localhost:4000/user/login',  {
            email, 
            password 
        }).then(res => res.data)
        return response
    } catch (error) {
        return ('Erreur lors de la connexion. Veuillez réessayer.');
    }
}


export const useLogin =  ()   => {
    
    return {
        login
    }
}
