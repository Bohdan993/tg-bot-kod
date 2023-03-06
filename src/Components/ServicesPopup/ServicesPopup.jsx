import {COffcanvas,COffcanvasHeader,COffcanvasBody,COffcanvasTitle,CContainer,CButton} from '@coreui/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { findRelatedServices } from '../../Utils/findRelatedServices';
import './ServicesPopup.css';


const ServicesPopup = () => {
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { companyId } = useParams();
  const masterId = searchParams.get('masterId');
  const serviceId = searchParams.get('serviceId');
  const relatedServicesIds = searchParams.get('relatedId');
  const currCompanyBranchServices = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.attached_products);
  const service = currCompanyBranchServices?.find(service => Number(service?.id) === Number(serviceId));
  const activeRelatedServices = useSelector(state => state.app.activeRelatedServices);
  const relatedServices = relatedServicesIds?.split('_')?.map(id => currCompanyBranchServices?.find(service => Number(service?.id) === Number(id)));
  
  const services = useSelector(state => state.app.info?.products);
  const branches = useSelector(state => state.app.info?.branches);
  const possibleRelatedServices = findRelatedServices(Number(serviceId), services, branches?.find(branch => Number(branch.id) === Number(companyId)));

  const handleClick = (e) => {
    if(location.pathname.includes('masters')) {
      if(possibleRelatedServices?.length) {
        navigate(`/related-services/${companyId}?masterId=${masterId}&serviceId=${serviceId}${activeRelatedServices ? '&relatedId=' + activeRelatedServices : ''}`);
      } else {
        navigate(`/our-team/${companyId}?masterId=${masterId}&serviceId=${serviceId}`);
      }
      return;
    }

    if(location.pathname.includes('related-services')) {
      navigate(`/our-team/${companyId}?masterId=${masterId}&serviceId=${serviceId}${relatedServicesIds ? '&relatedId=' + relatedServicesIds : ''}`);
      return;
    }

  }

    return (
      <COffcanvas className="custom-offcanvas choosen-services" placement="bottom" visible={!!service} backdrop={false} scroll={true}>
          <COffcanvasHeader>
            <COffcanvasTitle>Ваше замовлення</COffcanvasTitle>
          </COffcanvasHeader>
          <COffcanvasBody className="d-flex">
            <CContainer className="ps-0 flex-grow-1">
              <h4>{service?.name}{relatedServices?.length ? `, ${relatedServices.map(el => el?.name).join(', ')}` : ''}</h4>
              <CContainer className="d-flex ps-0">
                <p className="me-5 d-flex align-items-center flex-nowrap"><TimeIcon className="me-2"/>
                  {service?.duration + (relatedServices?.length ? relatedServices?.map(el => el?.duration)?.reduce((acc, curr) => acc+curr) : 0)} хв.
                </p>
                <p className="d-flex align-items-center flex-nowrap"><CashIcon className="me-2"/>
                  {service?.price_amount + (relatedServices?.length ? relatedServices?.map(el => el?.price_amount)?.reduce((acc, curr) => acc+curr) : 0)} грн.
                </p>
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