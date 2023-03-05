import React from 'react';
import './ServicesPopup.css';
import {COffcanvas,COffcanvasHeader,COffcanvasBody,COffcanvasTitle,CContainer,CButton} from '@coreui/react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { findRelatedServices } from '../../Utils/findRelatedServices';

const ServicesPopup = () => {
  const [searchParams, _] = useSearchParams();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const masterId = searchParams.get('masterId');
  const serviceId = searchParams.get('serviceId');
  const relatedServicesIds = searchParams.get('relatedId');
  const service = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.attached_products?.find(product => Number(product?.id) === Number(serviceId)));
  // const relatedServices = useSelector(state => state.app.activeRelatedServices);

  // const {companyId, serviceId} = useParams();
  // // console.log(companyId, serviceId)
  const services = useSelector(state => state.app.info?.products);
  const branches = useSelector(state => state.app.info?.branches);
  const possibleRelatedServices = findRelatedServices(Number(serviceId), services, branches?.find(branch => Number(branch.id) === Number(companyId)));

  const handleClick = (e) => {
    if(possibleRelatedServices?.length) {
      navigate(`/related-services/${companyId}?masterId=${masterId}&serviceId=${serviceId}`);
    } else {
      navigate(`/our-team/${companyId}?masterId=${masterId}&serviceId=${serviceId}`);
    }
  }

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
                <p className="d-flex align-items-center flex-nowrap"><CashIcon className="me-2"/>{service?.formatted_price}</p>
              </CContainer>
            </CContainer>
            <CContainer className="d-flex justify-content-end align-items-center pe-0 flex-shrink-1 w-auto">
              <CButton color="dark" size="lg" onClick={handleClick}>
                  Далі
              </CButton>
            </CContainer>
          </COffcanvasBody>
      </COffcanvas>
    );
};

export default ServicesPopup;