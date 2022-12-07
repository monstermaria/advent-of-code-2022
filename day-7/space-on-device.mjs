import {readFileSync} from "fs";

const inputText = readFileSync("input.txt").toString();

const input = inputText.split("\n");

// console.log(input);

const directories = [];

const root = {
  name: "/",
  type: "directory",
  parent: undefined,
  children: {}
};

let currentDirectory;

for (const line of input) {
  const parts = line.split(" ");
  let size = 0;

  // skip empty lines
  if (line === "") {
    continue;
  }

  if (parts[0] === "$") {
    // parse command
    if (parts[1] === "cd") {
      // change current directory
      if (parts[2] === "/") {
        currentDirectory = root;
      } else if (parts[2] === "..") {
        currentDirectory = currentDirectory.parent;
      } else {
        if (parts[2] in currentDirectory.children) {
          currentDirectory = currentDirectory.children[parts[2]];
        } else {
          console.log("Unknown directory!");
        }
      }
      continue;
    }

  } else if (parts[0] === "dir") {
      // handle directory
      // check if the directory already exists in the representation of the file system
      // if not, create it
      if (!currentDirectory.children[parts[1]]) {
        currentDirectory.children[parts[1]] = {
          name: parts[1],
          type: "directory",
          parent: currentDirectory,
          children: {}
        }
      }
  } else {
      // handle file
      // check if the file already exists in the representation of the file system
      // if not, create it
      if (!currentDirectory.children[parts[1]]) {
        currentDirectory.children[parts[1]] = {
          name: parts[1],
          type: "file",
          parent: currentDirectory,
          size: Number.parseInt(parts[0])
        }
      }
  }
}

// calculate size of directories and make a list of those of a certain size
const getSize = (fileSystem) => {
  let size = 0;

  if (fileSystem.type === "file") {
    return fileSystem.size;
  } else {
    for (const file in fileSystem.children) {
      size += getSize(fileSystem.children[file]);
    }
  }

  if (size <= 100000) {
    directories.push(fileSystem);
  }

  fileSystem.size = size;

  return size;
}

getSize(root);

let sum = 0;

directories.forEach((directory) => {
  sum += directory.size;
});

console.log(sum);
