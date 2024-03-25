import axios from "axios";
import { useQuery } from "react-query";


const getfurniture = async (params: string) => {
    try {
        const res = await axios.get(`http://localhost:4000/furniture/${params}`).then((res) => res.data)
        console.log(res);
        return res
    } catch (error) {
        console.error('Erreur lors de la récupération des données de meuble :', error);
        throw new Error('Impossible de récupérer les données de meuble');
    }
}

export const useFurniture = (params: string) => {
    const {data, isLoading, error } = useQuery(['furniture', params], () => getfurniture(params))
    console.log(data);
    if (isLoading) {
        console.log('Chargement des données de meubles...');
    }

    if (error) {
        console.error('Erreur lors de la récupération des données de meubles :', error);
    }

    return {
        furniture: data || {},
        isLoading,
        error
    }
}