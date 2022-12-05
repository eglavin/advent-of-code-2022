#!/usr/bin/env node

const fs = require("fs");

const inputData = fs.readFileSync("inputdata.txt", "utf8");

/** @type {string[]} */
const splitElves = inputData.split(/^\n+$/m); // Split on empty line
console.log("Count of elves: ", splitElves.length);

let largestCalories = 0;

for (let index = 0; index < splitElves.length; index++) {
  const elfsCalories = splitElves[index];

  if (elfsCalories.length > 0) {
    const chunkOfCalories = elfsCalories.split(/[\r|\n]+/); // Split on new line

    const totalCalories = chunkOfCalories.reduce((accumulator, currentValue) => {
      // Test line only contains numbers
      if (/[0-9]+/.test(currentValue)) {
        return accumulator + Number(currentValue);
      }
      return accumulator;
    }, 0);

    console.log(
      `Elf: ${index}, Items: ${elfsCalories.length}, Total Calories: ${totalCalories}`
    );

    if (totalCalories > largestCalories) {
      largestCalories = totalCalories;
    }
  }
}

console.log(`Largest elf's calories are: ${largestCalories}`);
