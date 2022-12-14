import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

console.log(input);

let cycle = 0;
let x = 1;

let crt = "";

const drawPixel = () => {
  const crtPos = cycle % 40;

  if (crtPos === 0) {
    crt += "\n";
  }

  if (crtPos >= x - 1 && crtPos <= x + 1) {
    crt += "#";
  } else {
    crt += ".";
  }
};

for (const line of input) {
  const command = line.split(" ");
  let valueToAdd = 0;

  if (command[0] === "noop") {
    drawPixel();
    cycle++;
  } else if (command[0] === "addx") {
    drawPixel();
    cycle ++;
    drawPixel();
    cycle ++;
    valueToAdd = Number.parseInt(command[1]);
  } else {
    console.log("Unknown command: " + line);
  }

  x += valueToAdd;
}

console.log(crt);
