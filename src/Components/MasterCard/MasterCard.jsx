import React from 'react';
import {CCard,CCardImage,CCardBody,CCardTitle,CCardText} from '@coreui/react';
import './MasterCard.css';

const MasterCard = ({user, services = [], className, extended = false, date = '', time = '', info = ''}) => {
    return (
        <CCard className={`flex-column align-items-center justify-content-between flex-sm-row master-card mb-3 ${className}`}>
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
                            <CCardText>
                                {user?.position} &#9679; Доступний з {date} в {time}
                            </CCardText>
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
    );
};

export default MasterCard;