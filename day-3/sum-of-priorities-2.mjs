import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

let sum = 0;

for (let i = 0; i < input.length; i += 3 ) {
  const rucksack1 = input[i];
  const rucksack2 = input[i + 1];
  const rucksack3 = input[i + 2];

  for (const item of rucksack1) {

    // look at possible candidates for being the groups badge
    if (rucksack2.indexOf(item) >= 0) {

      // found the candidate in rucksack 2, now look in rucksack 3
      if (rucksack3.indexOf(item) >= 0) {

        // found the candidate in all three rucksacks, now determine the priority
        const charValue = item.charCodeAt(0);

        if (charValue >= 65 && charValue <= 90) {
          // upper case letter
          sum += charValue - 38;
        } else if (charValue >= 97 && charValue <= 122) {
          // lower case letter
          sum += charValue - 96;
        } else {
          console.log("Value out of range");
        }
        break;
      }
    }
  }
}

console.log(sum);
