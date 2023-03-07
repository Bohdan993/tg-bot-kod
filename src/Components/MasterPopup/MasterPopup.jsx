import React from 'react';
import {COffcanvas,COffcanvasBody,CContainer,CButton} from '@coreui/react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './MasterPopup.css';


const MasterPopup = ({title, text}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const { companyId } = useParams();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');
    const relatedServicesIds = searchParams.get('relatedId');
    const startDate = searchParams.get('startDate');

    const handleClick = (e) => {
      if(location.pathname.includes('our-team')) {
        navigate(`/date/${companyId}?masterId=${masterId}&serviceId=${serviceId}${relatedServicesIds ? '&relatedId=' + relatedServicesIds : ''}&startDate=${startDate}`);
        return;
      }
    }
    
    return (
        <COffcanvas className="custom-offcanvas choosen-services" placement="bottom" visible={true} backdrop={false} scroll={true}>
            <COffcanvasBody className="d-flex">
              
              <CContainer className="ps-0 flex-grow-1 d-flex flex-column justify-content-center">
                {title && (<h4>{title}</h4>)} 
                <CContainer className="d-flex ps-0">
                  {text && <p className="mb-0">{text}</p>}
                </CContainer>
              </CContainer>
              <CContainer className="d-flex justify-content-end align-items-center pe-0 flex-shrink-1 w-auto">
                <CButton color="dark" size="lg" onClick={handleClick}>
                    До вибору дати
                </CButton>
              </CContainer>
            </COffcanvasBody>
        </COffcanvas>
      );
};

export default MasterPopup;