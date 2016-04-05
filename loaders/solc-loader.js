var Pudding = require('ether-pudding')
var PuddingGenerator = require('ether-pudding/generator')

module.exports = function (compiledSolObj) {
  console.log(Pudding)
  console.log(PuddingGenerator)
  console.log('TEST TEST TEST\nTEST TEST TEST\nTEST TEST TEST\nTEST TEST TEST\n')
  this.cacheable()
  var classContracts = ''
  // for (var contractName in compiledSolObj.contracts) {
  //   console.log('compiled: ' + contractName)
  //   var inputCompiled = compiledSolObj.contracts[contractName]
  //   classContracts += PuddingGenerator.generate(contractName, inputCompiled)
  // }
  return classContracts // {'one': 'see the gun', 'two': 'who are you'}
}
