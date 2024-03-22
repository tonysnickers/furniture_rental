import { Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Detail = () => {
  // const [furniture, setFurniture] = useState()
  const params = useParams()
  console.log(params.id);
  

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/furniture/${params.id}`).then((res) => res.data)
        console.log(res);
        
      } catch (error) {
        return error
      }
    }
    fetchdata()
      
    
  }, [params])
  
  return (
    <Box>
      details
    </Box>
  )
}

