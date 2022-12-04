import { readFileSync } from "fs";

console.log(readFileSync);

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");
console.log(input);

const elfs = [];

let elf = 0;
let topCalorieCount = 0;

const addElf = (calories) => {
  elfs.push(calories);
  elf = 0;
};

for (let i of input) {
  if (i === "") {
    addElf(elf);
  } else {
    const calories = Number.parseInt(i);
    elf += calories;
  }
}

// add the last elf if the input did not end with an empty line
if (elf > 0) {
  console.log("Last elf handling activated");
  addElf(elf);
}

// sort the array of calorie counts to find the top three
elfs.sort((calories1, calories2) => {
  if (calories1 < calories2) {
    return 1;
  }
  if (calories1 > calories2) {
    return -1;
  }
  return 0;
});

topCalorieCount = elfs[0] + elfs[1] + elfs[2];

console.log(elfs);

console.log(topCalorieCount);
