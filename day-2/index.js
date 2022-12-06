#!/usr/bin/env node

const fs = require("fs");

const shapeScore = {
  rock: 1,
  paper: 2,
  scissors: 3,
};
const roundOutcome = {
  loose: 0,
  draw: 3,
  win: 6,
};

/** @param {string} inputValue */
function mapInputToShape(inputValue) {
  switch (inputValue) {
    case "A":
    case "X":
      return "rock";

    case "B":
    case "Y":
      return "paper";

    case "C":
    case "Z":
      return "scissors";
  }
}

/**
 * @param {keyof shapeScore} player1Choice
 * @param {keyof shapeScore} player2Choice
 */
function getRoundWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) {
    return {
      player1Outcome: "draw",
      player2Outcome: "draw",
    };
  }

  switch (true) {
    case player1Choice === "paper" && player2Choice === "rock":
    case player1Choice === "rock" && player2Choice === "scissors":
    case player1Choice === "scissors" && player2Choice === "paper":
      return {
        player1Outcome: "win",
        player2Outcome: "loose",
      };

    case player2Choice === "paper" && player1Choice === "rock":
    case player2Choice === "rock" && player1Choice === "scissors":
    case player2Choice === "scissors" && player1Choice === "paper":
      return {
        player1Outcome: "loose",
        player2Outcome: "win",
      };
  }

  throw new Error("Missing a case");
}

/** @param {string} choice */
function getPt2RoundWinner(choice) {
  switch (choice) {
    case "X":
      return {
        player1Outcome: "win",
        player2Outcome: "loose",
      };

    case "Y":
      return {
        player1Outcome: "draw",
        player2Outcome: "draw",
      };

    case "Z":
      return {
        player1Outcome: "loose",
        player2Outcome: "win",
      };
  }

  throw new Error("Missing a case");
}

/**
 * @param {keyof shapeScore} player1Shape
 * @param {keyof roundOutcome} player2Outcome
 * @returns {keyof shapeScore}
 */
function getPt2Player2Shape(player1Shape, player2Outcome) {
  if (player2Outcome === "draw") {
    return player1Shape;
  }

  switch (`${player1Shape}_${player2Outcome}`) {
    case "rock_win":
      return "paper";
    case "rock_loose":
      return "scissors";

    case "paper_win":
      return "scissors";
    case "paper_loose":
      return "rock";

    case "scissors_win":
      return "rock";
    case "scissors_loose":
      return "paper";
  }

  throw new Error("Missing a case");
}

/**
 * @param {keyof shapeScore} _selectedShape
 * @param {keyof roundOutcome} _roundOutcome
 */
function getScore(_selectedShape, _roundOutcome) {
  const shape = shapeScore[_selectedShape];
  const outcome = roundOutcome[_roundOutcome];

  return shape + outcome;
}

const puzzleInput = fs.readFileSync("inputdata.txt", "utf8");

const roundData = puzzleInput.split(/[\r|\n]+/); // Split on new line

let totals = {
  player1: 0,
  player2: 0,
};

for (let index = 0; index < roundData.length; index++) {
  const round = roundData[index];

  if (round) {
    const [player1, player2] = round.split(" ");

    const player1Shape = mapInputToShape(player1);
    // const player2Shape = mapInputToShape(player2);

    // const { player1Outcome, player2Outcome } = getRoundWinner(
    //   player1Shape,
    //   player2Shape
    // );

    const { player1Outcome, player2Outcome } = getPt2RoundWinner(player2);

    const player2Shape = getPt2Player2Shape(player1Shape, player2Outcome);

    const player1Score = getScore(player1Shape, player1Outcome);
    const player2Score = getScore(player2Shape, player2Outcome);

    totals.player1 += player1Score;
    totals.player2 += player2Score;

    console.log(`Round: ${index}
Player 1: ${player1Shape}, Outcome: ${player1Outcome}, Score: ${player1Score}
Player 2: ${player2Shape}, Outcome: ${player2Outcome}, Score: ${player2Score}
`);
  }
}

console.log(`Player 1 total: ${totals.player1}
Player 2 total: ${totals.player2}`);
