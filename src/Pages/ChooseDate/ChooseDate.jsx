import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {CContainer, CRow, CCol} from '@coreui/react';
import { Header } from "../../Components/Header";
import './ChooseDate.css';

const ChooseDate = () => {
    const [value, onChange] = useState(new Date());
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    const tileDisabledHandle = ({activeStartDate, date, view }) => {
        // const newDate = new Date();
        // newDate.setDate(newDate.getDate() - 1);
        // if(date.getTime() < newDate.getTime()) {
        //     return true;
        // }
    }
    return (
        <>
            <Header/>
            <CContainer className="choose-master-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">Виберіть дату і час</h2>
                    </CCol>
                </CRow>
                <CContainer className='d-flex justify-content-center align-items-center'>
                    <Calendar 
                        onChange={onChange} 
                        value={value}
                        tileDisabled={tileDisabledHandle}
                        maxDetail="month"
                        minDetail="month"
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </CContainer>
            </CContainer>
        </>
    );
};

export default ChooseDate;