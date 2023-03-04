import React, {useState} from 'react';
import './ChooseMaster.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {CContainer, CAccordion} from '@coreui/react';
import { MasterCard } from '../../Components/MasterCard';

const vars = { 
    "--cui-accordion-active-bg": "#000000",
    "--cui-accordion-btn-focus-border-color": "rgba(0,0,0,0.6)",
    "--cui-accordion-btn-focus-box-shadow": "rgba(0,0,0,0.6)",
    "--cui-accordion-active-color": '#ffffff',
    "--cui-accordion-btn-active-icon": 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23ffffff%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e")'
}

const ChooseMaster = () => {
    const { cityId } = useParams();
    const company = useSelector(state => state.app.info)?.branches?.filter(el => String(el.id) === String(cityId))[0];
    const users = company?.users;
    console.log(company);
    return (
        <CContainer className="choose-master-page main-content">
            <CAccordion style={vars}>
                {users?.length && users.map((user, index) => {
                    const products = user?.products.filter(product => product?.name.toLowerCase().includes('стрижка'))
                    return (
                        <MasterCard key={user?.id} user={user} products={products} itemKey={index}/>
                    )
                })}
            </CAccordion>
        </CContainer>
    );
};

export default ChooseMaster;