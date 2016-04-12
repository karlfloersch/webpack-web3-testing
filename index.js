import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {} from './app.css'
import Web3 from 'web3'
import Pudding from 'ether-pudding'
import SimpleStorage from './contracts/SimpleStorage.sol'

// Preform the normal web3 configurations
var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
Pudding.setWeb3(web3)

// Set the provider, as you would normally.

SimpleStorage.load(Pudding)
var simpleSotrage = SimpleStorage.deployed()

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
