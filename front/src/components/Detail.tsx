import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useFurniture } from '../hooks/use-furniture'
import { image } from '../models/furniture';
import Flickity from 'react-flickity-component'
import "../style/carousel.css";

export const Detail = () => {
  const params = useParams<{id: string}>()
  const furnitureId = params.id || ''
  const {furniture} = useFurniture(furnitureId)
  console.log(furniture.images);

  
  return (
    <Box sx={{p: 6, display: 'flex', justifyContent: 'space-between'}}>
      {/* <Typography>{furniture.description}</Typography> */}
      {/* <ul>
        <li>{furniture.name}</li>
      </ul> */}
      <Flickity className='carousel' elementType='div' 
          disableImagesLoaded={false}
          reloadOnUpdate
          static
>
      {furniture.images?.map((image: image, index: number) => (
        <Box
          key={image.url}
          sx={{
            maxWidth: furniture.images.length < 2 ? '100%' : '50%',
            mr: furniture.images.length === 2 && index === 0 ? 2 : 0,
            maxHeight: '400px',
          }}
          component="img"
          src={image.url}
          alt={image.url}
        />

      ))}
      </Flickity>
    </Box>
  )
}

