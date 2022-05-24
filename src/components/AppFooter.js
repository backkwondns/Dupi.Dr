import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">빅데이터 교육 Team6</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">김민교 노상희 박기정 권한준</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
