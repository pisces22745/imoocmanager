import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import City from './pages/city'
import Order from './pages/order'
import OrderDetail from './pages/order/detail'
import NoMatch from './pages/nomatch'
import Common from './common'

export default class IRouter extends Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login}/>
          <Route path="/admin" render={() =>
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                <Route path="/admin/ui/modals" component={Modals}></Route>
                <Route path="/admin/city" component={City}></Route>
                <Route path="/admin/order" component={Order}></Route>
                <Route path="/admin/form/login" component={FormLogin}></Route>
                <Route path="/admin/form/register" component={FormRegister}></Route>
                <Route component={NoMatch}></Route>
              </Switch>
            </Admin>
          }/>
          <Route path="/common" render={() =>
            <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
            </Common>
          }/>
        </App>
      </HashRouter>
    )
  }
}
