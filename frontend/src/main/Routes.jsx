import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import AutoCrud from '../components/automoveis/AutoCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/automoveis' component={AutoCrud} />
        <Redirect from='*' to='/' />
    </Switch>