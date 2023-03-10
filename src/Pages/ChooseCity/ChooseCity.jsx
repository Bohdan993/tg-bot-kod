import {CContainer,CRow,CCol,CCard,CCardImage,CCardBody,CCardTitle,CCardText} from '@coreui/react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveCompany } from '../../Slices/company';
import './ChooseCity.css';

const ChooseCity = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companyId = useSelector(state => state.company.activeCompany?.id);
    const masterId = useSelector(state => state.master.activeMaster?.id);
    const serviceId = useSelector(state => state.service.activeService?.id);
    const companyBranches = useSelector(state => state.app.info?.branches);

    const handleClick = (company) => {
        if(String(companyId) === String(company?.id) && masterId && serviceId) {
            navigate(`/masters/${companyId}`);
        } else {
            dispatch({type: 'store/reset'});
            dispatch(setActiveCompany(company));
            navigate(`/masters/${company?.id}`);
        }

    }

    return (
        <CContainer className="choose-city-page main-content page">
            <CRow className="mt-5 mb-4">
                <CCol className='text-center'>
                    <h1 className="tg-text">
                        Оберіть місто
                    </h1>
                </CCol>
            </CRow>
            <CRow className="mt-5">
                <CCol>
                    <CRow>
                        <CCol>
                            <p className="fw-semibold tg-text">Локації</p>
                        </CCol>
                    </CRow>
                    {companyBranches?.length && companyBranches.map(company => {
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
                                            {/* <Link className="btn btn-dark" to={'masters/' + company?.id} onClick={(e) => handleClick(company?.id, e)}>Відкрити</Link> */}
                                            <CContainer className="btn btn-dark d-inline black-bg black-border white-color" onClick={(e) => handleClick(company, e)}>Відкрити</CContainer>
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