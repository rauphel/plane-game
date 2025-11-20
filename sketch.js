// StarFighters
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let freeCam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  rows = TERRAIN_Z / SUBDIVISIONS;
  cols = TERRAIN_X / SUBDIVISIONS;
  seed = random(1, 100);
  terrainHeight = generateHeight(cols, rows, seed);
  freeCam = new MovableCam(0, 0, 0);
}

function draw() {
  background(220);

  let origin = terrainOrigin(freeCam);
  showTerrain(origin);
  freeCam.update();
}

function keyPressed() { // seed randomizer and gets new heights
  if (key === "r") {
    seed = random(1, 100);
    terrainHeight = generateHeight(cols, rows, seed);
  }
}
function doubleClicked() { // locks cursor with double click
  requestPointerLock();
}
