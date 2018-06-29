import App from './App'
import Home from './components/home'
import Register from './components/register'
import ForgetPwd from './components/forgetPwd'

const routeConfig = [
    {
        path: '/',
        component: App
    },
    {
        path: '/home',
        component: Home
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/forgetPwd',
        component:ForgetPwd
    }
]

export default routeConfig;