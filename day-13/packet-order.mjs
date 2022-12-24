import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

let sumOfCorrectIndicies = 0;
let index = 0;

const compareLists = (left, right) => {
  for (let i = 0; i < left.length; i++) {
    const leftItem = left[i];
    const rightItem = right[i];

    if (rightItem === undefined) {
      return false;
    }

    if (typeof leftItem === "number") {
      if (typeof rightItem === "number") {
        if (leftItem === rightItem) {
          continue;
        } else if (leftItem < rightItem) {
          return true;
        } else {
          return false;
        }
      } else if (Array.isArray(rightItem)) {
        return compareLists([leftItem], rightItem) ;
      } else {
        console.log("Unexpected type of right item: " + (typeof rightItem));
      }
    } else if (Array.isArray(leftItem)) {
      if (typeof rightItem === "number") {
        return compareLists(leftItem, [rightItem]);
      } else if (Array.isArray(rightItem)) {
        return compareLists(leftItem, rightItem);
      } else {
        console.log("Unexpected type of right item: " + (typeof rightItem));
      }
    } else {
      console.log("Unexpected type of left item: " + (typeof leftItem));
    }
  }

  return true;
};

while (index * 3 < input.length) {
  const left = JSON.parse(input[index * 3]);
  const right = JSON.parse(input[index * 3 + 1]);

  if (compareLists(left, right)) {
    sumOfCorrectIndicies += index + 1;
  }

  index++;
}

console.log(sumOfCorrectIndicies);
