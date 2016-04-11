// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"pet","outputs":[{"name":"retVal","type":"uint256"}],"type":"function"}],
    binary: "606060405260458060106000396000f3606060405260e060020a600035046360fe47b18114602e5780636d4ce63c146038578063e9b7d7dd146038575b005b600435600055602c565b6000546060908152602090f3",
    unlinked_binary: "606060405260458060106000396000f3606060405260e060020a600035046360fe47b18114602e5780636d4ce63c146038578063e9b7d7dd146038575b005b600435600055602c565b6000546060908152602090f3",
    address: "0x4b8a37fa0c3d2a1342fb38f61f601bc26fe32f4e",
    generated_with: "2.0.6",
    contract_name: "PimpleStorage"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("PimpleStorage error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("PimpleStorage error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("PimpleStorage error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("PimpleStorage error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.PimpleStorage = Contract;
  }

})();
