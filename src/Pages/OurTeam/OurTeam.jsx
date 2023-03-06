import {useEffect, useState } from "react";
import { getMasterFreeDate } from "../../API";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {CContainer, CRow, CCol} from '@coreui/react';
import { Header } from "../../Components/Header";
import {MasterPopup} from "../../Components/MasterPopup";
import { MasterCard } from "../../Components/MasterCard";
import './OurTeam.css';


const OurTeam = () => {
    const [searchParams, _] = useSearchParams();
    const {companyId} = useParams();
    const masterId = searchParams.get('masterId');
    const serviceId = searchParams.get('serviceId');
    const relatedServicesIds = searchParams.get('relatedId');
    const [time,setTime] = useState(null);
    const [date,setDate] = useState(null);
    const company = useSelector(state => state.app.info?.branches?.find(el => String(el.id) === String(companyId)));
    const master  = useSelector(state => state.app.info.branches?.find(branch => Number(branch?.id) === Number(companyId))?.users?.find(user => Number(user?.id) === Number(masterId)));
    console.log(company);
    useEffect(()=>{
        const fetch = async () => {
            const result = await getMasterFreeDate({
                locationId: companyId,
                serviceId,
                relatedIds: relatedServicesIds?.split('_')
            });
            const data = result?.[0]?.dates?.[0];
            const time = data?.time?.start;
            const date = new Date(data?.date);
            const transformedDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '.' + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
            setDate(transformedDate);
            setTime(time);
        }

        fetch();
    }, []);

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
                        className="border p-3"
                        user={{
                            name: 'Будь-який доступний співробітник',
                            avatar: ''
                        }}
                        extended={true}
                        date={date}
                        time={time}
                        info={"Автоматично призначений співробітник, згідно з графіком роботи"}
                    />
                    <MasterCard
                        className="border p-3"
                        user={master}
                        extended={true}
                        date={date}
                        time={time}
                    />
                </CContainer>
                <MasterPopup/>
            </CContainer>
        </>
    );
};

export default OurTeam;