import {CCard,CCardImage,CCardBody,CCardTitle,CCardText, CContainer, CRow, CCol} from '@coreui/react';
import { ReactComponent as PlusIcon } from '../../Images/plus.svg'
import { ReactComponent as CheckIcon } from '../../Images/check.svg'
import './MasterCard.css';




const MasterCard = ({user, services = [], className = '', extended = false, date = '', time = '', info = '', active = false, handleClick = () => {}}) => {
    return (
        <CContainer 
            className={`master-card ${active ? "active": ""}`}
            onClick={() => handleClick(user)}
        >
            <CRow>
                <CCol className="p-0">
                    <CCard className={`flex-column justify-content-between flex-sm-row master-card ${className}`}>
                        <CCardBody className="p-0 d-flex justify-content-between align-items-center flex-column flex-sm-row">
                            <CContainer className="d-flex justify-content-start align-items-center p-0 flex-column flex-sm-row">
                                <CCardImage className="card-user-image" src={user?.avatar} />
                                {
                                    extended ? 
                                    (
                                        <CContainer className="d-flex flex-column justify-content-between align-items-sm-start align-items-center">
                                            <CCardTitle>{user?.name} {services?.length ? `(${services?.length})` : ''}</CCardTitle>
                                            {
                                                info ? 
                                                ( 
                                                    <CCardText className="text-center text-sm-start">
                                                        {info}
                                                    </CCardText>
                                                ) : (
                                                    <CCardText className="text-center">
                                                        {user?.position} &#9679; {date && time && `Доступний з ${date} в ${time}`}    
                                                    </CCardText>
                                                )
                                            }
                                        </CContainer>
                                    ) 
                                    : 
                                    (
                                        <CContainer className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                            <CCardTitle className="mb-0">{user?.name} {services?.length ? `(${services?.length})` : ''}</CCardTitle>
                                        </CContainer>
                                    )
                                }
                            </CContainer>
                            {extended && (
                                <CContainer className="w-auto">
                                    <div className="icon-wrapper small">
                                        {!active ? <PlusIcon/> : <CheckIcon fill="green"/>}
                                    </div>
                                </CContainer>
                            )}
                        </CCardBody> 
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default MasterCard;