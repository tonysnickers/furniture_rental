import axios from 'axios'
import { useQuery } from 'react-query';
// import { create } from 'zustand'


const fetchFurniture = async() => {
    try {
        const furniture = await axios.get('http://localhost:4000/furniture')
        const res = furniture.data.furniture
        // console.log(res);
        
        return res
    } catch (error) {
        
    }
}


// export const useFurniture = create((set) => ({
//     furniture: [],
//     getFurniture: () => set((state: { set: any }) => ({state: state.s}))
// }))


export const useFurniture = () => {
    const {data, isLoading, error,} = useQuery(['furniture'], fetchFurniture)
    return {
        data: data || [],
        isLoading, 
        error,
    }
}

