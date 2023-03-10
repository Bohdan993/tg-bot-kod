import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import {CContainer,CRow,CCol,CCard,CCardBody,CCardTitle} from '@coreui/react';
import './ServiceCard.css';

const ServiceCard = ({service, user, ind, handleClick, active = false}) => {
    return (
        <CContainer 
            className={`master-service-card ${active ? "active": ""}`}
            onClick={() => handleClick(ind, service, user)}
        >
            <CRow>
                <CCol>
                    <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                        <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center py-2">
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

                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default ServiceCard;