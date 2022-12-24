import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

// parse all packets
const packets = [];

for (const line of input) {
  if (line === "") {
    continue;
  }

  packets.push(JSON.parse(line));
}

// add divider packets
const divider1 = [[2]];
const divider2 = [[6]];

packets.push(divider1);
packets.push(divider2);

const compareLists = (left, right) => {
  for (let i = 0; i < left.length; i++) {
    const leftItem = left[i];
    const rightItem = right[i];

    if (rightItem === undefined) {
      return 1;
    }

    if (typeof leftItem === "number") {
      if (typeof rightItem === "number") {
        if (leftItem === rightItem) {
          continue;
        } else if (leftItem < rightItem) {
          return -1;
        } else {
          return 1;
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

  return -1;
};

packets.sort(compareLists);

const indexDivider1 = packets.indexOf(divider1);
const indexDivider2 = packets.indexOf(divider2);

console.log((indexDivider1 + 1) * (indexDivider2 + 1));
