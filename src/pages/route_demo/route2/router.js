import React, {Component} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Main from "./Main";
import About from "../route1/About";
import Topic from "../route1/Topic";
import Home from './Home'

export default class IRoute extends Component {
  render () {
    return (
      <Router>
        <Home>
          <Route exact path="/" component={Main}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topics" component={Topic}></Route>
        </Home>
      </Router>
    )
  }
}
