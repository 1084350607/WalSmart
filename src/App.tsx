import React from 'react'
import './App.css'
import Home from './pages/home'
// 全局导入antd
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import routes from '../src/router'

import routes from './router'
function App() {
  return <Router>
    <Switch>
      {
        routes.map(route => <Route exact key={route.path} path={route.path}>
          <route.component />
        </Route>)
      }
    </Switch>
  </Router>
}

export default App
