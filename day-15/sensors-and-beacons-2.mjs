import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

const sensors = [];

// const maxPos = 20;
const maxPos = 4000000;
const map = [];

const merge = (arrayOfRanges) => {

  // sort ranges, first by starting point, second by end point
  arrayOfRanges.sort((range1, range2) => {
    if (range1.start < range2.start) {
      return -1;
    }

    if (range1.start > range2.start) {
      return 1;
    }

    if (range1.stop < range2.stop) {
      return -1;
    }

    if (range1.stop > range2.stop) {
      return 1;
    }

    return 0;
  });

  let i = 1;

  let range1 = arrayOfRanges[0];
  let range2 = arrayOfRanges[1];

  // try merging the ranges that are now in ascending order
  while (range2 !== undefined) {

    // check for overlap or adjecency
    if (range1.stop >= range2.start - 1) {

      // ranges overlap, proceed with merge
      if (range1.stop < range2.stop) {

        // update stop of range 1 to include all of range 2
        range1.stop = range2.stop;
      }

      // remove range 2
      arrayOfRanges.splice(i, 1);

      // get next range for possible merge
      range2 = arrayOfRanges[i];

    } else {

      // ranges does not overlap, get next two ranges for possible merge
      i++;
      range1 = range2;
      range2 = arrayOfRanges[i];
    }
  }
};

// parse info about sensors and beacons
for (const line of input) {

  // skip empty lines
  if (line === "") {
    continue;
  }

  let [sensor, beacon] = line.split(":");

  sensor = sensor.slice(10);
  beacon = beacon.slice(22);

  let [sensorX, sensorY] = sensor.split(", ");
  let [beaconX, beaconY] = beacon.split(", ")

  sensorX = Number.parseInt(sensorX.slice(2));
  sensorY = Number.parseInt(sensorY.slice(2));
  beaconX = Number.parseInt(beaconX.slice(2));
  beaconY = Number.parseInt(beaconY.slice(2));

  const deltaX = Math.abs(beaconX - sensorX);
  const deltaY = Math.abs(beaconY - sensorY);
  const range = deltaX + deltaY;

  sensors.push({
    x: sensorX,
    y: sensorY,
    range
  });

  console.log(line);


  // add coverage to map
  let yMin = sensorY - range;
  let yMax = sensorY + range;

  if (yMin < 0) {
    yMin = 0;
  }

  if (yMax > maxPos) {
    yMax = maxPos;
  }

  for (let y = yMin; y < yMax + 1; y++) {

    // check for total coverage
    if (map[y] && map[y][0].start <= 0 && map[y][0].stop >= maxPos) {
      continue;
    }

    const deltaY = Math.abs(sensorY - y);
    const deltaX = range - deltaY;

    let xMin = sensorX - deltaX;
    let xMax = sensorX + deltaX;

    const newRange = {
      start: xMin,
      stop: xMax
    };

    // create entry for row if none exits
    if (map[y] === undefined) {
      map[y] = [newRange];

      continue;
    } else {
      map[y].push(newRange);

      // try to merge ranges
      merge(map[y]);
    }
  }
}

// look for a row without total coverage
for (let y = 0; y < maxPos + 1; y++) {

  // check for total coverage
  if (map[y] && map[y][0].start <= 0 && map[y][0].stop >= maxPos) {

    // check for faulty merging
    if (map[y].length !== 1) {
      console.log("Something went wrong at y: " + y + " Ranges: " + map[y]);
    }
  } else {

    // assume that the point of interest is not at the edges of the area being considered
    if (map[y].length !== 2) {
      console.log("Something went wrong at y: " + y + " Ranges: " + map[y]);
    }

    let x = map[y][0].stop + 1;

    // check that the two ranges have exactly one point between them
    if (x !== map[y][1].start - 1) {
      console.log("Something went wrong at y: " + y + " Ranges: " + map[y]);
    }

    // calculate the tuning frequency
    console.log(x * 4000000 + y);
  }
}