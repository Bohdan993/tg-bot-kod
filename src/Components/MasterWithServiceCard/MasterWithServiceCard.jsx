import React, {useState} from 'react';
import {CContainer,CRow,CCol,CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';
import { setActiveMaster, setActiveService, setActiveRelatedServices } from '../../Slices/app';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ServiceCard } from '../ServiceCard';
import { MasterCard } from '../MasterCard';
import './MasterWithServiceCard.css';




const MasterWithServiceCard = ({user, services, itemKey, handleClick: clickHandler}) => {
    const [activeService, setActiveService] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');

    const handleClick = (index, service, user) => {
        setSearchParams(`masterId=${user?.id}&serviceId=${service?.id}`);
        clickHandler(user?.id);
       
        setActiveService(service?.id);
        
        dispatch(setActiveMaster(user));

        dispatch(setActiveService(service));
        dispatch(setActiveRelatedServices(null));
        
    }

    const handleAccordionClick = (e) => {
        setActiveService(null);
    }

    return (
        <CAccordionItem itemKey={itemKey}>
            <CAccordionHeader onClick={handleAccordionClick}>
                <CContainer className="py-0">
                    <CRow>
                        <CCol>
                            <MasterCard
                                user={user}
                                services={services}
                            />
                        </CCol>
                    </CRow>
                </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
            {services?.length && services.map((service, ind) => {
                const active = (activeService === service?.id || 
                    (masterId === String(user?.id) && serviceId === String(service?.id))) ? 
                    true : 
                    false;
                return (
                    <ServiceCard
                        key={service?.id}
                        service={service}
                        ind={ind}
                        active={active}
                        user={user}
                        handleClick={handleClick}
                    />
                )
            })}
            </CAccordionBody>
      </CAccordionItem>
    );
};

export default MasterWithServiceCard;