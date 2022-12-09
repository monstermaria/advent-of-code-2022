import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

const trees = [];

// parse input and check visibility from the left
for (const line of input) {
  // skip empty lines
  if (line === "") {
    continue;
  }

  const row = line.split("");

  let highestLeft = 0;

  for (let i = 0; i < line.length; i++) {
    // parse number and create tree object
    row[i] = {
      height: Number.parseInt(row[i]),
      visible: i === 0 // the tree in the first column is always visible, the others might not be
    };

    // check visibility from the left and set new highest
    if (highestLeft < row[i].height) {
      row[i].visible = true;
      highestLeft = row[i].height;
    }
  }

  trees.push(row);
}

// check visibility from the right
for (let row = 0; row < trees.length; row++) {
  let highestRight = 0;

  for (let column = trees[row].length; column > 0; column--) {
    if (highestRight < trees[row][column - 1].height) {
      trees[row][column - 1].visible = true;
      highestRight = trees[row][column - 1].height;
    }

    // the tree in the last column is always visible
    if (column === trees[row].length) {
      trees[row][column - 1].visible = true;
    }
  }
}

// check visibility from the top and the bottom
for (let column = 0; column < trees[0].length; column++) {
  let highestTop = 0;
  let highestBottom = 0;

  // check from top to bottom
  for (let row = 0; row < trees.length; row++) {
    if (highestTop < trees[row][column].height) {
      trees[row][column].visible = true;
      highestTop = trees[row][column].height;
    }

    // the tree in the first row is always visible
    if (row === 0) {
      trees[row][column].visible = true;
    }
  }

  // check from bottom to top
  for (let row = trees.length; row > 0 ; row--) {
    if (highestBottom < trees[row - 1][column].height) {
      trees[row - 1][column].visible = true;
      highestBottom = trees[row - 1][column].height;
    }

    // the tree in the last row is always visible
    if (row === trees.length) {
      trees[row - 1][column].visible = true;
    }
  }
}

let numberOfVisibleTrees = 0;

for (let row = 0; row < trees.length; row++) {
  for (let column = 0; column < trees[0].length; column++) {
    if (trees[row][column].visible) {
      numberOfVisibleTrees++;
    }
  }
}

console.log(numberOfVisibleTrees);
