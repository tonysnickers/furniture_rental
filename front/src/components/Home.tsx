import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { MainBoardCover } from "./MainBoardCover"
import { useEffect, useState } from "react"
import { useFurniture } from '../hooks/use-furniture';

interface Furniture {
    name: string,
    city: string,
    description: string,
    owner: string,
    _id: string
}

export const Home = () => {
    const {data, isLoading, error} = useFurniture()
    const [furnitures, setFurnitures] = useState<Furniture[]>()

    useEffect(() => {
        setFurnitures(data)
    }, [data])


    console.log(setFurnitures);
    console.log(isLoading);
    console.log(error);

    return (
        <Box
            sx={{
                p: 2
            }}
        >
            <MainBoardCover/>
            <Typography 
                variant="h5" 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    my: 5
                }}
            >
                Dernières annonce
            </Typography>
            {/* <Grid container spacing={6}>
                {furnitures?.map((furniture) => (
                    <Card>
                        <CardMedia
                            sx={{height: 140}}
                            image={furniture._id}
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

                ))}
            </Grid> */}
            <ul>
                {furnitures?.map((furniture) => (
                    <li>{furniture.name}- {furniture.description}</li>
                ))}
            </ul>
        
        </Box>
    )
}

