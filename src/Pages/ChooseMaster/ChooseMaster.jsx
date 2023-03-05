import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from 'react-router-dom';
import {CContainer, CAccordion} from '@coreui/react';
import { MasterCard } from '../../Components/MasterCard';
import { ServicesPopup } from '../../Components/ServicesPopup';
import { Header } from "../../Components/Header";
import './ChooseMaster.css';

const vars = { 
    "--cui-accordion-active-bg": "#000000",
    "--cui-accordion-btn-focus-border-color": "rgba(0,0,0,0.6)",
    "--cui-accordion-btn-focus-box-shadow": "rgba(0,0,0,0.6)",
    "--cui-accordion-active-color": '#ffffff',
    "--cui-accordion-btn-active-icon": 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23ffffff%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e")'
}

const ChooseMaster = () => {
    const [searchParams, _] = useSearchParams();
    const [currMasterId, setCurrMasterId] = useState(null);
    const { companyId } = useParams();
    const company = useSelector(state => state.app.info)?.branches?.filter(el => String(el.id) === String(companyId))[0];
    const users = company?.users;

    const handleClick = (id) => {
        setCurrMasterId(id);
    }
    return (
        <>
            <Header/>
            <CContainer className="choose-master-page main-content page mb-5">
                <CAccordion style={vars} activeItemKey={currMasterId || searchParams.get('masterId')}>
                    {users?.length && users.map(user => {
                        // const products = user?.products.filter(product => product?.name.toLowerCase().includes('стрижка'));
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
                            <MasterCard 
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