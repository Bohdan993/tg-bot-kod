import {useEffect, useState } from "react";
import { getMasterFreeDate } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {CContainer, CRow, CCol} from '@coreui/react';
import {MasterPopup} from "../../Components/MasterPopup";
import { MasterCard } from "../../Components/MasterCard";
import { user as userImg} from "../../Constants/images";
import { useFirstRender } from "../../Utils/CustomHooks/useFirstRender";
import { setSelectedMasterId } from "../../Slices/master";
import { setStartDate } from "../../Slices/date";
import { Loader } from "../../Components/Loader";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import './OurTeam.css';


function transformDate(date){
    return (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '.' + 
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
}

function makePopupText(activeMaster, master, company){
    return {
        title: activeMaster === 0 ? '' : master?.name,
        text: activeMaster === 0 ? 
        'Ви будете записані до доступного співробітника.'  : 
        (`${company?.address?.address_1}, 
        ${company?.address?.city}, 
        ${company?.address?.postal_code}, 
        ${company?.address?.meta?.google_country_name}`),
    }
}


const OurTeam = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);
    const [time,setTime] = useState(null);
    const [date,setDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupText, setPopupText] = useState({title: '', text: ''});
    const isFirstRender = useFirstRender();
    const companyId = useSelector(state => state.company.activeCompany?.id);
    const masterId = useSelector(state => state.master.selectedMasterId);
    const [activeMaster, setActiveMaster] = useState(masterId);
    const serviceId = useSelector(state => state.service.activeService?.id);
    const relatedServicesIds = useSelector(state => state.service.activeRelatedServices?.map(service => service?.id)?.join('_'));

    const company = useSelector(state => state.company.activeCompany);
    const master  = useSelector(state => state.master.activeMaster);

    const handleClick = (master) => {
        setActiveMaster(master?.id);
    }

    useEffect(()=>{
        if(!companyId) {
            navigate('/');
            return;
        }
        setReady(true);
    }, []);

    useEffect(()=>{
        const fetch = async () => {
                setLoading(true);
                const result = await getMasterFreeDate({
                    locationId: companyId,
                    serviceId,
                    relatedIds: relatedServicesIds?.split('_')
                });
                const data = result?.[0]?.dates?.[0];
                if(!data) navigate(`/service-registration/${companyId}`);
                const time = data?.time?.start;
                const date = new Date(data?.date);
                const transformedDate = transformDate(date);
                setDate(transformedDate);
                setTime(time);
                setLoading(false);
        }

        if(ready) fetch();
    }, [ready]);

    useEffect(()=>{
        setPopupText(makePopupText(activeMaster, master, company));
        if(isFirstRender) {
            return;
        }
        dispatch(setSelectedMasterId(activeMaster));
        dispatch(setStartDate(activeMaster === 0 ? null : date));
    }, [activeMaster]);

    useEffect(()=>{
        dispatch(setStartDate(date));
    }, [date, dispatch]);


    if(loading || !ready) {
        return <Loader w={75} h={75} className="preloader" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    }

    return (
        <>
            <Header/>
            <CContainer className="our-team-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">Наша команда</h2>
                        <p className="text-center fs-5 tg-text">
                            {company?.name}
                        </p>
                        <p className="text-center fs-5 tg-text">
                            {company?.address?.address_1}, {company?.address?.city}, {company?.address?.postal_code}, {company?.address?.meta?.google_country_name}&nbsp; 
                        </p>
                    </CCol>
                </CRow>
                <CContainer className="p-0">
                    <MasterCard
                        className="border p-3 mb-3"
                        user={{
                            id: 0,
                            name: 'Будь-який доступний співробітник',
                            avatar: userImg
                        }}
                        extended={true}
                        date={date}
                        time={time}
                        info={"Автоматично призначений співробітник, згідно з графіком роботи"}
                        active={String(activeMaster) === "0"}
                        handleClick={handleClick}
                    />
                    <MasterCard
                        className="border p-3 mb-3"
                        user={master}
                        extended={true}
                        date={date}
                        time={time}
                        handleClick={handleClick}
                        active={String(activeMaster) === String(master?.id)}
                    />
                </CContainer>
                <MasterPopup
                    title={popupText.title}
                    text={popupText.text}
                />
            </CContainer>
            <Footer/>
        </>
    );
};

export default OurTeam;