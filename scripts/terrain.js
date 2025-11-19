// terrain generation

// initializes grid for triangles width and length and its SUBDIVISIONS
const SUBDIVISIONS = 20;
const TERRAIN_X = 1000;
const TERRAIN_Y = 1000;
let rows, cols;


// 2d array keeping the z values of each grid
let terrainHeight;
let seed;           // noise seed saved as a global variable to be able to save it

function generateHeight(cols, rows, seed) { // generates a 2d grid using perlin noise 
  // offset is the distance between each point 
  let heights = [];
  let yOffset = 0;

  noiseSeed(seed);  // sets the seed
  for (let y = 0; y < rows; y++) {
    heights.push([]);
    let xOffset = 0;
    for (let x = 0; x < cols; x++) { //pushes noise value mappes to a max of 100 and min of -100 and offset is distance between each noise valie
      heights[y].push(map(noise(xOffset, yOffset), 0, 1, -100, 100));
      xOffset += 0.2;
    }
    yOffset += 0.2;
  }
  return heights;
}

function showTerrain() {
  push(); // isolates translations
  fill('gray');
  translate(-TERRAIN_X/2, 0, -TERRAIN_Y/2); //transforms to be a plane on the x and z axis
  rotateX(PI/2);

  for (let y = 0; y < rows - 1; y++) { // generates a triangles strip to display terrain using generated heights in 2d array
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * SUBDIVISIONS, y * SUBDIVISIONS, terrainHeight[y][x]);
      vertex(x * SUBDIVISIONS, (y + 1) * SUBDIVISIONS, terrainHeight[y + 1][x]);
    }
    endShape();
  }
  pop();
}