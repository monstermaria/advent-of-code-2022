import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

let sum = 0;

for (const i of input) {
  const splittingPoint = i.length / 2;
  const compartment1 = i.slice(0, splittingPoint);
  const compartment2 = i.slice(splittingPoint);

  for (const item of compartment1) {

    if (compartment2.indexOf(item) >= 0) {

      // found the misplaced item, now I need to determine the priority
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

console.log(sum);
