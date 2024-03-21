import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { Furniture } from '../models/furniture';

interface CardFurnitureProps {
    furniture: Furniture
}


export const CardFurniture = ({furniture}: CardFurnitureProps) => {
    const image = furniture.images.length > 0 ? furniture.images[0].url : '';

    return (
        <Grid item xl={2} lg={4} md={6} xs={12} key={furniture._id}>
            <Card >
                <CardMedia
                    sx={{height: 140}}
                    image={image}
                    title="image"
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
        </Grid>
    )
}

