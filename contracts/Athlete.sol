// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Athlete {
    string public name;
    string public surname;
    string public sport;
    string public age;
    string public height;
    string public weight;
    uint public achievementsCount;

    struct Achievement {
        string description;
        uint date;
    }

    Achievement[] public achievements;

    constructor(string memory _name, string memory _surname, string memory _sport, string memory _age, string memory _height, 
    string memory _weight ) {
        name = _name;
        surname = _surname;
        sport = _sport;
        age = _age;
        height = _height;
        weight = _weight;
        achievementsCount = 0;
    }

    function addAchievement(string memory _description) public {
        achievements.push(Achievement({
            description: _description,
            date: block.timestamp
        }));
        achievementsCount++;
    }

    function getAchievement(uint index) public view returns (string memory, uint) {
        require(index < achievementsCount, "Invalid index");
        Achievement memory achievement = achievements[index];
        return (achievement.description, achievement.date);
    }

    function getAllAchievements() public view returns (Achievement[] memory) {
        return achievements;
    }

    function getSport() public view returns (string memory) {
        return sport;
    }
}