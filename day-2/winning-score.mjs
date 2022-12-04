import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");
console.log(input);

let totalScore = 0;

for (let i of input) {
  const round = i.split(" ");
  const elfMove = round[0];
  const yourMove = round[1];

  // add the value of your move
  switch (yourMove) {
    case "X":
      totalScore += 1;
      break;
    case "Y":
      totalScore += 2;
      break;
    case "Z":
      totalScore += 3;
      break;
    default:
      console.log("Your move is not valid: " + yourMove);
  }

  // decide the outcome and add your score
  switch (elfMove) {
    case "A":
      switch (yourMove) {
        case "X":
          totalScore += 3;
          break;
        case "Y":
          totalScore += 6;
          break;
        case "Z":
          // no need to handle the loss, since it adds no points
          break;
        default:
          break;
      }
      break;
    case "B":
      switch (yourMove) {
        case "X":
          // no need to handle the loss, since it adds no points
          break;
        case "Y":
          totalScore += 3;
          break;
        case "Z":
          totalScore += 6;
          break;
        default:
          break;
      }
      break;
    case "C":
      switch (yourMove) {
        case "X":
          totalScore += 6;
          break;
        case "Y":
          // no need to handle the loss, since it adds no points
          break;
        case "Z":
          totalScore += 3;
          break;
        default:
          break;
      }
      break;
    default:
      console.log("The elfs move is not valid: " + elfMove);
      break;
  }
}

console.log(totalScore);
