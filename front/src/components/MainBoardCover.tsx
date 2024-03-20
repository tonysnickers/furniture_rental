import { Box } from "@mui/material"

export const MainBoardCover = () => {
    return (
        <Box 
                sx={{
                    backgroundImage: "url(https://res.cloudinary.com/do9ctd3bd/image/upload/v1704027689/ef6b1b08253942b8af35e2793f962ab7_ztntlj.avif)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '80vh',
                    display: { xs: 'none', md: 'flex'  }
                }}
            >
            </Box>
    )
}