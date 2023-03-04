import {
    CContainer
 } from "@coreui/react";
 import {
    Outlet
 } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import './MainLayout.css';
 const MainLayout = () => {
 
    return (
       <CContainer fluid>
        <Header />
        <Outlet />
        <Footer />
       </CContainer>
    )
 }
 export default MainLayout;