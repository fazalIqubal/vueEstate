

export const routes = [

    { name: 'login', path: '/login', component: () => import('../components/Login/UserLogin'), meta: { baseRoute: true, noAuth: true, display: 'Login' } },

    { name: 'signUp', path: '/signUp', component: () => import('../components/SignUp/UserSignUp'), meta: { baseRoute: true, noAuth: true, display: 'SignUp' } },

    { name: 'Dashboard', path: '/', component: () => import('../components/Dashboard/Dashboard'), meta: { baseRoute: true, header: true, display: 'Dashboard' } },

    { name: 'Clients', path: '/clients', component: () => import('../components/Clients/Clients'), meta: { baseRoute: true, header: true, display: 'Dashboard' } },

    { name: 'ClientForm', path: '/clientForm', component: () => import('../components/Clients/ClientForm'), meta: { baseRoute: true, header: false, display: 'Dashboard' } },

    { name: 'Report', path: '/report', component: () => import('../components/Reports/Report'), meta: { baseRoute: true, header: false, display: 'Dashboard' } },

    { name: 'Mortgage', path: '/mortgage', component: () => import('../components/Mortgage/Mortgage'), meta: { baseRoute: true, header: true, display: 'Dashboard' } },

    { name: 'MortgageForm', path: '/mortgageForm', component: () => import('../components/Mortgage/MortgageForm'), meta: { baseRoute: true, header: false, display: 'Dashboard' } },

    // { name: 'change-password', path: '/change-password/:id', props: true, component: () => import('../components/ChangePassword'), meta: { baseRoute: true, noAuth: true } },
    // { name: 'reset-password', path: '/reset-password/', component: () => import('../components/ResetPassword'), meta: { baseRoute: true, noAuth: true } },

    { name: '404', path: '/404', component: () => import('../components/404'), meta: { baseRoute: true, noAuth: true } },
    // otherwise redirect to 404
    { path: '*', redirect: '/404', meta: { baseRoute: true, noAuth: true } }
]
