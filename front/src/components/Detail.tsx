import { Box, Typography,  } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useFurniture } from '../hooks/use-furniture'

export const Detail = () => {
  const params = useParams<{id: string}>()
  const furnitureId = params.id || ''
  const { furniture } = useFurniture(furnitureId)
  
  
  return (
    <Box sx={{p: 6}}>
        <Typography variant='h5' sx={{my: 3}}> Location de {furniture.name} à {furniture.city}</Typography>
        <Typography variant='subtitle1'>{furniture.description}</Typography>
    </Box>
  )
}

