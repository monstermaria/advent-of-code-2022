import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

let numberOfTotalOverlaps = 0;

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
  if (area1start <= area2start && area1stop >= area2stop) {
    numberOfTotalOverlaps++;
  } else if (area1start >= area2start && area1stop <= area2stop) {
    numberOfTotalOverlaps++;
  }

}

console.log(numberOfTotalOverlaps);
