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
                    mt: 5
                }}
            >
                Dernières annonces
            </Typography>
            <Grid container sx={{p:6, width: '100%'}} spacing={2}>
                {furnitures?.map((furniture) => (
                    <Grid item xl={2} lg={3} md={6} xs={12} key={furniture._id} >
                        <CardFurniture key={furniture._id} furniture={furniture}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

