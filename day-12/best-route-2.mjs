import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

// parse the input and create a data structure for the map
const map = [];
let start = {};
let exit = {};

const newSquareObject = (row, column, letter) => {
  return {
    row,
    column,
    elevation: letter.charCodeAt(0) - 97,
    bestRoute: Number.MAX_SAFE_INTEGER
  };
};

for (let r = 0; r < input.length; r++) {
  const row = [];

  // abort parsing if you encounter an empty line
  if (input[r] === "") {
    break;
  }

  const squares = input[r].split("");

  for (let c = 0; c < squares.length; c++) {
    switch (squares[c]) {
      case "S":
        start = newSquareObject(r, c, "a");
        row.push(start);
        break;
      case "E":
        exit = newSquareObject(r, c, "z");
        row.push(exit);
        break;
      default:
        row.push(newSquareObject(r, c, squares[c]));
    }
  }

  map.push(row);
}

// find best route
const findRoute = (square, routeLength) => {

  let nextSquare;

  // compare current route length with current square's best route so far
  if (routeLength < square.bestRoute) {
    // the route currently being explored is shorter than the previously best one
    square.bestRoute = routeLength;
  } else {
    // current route is equally good or worse than previously found best route
    // no need to explore this path further
    return;
  }

  // end recursion when exit square is encountered
  if (square === exit) {
    return;
  }

  // try all directions

  // up
  if (square.row > 0) {
    nextSquare = map[square.row - 1][square.column];
    if (nextSquare.elevation - square.elevation <= 1) {
      findRoute(nextSquare, routeLength + 1);
    }
  }

  // down
  if (square.row < map.length - 1) {
    nextSquare = map[square.row + 1][square.column];
    if (nextSquare.elevation - square.elevation <= 1) {
      findRoute(nextSquare, routeLength + 1);
    }
  }

  // left
  if (square.column > 0) {
    nextSquare = map[square.row][square.column - 1];
    if (nextSquare.elevation - square.elevation <= 1) {
      findRoute(nextSquare, routeLength + 1);
    }
  }

  // right
  if (square.column < map[0].length - 1) {
    nextSquare = map[square.row][square.column + 1];
    if (nextSquare.elevation - square.elevation <= 1) {
      findRoute(nextSquare, routeLength + 1);
    }
  }
};

// test all possible routes from squares with elevation a (0) to the exit square
for (let r = 0; r < map.length; r++) {
  for (let c = 0; c < map[r].length; c++) {
    const square = map[r][c];
    if (square.elevation === 0) {
      findRoute(square, 0);
    }
  }
}

console.log(exit.bestRoute);
