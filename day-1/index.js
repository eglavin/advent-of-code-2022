#!/usr/bin/env node

const fs = require("fs");

const inputData = fs.readFileSync("inputdata.txt", "utf8");

/** @type {string[]} */
const splitElves = inputData.split(/^\n+$/m); // Split on empty line
console.log("Count of elves: ", splitElves.length);

let largestCalories = [];

for (let index = 0; index < splitElves.length; index++) {
  const elfsCalories = splitElves[index];

  if (elfsCalories.length > 0) {
    const chunkOfCalories = elfsCalories.split(/[\r|\n]+/); // Split on new line

    const totalCalories = chunkOfCalories.reduce(
      (accumulator, currentValue) => {
        // Test line only contains numbers
        if (/[0-9]+/.test(currentValue)) {
          return accumulator + Number(currentValue);
        }
        return accumulator;
      },
      0
    );

    console.log(
      `Elf: ${index}, Items: ${elfsCalories.length}, Total Calories: ${totalCalories}`
    );

    largestCalories.push(totalCalories);
  }
}

largestCalories.sort((a, b) => b - a);

console.log("Largest elf's calories are: ", largestCalories[0]);

let topThree = [];

for (let index = 0; index < 3; index++) {
  const calories = largestCalories[index];

  topThree.push(calories);
}

console.log("The top three calories are: ", topThree);

console.log(
  "The total for the top three elves is: ",
  topThree.reduce((a, b) => a + b, 0)
);
