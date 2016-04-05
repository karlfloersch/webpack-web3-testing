var solc = require('solc')

module.exports = function (contract) {
  // Set contracts to be cacheable
  this.cacheable()

  // Compile the contract and return a JSON representation
  var compiledContractJSON = solc.compile(contract, 1)

  // Return a string version of the contract
  return JSON.stringify(compiledContractJSON)
}
