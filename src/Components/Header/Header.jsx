import React from 'react';
import { useParams } from 'react-router-dom';
import {CContainer,CRow,CCol,CCarousel,CCarouselItem,CImage} from '@coreui/react';
import './Header.css';
import { images } from '../../Constants/images';

const Header = () => {
    // const companyId = useSelector(state => state.app.activeBranchId);
    const { companyId } = useParams();
    const currImages = images[companyId];

    return (
        <CContainer className="header border-0 mb-5">
            <CRow xs={{gutterX: 0}} className='w-100'>
                <CCol>
                    <CCarousel indicators touch>
                        {currImages?.length && currImages.map(image => {
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