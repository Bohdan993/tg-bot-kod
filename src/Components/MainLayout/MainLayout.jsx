import {
    CContainer
 } from "@coreui/react";
 import {
    Outlet
 } from "react-router-dom";
import { withPageGuard } from "../../HOC/withPageGuard";
import {Header} from '../Header';
import { Footer } from "../Footer";
import './MainLayout.css';


 const MainLayout = () => {
 
    return (
       <CContainer fluid>
         <Header/>
         <Outlet />
         <Footer />
       </CContainer>
    )
 }
 export default withPageGuard(MainLayout);