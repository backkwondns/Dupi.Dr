import React from 'react'

const analysis = React.lazy(() => import('./views/head_skin/analysis'))
const history = React.lazy(() => import('./views/head_skin/history'))
const result = React.lazy(() => import('./views/head_skin/result'))
const search = React.lazy(() => import('./views/head_skin/search'))

const talmo = React.lazy(() => import('./views/extra/talmo'))
const scope = React.lazy(() => import('./views/extra/scope'))
const howto = React.lazy(() => import('./views/extra/howto'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/head_skin', name: 'Search', component: search, exact: true },
  { path: '/head_skin/search', name: 'Search', component: search },
  { path: '/head_skin/analysis', name: 'Analysis', component: analysis },
  { path: '/head_skin/result', name: 'Result', component: result },
  { path: '/head_skin/history', name: 'History', component: history },
  { path: '/howto', name: 'Howto', component: howto },
  { path: '/talmo', name: 'Talmo', component: talmo },
  { path: '/scope', name: 'Scope', component: scope },
]

export default routes
