const { faker } = require('@faker-js/faker');

const AthleteFactory = artifacts.require("AthleteFactory");
const Athlete = artifacts.require("Athlete");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const factory = await AthleteFactory.deployed();

    for (let i = 0; i < 10; i++) {
      const name = faker.person.firstName();
      const surname = faker.person.lastName();

      const sport = faker.helpers.arrayElement(["Football", "Basketball", "Tennis", "Swimming"]);
      const age = faker.number.int({ min: 18, max: 40 }).toString();
      const height = (faker.number.int({ min: 150, max: 210 }) / 100).toFixed(2); 
      const weight = faker.number.int({ min: 50, max: 100 }).toString(); 

      await factory.createAthlete(
        name,
        surname,
        sport,
        age,
        height,
        weight,
        { from: accounts[0], value: web3.utils.toWei("0.01", "ether") }
      );

      console.log(`Creato atleta #${i + 1}: ${name} ${surname}`);
    }

    const count = await factory.getAthletesCount();
    console.log("\nTotale atleti creati:", count.toString());

    callback();
  } catch (err) {
    console.error("Errore nello script:", err);
    callback(err);
  }
};
