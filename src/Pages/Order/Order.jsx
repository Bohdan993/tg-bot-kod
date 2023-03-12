import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {CContainer,CRow,CCol,CCard,CCardBody,CCardTitle,CForm,CFormInput,CButton} from '@coreui/react';
import { Loader } from '../../Components/Loader';
import { ReactComponent as CashIcon } from '../../Images/cash.svg'
import { ReactComponent as TimeIcon } from '../../Images/time.svg'
import { tg } from '../../App';
import { postOrder, postWebAppResult, postTgResult } from '../../API';
import './Order.css';




function transformDate(date) {
    const [_, month, day] = date.split('-');
    return `${day}.${month}`;
}

function transformTime(time) {
    const [start, _] = time.split('-');
    return start;
}

function addTime(first,second) {
    const numOfMinutes = first.split(":").reduce((acc, curr, ind) => {
        if(ind === 0) {
            acc += curr * 60;
            return acc;
        }

        return acc += curr%100;
    }, 0);

    const hours = Math.floor((numOfMinutes + +second)/60)%24;
    const minutes = (numOfMinutes + +second)%60;

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
}

const schema = yup.object({
    phone: yup.string().matches(/^\+?3?8?(0[5-9][0-9]\d{7})$/, "Введено не коректний номер телефону")
    .required("Це поле обов'язкове для заповнення"),
  }).required();


const vars = { 
    "--cui-input-focus-border-color": "rgba(0,0,0,0.6)",
    "color": "#000000"
}


const Order = () => {
    const service = useSelector(state => state.service.activeService);
    const relatedServices = useSelector(state => state.service.activeRelatedServices);
    const selectedDate = useSelector(state => state.date.selectedDate);
    const selectedTime = useSelector(state => state.date.selectedTime);
    const companyId = useSelector(state => state.company.activeCompany?.id);
    const companyPhone = useSelector(state => state.app.info?.company?.profile?.phone?.[0]);
    const masterId = useSelector(state => state.master.activeMaster?.id);
    const relatedIds = relatedServices?.map(service => service?.id);
    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm(
        {   
            mode: "onBlur",
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = async data => {
        // const orderData = await postOrder({
        //     phone: data?.phone,
        //     reservedOn: selectedDate + "T" + selectedTime.split("-")?.[0] + ":00.000",
        //     masterId,
        //     companyId,
        //     serviceId: service?.id,
        //     relatedIds: relatedIds ? relatedIds : [],
        //     name: tg?.initDataUnsafe?.user?.first_name,
        //     lastName: tg?.initDataUnsafe?.user?.last_name || "Прізвище",
        //     comment: `Нове замовлення від користувача ${tg?.initDataUnsafe?.user?.username ? '@' + tg?.initDataUnsafe?.user?.username : ''}`
        // });
        // console.log(orderData);
        // const message = orderData?.data?.thank_you_page?.message + `Наш номер телефону: ${companyPhone}.\n`;
        const webAppData =  await postWebAppResult({
            phone: data?.phone,
            reservedOn: selectedDate,
            chatId: tg?.initDataUnsafe?.user?.id
        });
        console.log(webAppData);
        const tgData = await postTgResult({
            query_id: tg?.initDataUnsafe?.query_id,
            user_id: tg?.initDataUnsafe?.user?.id,
            message: 'test'
        });
        console.log(tgData);
    }

    let accumulatedDuration = service?.duration;
    let accumulatedPrice = service?.base_price/100 || service?.price/100;


    return (
        <>
            <CContainer className="order-page main-content page mb-5">
                <CRow className="mb-4">
                    <CCol>
                        <h2 className="text-center tg-text">Заповніть інформацію</h2>
                    </CCol>
                </CRow>
                <CContainer className="p-0 mb-4">
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                                <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center py-2">
                                    <CContainer>
                                        <CCardTitle>{service?.name}</CCardTitle>
                                        <CContainer className="ps-0">
                                            <CContainer className="d-flex ps-0">
                                                <p className="me-3 d-flex align-items-center flex-nowrap mb-0"><TimeIcon className="me-2"/>{transformDate(selectedDate)} о {transformTime(selectedTime)} ({service?.duration}хв.) </p>
                                                <p className="d-flex align-items-center flex-nowrap mb-0"><CashIcon className="me-2"/>{service?.price_formatted || service?.formatted_price}</p>
                                            </CContainer>
                                        </CContainer>
                                    </CContainer>
                                    <CContainer className="w-auto">
                                    </CContainer>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        {relatedServices?.length && relatedServices?.map((serv, ind, services) => {
                            accumulatedDuration = (services?.[ind - 1] ? (accumulatedDuration + services?.[ind - 1]?.duration) : accumulatedDuration);
                            accumulatedPrice += (services?.[ind]?.base_price)/100 || (services?.[ind]?.price)/100;
                            return (
                                <CCol xs={12} key={serv?.id}>
                                    <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                                        <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center py-2">
                                            <CContainer>
                                                <CCardTitle>{serv?.name}</CCardTitle>
                                                <CContainer className="ps-0">
                                                    <CContainer className="d-flex ps-0">
                                                        <p className="me-3 d-flex align-items-center flex-nowrap mb-0"><TimeIcon className="me-2"/>{transformDate(selectedDate)} о {addTime(transformTime(selectedTime), accumulatedDuration)} ({serv?.duration}хв.) </p>
                                                        <p className="d-flex align-items-center flex-nowrap mb-0"><CashIcon className="me-2"/>{serv?.price_formatted || serv?.formatted_price}</p>
                                                    </CContainer>
                                                </CContainer>
                                            </CContainer>
                                            <CContainer className="w-auto">
                                            </CContainer>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            )
                        })}
                    </CRow>
                    <CRow>
                        <CCol xs={12}>
                            <p className="text-center fs-5 d-flex justify-content-center align-items-center tg-text">Усього <CashIcon className="mx-2"/>{accumulatedPrice} грн.</p>
                        </CCol>
                    </CRow>
                </CContainer>

                <CForm onSubmit={handleSubmit(onSubmit)}> 
                    <CCol xs="auto" className="mb-3">
                        <CFormInput
                            style={vars}
                            id="phone"
                            label="Телефон *"
                            placeholder="Телефон"
                            name="phone"
                            size="lg"
                            type="tel"
                            {...register("phone", {
                                onChange(e){
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                }
                            })}
                        />
                        <p className="text-danger">{errors?.phone?.message}</p>
                    </CCol>
                    <CCol xs="auto" className="d-flex justify-content-center">
                        <CButton type="submit" color="dark" size="lg" style={{maxWidth: 166}}className="w-100 mb-3 d-flex justify-content-center align-items-center tg-border-reverce tg-text-reverce tg-background-reverce position-relative" disabled={isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? <Loader w={20} h={20} style={{stroke: '#000000'}} className="loader" /> :  "Оформити запис"}
                        </CButton>
                    </CCol>
                </CForm>
            </CContainer>
        </>
    );
};

export default Order;