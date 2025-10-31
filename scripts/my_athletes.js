const AthleteFactory = artifacts.require("AthleteFactory");
const Athlete = artifacts.require("Athlete");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const user = accounts[0]; // Utente corrente
    const factory = await AthleteFactory.deployed();

    const myAthletes = await factory.getMyAthletes({ from: user });

    console.log(`\n Atleti creati da ${user}: ${myAthletes.length}`);

    for (let i = 0; i < myAthletes.length; i++) {
      const athlete = await Athlete.at(myAthletes[i]);
      const [name, surname, sport, age, height, weight] = await Promise.all([
        athlete.name(),
        athlete.surname(),
        athlete.getSport(),
        athlete.age(),
        athlete.height(),
        athlete.weight(),
      ]);

      console.log(`\n Atleta ${i + 1}`);
      console.log(`Nome: ${name}`);
      console.log(`Cognome: ${surname}`);
      console.log(`Sport: ${sport}`);
      console.log(`Età: ${age}`);
      console.log(`Altezza: ${height}`);
      console.log(`Peso: ${weight}`);
    }

    callback();
  } catch (err) {
    console.error("Errore:", err);
    callback(err);
  }
};
