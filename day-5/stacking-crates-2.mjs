import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

// process input and create data structures to represent stacks of crates
let rowIndex = 0;
let row = input[0];

// find the number of stacks
const numberOfStacks = Math.ceil(row.length / 4);

console.log("Number of stacks: " + numberOfStacks);

const stacks = [];

// prepare the stacks
for (let i = 0; i < numberOfStacks; i++) {
  stacks[i] = [];
}

while (row !== "") {

  for (let i = 0; i < numberOfStacks; i++) {
    const charIndex = i * 4 + 1;
    const char = row.slice(charIndex, charIndex + 1);
    const charCode = row.charCodeAt(charIndex);

    if (charCode === 32) {
      // space indicates empty space above a stack
      continue;
    } else if (charCode >= 65 && charCode <= 90) {
      // capital letter indicates a crate
      stacks[i].push(char);
    } else if (charCode >= 49 && charCode <= 57) {
      // digit indicates row designation, perform sanity check
      if (Number.parseInt(char) === i +1) {
        console.log("Stack " + char + " parsed");
      } else {
        console.log("Expected stack number (" + i + " + 1) does not match read number: " + char);
      }
    }
  }

  rowIndex++;
  row = input[rowIndex];
}

console.log(stacks);

// parse and handle the instructions
while (rowIndex < input.length) {
  if (row === "") {
    console.log("Empty row at line " + rowIndex);
  } else {

    const instruction = row.split(" ");

    const numberToMove = Number.parseInt(instruction[1]);
    const moveFromStack = Number.parseInt(instruction[3]);
    const moveToStack = Number.parseInt(instruction[5]);

    const cratesToMove = stacks[moveFromStack -1].splice(0, numberToMove);
    stacks[moveToStack - 1].splice(0, 0, ...cratesToMove);
  }

  rowIndex++;
  row = input[rowIndex];
}

console.log(stacks);

// combine the letters representing the top cratres to a string
let topCrates = "";
for (let i = 0; i < numberOfStacks; i++) {
  topCrates += stacks[i][0];
}

console.log(topCrates);
