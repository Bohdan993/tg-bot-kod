import {useState} from 'react';
import {CContainer,CRow,CCol,CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceCard } from '../ServiceCard';
import { MasterCard } from '../MasterCard';
import { setActiveMaster } from '../../Slices/master';
import { setActiveRelatedServices, setActiveService } from '../../Slices/service';
import './MasterWithServiceCard.css';



const MasterWithServiceCard = ({user, services, itemKey, handleClick: clickHandler}) => {
    const dispatch = useDispatch();
    const [activeService, updateActiveService] = useState(null);
    const masterId = useSelector(state => state.master.activeMaster?.id);
    const serviceId = useSelector(state => state.service.activeService?.id);

    const handleClick = (_, service, user) => {
        clickHandler(user?.id);
        updateActiveService(service?.id);
        dispatch(setActiveMaster(user));
        dispatch(setActiveService(service));
        dispatch(setActiveRelatedServices(null));
    }

    const handleAccordionClick = (e) => {
        updateActiveService(null);
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
                    (String(masterId) === String(user?.id) && String(serviceId) === String(service?.id))) ? 
                    true : 
                    false;
                return (
                    <ServiceCard
                        key={service?.id}
                        service={service}
                        active={active}
                        ind={ind}
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