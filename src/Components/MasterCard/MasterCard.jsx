import React, {useState} from 'react';
import './MasterCard.css';
import {CContainer,CRow,CCol,CCard,CCardImage,CCardBody,CCardTitle,CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';
import { setActiveMaster, setActiveService } from '../../Slices/app';
import { useDispatch } from 'react-redux';



const MasterCard = ({user, products, itemKey, handleClick: clickHandler, currMasterId, prevMasterId}) => {
    const [activeProducts, setActivePoructs] = useState(products.map(el => false));
    const dispatch = useDispatch();

    const handleClick = (index, product, e) => {
        setActivePoructs(prev => {
            const newArr = prev.map(el => false);
            newArr[index] = true;
            return newArr;
        });

        dispatch(setActiveService(product));
    }

    const handleAccordionItemClick = (user) => {
        clickHandler(user?.id);
        if(currMasterId !== prevMasterId) {
            dispatch(setActiveMaster(user));
            setActivePoructs(prev=>prev.map(el => false));
        }
    }

    return (
        <CAccordionItem itemKey={itemKey}>
            <CAccordionHeader onClick={() => handleAccordionItemClick(user)}>
                <CContainer>
                    <CRow>
                        <CCol>
                            <CCard className="flex-column align-items-center justify-content-between flex-sm-row master-card">
                                <CCardImage className="card-user-image" src={user?.avatar} />
                                <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                    <CCardTitle className="mb-0">{user?.name} ({products?.length})</CCardTitle>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
            {products?.length && products.map((product, ind) => {
                return (
                    <CContainer key={product?.id} className={activeProducts[ind] ? "master-product-card active" : "master-product-card"} onClick={(e) => handleClick(ind, product, e)}>
                        <CRow>
                            <CCol>
                                <CCard className="flex-column justify-content-between flex-sm-row mb-3">
                                    <CCardBody className="d-flex flex-column justify-content-between flex-sm-row align-items-center">
                                        <CCardTitle className="mb-0">{product?.name}</CCardTitle>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                )
            })}
            </CAccordionBody>
      </CAccordionItem>
    );
};

export default MasterCard;