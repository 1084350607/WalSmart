import Login from './pages/Login/index'
import Index from './pages/Index/index'
import Regiser from './pages/Register'
import Detail from './pages/Detail'
import Health from './pages/Health'
import ForUs from './pages/ForUs'
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
  },
  {
    path:'/detail/:id',
    component:Detail
  },{
    path:'/health',
    component:Health
  },
  {
    path:'/ForUs',
    component:ForUs
  }
];

export default routes