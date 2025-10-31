const Athlete = artifacts.require("Athlete");
const AthleteFactory = artifacts.require("AthleteFactory");

module.exports = function (deployer) {
  deployer.deploy(AthleteFactory);
};