// terrain generation

// initializes grid for triangles width and length and its SUBDIVISIONS
const SUBDIVISIONS = 50;
const TERRAIN_X = 5000;
const TERRAIN_Z = 5000;
const RENDER_DISTANCE = 1000;
const MIN_HEIGHT = -100;
const MAX_HEIGHT = 200;
const OFFSET = 0.2;
let rows, cols;


// 2d array keeping the z values of each grid
let terrainHeight;
let seed;           // noise seed saved as a global variable to be able to save it

function generateHeight(cols, rows, seed, originVector) { // generates a 2d grid using perlin noise 
  // offset is the distance between each point 
  let heights = [];
  let zOffset = OFFSET * originVector.z;

  noiseSeed(seed);  // sets the seed
  for (let z = 0; z < TERRAIN_Z/SUBDIVISIONS; z++) {
    heights.push([]);
    let xOffset = OFFSET * originVector.x;
    for (let x = 0; x < TERRAIN_X/SUBDIVISIONS; x++) { //pushes noise value mappes to a max of 100 and min of -100 and offset is distance between each noise valie
      heights[z].push(map(noise(xOffset, zOffset), 0, 1, MIN_HEIGHT, MAX_HEIGHT));
      xOffset += OFFSET;
    }
    zOffset += OFFSET;
  }
  return heights;
}

function showTerrain(originVector) {
  push(); // isolates translations
  fill('gray');
  strokeWeight(0.5);
  translate(-RENDER_DISTANCE/2, 0, -RENDER_DISTANCE/2); //transforms to be a plane on the x and z axis
  rotateX(PI/2);

  for (let z = 0; z < rows - 1; z++) { // generates a triangles strip to display terrain using generated heights in 2d array
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      if (Math.abs(originVector.x) < 40 && Math.abs(originVector.z < 40)) {
        vertex((x + originVector.x) * SUBDIVISIONS, (z + originVector.z) * SUBDIVISIONS, terrainHeight[50 + z + originVector.z][50 + x + originVector.x]);
        vertex((x + originVector.x) * SUBDIVISIONS, (z + 1 + originVector.z) * SUBDIVISIONS, terrainHeight[50 + z + 1 + originVector.z][50 + x + originVector.x]);

      }
    }
    endShape();
  }
  pop();
}

function terrainOrigin(player) {
  let _x = Math.floor(player.x/SUBDIVISIONS);
  let _z = Math.floor(player.z/SUBDIVISIONS);

  originVector = createVector(_x, 0, _z);

  return originVector;
}

function showPlane(originVector) { // plane for tests 
  push();
  translate(originVector.x * SUBDIVISIONS, 0, originVector.z * SUBDIVISIONS);
  rotateX(PI/2);
  fill('blue');
  plane(TERRAIN_X, TERRAIN_Z);
  pop();
}

function terrainUpdate() {
  origin = terrainOrigin(freeCam);
  // origin = createVector(0,0,0);
  // if (Math.abs(origin.x) * SUBDIVISIONS < TERRAIN_X && Math.abs(origin.z) * SUBDIVISIONS < TERRAIN_Z) {
  //   terrainHeight = generateHeight(cols, rows, seed, origin);
  //   showTerrain(origin);
  // }
  // if (Math.abs(origin.x) * SUBDIVISIONS / 2 < TERRAIN_X && Math.abs(origin.z) * SUBDIVISIONS / 2 < TERRAIN_Z){
  //   showPlane(origin);
  // }

  // terrainHeight = generateHeight(cols, rows, seed, origin);
  showTerrain(origin);

}