import { readFileSync } from "fs";

const inputText = readFileSync("input.txt").toString();
// const inputText = readFileSync("test-input.txt").toString();

const input = inputText.split("\n");

const row = 2000000;

const exclusion = [];

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

  // does this sensor's range overlap with the row of interest?
  const distance = Math.abs(sensorY - row);
  const possibleOverlap = range - distance;
  const startX = sensorX - possibleOverlap;
  const stopX = sensorX + possibleOverlap;

  if (possibleOverlap > 0) {
    for (let x = startX; x < stopX; x++) {
      exclusion[x] = "#";
    }
  }
}

console.log(Object.keys(exclusion).length);
