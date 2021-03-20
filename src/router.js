import Login from './pages/Login/index'
import Index from './pages/Index/index'
import Regiser from './pages/Register'
import Detail from './pages/Detail'
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
  }
];

export default routes