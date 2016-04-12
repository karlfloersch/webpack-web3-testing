import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {} from './app.css'
import Web3 from 'web3'
import Pudding from 'ether-pudding'
import SimpleStorage from './contracts/SimpleStorage.sol'

console.log('podle')
// Preform the normal web3 configurations
var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
Pudding.setWeb3(web3)

// Set the provider, as you would normally.

SimpleStorage.load(Pudding)
// var simpleSotrage = SimpleStorage.deployed()

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='/simplestorage'>SimpleStorage</Link></li>
            <li><Link to='/pimplestorage'>PimpleStorage</Link></li>
          </ul>
        </header>
        {this.props.children}
      </div>
    )
  }
})

var SimpleStorageView = React.createClass({
  render: function () {
    return (
      <div>
        <p>SimpleStorage</p>
      </div>
    )
  }
})

var PimpleStorageView = React.createClass({
  render: function () {
    return (
      <div>
        <p>PimpleStorage</p>
      </div>
    )
  }
})

let history = createBrowserHistory()

console.log(document.getElementById('root'))
render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={SimpleStorageView}/>
      <Route path='simplesotrage' component={SimpleStorageView}/>
      <Route path='pimplestorage' component={PimpleStorageView}/>
      <Route path='*' component={SimpleStorageView}/>
    </Route>
  </Router>

), document.getElementById('root'))
