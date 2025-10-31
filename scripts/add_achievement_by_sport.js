const { faker } = require("@faker-js/faker");
const AthleteFactory = artifacts.require("AthleteFactory");
const Athlete = artifacts.require("Athlete");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const factory = await AthleteFactory.deployed();

    const sports = ["Football", "Basketball", "Tennis", "Swimming"];
    const randomSport = faker.helpers.arrayElement(sports);

    const athletesCount = await factory.getAthletesCount();
    const matchingAthletes = [];

    for (let i = 0; i < athletesCount; i++) {
      const addr = await factory.getAthlete(i);
      const athlete = await Athlete.at(addr);
      const sport = await athlete.getSport();

      if (sport === randomSport) {
        matchingAthletes.push(athlete);
      }
    }

    if (matchingAthletes.length === 0) {
      console.log(`Nessun atleta trovato per lo sport "${randomSport}".`);
      return callback();
    }

    const achievementsMap = {
      Football: [
        "Top scorer of the season",
        "Best midfielder award",
        "Golden boot winner",
        "Hat-trick hero",
        "Champions League MVP",
      ],
      Basketball: [
        "Scored 50+ points in a game",
        "MVP of the season",
        "Triple-double record",
        "Best 3-point shooter",
        "NBA Finals MVP",
      ],
      Tennis: [
        "Won Wimbledon",
        "Reached ATP top 10",
        "Grand Slam winner",
        "Davis Cup champion",
        "Olympic gold medalist",
      ],
      Swimming: [
        "Broke national record",
        "Gold medal in 100m freestyle",
        "World Championship finalist",
        "4x100m relay champion",
        "Qualified for Olympics",
      ],
    };

    const achievementsList = achievementsMap[randomSport];


    for (let i = 0; i < matchingAthletes.length; i++) {
      const athlete = matchingAthletes[i];
      const name = await athlete.name();
      const surname = await athlete.surname();

      const achievementText = faker.helpers.arrayElement(achievementsList);
      await athlete.addAchievement(achievementText, { from: accounts[0] });
    }

    for (let i = 0; i < athletesCount; i++) {
      const addr = await factory.getAthlete(i);
      const athlete = await Athlete.at(addr);

      const achievements = await athlete.getAllAchievements(); 

      if (achievements.length > 0) {
        const name = await athlete.name();
        const surname = await athlete.surname();
        const sport = await athlete.getSport();

        console.log(`${name} ${surname} (${sport}):`);
        achievements.forEach((ach, idx) => {
          const date = new Date(Number(ach[1]) * 1000).toLocaleString();
          console.log(`   - ${ach[0]} (${date})`);
        });
      }
    }

    callback();
  } catch (err) {
    console.error("Errore nello script:", err);
    callback(err);
  }
};
