// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Athlete.sol";

contract AthleteFactory {
    Athlete[] public athletes;
    address public owner;
    uint public athleteCreationPrice = 0.01 ether;

    // Mappatura: creatore => lista dei suoi atleti
    mapping(address => Athlete[]) public creatorToAthletes;

    constructor() {
        owner = msg.sender;
    }

    function createAthlete(
        string memory _name,
        string memory _surname,
        string memory _sport,
        string memory _age,
        string memory _height,
        string memory _weight
    ) public payable {
        require(msg.value >= athleteCreationPrice, "Creazione atleta costa almeno 0.01 ETH");

        Athlete newAthlete = new Athlete(_name, _surname, _sport, _age, _height, _weight);
        athletes.push(newAthlete);
        creatorToAthletes[msg.sender].push(newAthlete); 
    }

    function getAthlete(uint index) public view returns (Athlete) {
        require(index < athletes.length, "Indice non valido");
        return athletes[index];
    }

    function getAthletesCount() public view returns (uint) {
        return athletes.length;
    }

    function withdraw() public {
        require(msg.sender == owner, "Solo il proprietario preleva");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getMyAthletes() public view returns (Athlete[] memory) {
        return creatorToAthletes[msg.sender];
    }
}
