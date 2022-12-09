import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

const trees = [];

// parse input
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
      left: 0,
      right: 0,
      up: 0,
      down: 0
    };
  }

  trees.push(row);
}

// check line of sight and calculate scenic score
// skip the outermost trees (they will always have a score of 0)
let highestScenicScore = 0;

for (let row = 1; row < trees.length - 1; row++) {
  for (let column = 1; column < trees[row].length - 1; column++) {
    const tree = trees[row][column];

    // left
    let c = column;
    while (c > 0) {
      c--;
      if (trees[row][c].height >= tree.height) {
        break;
      }
    }
    tree.left = column - c;

    // right
    c = column;
    while (c < trees[row].length - 1) {
      c++;
      if (trees[row][c].height >= tree.height) {
        break;
      }
    }
    tree.right = c - column;

    // up
    let r = row;
    while (r > 0) {
      r--;
      if (trees[r][column].height >= tree.height) {
        break;
      }
    }
    tree.up = row - r;

    // down
    r = row;
    while (r < trees.length - 1) {
      r++;
      if (trees[r][column].height >= tree.height) {
        break;
      }
    }
    tree.down = r - row;

    // calculate scenic score
    const scenicScore = tree.left * tree.right * tree.up * tree.down;

    if (scenicScore > highestScenicScore) {
      highestScenicScore = scenicScore;
    }
  }
}

console.log(highestScenicScore);
