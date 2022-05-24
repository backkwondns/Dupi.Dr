import React, { Component } from 'react'
import { CCard, CCardBody, CCol, CContainer, CImage, CRow } from '@coreui/react'

class Howto extends Component {
  constructor(props) {
    super(props)
    this.how_to = []
    for (const i of [1, 2, 3, 4, 5, 6, 7, 8]) {
      this.how_to.push(<CImage align={'center'} fluid src={`/howto/${i}.png`} />)
    }
  }

  render() {
    return (
      <div className="bg-light h-auto d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard>
                <CCardBody className={'p-0'}>{this.how_to}</CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default React.memo(Howto)
