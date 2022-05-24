import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
  CSidebarBrand,
  CImage,
} from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const [egg, setegg] = useState(false)
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage src={egg === false ? '/logo_1.png' : '/logo_2.png'} width={50} height={50} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CImage rounded src="/BACK" onClick={() => setegg(!egg)} height={7} />
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
