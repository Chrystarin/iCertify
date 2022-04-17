const DocumentNFT = artifacts.require("DocumentNFT");

module.exports = function (deployer) {
  // deployer.deploy(GameItem);
  deployer.deploy(DocumentNFT);
};
