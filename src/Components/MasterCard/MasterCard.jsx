import React from 'react';
import {CCard,CCardImage,CCardBody,CCardTitle,CCardText, CContainer, CRow, CCol} from '@coreui/react';
import './MasterCard.css';




const MasterCard = ({user, services = [], className = '', extended = false, date = '', time = '', info = '', active = false, handleClick = () => {}}) => {
    return (
        <CContainer 
            className={`master-card ${active ? "active": ""}`}
            onClick={() => handleClick(user)}
        >
            <CRow>
                <CCol>
                    <CCard className={`flex-column align-items-center justify-content-between flex-sm-row master-card ${className}`}>
                        <CCardImage className="card-user-image" src={user?.avatar} />
                        {
                            extended ? 
                            (
                                <CCardBody className="d-flex flex-column justify-content-between align-items-sm-start align-items-center">
                                    <CCardTitle>{user?.name} {services?.length ? `(${services?.length})` : ''}</CCardTitle>
                                    {
                                    info ? 
                                    ( 
                                        <CCardText>
                                            {info}
                                        </CCardText>
                                    ) : (
                                        <div>
                                            {user?.position} &#9679; {date && time && `Доступний з ${date} в ${time}`}    
                                        </div>
                                    )
                                    }

                                </CCardBody>
                            ) 
                            : 
                            (
                                <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                    <CCardTitle className="mb-0">{user?.name} {services?.length ? `(${services?.length})` : ''}</CCardTitle>
                                </CCardBody>
                            )
                        }

                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default MasterCard;