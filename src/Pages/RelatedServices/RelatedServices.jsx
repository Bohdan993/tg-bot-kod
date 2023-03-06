import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CContainer,CRow, CCol} from '@coreui/react';
import { findRelatedServices } from '../../Utils/findRelatedServices';
import { Header } from "../../Components/Header";
import { useParams, useSearchParams } from 'react-router-dom';
import { ServiceCard } from '../../Components/ServiceCard';
import { ServicesPopup } from '../../Components/ServicesPopup';
import { setActiveRelatedServices } from '../../Slices/app';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { useFirstRender } from '../../Utils/CustomHooks/useFirstRender';
import './RelatedServices.css';


const RelatedServices = () => {
    const dispatch = useDispatch();
    const isFirstRender = useFirstRender();
    const {companyId} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');
    const relatedId = searchParams.get('relatedId');
    const currCompanyBranchServices = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.attached_products);
    const service = currCompanyBranchServices?.find(service => Number(service?.id) === Number(serviceId));
    const services = useSelector(state => state.app.info?.products);
    const branch = useSelector(state => state.app.info?.branches?.find(branch => Number(branch.id) === Number(companyId)));
    const master  = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.users?.find(user => Number(user?.id) === Number(masterId)));
    const relatedServices = findRelatedServices(Number(serviceId), services, branch).filter(Boolean);
    const [activeServices, setActiveServices] = useState(relatedServices.map(() => false));

    const handleClick = (index) => {
        setActiveServices(prev => {
            const newArr = [...prev];
            newArr[index] = !newArr[index];
            return newArr;
        });
    }

    useEffect(()=>{

            if(isFirstRender) {
                return;
            }

            const activeRelatedServicesIds = relatedServices.filter((_, ind) => {
                return activeServices[ind];
            }).map(service => service?.id);
    
            const activeRelatedServicesIdsString = activeRelatedServicesIds.join("_");
            setSearchParams(`masterId=${masterId}&serviceId=${serviceId}${activeRelatedServicesIds?.length ? '&relatedId=' + activeRelatedServicesIdsString : ''}`);
            dispatch(setActiveRelatedServices(activeRelatedServicesIdsString || null));

    }, [activeServices]);

    useEffect(()=>{
        if(relatedId) {
            setActiveServices(prev => {
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

    return (
        <>
            <Header/>
            <CContainer className="related-services-page main-content page mb-5">
                <CContainer className="p-0">
                    <CRow className="mb-4" key={service?.id}>
                        <CCol>
                            <h2 className="text-center tg-text">{service?.name}</h2>
                            <CContainer className="d-flex ps-0 align-items-center justify-content-center">
                                <p className="me-5 d-flex align-items-center flex-nowrap"><TimeIcon className="me-2"/>
                                    {service?.duration} хв.
                                </p>
                                <p className="d-flex align-items-center flex-nowrap"><CashIcon className="me-2"/>
                                    {service?.price_amount} грн.
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
                                user={master}
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