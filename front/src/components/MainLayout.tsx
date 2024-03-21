import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const MainLayout = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <Header/>
            <Outlet/>
        </Container>
    )
}