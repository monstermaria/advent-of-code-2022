import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

console.log(input);

let cycle = 0;
let x = 1;
let nextCheck = 20;
let sumOfCheckpoints = 0;

for (const line of input) {
  const command = line.split(" ");
  let valueToAdd = 0;

  if (command[0] === "noop") {
    cycle++;
  } else if (command[0] === "addx") {
    cycle += 2;
    valueToAdd = Number.parseInt(command[1]);
  } else {
    console.log("Unknown command: " + line);
  }

  if (cycle >= nextCheck) {
    console.log("Cycle: " + cycle + " value of x: " + x);
    sumOfCheckpoints += nextCheck * x;
    nextCheck += 40;
  }

  x += valueToAdd;
}

console.log(sumOfCheckpoints);
