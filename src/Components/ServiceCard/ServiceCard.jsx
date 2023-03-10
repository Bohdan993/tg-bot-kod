import {CContainer,CRow,CCol,CCard,CCardBody,CCardTitle} from '@coreui/react';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { ReactComponent as PlusIcon } from '../../Images/plus.svg'
import { ReactComponent as CheckIcon } from '../../Images/check.svg'
import './ServiceCard.css';

const ServiceCard = ({service, user = {}, ind = 0, handleClick = () => {}, active = false, className = ""}) => {
    return (
        <CContainer 
            className={`master-service-card ${active ? "active": ""} ${className}`}
            onClick={() => handleClick(ind, service, user)}
        >
            <CRow>
                <CCol>
                    <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                        <CCardBody className="d-flex flex-row justify-content-between align-items-center py-2 flex-nowrap">
                            <CContainer>
                                <CCardTitle>{service?.name}</CCardTitle>
                                <CContainer className="ps-0">
                                    <CContainer className="d-flex ps-0">
                                        <p className="me-5 d-flex align-items-center flex-nowrap mb-0"><TimeIcon className="me-2"/>{service?.duration} хв.</p>
                                        <p className="d-flex align-items-center flex-nowrap mb-0"><CashIcon className="me-2"/>{service?.price_formatted || service?.formatted_price}</p>
                                    </CContainer>
                                </CContainer>
                            </CContainer>
                            <CContainer className="w-auto">
                                <div className="icon-wrapper small">
                                    {!active ? <PlusIcon/> : <CheckIcon fill="green"/>}
                                </div>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default ServiceCard;