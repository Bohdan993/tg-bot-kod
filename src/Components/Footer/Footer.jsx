import React from 'react';
import './Footer.css';
import {CContainer,CRow,CCol} from '@coreui/react';
import { Link } from "react-router-dom";
import { ReactComponent as AboutIcon } from '../../Images/about.svg'
import { ReactComponent as FilialsIcon } from '../../Images/filials.svg'
import { ReactComponent as SessionIcon } from '../../Images/session.svg'
import { useSelector } from 'react-redux';



const Footer = () => {

    const companyId = useSelector(state => state.app.activeBranchId);
    const activeMasterId = useSelector(state => state.app.activeMaster?.id);
    const activeServiceId = useSelector(state => state.app.activeService?.Id);
    
    return (
        <CContainer className="footer">
            <CRow xs={{ gutterX: 0 }} className='d-flex justify-content-center w-100'>
                <CCol className="text-center">
                    <Link to={'/'} className="d-flex flex-column align-items-center">
                        <FilialsIcon/>
                        Філіали
                    </Link>
                </CCol>
                {companyId && (
                    <CCol className="text-center">
                        <Link to={`masters/${companyId}?masterId=${activeMasterId}&serviceId=${activeServiceId}`} className="d-flex flex-column align-items-center">
                            <SessionIcon/>
                            Запис
                        </Link>
                    </CCol>
                )}
                <CCol className="text-center">
                    <Link to={'about'} className="d-flex flex-column align-items-center">
                        <AboutIcon/>
                        Про нас
                    </Link>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Footer;