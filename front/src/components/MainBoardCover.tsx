import { CardMedia } from "@mui/material"

export const MainBoardCover = () => {
    return (
        <CardMedia 
            component={'img'}
            image='https://res.cloudinary.com/do9ctd3bd/image/upload/v1704027689/ef6b1b08253942b8af35e2793f962ab7_ztntlj.avif'
                sx={{
                    height: '90vh',
                    display: { xs: 'none', md: 'flex'  }
                }}
            />
    )
}