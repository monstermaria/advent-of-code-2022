import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");
console.log(input);

let totalScore = 0;

for (let i of input) {
  const round = i.split(" ");
  const elfMove = round[0];
  const yourMove = round[1];


  // decide the outcome and add your score
  switch (elfMove) {
    case "A":
      switch (yourMove) {
        case "X":
          // loose: use "Z"
          totalScore += 0 + 3;
          break;
        case "Y":
          // draw: use "X"
          totalScore += 3 + 1;
          break;
        case "Z":
          // win: use "Y"
          totalScore += 6 + 2;
          break;
        default:
          console.log("Your move is not valid: " + yourMove);
          break;
      }
      break;
    case "B":
      switch (yourMove) {
        case "X":
          // loose: use "X"
          totalScore += 0 + 1;
          break;
        case "Y":
          // draw: use "Y"
          totalScore += 3 + 2;
          break;
        case "Z":
          // win: use "Z"
          totalScore += 6 + 3;
          break;
        default:
          console.log("Your move is not valid: " + yourMove);
          break;
      }
      break;
    case "C":
      switch (yourMove) {
        case "X":
          // loose: use "Y"
          totalScore += 0 + 2;
          break;
        case "Y":
          // draw: use "Z"
          totalScore += 3 + 3;
          break;
        case "Z":
          // win: use "X"
          totalScore += 6 + 1;
          break;
        default:
          console.log("Your move is not valid: " + yourMove);
          break;
      }
      break;
    case "":
      console.log("Empty line in input");
      break;
    default:
      console.log("The elfs move is not valid: " + elfMove);
      break;
  }
}

console.log(totalScore);
