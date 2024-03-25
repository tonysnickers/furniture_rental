import axios from 'axios'
import { useQuery } from 'react-query';


const getfurnitures = async() => {
    try {
        const furniture = await axios.get('http://localhost:4000/furniture')
        const res = furniture.data.furniture 
        return res
    } catch (error) {
        console.error('Erreur lors de la récupération des données de meuble :', error);
        throw new Error('Impossible de récupérer les données des meubles');
    }
}


export const useFurnitures = () => {
    const {data, isLoading, error,} = useQuery(['furniture'], getfurnitures)    
    return {
        data: data || [],
        isLoading, 
        error,
    }
}

