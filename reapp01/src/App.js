import React, { Component } from 'react'
import { HashRouter,Switch,Route } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import Register from './components/register'
import ForgetPwd from './components/forgetPwd'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/register' component={Register} />
          <Route path='/forgetPwd' component={ForgetPwd} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;