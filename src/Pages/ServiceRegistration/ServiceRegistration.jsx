import {CContainer, CRow, CCol,CButton} from '@coreui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../../Components/ServiceCard';
import './ServiceRegistration.css';



const ServiceRegistration = () => {
    const navigate = useNavigate();
    const company = useSelector(state => state.company.activeCompany);
    const service = useSelector(state => state.service.activeService);



    useEffect(()=>{
        if(!service) {
            navigate('/');
            return;
        }
    }, []);

    return (
        <>
            <CContainer className="service-registration-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">Запис на послугу</h2>
                        <p className="text-center fs-5 tg-text">
                            {company?.name}
                        </p>
                        <p className="text-center fs-5 tg-text">
                            {company?.address?.address_1}, {company?.address?.city}, {company?.address?.postal_code}, {company?.address?.meta?.google_country_name}&nbsp; 
                        </p>
                    </CCol>
                </CRow>
                <CContainer className="p-0">
                    <ServiceCard
                        className="mb-4"
                        key={service?.id}
                        service={service}
                        active={true}
                    />
                    <p className="text-center fs-5 tg-text">
                        Запис на цю послугу доступний тільки в телефонному режимі. Натисніть кнопку зателефонувати нижче.
                    </p>
                    <CRow className="mt-5">
                        <CCol className="d-flex justify-content-center align-items-center">
                            <CButton size="lg" color="dark" component="a" href={`tel:${company?.profile?.phone}`} rel="noopener noreferrer">
                                Зателефонувати
                            </CButton>
                        </CCol>
                    </CRow>
                </CContainer>
            </CContainer>
        </>
    );
};

export default ServiceRegistration;