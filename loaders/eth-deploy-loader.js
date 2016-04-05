var Web3 = require('web3')
var web3 = new Web3()
var Pudding = require('ether-pudding')
Pudding.setWeb3(web3)

// Set the provider, as you would normally.
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))

/*
 * Comp
 * NOTE: Because we may need to redeploy contracts, this cannot be cacheable
 */
module.exports = function (compiledContractsSource) {
  // Contract starts as a string, so turn it into a JSON obj
  var output = JSON.parse(compiledContractsSource)

  deployContracts(output.contracts, this.callback)
}

function deployContracts (contracts, callback) {
  // Iterate over all the contract definitions
  for (var contractName in contracts) {
    // code and ABI that are needed by web3
    console.log('RIGHT HERE\n\n\n\n\nRIGHTHERE\n\n\n')
    var binary = contracts[contractName].bytecode
    var abi = JSON.parse(contracts[contractName].interface)

    // TODO: Actually deploy the contract and return the address.
    // Currently I'm not doing that!

    web3.eth.contract(abi)
    var contract = Pudding.whisk({
      abi: abi,
      binary: binary
    })

    contract.new().then(function (coin) {
      // From here, the example becomes just like the above.
      // Note that coin.address is the addres of the newly created contract.
      console.log('IM HERE\n\n\n\n\n\n\n\nIM HERE IM HERE\n\n\n')
      console.log(JSON.stringify(coin))
      callback(null, '')
    }).catch(function (err) {
      throw err
    })
  }
}

