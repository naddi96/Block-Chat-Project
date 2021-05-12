const Migrations = artifacts.require("BlockChat");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
