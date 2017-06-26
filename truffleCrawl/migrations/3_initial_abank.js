var Banks = artifacts.require("./aBank.sol");

module.exports = function(deployer) {
  deployer.deploy(Banks);
};
