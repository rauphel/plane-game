// terrain generation

// initializes grid for triangles width and length and its SUBDIVISIONS
const SUBDIVISIONS = 50;
const TERRAIN_X = 2000;
const TERRAIN_Z = 2000;
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
  for (let z = 0; z < rows; z++) {
    heights.push([]);
    let xOffset = OFFSET * originVector.x;
    for (let x = 0; x < cols; x++) { //pushes noise value mappes to a max of 100 and min of -100 and offset is distance between each noise valie
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
  translate(-TERRAIN_X/2, 0, -TERRAIN_Z/2); //transforms to be a plane on the x and z axis
  rotateX(PI/2);

  for (let z = 0; z < rows - 1; z++) { // generates a triangles strip to display terrain using generated heights in 2d array
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex((x + originVector.x) * SUBDIVISIONS, (z + originVector.z) * SUBDIVISIONS, terrainHeight[z][x]);
      vertex((x + originVector.x) * SUBDIVISIONS, (z + 1 + originVector.z) * SUBDIVISIONS, terrainHeight[z + 1][x]);
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