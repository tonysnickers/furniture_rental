import axios from "axios";
import { useMutation, useQuery } from "react-query"

interface loginType {
    email: string,
    password: string
}

const userLogin = async({email, password}: loginType) => {
    try {
        const response = await axios.post('http://localhost:4000/user/login', { email, password },
            { headers: {'Content-Type': 'application/json'}}
        )
        console.log(response?.data);
        return response?.data
    } catch (error) {
        return error
    }
} 


export const useLogin = async (email: string, password: string) => {
    const {data, error } = useQuery('login', () =>  userLogin({email, password}))
    // const {data, error} = useMutation(() => userLogin({email, password}))
    return {
        data,
        error
    }
}