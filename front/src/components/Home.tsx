import { Box, Grid, Typography } from "@mui/material"
import { MainBoardCover } from "./MainBoardCover"
import { useEffect, useState } from "react"
import { useFurniture } from '../hooks/use-furniture';
import { CardFurniture } from "./CardFurniture";
import { Furniture } from '../models/furniture';


export const Home = () => {
    const {data} = useFurniture()
    const [furnitures, setFurnitures] = useState<Furniture[]>()

    useEffect(() => {
        setFurnitures(data)
    }, [data])

    console.log(data);
    
    return (
        <Box>
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
            <Grid container spacing={4}>
                {furnitures?.map((furniture) => (
                    <CardFurniture key={furniture._id} furniture={furniture}/>
                ))}
            </Grid>
        </Box>
    )
}

