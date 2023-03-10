import {COffcanvas,COffcanvasHeader,COffcanvasBody,COffcanvasTitle,CContainer,CButton} from '@coreui/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { findRelatedServices } from '../../Utils/findRelatedServices';
import './ServicesPopup.css';



const ServicesPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const companyId = useSelector(state => state.company.activeCompany?.id);
  const serviceId = useSelector(state => state.service.activeService?.id);
  const relatedServicesIds = useSelector(state => state.service.activeRelatedServices?.map(service => service?.id));
  const currCompanyBranchServices = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.attached_products);
  const service = currCompanyBranchServices?.find(service => Number(service?.id) === Number(serviceId));
  const relatedServices = relatedServicesIds?.map(id => currCompanyBranchServices?.find(service => Number(service?.id) === Number(id)));
  
  const services = useSelector(state => state.app.info?.products);
  const branches = useSelector(state => state.app.info?.branches);
  const possibleRelatedServices = findRelatedServices(Number(serviceId), services, branches?.find(branch => Number(branch.id) === Number(companyId)));

  const handleClick = async (e) => {
    if(location.pathname.includes('masters')) {
      if(possibleRelatedServices?.length) {
        navigate(`/related-services/${companyId}`);
      } else {
        navigate(`/our-team/${companyId}`);
      }
      return;
    }

    if(location.pathname.includes('related-services')) {
      navigate(`/our-team/${companyId}`);
      return;
    }

    if(location.pathname.includes('date')) {
      navigate(`/order/${companyId}`);
      return;
    }
  }

    return (
      <COffcanvas className="custom-offcanvas choosen-services" placement="bottom" visible={!!service} backdrop={false} scroll={true}>
          <COffcanvasHeader className='py-0'>
            <COffcanvasTitle>Ваше замовлення</COffcanvasTitle>
          </COffcanvasHeader>
          <COffcanvasBody className="d-flex">
            <CContainer className="ps-0 flex-grow-1">
              <h4>{service?.name}{relatedServices?.length ? `, ${relatedServices.map(el => el?.name).join(', ')}` : ''}</h4>
              <CContainer className="d-flex ps-0">
                <p className="me-5 d-flex align-items-center flex-nowrap mb-0"><TimeIcon className="me-2"/>
                  {service?.duration + (relatedServices?.length ? relatedServices?.map(el => el?.duration)?.reduce((acc, curr) => acc+curr) : 0)} хв.
                </p>
                <p className="d-flex align-items-center flex-nowrap mb-0"><CashIcon className="me-2"/>
                  {service?.price_amount + (relatedServices?.length ? relatedServices?.map(el => el?.price_amount)?.reduce((acc, curr) => acc+curr) : 0)} грн.
                </p>
              </CContainer>
            </CContainer>
            <CContainer className="d-flex justify-content-end align-items-center pe-0 flex-shrink-1 w-auto">
              <CButton color="dark" size="lg" onClick={handleClick} className="black-bg black-border white-color">
                  Далі
              </CButton>
            </CContainer>
          </COffcanvasBody>
      </COffcanvas>
    );
};

export default ServicesPopup;