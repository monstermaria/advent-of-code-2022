import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

const sensors = [];

// const maxPos = 20;
const maxPos = 4000000;

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
}

console.log(sensors);

// check for coverage
// this solotion works for the test input, but is too slow for the real data
let found = false;

for (let y = 0; y < maxPos; y++) {
  if (y % 10 === 0) {
    console.log(y);
  }

  let x = 0;
  while (x < maxPos) {
    let covered = false;

    for (const sensor of sensors) {
      let deltaX =  Math.abs(sensor.x - x);
      let deltaY =  Math.abs(sensor.y - y);

      const possibleCoveridge = deltaX + deltaY;

      if (possibleCoveridge <= sensor.range) {
        covered = true;

        // try to extend the range
        const testX = x + deltaX * 2;

        if (Math.abs(sensor.x - testX) + deltaY <= sensor.range) {
          x = testX;
        }

        break;
      }
    }

    if (!covered) {
      console.log(x * 4000000 + y);
      found = true;
      break;
    }

    x++;
  }

  if (found) {
    break;
  }
}
