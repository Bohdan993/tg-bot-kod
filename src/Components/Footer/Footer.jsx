import {CContainer,CRow,CCol} from '@coreui/react';
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AboutIcon } from '../../Images/about.svg'
import { ReactComponent as FilialsIcon } from '../../Images/filials.svg'
import { ReactComponent as SessionIcon } from '../../Images/session.svg'
import { useSelector } from 'react-redux';
import './Footer.css';



const Footer = () => {
    const navigate = useNavigate();
    const companyId = useSelector(state => state.company.activeCompany?.id);

    const handleClick = (e) => {
        navigate(`/masters/${companyId}`);
    }
    
    return (
        <CContainer className="footer">
            <CRow xs={{ gutterX: 0 }} className='d-flex justify-content-center w-100'>
                <CCol className="text-center">
                    <Link to={'/'} className="d-inline-flex flex-column align-items-center">
                        <FilialsIcon/>
                        Філіали
                    </Link>
                </CCol>
                    <CCol className="text-center">
                        <CContainer onClick={handleClick} className="footer-btn d-inline-flex flex-column align-items-center w-auto p-0">
                            <SessionIcon/>
                            Запис
                        </CContainer>
                    </CCol>
                <CCol className="text-center">
                    <Link to={`about/${companyId}`} className="d-inline-flex flex-column align-items-center">
                        <AboutIcon/>
                        Про нас
                    </Link>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Footer;