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

// Load our contract, giving it the Pudding object (standard pudding stuff)
SimpleStorage.load(Pudding)
// Create our Pudding contract object
var simpleStorage = SimpleStorage.deployed()

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
          </ul>
        </header>
        {this.props.children}
      </div>
    )
  }
})

var SimpleStorageView = React.createClass({
  getInitialState: function () {
    return {simpleStorageVal: '0', inputVal: ''}
  },
  getSimpleStorage: function () {
    const self = this
    simpleStorage.get().then(function (tx) {
      self.setState({simpleStorageVal: tx.toNumber()})
    })
  },
  setSimpleStorage: function () {
    const self = this
    const val = parseInt(this.state.inputVal)
    // console.log(val)
    simpleStorage.set(val, {from: web3.eth.accounts[0]}).then(function (tx) {
      self.setState({inputVal: ''})
      console.log(tx)
    }).catch(function (err) {
      self.setState({inputVal: err})
      console.error(err)
    })
  },
  handleChange (event) {
    const text = event.target.value
    this.setState({inputVal: text})
  },
  render: function () {
    return (
      <div>
        <p>SimpleStorage</p>
        <div>
          <input type='button' value='Get SimpleStorage' onClick={this.getSimpleStorage}/>
          <span> {this.state.simpleStorageVal}</span>
        </div>
        <div>
          <input type='button' value='Set SimpleStorage' onClick={this.setSimpleStorage}/>
          <input onChange={this.handleChange} value={this.state.inputVal}/>
        </div>
      </div>
    )
  }
})

let history = createBrowserHistory()

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={SimpleStorageView}/>
      <Route path='simplestorage' component={SimpleStorageView}/>
      <Route path='*' component={SimpleStorageView}/>
    </Route>
  </Router>

), document.getElementById('root'))
