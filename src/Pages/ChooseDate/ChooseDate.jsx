import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useParams, useSearchParams } from 'react-router-dom';
import { transformDate } from '../../Utils/transformDate';
import {CContainer, CRow, CCol, CButton} from '@coreui/react';
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { getFreeDates } from '../../API';
import { Loader } from "../../Components/Loader";
import { ServicesPopup } from '../../Components/ServicesPopup';
import './ChooseDate.css';


const PERIOD = 30;


const ChooseDate = () => {
    const [value, onChange] = useState(new Date());
    const [searchParams, _] = useSearchParams();
    const {companyId} = useParams();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');
    const relatedServicesIds = searchParams.get('relatedId');
    const startDate = searchParams.get('startDate');
    const [loading, setLoading] = useState(false);
    const [availableDays, setAvailableDays] = useState(null);
    const [availableSpots, setAvailableSpots] = useState(null);
    const [activeSpot, setActiveSpot] = useState(null);

    let start = startDate === 'null' ? transformDate(new Date()) : transformDate(startDate);
    let end = new Date(start);
    end.setDate(end.getDate() + PERIOD);
    end = transformDate(end);
   

    const tileDisabledHandle = ({activeStartDate, date, view }) => {
        if(availableDays) {
            return !availableDays.find(day => day?.date === transformDate(date));
        }
    }

    const handleClick = (spot) => {
        setActiveSpot(spot?.start + '-' +spot?.end);
    }

    useEffect(()=>{
        const fetch = async () => {
            setLoading(true);
            const result = await getFreeDates({
                masterId,
                start,
                end,
                serviceId,
                relatedIds: relatedServicesIds?.split('_'),
                companyId
            });
            setAvailableDays(result?.days);
            onChange(new Date(result?.days[0]?.date));
            const spotValue = result?.days[0]?.spots?.[0]?.start + '-' + result?.days[0]?.spots?.[0]?.end;
            setActiveSpot(spotValue);
            setLoading(false);
        }
        fetch();
    }, []);

    useEffect(()=>{
        if(availableDays) {
            const found = availableDays.find(day => day?.date === transformDate(value));
            const spots = found?.spots;
            setAvailableSpots(spots);
            const spotValue = (spots?.[0]?.start + '-' + spots?.[0]?.end);
            setActiveSpot(prev => {
                const [start, end] = prev.split('-');
                const foundSpot = spots.find(spot => spot?.start === start && spot?.end === end);
                if(foundSpot) {
                    return prev;
                }
                return spotValue;
            });
        }
    }, [value]);

    if(loading) {
        return <Loader w={75} h={75} className="loader" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    }

    return (
        <>
            <Header/>
            <CContainer className="choose-master-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">???????????????? ???????? ?? ??????</h2>
                    </CCol>
                </CRow>
                <CContainer className='d-flex justify-content-center align-items-center mb-5'>
                    <Calendar 
                        onChange={onChange} 
                        value={value}
                        tileDisabled={tileDisabledHandle}
                        maxDetail="month"
                        minDetail="month"
                        minDate={new Date(start)}
                        maxDate={new Date(end)}
                    />
                </CContainer>
                <CContainer>
                    <CRow>     
                        {availableSpots?.length && (
                            availableSpots?.map(spot => {
                                const spotValue = spot?.start + '-' + spot?.end;
                                const active = activeSpot === spotValue;
                                return (
                                    <CCol xs={6} sm={4} md={3} lg={2} key={spotValue}>
                                        <CButton color="dark" className="w-100 mb-2" variant="outline" onClick={() => handleClick(spot)} active={active}>
                                            {spot?.start} - {spot?.end}
                                        </CButton>
                                    </CCol>
                                )
                            })
                        )}
                    </CRow>
                </CContainer>
                <ServicesPopup/>
            </CContainer>
            <Footer/>
        </>
    );
};

export default ChooseDate;