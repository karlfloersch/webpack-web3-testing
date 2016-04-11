// Import truffle variables for deployment
var Truffle = require('truffle')
var path = require('path')
var argv = require('yargs').argv

// Get the current time used for the cache
var date = new Date()
var cacheTime = date.getTime()

// Set file structure, this will later be done with a config
var truffle_dir = path.join(__dirname, '../node_modules/truffle')
var working_dir = path.join(__dirname, '..')

// Build config object
var config = Truffle.config.gather(truffle_dir, working_dir, argv, 'development')

module.exports = function (content) {
  var callback = this.async()
  date = new Date()
  // Check if we deployed recently
  console.log(date.getTime())
  console.log(cacheTime)
  if (!(cacheTime + 1000 < date.getTime())) {
    // We did! That means this is probably not the first loader, so we don't
    // need to redeploy
    console.log('cache hit omg!')
    callback(null, '')
    return
  } else {
    // Update cache because we will now deploy
    cacheTime = date.getTime()

    // Compile, deploy, and save the results!
    deployContracts(callback)
  }
}

function deployContracts (cb) {
  var compile = true
  Truffle.contracts.deploy(config, compile, function (err) {
    if (err != null) {
      cb(err)
      console.log('WE DID IT WE DID IT\n\n\n\n\n\n')
      return
    } else {
      console.log('WE DID IT WE DID IT\n\n\n\n\n\n')
      cb(null, '')
      return
    }
  })
}
