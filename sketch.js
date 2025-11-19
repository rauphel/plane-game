// StarFighters
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  rows = TERRAIN_Y / SUBDIVISIONS;
  cols = TERRAIN_X / SUBDIVISIONS;
  seed = random(1, 100);
  terrainHeight = generateHeight(cols, rows, seed);
}

function draw() {
  background(220);
  circle(mouseX - width/2, mouseY - height/2, 100);
  showTerrain();
}

function keyPressed() { // seed randomizer and gets new heights
  if (key === "r") {
    seed = random(1, 100);
    terrainHeight = generateHeight(cols, rows, seed);
  }
}