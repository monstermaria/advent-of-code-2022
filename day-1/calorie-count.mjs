import {readFileSync} from "fs";

console.log(readFileSync);

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");
console.log(input);

const elfs = [];

let elf = 0;
let mostCalories = 0;

const addElf = (calories) => {
  elfs.push(calories);
  if (calories > mostCalories) {
    mostCalories = calories;
  }
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

console.log(elfs);

console.log(mostCalories);
