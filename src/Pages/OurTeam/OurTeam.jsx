import {useEffect, useMemo, useState } from "react";
import { getMasterFreeDate } from "../../API";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {CContainer, CRow, CCol} from '@coreui/react';
import { Header } from "../../Components/Header";
import {MasterPopup} from "../../Components/MasterPopup";
import { MasterCard } from "../../Components/MasterCard";
import { user as userImg} from "../../Constants/images";
import { useFirstRender } from "../../Utils/CustomHooks/useFirstRender";
import { Loader } from "../../Components/Loader";
import { Footer } from "../../Components/Footer";
import './OurTeam.css';




const OurTeam = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {companyId} = useParams();
    const isFirstRender = useFirstRender();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');
    const relatedServicesIds = searchParams.get('relatedId');
    const [time,setTime] = useState(null);
    const [date,setDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeMaster, setActiveMaster] = useState(masterId);
    const [popupText, setPopupText] = useState({title: '', text: ''});
    const company = useSelector(state => state.app.info?.branches?.find(el => String(el.id) === String(companyId)));
    const master = useMemo(() => company?.users?.find(user => Number(user?.id) === Number(masterId)), []);


    const handleClick = (master) => {
        setActiveMaster(master?.id);
    }

    useEffect(()=>{
        if(!master) {
            navigate(`/masters/${companyId}`);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            const result = await getMasterFreeDate({
                locationId: companyId,
                serviceId,
                relatedIds: relatedServicesIds?.split('_')
            });
            const data = result?.[0]?.dates?.[0];
            const time = data?.time?.start;
            const date = new Date(data?.date);
            const transformedDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '.' + 
            (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
            setDate(transformedDate);
            setTime(time);
            setSearchParams(`masterId=${activeMaster}&serviceId=${serviceId}${relatedServicesIds?.length ? "&relatedId=" + relatedServicesIds : ""}&startDate=${transformedDate}`);
            setLoading(false);
        }
        fetch();
    }, []);

    useEffect(()=>{
        setPopupText({
            title: activeMaster === 0 ? '' : master?.name,
            text: activeMaster === 0 ? 
            'Ви будете записані до доступного співробітника.'  : 
            (`${company?.address?.address_1}, 
            ${company?.address?.city}, 
            ${company?.address?.postal_code}, 
            ${company?.address?.meta?.google_country_name}`),
        });

        if(isFirstRender) {
            return;
        }

        setSearchParams(`masterId=${activeMaster}&serviceId=${serviceId}${relatedServicesIds?.length ? "&relatedId=" + relatedServicesIds : ""}&startDate=${activeMaster === 0 ? null : date}`);
    }, [activeMaster]);


    if(loading) {
        return <Loader w={75} h={75} className="loader" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    }

    return (
        <>
            <Header/>
            <CContainer className="related-services-page main-content page mb-5">
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