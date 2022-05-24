import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
import { CImage } from '@coreui/react'

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Home',
    to: '/dashboard',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/home.png'} width={23} />,
  },
  {
    _component: 'CNavTitle',
    anchor: '두피 분석',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: '두피 상태 분석',
    to: '/head_skin/analysis',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/analyzing.png'} width={23} />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: '두피 분석 기록',
    to: '/head_skin/search',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/result.png'} width={23} />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: '두피닥 사용법',
    to: '/howto',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/howto.png'} width={23} />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: '탈모 이야기',
    to: '/talmo',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/story.png'} width={23} />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: '현미경 구매링크',
    to: '/scope',
    icon: <CImage className={'mx-3'} src={'/tab_icon_white/scope.png'} width={23} />,
  },
]

export default _nav
