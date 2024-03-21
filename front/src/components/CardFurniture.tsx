import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Furniture } from '../models/furniture';

interface CardFurnitureProps {
    furniture: Furniture
}


export const CardFurniture = ({furniture}: CardFurnitureProps) => {
    const image = furniture.images.length > 0 ? furniture.images[0].url : '';

    return (
        <Card 
            sx={{
                height: {xl: 500, xs: 400},
                mx: 2,
                my: 4,
                borderRadius: 5
                }}
            >
                <CardMedia
                    component='img'
                    sx={{
                        height: 200,
                    }}
                    
                    image={image}
                    alt={furniture.name + ' image'}
                />
                <CardContent>
                    <Typography variant="h5">
                        {furniture.name}
                    </Typography>
                    <Typography>
                        {furniture.description}
                    </Typography>
                </CardContent>
            </Card>
    )
}

