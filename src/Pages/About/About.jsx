import {useSelector} from "react-redux";
import {CContainer,CRow, CCol, CImage, CButton} from '@coreui/react';
import {ReactComponent as InstagramIcon} from '../../Images/icons8-instagram.svg';
import './About.css';


const About = () => {
    const company = useSelector(state => state.app.info?.company);
    return (
        <>
            <CContainer className="about-page main-content mb-5">
                <CRow className="mb-6">
                    <CCol xs={12} className="d-flex justify-content-center align-items-center mb-4">
                        <div className="logo-wrapper">
                            <CImage align="center" className="logo" src={company?.images?.[0]} width={200} height={200} />
                        </div>
                    </CCol>
                    <CCol xs={12} className="d-flex justify-content-center align-items-center mb-4 flex-column">
                        <p className="fs-3 fw-bolder" style={{color: "#000000"}}>{company?.name}</p>
                        <a href={company?.profile?.instagram} target="_blank" rel="noopener noreferrer" className="mb-4">
                            <div className="icon-wrapper">
                                <InstagramIcon/>
                            </div>
                        </a>
                        <p className="fs-5" style={{color: "#000000"}}>{company?.profile?.description}</p>
                    </CCol>
                </CRow>
                <CRow className="mt-5">
                    <CCol className="d-flex justify-content-center align-items-center">
                        <CButton size="lg" color="dark" component="a" href={`tel:${company?.profile?.phone}`} rel="noopener noreferrer">
                            Зателефонувати
                        </CButton>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    );
};

export default About;