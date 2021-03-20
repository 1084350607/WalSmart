import Login from './pages/Login/index'
import Index from './pages/Index/index'
import Regiser from './pages/Register'
const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/login",
    component: Login
  },
  {
    path:'/register',
    component:Regiser
  }
];

export default routes