import React from 'react';
import './ChooseCity.css';
import {CContainer,CRow,CCol,CCard,CCardImage,CCardBody,CCardTitle,CCardText} from '@coreui/react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { setCompanyId } from '../../Slices/app';



const ChooseCity = () => {
    const companyBranches = useSelector(state => state.app.info)?.branches;
    const dispatch = useDispatch();

    // const handleClick = (id, e) => {
    //     dispatch(setCompanyId(id));
    // }

    return (
        <CContainer className="choose-city-page main-content page">
            <CRow className="mt-5 mb-4">
                <CCol className='text-center'>
                    <h1>
                        Оберіть місто
                    </h1>
                </CCol>
            </CRow>
            <CRow className="mt-5">
                <CCol>
                    <CRow>
                        <CCol>
                            <p className="fw-semibold">Локації</p>
                        </CCol>
                    </CRow>
                    {companyBranches?.length && companyBranches.map(company => {
                        console.log(company);
                        return (
                            <CRow className="mb-4" key={company?.id}>
                                <CCol>
                                    <CCard className="flex-column justify-content-between flex-sm-row">
                                        <CContainer className="card-image-wrapper">
                                            <CCardImage className="card-image" orientation="top" src={company?.images?.[0]} />
                                        </CContainer>
                                        <CCardBody>
                                            <CCardTitle>{company?.name}</CCardTitle>
                                            <CCardText>
                                                {company?.address?.address_1}, {company?.address?.city}, {company?.address?.postal_code}, {company?.address?.meta?.google_country_name}
                                            </CCardText>
                                            <Link className="btn btn-dark" to={'masters/' + company?.id}>Відкрити</Link>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        )
                    })}

                </CCol>
            </CRow>
        </CContainer>
    );
};

export default ChooseCity;