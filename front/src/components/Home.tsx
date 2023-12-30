import { Box,  } from "@mui/material"
import Header from "./Header"


const Home = () => {

    return (
        <Box >
            <Header/>
            <Box 
                sx={{
                        backgroundImage: 'url(https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/guides-and-how-tos/choosing-living-room-furniture/Title-living-room-interior-design.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '70vh',
                }}
                >
            </Box>
        </Box>
    )
}

export default Home