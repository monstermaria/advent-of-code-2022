import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");


// parse input and create data structure
const map = [];

for (const line of input) {

  const points = line.split(" -> ");

  let start = points[0];
  let stop = points[1];
  let i = 2;

  while (stop !== undefined) {
    const [x1, y1] = start.split(",");
    const [x2, y2] = stop.split(",");

    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);

    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);

    // plot the line
    for (let y = yMin; y < yMax + 1; y++) {
      // make sure there is an array at every y level
      if (map[y] === undefined) {
        map[y] = [];
      }

      for (let x = xMin; x <= xMax; x++) {
        map[y][x] = "#";
      }
    }

    start = stop;
    stop = points[i];

    i++;
  }
}

// add the bottom level
const deepestLevel = map.length;


// pour the sand
let x = 500;
let y = 0;

let sandAtRest = 0;

// add first y level if it isn't already defined
if (map[0] === undefined) {
  map[0] = [];
}

// when the point where sand is created is filled, we are done
while (map[0][500] === undefined) {

  // if falling sans has reached the bottom of the cave, it comes to rest
  if (y === deepestLevel) {
    // sand has come to rest
    map[y][x] = "o";
    sandAtRest++;

    // prepare next unit of sand
    x = 500;
    y = 0;

    continue;
  }

  // add next level if it isn't already defined
  if (map[y + 1] === undefined) {
    map[y + 1] = [];
    y++;
    continue;
  }

  // try going straight down
  if (map[y + 1][x] === undefined) {
    y++;
    continue;
  }

  // try going to the left
  if (map[y + 1][x - 1] === undefined) {
    y++;
    x--;
    continue;
  }

  // try going to the right
  if (map[y + 1][x + 1] === undefined) {
    y++;
    x++;
    continue;
  }

  // sand has come to rest
  map[y][x] = "o";
  sandAtRest++;

  // prepare next unit of sand
  x = 500;
  y = 0;
}

console.log(sandAtRest);
