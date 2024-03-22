import axios from 'axios'
import { useQuery } from 'react-query';


const fetchFurniture = async() => {
    try {
        const furniture = await axios.get('http://localhost:4000/furniture')
        const res = furniture.data.furniture        
        return res
    } catch (error) {
        return error
    }
}


export const useFurniture = () => {
    const {data, isLoading, error,} = useQuery(['furniture'], fetchFurniture)
    return {
        data: data || [],
        isLoading, 
        error,
    }
}

