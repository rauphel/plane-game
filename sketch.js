// StarFighters
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let freeCam;
let origin;
let deathStar;
let enemyList = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  debugMode();
  rows = RENDER_DISTANCE / SUBDIVISIONS;
  cols = RENDER_DISTANCE / SUBDIVISIONS;
  seed = random(1, 100);
  freeCam = new MovableCam(0, 0, 0);
  craft = new aircraft(0, -20, 50);
  enemyList.push(new enemy(500, 0, 300));
  origin = terrainOrigin(craft);
  terrainHeight = generateHeight(cols, rows, seed, origin);
}

function draw() {
  background(220);


  terrainUpdate(craft);
  freeCam.update();
  craft.update(enemyList);
  for (let enemy of enemyList){
    enemy.update();
  }
}

function keyPressed() { // seed randomizer and gets new heights
  if (key === "r") {
    seed = random(1, 100);
    terrainHeight = generateHeight(cols, rows, seed);
  }
  if (key === "v") {
    setCamera(freeCam.cam);
  }
  if (key === "b") {
    setCamera(craft.cam);
  }
}
function doubleClicked() { // locks cursor with double click
  requestPointerLock();
  // orbitControl();
}
