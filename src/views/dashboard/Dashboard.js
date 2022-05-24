import React from 'react'

import { CCard, CCardBody, CCarousel, CCarouselItem, CImage } from '@coreui/react'

const Home = () => {
  return (
    <>
      <CCard className={'mx'}>
        <CCardBody className={'px-1 py-1'}>
          <CCarousel controls indicators interval={3500}>
            <CCarouselItem>
              <CImage className="d-block w-100" src="/home_1.png" alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src="/home_2.png" alt="slide 2" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src="/home_3.png" alt="slide 3" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src="/home_4.png" alt="slide 4" />
            </CCarouselItem>
          </CCarousel>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Home
