// Import truffle variables for deployment
var Truffle = require('truffle')
var path = require('path')
var argv = require('yargs').argv
var PuddingGenerator = require('ether-pudding/generator')
var solc = require('solc')

// Get the current time used for the cache
var deploying = false

// Set file structure, this will later be done with a config
var truffle_dir = path.join(__dirname, '../node_modules/truffle')
var working_dir = path.join(__dirname, '..')

// Build config object
var config = Truffle.config.gather(truffle_dir, working_dir, argv, 'development')

module.exports = function (source) {
  var callback = this.async()

  if (deploying) {
    pollForDeployment(source, callback)
  } else {
    deployContracts(source, callback)
  }
}

function pollForDeployment (source, callback) {
  setTimeout(function () {
    if (deploying) {
      pollForDeployment(source, callback)
      return
    }
    returnCompilation(source, callback)
  }, 50)
}

function deployContracts (source, callback) {
  deploying = true
  Truffle.contracts.deploy(config, true, function (err) {
    deploying = false
    if (err != null) {
      callback(err)
    } else {
      returnCompilation(source, callback)
    }
  })
}

function returnCompilation (source, callback) {
  var sourceContract = getContractClass(source, config.contracts.classes)
  var compiledContract = PuddingGenerator.generate(sourceContract, config.contracts.classes[sourceContract])
  console.log(compiledContract)
  callback(null, compiledContract)
}

function getContractClass (source, classes) {
  // Get all of the contract names
  var contracts = Object.keys(classes)

  // Compile the source to find the contract name
  var output = solc.compile(source, 1)
  for (var compiledContractName in output.contracts) {
    if (contracts.indexOf(compiledContractName) !== -1) {
      return compiledContractName
    }
  }
}
