// StarFighters
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Sources
//https://www.youtube.com/watch?v=kJMx0F7e9QU

let freeCam;
let origin;
let deathStar;
let enemyList = [];

function preload() {
  // loads font
  font = loadFont('Inconsolata.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  rows = RENDER_DISTANCE / SUBDIVISIONS;
  cols = RENDER_DISTANCE / SUBDIVISIONS;

  textFont(font);
  textSize(5);

  seed = random(1, 100);
  freeCam = new MovableCam(0, 0, 0);
  craft = new aircraft(0, -20, 50);
  origin = terrainOrigin(craft);
  terrainHeight = generateHeight(cols, rows, seed, origin);
  enemyList.push(new enemy(500, 0, 300));
}

function draw() {
  background(220);


  terrainUpdate(craft);
  freeCam.update();
  craft.update(enemyList);
  for (let enemy of enemyList){
    enemy.update(craft);

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
  if (key === 'c') {
    craft.showHud = !craft.showHud;
  }
}

function mouseClicked() {
  requestPointerLock();
}
