import {COffcanvas,COffcanvasBody,CContainer,CButton} from '@coreui/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './MasterPopup.css';





const MasterPopup = ({title, text}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const companyId = useSelector(state => state.company.activeCompany?.id);

    const handleClick = (e) => {
      if(location.pathname.includes('our-team')) {
        navigate(`/date/${companyId}`);
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