import React from 'react';
import './Footer.css';
import {CContainer,CRow,CCol} from '@coreui/react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <CContainer>
            <CRow>
                <CCol>
                <Link className="btn btn-dark" to={'/'}>Філіали</Link>
                </CCol>
                <CCol>
                    <Link className="btn btn-dark" to={'masters/55'}>Запис</Link>
                </CCol>
                <CCol>
                    <Link className="btn btn-dark" to={'about'}>Про нас</Link>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Footer;