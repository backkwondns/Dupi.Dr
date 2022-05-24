import React, { Component } from 'react'
import { CSpinner } from '@coreui/react'

class Scope extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.open(
      'https://www.coupang.com/vp/products/6022160428?itemId=10955102709&vendorItemId=78234822344&q=60%EB%B0%B0+%ED%98%84%EB%AF%B8%EA%B2%BD&itemsCount=36&searchId=b1bf81311dcb4332bee3bec746321219&rank=13&isAddedCart=',
    )
    window.location.href = 'http://XXX.XXX.XX.X:30000/dashboard'
  }

  render() {
    return (
      <div>
        <h2>쇼핑몰로 이동</h2>
        <CSpinner color="primary" />
      </div>
    )
  }
}

export default React.memo(Scope)
