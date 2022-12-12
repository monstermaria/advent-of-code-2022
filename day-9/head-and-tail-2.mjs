import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// create datastructure representing the rope and the position of individual knots
const rope = [];
const ropeLength = 10;

for (let i = 0; i < ropeLength; i++) {
  rope.push({
    x: 0,
    y: 0,
    visitedPoints: ["x0y0"]
  });
}

// function for moving knot2 being dragged by knot1
const moveTail = (knot1, knot2, track) => {

  const diffX = knot1.x - knot2.x;
  const diffY = knot1.y - knot2.y;
  const absX = Math.abs(diffX);
  const absY = Math.abs(diffY);
  const signX = diffX / absX;
  const signY = diffY / absY;

  // update tail position
  if (absX + absY > 2) {
    knot2.x += signX;
    knot2.y += signY;
  } else if (absX > 1) {
    knot2.x += signX;
  } else if (absY > 1) {
    knot2.y += signY;
  }

  if (track) {
    // add new tail position to visited points
    const tailPosition = "x" + knot2.x + "y" + knot2.y;

    if (knot2.visitedPoints.indexOf(tailPosition) === -1) {
      knot2.visitedPoints.push(tailPosition);
    }
  }
};

// parse input and make moves along the way
for (const line of input) {
  // skip empty lines
  if (line === "") {
    continue;
  }

  const command = line.split(" ");
  const direction = command[0];
  const steps = Number.parseInt(command[1]);
  let x = 0;
  let y = 0;

  switch (direction) {
    case "U":
      y = 1;
      break;
    case "D":
      y = -1;
      break;
    case "R":
      x = 1;
      break;
    case "L":
      x = -1;
      break;
    default:
      console.log("Unknown command: " + line);
  }

  for (let i = 0; i < steps; i++) {
    // update head position
    rope[0].x += x;
    rope[0].y += y;

    // drag the tail
    for (let j = 0; j < ropeLength - 1; j++) {
      moveTail(rope[j], rope[j + 1], j === ropeLength - 2);
    }
  }
}

console.log(rope[ropeLength - 1].visitedPoints.length);
