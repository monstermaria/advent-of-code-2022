import {readFileSync} from "fs";

// const inputText = readFileSync("input.txt").toString();
const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

const visitedPoints = ["x0y0"];

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

for (const line of input) {
  // skip empty lines
  if (line === "") {
    continue;
  }

  const command = line.split(" ");
  const direction = command[0];
  const steps = Number.parseInt(command[1]);

  const makeMove = (x, y) => {
    // update head position
    headX += x;
    headY += y;

    const diffX = headX - tailX;
    const diffY = headY - tailY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    const signX = diffX / absX;
    const signY = diffY / absY;

    // update tail position
    if (absX + absY > 2) {
      tailX += signX;
      tailY += signY;
    } else if (absX > 1) {
      tailX += signX;
    } else if (absY > 1) {
      tailY += signY;
    }

    // add new tail position to visited points
    const tailPosition = "x" + tailX + "y" + tailY;

    if (visitedPoints.indexOf(tailPosition) === -1) {
      visitedPoints.push(tailPosition);
    }
  }

  switch (direction) {
    case "U":
      for (let i = 0; i < steps; i++) {
        makeMove(0, 1);
      }
      break;
    case "D":
      for (let i = 0; i < steps; i++) {
        makeMove(0, -1);
      }
      break;
    case "R":
      for (let i = 0; i < steps; i++) {
        makeMove(1, 0);
      }
      break;
    case "L":
      for (let i = 0; i < steps; i++) {
        makeMove(-1, 0);
      }
      break;
    default:
      console.log("Unknown command: " + line);
  }
}

console.log(visitedPoints.length);
