import React, {useState} from 'react';
import {CContainer,CRow,CCol,CCard,CCardImage,CCardBody,CCardTitle,CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';
import { setActiveMaster, setActiveService } from '../../Slices/app';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import './MasterCard.css';

const MasterCard = ({user, services, itemKey, handleClick: clickHandler, currMasterId}) => {
    const [activeServices, setActiveServices] = useState(services.map(() => false));
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const handleClick = (index, service, user) => {
        setSearchParams(`masterId=${user?.id}&serviceId=${service?.id}`);
        clickHandler(user?.id);
       
        setActiveServices(prev => {
            const newArr = prev.map(() => false);
            newArr[index] = true;
            return newArr;
        });
        
        dispatch(setActiveMaster(user));

        dispatch(setActiveService(service));
        
    }

    const handleAccordionClick = (e) => {
        setActiveServices(prev=>prev.map(() => false));
    }

    return (
        <CAccordionItem itemKey={itemKey}>
            <CAccordionHeader onClick={handleAccordionClick}>
                <CContainer>
                    <CRow>
                        <CCol>
                            <CCard className="flex-column align-items-center justify-content-between flex-sm-row master-card">
                                <CCardImage className="card-user-image" src={user?.avatar} />
                                <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                    <CCardTitle className="mb-0">{user?.name} ({services?.length})</CCardTitle>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
            {services?.length && services.map((service, ind) => {
                return (
                    <CContainer 
                        key={service?.id} 
                        className={(activeServices[ind] || (searchParams.get('masterId') === String(user?.id) && searchParams.get('serviceId') === String(service?.id))) ? "master-product-card active" : "master-product-card"} 
                        onClick={(e) => handleClick(ind, service, user, e)}
                    >
                        <CRow>
                            <CCol>
                                <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                                    <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                        <CContainer>
                                            <CCardTitle>{service?.name}</CCardTitle>
                                            <CContainer className="ps-0">
                                                <CContainer className="d-flex ps-0">
                                                    <p className="me-5 d-flex align-items-center flex-nowrap"><TimeIcon className="me-2"/>{service?.duration} хв.</p>
                                                    <p className="d-flex align-items-center flex-nowrap"><CashIcon className="me-2"/>{service?.price_formatted}</p>
                                                </CContainer>
                                            </CContainer>
                                        </CContainer>
                                        <CContainer className="w-auto"></CContainer>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                )
            })}
            </CAccordionBody>
      </CAccordionItem>
    );
};

export default MasterCard;