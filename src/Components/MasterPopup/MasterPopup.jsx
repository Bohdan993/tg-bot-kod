import React from 'react';
import {COffcanvas,COffcanvasBody,CContainer,CButton} from '@coreui/react';
import './MasterPopup.css';

const MasterPopup = () => {
    let service = {}
    let relatedServices = {}
    const handleClick = (e) => {

    }
    return (
        <COffcanvas className="custom-offcanvas choosen-services" placement="bottom" visible={!!service} backdrop={false} scroll={true}>
            <COffcanvasBody className="d-flex">
              <CContainer className="ps-0 flex-grow-1">
                <h4>{service?.name}{relatedServices?.length ? `, ${relatedServices.map(el => el?.name).join(', ')}` : ''}</h4>
                <CContainer className="d-flex ps-0">
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