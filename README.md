# 🏅 Athlete Factory (Truffle Project)

A blockchain-based project built with **Solidity** and **Truffle** that allows users to create and manage athlete profiles and their achievements on the Ethereum network.

Each athlete is represented by its own smart contract, created through a factory contract (`AthleteFactory`). Users can create athletes by paying a small fee and later add achievements to each athlete.

---

## 🚀 Project Overview

### Smart Contracts

#### `Athlete.sol`
Represents an individual athlete with basic personal information and a list of achievements.

**Key features:**
- Stores athlete details (`name`, `surname`, `sport`, `age`, `height`, `weight`)
- Allows adding achievements with timestamps
- Provides access to all achievements
- Public getter functions for each attribute

#### `AthleteFactory.sol`
Manages the deployment and ownership of multiple `Athlete` contracts.

**Key features:**
- Deploys new `Athlete` contracts for a small fee (default: `0.01 ETH`)
- Keeps track of all deployed athletes
- Maps each creator to their own list of athletes
- Allows the owner to withdraw collected fees

---

## 📁 Project Structure

```
contracts/
 ├── Athlete.sol
 └── AthleteFactory.sol

migrations/
 └── 2_deploy_contracts.js

scripts/
 ├── create_athletes.js        # Automatically creates random athletes
 ├── add_achievements.js       # Adds random achievements based on the athlete’s sport
 └── show_my_athletes.js       # Displays all athletes created by the current account

test/
 └── (optional test files)

truffle-config.js
package.json
README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Compile contracts
```bash
truffle compile
```

### 3️⃣ Deploy to local network
Make sure Ganache or another Ethereum node is running, then:

```bash
truffle migrate --network development
```

---

## 🧩 Scripts

### 🏗 Create Random Athletes
Generates 10 athletes with random data using the Faker library.
```bash
truffle exec scripts/create_athletes.js
```

### 🏆 Add Random Achievements
Adds achievements to athletes based on their sport (Football, Basketball, Tennis, Swimming).
```bash
truffle exec scripts/add_achievements.js
```

### 👤 Show My Athletes
Displays all athletes created by your Ethereum address.
```bash
truffle exec scripts/show_my_athletes.js
```

---

## 💰 Contract Functions

### `Athlete`
| Function | Description |
|-----------|-------------|
| `addAchievement(string)` | Adds a new achievement with current block timestamp |
| `getAchievement(uint)` | Returns achievement by index |
| `getAllAchievements()` | Returns all achievements |
| `getSport()` | Returns athlete’s sport |

### `AthleteFactory`
| Function | Description |
|-----------|-------------|
| `createAthlete(...)` | Deploys a new `Athlete` contract (costs `0.01 ETH`) |
| `getAthlete(uint)` | Returns athlete contract address by index |
| `getAthletesCount()` | Returns total number of deployed athletes |
| `getMyAthletes()` | Returns all athletes created by the caller |
| `withdraw()` | Allows the owner to withdraw all collected ETH |

---

## 🔒 Notes
- The project uses Solidity `^0.8.0`
- Default creation price is **0.01 ETH**
- All timestamps are in UNIX time (seconds)
- Random data is generated using **@faker-js/faker**

---

## 🧠 Future Improvements
- Add achievements as NFTs (ERC-721)
- Implement athlete ranking and statistics
- Add frontend (React + Web3.js / Ethers.js)
- Support for IPFS to store athlete metadata

---

## 👨‍💻 Author
**Filorido**  
Blockchain project using Truffle and Solidity.  
Made with ❤️ for learning and experimentation.

---

## 🪪 License
This project is licensed under the **MIT License**.
