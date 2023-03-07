import {
    CContainer
 } from "@coreui/react";
 import {
    Outlet
 } from "react-router-dom";
import { withPageGuard } from "../../HOC/withPageGuard";
import { Footer } from "../Footer";
import './MainLayout.css';
 const MainLayout = () => {
 
    return (
       <CContainer fluid>
        <Outlet />
        <Footer />
       </CContainer>
    )
 }
 export default MainLayout;