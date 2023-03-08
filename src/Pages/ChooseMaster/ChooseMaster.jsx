import React, {useState} from 'react';
import { useSelector } from "react-redux";
import {CContainer, CAccordion, CRow, CCol} from '@coreui/react';
import { MasterWithServiceCard } from '../../Components/MasterWithServiceCard';
import { ServicesPopup } from '../../Components/ServicesPopup';
import './ChooseMaster.css';



const vars = { 
    "--cui-accordion-active-bg": "#000000",
    "--cui-accordion-btn-focus-border-color": "rgba(0,0,0,0.6)",
    "--cui-accordion-btn-focus-box-shadow": "0 0 0 0.25rem rgba(0,0,0,0.25)",
    "--cui-accordion-active-color": '#ffffff',
    "--cui-accordion-btn-active-icon": 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23ffffff%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e")'
}

const ChooseMaster = () => {
    const [currMasterId, setCurrMasterId] = useState(null);
    const masterId = useSelector(state => state.master.activeMaster?.id);
    const company = useSelector(state => state.company.activeCompany);
    const users = company?.users;

    const handleClick = (id) => {
        setCurrMasterId(id);
    }

    return (
        <>
            <CContainer className="choose-master-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">{company?.name}</h2>
                        <p className="text-center fs-5 tg-text">
                            {company?.address?.address_1}, {company?.address?.city}, {company?.address?.postal_code}, {company?.address?.meta?.google_country_name}&nbsp; 
                            <a className="tg-text" href={`https://www.google.com/maps/search/?api=1&query=${company?.address?.position?.lat},${company?.address?.position?.lng}`} target="_blank" rel="noopener noreferrer">Карта</a>
                        </p>
                        <p className="text-center fs-5 tg-text">
                            <a className="tg-text"href={`tel:${company?.profile?.phone_formatted?.international}`} rel="noopener noreferrer">{company?.profile?.phone_formatted?.international}</a>
                        </p>
                    </CCol>
                </CRow>
                <CAccordion style={vars} activeItemKey={currMasterId || String(masterId)}>
                    {users?.length && users.map(user => {
                        const seen = {};
                        const products = user?.products.filter(product => {
                            let key = product?.name.toLowerCase();
                            if(!(key in seen)) {
                                seen[key] = true;
                                return true;
                            }
                            return false;
                        });

                        return (
                            <MasterWithServiceCard 
                                key={user?.id} 
                                user={user} 
                                services={products} 
                                itemKey={String(user?.id)} 
                                handleClick={handleClick}
                                currMasterId={currMasterId}
                            />
                        )
                    })}
                </CAccordion>
                <ServicesPopup/>
            </CContainer>
        </>
    );
};

export default ChooseMaster;