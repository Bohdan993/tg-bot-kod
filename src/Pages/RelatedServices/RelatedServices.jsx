import React from 'react';
import { useSelector } from 'react-redux';
import { findRelatedServices } from '../../Utils/findRelatedServices';
import {CContainer,CRow,CCol,CCard,CCardBody,CCardTitle} from '@coreui/react';
import './RelatedServices.css';
import { Header } from "../../Components/Header";
import { useParams } from 'react-router-dom';




const RelatedServices = () => {
    const {companyId, serviceId} = useParams();
    console.log(companyId, serviceId)
    const services = useSelector(state => state.app.info?.products);
    const branches = useSelector(state => state.app.info?.branches);
    const relatedServices = findRelatedServices(Number(serviceId), services, branches?.find(branch => Number(branch.id) === Number(companyId)));
    console.log(relatedServices);
    return (
        <>
            <Header/>
            {relatedServices?.length && relatedServices.map((product, ind) => {
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
        </>
    );
};

export default RelatedServices;