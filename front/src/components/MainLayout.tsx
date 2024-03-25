import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const MainLayout = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <Header/>
            <Box component="div" sx={{ marginTop: 10 }}>
                <Outlet/>
            </Box>
        </Container>
    )
}