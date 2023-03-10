import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CContainer,CRow, CCol} from '@coreui/react';
import { findRelatedServices } from '../../Utils/findRelatedServices';
import { ServiceCard } from '../../Components/ServiceCard';
import { ServicesPopup } from '../../Components/ServicesPopup';
import { setActiveRelatedServices } from '../../Slices/service';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { useFirstRender } from '../../Utils/CustomHooks/useFirstRender';
import './RelatedServices.css';




const RelatedServices = () => {
    const dispatch = useDispatch();
    const isFirstRender = useFirstRender();
    const masterId = useSelector(state => state.master.activeMaster?.id);
    const serviceId = useSelector(state => state.service.activeService?.id);
    const relatedId = useSelector(state => state.service.activeRelatedServices?.map(service => service?.id)?.join('_'));
    const services = useSelector(state => state.app.info?.products);
    const company = useSelector(state => state.company.activeCompany);
    const master  = useSelector(state => state.master.activeMaster);
    const service = useSelector(state => state.service.activeService);

    const relatedServices = findRelatedServices(Number(serviceId), services, company)?.filter(Boolean);
    const [activeServices, setActiveServices] = useState(relatedServices?.map(() => false));

    const handleClick = (index) => {
        setActiveServices(prev => {
            const newArr = [...prev];
            newArr[index] = !newArr[index];
            return newArr;
        });
    }

    useEffect(()=>{
        if(relatedId) {
            setActiveServices(() => {
                const newArr = relatedServices.map(el => {
                    if(relatedId.includes(String(el?.id))) {
                        return true;
                    }
                    return false;
                });

                return newArr;
            });
        }
    }, []);

    useEffect(()=>{
            if(isFirstRender) {
                return;
            }
            const activeRelatedServices = relatedServices.filter((_, ind) => activeServices[ind]);
            dispatch(setActiveRelatedServices(activeRelatedServices || null));
    }, [activeServices]);

    return (
        <>
            <CContainer className="related-services-page main-content page mb-5">
                <CContainer className="p-0">
                    <CRow className="mb-4" key={service?.id}>
                        <CCol>
                            <h2 className="text-center tg-text">{service?.name}</h2>
                            <CContainer className="d-flex ps-0 align-items-center justify-content-center">
                                <p className="me-5 d-flex align-items-center flex-nowrap tg-text"><TimeIcon className="me-2 tg-icon"/>
                                    {service?.duration} хв.
                                </p>
                                <p className="d-flex align-items-center flex-nowrap tg-text"><CashIcon className="me-2 tg-icon"/>
                                    {service?.base_price/100 || service?.price/100} грн.
                                </p>
                            </CContainer>
                            <p className="text-center fs-5 tg-text">
                                Часто записуються разом з:
                            </p>
                        </CCol>
                    </CRow>
                    {relatedServices?.length && relatedServices.map((service, ind) => {
                        const active = (activeServices[ind] || 
                            (masterId === String(master?.id) && serviceId === String(service?.id))) ? 
                            true : 
                            false;
                        return (
                            <ServiceCard
                                key={service?.id}
                                service={service}
                                ind={ind}
                                active={active}
                                handleClick={handleClick}
                            />
                        )
                    })}
                </CContainer>
                <ServicesPopup/>
            </CContainer>
        </>
    );
};

export default RelatedServices;