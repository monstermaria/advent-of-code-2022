import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

const monkeys = [];
const numberOfRounds = 20;

let currentMonkey;

const newMonkey = () => {
  return {
    items: [],
    numberOfInspections: 0
  };
};

// parse input
for (const line of input) {
  const parts = line.split(" ");

  // skip empty lines
  if (line === "") {
    continue;
  }

  if (parts[0] === "Monkey") {
    const monkeyIndex = Number.parseInt(parts[1]);
    currentMonkey = newMonkey();

    monkeys[monkeyIndex] = currentMonkey;

  } else if (parts[2] === "Starting") {
    for (let i = 4; i < parts.length; i++) {
      currentMonkey.items.push(Number.parseInt(parts[i]));
    }
  } else if (parts[2] === "Operation:") {
    currentMonkey.operation = parts.slice(5);
  } else if (parts[2] === "Test:") {
    currentMonkey.testNumber = Number.parseInt(parts[5]);
  } else if (parts[5] === "true:") {
    currentMonkey.true = Number.parseInt(parts[9]);
  } else if (parts[5] === "false:") {
    currentMonkey.false = Number.parseInt(parts[9]);
  } else {
    console.log("Something is not right: " + parts);
  }
}

const inspect = (item, operation) => {
  let left = 0;
  let right = 0;

  if (operation[0] === "old") {
    left = item;
  } else {
    left = Number.parseInt(operation[0]);
  }

  if (operation[2] === "old") {
    right = item;
  } else {
    right = Number.parseInt(operation[2]);
  }

  if (operation[1] === "+") {
    return left + right;
  } else if (operation[1] === "*") {
    return left * right;
  } else {
    console.log("Unknown operator: " + operation);
  }
};

// go through the rounds
for (let round = 0; round < numberOfRounds; round++) {
  // go through the monkeys
  for (const monkey of monkeys) {
    // go through the items that the current monkey is holding
    while (monkey.items.length > 0) {
      // get the first item
      let item = monkey.items.shift();

      // inspect the item
      item = inspect(item, monkey.operation);

      // increase inspect-count
      monkey.numberOfInspections++;

      // reduce worry-level post inspection
      item = Math.floor(item / 3);

      // test the item and pass it to the corresponding monkey
      if (item % monkey.testNumber === 0) {
        monkeys[monkey.true].items.push(item);
      } else {
        monkeys[monkey.false].items.push(item);
      }
    }
  }
}

// sort monkeys in decending order on number of inspections
monkeys.sort((monkey1, monkey2) => {
  if (monkey1.numberOfInspections > monkey2.numberOfInspections) {
    return -1;
  }

  if (monkey1.numberOfInspections < monkey2.numberOfInspections) {
    return 1;
  }

  return 0;
});

// console.log(monkeys);

console.log("Level of monkey business is " + (monkeys[0].numberOfInspections * monkeys[1].numberOfInspections));
