import React from 'react';
import './ServicesPopup.css';
import {COffcanvas,COffcanvasHeader,COffcanvasBody,COffcanvasTitle,CContainer} from '@coreui/react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'


const ServicesPopup = () => {
  const service = useSelector(state => state.app.activeService);
  const relatedServices = useSelector(state => state.app.activeRelatedServices);
  const { companyId } = useParams();

    return (
      <COffcanvas className="custom-offcanvas choosen-services" placement="bottom" visible={!!service} backdrop={false} scroll={true}>
          <COffcanvasHeader>
            <COffcanvasTitle>Ваше замовлення</COffcanvasTitle>
          </COffcanvasHeader>
          <COffcanvasBody className="d-flex">
            <CContainer className="ps-0 flex-grow-1">
              <h4>{service?.name}</h4>
              <CContainer className="d-flex ps-0">
                <p className="me-5 d-flex align-items-center flex-nowrap"><TimeIcon className="me-2"/>{service?.duration} хв.</p>
                <p className="d-flex align-items-center flex-nowrap"><CashIcon className="me-2"/>{service?.price_formatted}</p>
              </CContainer>
            </CContainer>
            <CContainer className="d-flex justify-content-end align-items-center pe-0 flex-shrink-1 w-auto">
              <Link className="btn btn-dark btn-lg" to={`/related-services/${companyId}/${service?.id}`}>
                  Далі
              </Link>
            </CContainer>
          </COffcanvasBody>
      </COffcanvas>
    );
};

export default ServicesPopup;