import { Box, Typography,  } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useFurniture } from '../hooks/use-furniture'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";   
import { Image } from '../models/furniture';

export const Detail = () => {
  const params = useParams<{id: string}>()
  const furnitureId = params.id || ''
  const { furniture } = useFurniture(furnitureId)
  const images = furniture.images ? furniture.images : []


  const newImg: {original: string, thumbnail: string}[]  = images.map((img: Image) => {
    return {original: img.url, thumbnail: img.url}
  })
  
  
  return (
    <Box sx={{p: 6}}>
      <ImageGallery 
        items={newImg}
        autoPlay={false}
        showPlayButton={false}
        showIndex={true}
        />
      <Typography variant='h5' sx={{my: 3}}> Location de {furniture.name} à {furniture.city}</Typography>
      <Typography variant='subtitle1'>{furniture.description}</Typography>
    </Box>
  )
}

