import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

let numberOfOverlaps = 0;

for (const i of input) {
  // console.log(i);

  if (i === "") {
    console.log("Empty line encountered");
    continue;
  }

  const areas = i.split(",");

  const area1 = areas[0].split("-");
  const area1start = Number.parseInt(area1[0]);
  const area1stop = Number.parseInt(area1[1]);

  const area2 = areas[1].split("-");
  const area2start = Number.parseInt(area2[0]);
  const area2stop = Number.parseInt(area2[1]);

  // determine overlap
  // area 2 start in range of area 1
  if (area2start >= area1start && area2start <= area1stop) {
    numberOfOverlaps++;
    continue;
  }
  // area 2 stop in range of area 1
  if (area2stop >= area1start && area2stop <= area1stop) {
    numberOfOverlaps++;
    continue;
  }
  // area 1 start in range of area 2
  if (area1start >= area2start && area1start <= area2stop) {
    numberOfOverlaps++;
    continue;
  }
  // area 1 stop in range of area 2
  if (area1stop <= area2start && area1stop >= area2stop) {
    numberOfOverlaps++;
    continue;
  }
}

console.log(numberOfOverlaps);
