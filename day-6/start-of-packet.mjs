import {readFileSync} from "fs";

const input = readFileSync("input.txt").toString();

const segment = [];

for (let i = 0; i < input.length; i++) {
  const char = input.slice(i, i + 1);
  segment.push(char);

  if (segment.length === 4) {
    // test the segment
    let duplicateFound = false;

    for (let j = 0; j < 4; j++) {
      const copyOfSegment = segment.slice();
      const testChar = copyOfSegment.splice(j, 1)[0];

      if (copyOfSegment.indexOf(testChar) >= 0) {
        // this four letter segment has a duplicate, move on to next segment
        duplicateFound = true;
        break;
      }
    }

    if (!duplicateFound) {
      // this is the segment we are looking for
      console.log("The segment is " + segment + ", and the packet starts at " + (i + 1));
      break;
    }

    segment.shift();
  }
}
