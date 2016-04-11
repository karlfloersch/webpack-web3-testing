import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Import and set up web3 and pudding
var Web3 = require('web3')
var web3 = new Web3()
var Pudding = require('ether-pudding')
Pudding.setWeb3(web3)

// Set the provider, as you would normally.
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))

import test from './contracts/SimpleStorage.sol'
import test2 from './contracts/PimpleStorage.sol'
import {} from './app.css'
console.log(test2.load(Pudding))
console.log(test.load(Pudding))

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='/app'>Dashboard</Link></li>
            <li><Link to='/inbox'>Inbox</Link></li>
            <li><Link to='/calendar'>Calendar</Link></li>
          </ul>
        </header>
        {this.props.children}
      </div>
    )
  }
})

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    )
  }
})

var Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <p>Inbox</p>
      </div>
    )
  }
})

var Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <p>Calendar</p>
      </div>
    )
  }
})

let history = createBrowserHistory()

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path='app' component={Dashboard}/>
      <Route path='inbox' component={Inbox}/>
      <Route path='calendar' component={Calendar}/>
      <Route path='*' component={Dashboard}/>
    </Route>
  </Router>
), document.body)
