import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const MainLayout = () => {
    return (
        <Container>
            <Header/>
            <Box component='div' >
                <Outlet/>
            </Box>
        </Container>
    )
}