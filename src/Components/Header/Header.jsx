import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {CContainer,CRow,CCol,CCarousel,CCarouselItem,CImage} from '@coreui/react';
import './Header.css';

const Header = () => {
    // const companyId = useSelector(state => state.app.activeBranchId);
    const { companyId } = useParams();
    const company = useSelector(state => state.app.info)?.branches?.filter(el => String(el.id) === String(companyId))?.[0];
    const images = company?.images;

    return (
        <CContainer className="header">
            <CRow xs={{gutterX: 0}} className='w-100'>
                <CCol>
                    <CCarousel indicators touch>
                        {images?.length && images.map(image => {
                            return (
                                <CCarouselItem key={image}>
                                    <CContainer className="carousel-image-wrapper">
                                        <CImage className="carousel-image d-block w-100" src={image} alt="slide 1" />
                                    </CContainer>
                                </CCarouselItem>
                            )
                        })}
                    </CCarousel>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Header;