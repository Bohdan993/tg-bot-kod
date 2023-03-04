import React from 'react';
import './MasterCard.css';
import {CContainer,CRow,CCol,CCard,CCardImage,CCardBody,CCardTitle,CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';


const MasterCard = ({user, products, itemKey}) => {
    return (
        <CAccordionItem itemKey={itemKey}>
            <CAccordionHeader>
                <CContainer>
                    <CRow>
                        <CCol>
                            <CCard className="flex-column align-items-center justify-content-between flex-sm-row master-card">
                                <CCardImage className="card-user-image" src={user?.avatar} />
                                <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                    <CCardTitle className="mb-0">{user?.name} ({products?.length})</CCardTitle>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
            {products?.length && products.map(product => {
                return (
                    <CContainer key={product?.id}>
                        <CRow>
                            <CCol>
                                <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                                    <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                        <CCardTitle className="mb-0">{product?.name}</CCardTitle>
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