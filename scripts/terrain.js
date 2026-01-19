// terrain generation

// initializes grid for triangles width and length and its SUBDIVISIONS
const SUBDIVISIONS = 50;
const TERRAIN_X = 1000;
const TERRAIN_Z = 1000;
const RENDER_DISTANCE = 1000;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = -200;
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
      heights[z].push(map(noise(xOffset, zOffset), 0, 1, MAX_HEIGHT, MIN_HEIGHT));
      xOffset += OFFSET;
    }
    zOffset += OFFSET;
  }
  return heights;
}

// Displays the terrain centering on the coordinates given
function _showTerrain(originVector) {
  push();

  strokeWeight(0.5);
  let _z = 0;
  for (let z = originVector.z - floor(rows/2); z < floor(rows/2) + originVector.z - 1; z++) { // generates a triangles strip to display terrain using generated heights in 2d array
    beginShape(TRIANGLE_STRIP);
    let _x = 0;
    for (let x = originVector.x - floor(cols/2); x < floor(cols/2) + originVector.x - 1; x++) {
      let color = colorMap(terrainHeight[_z][_x]);
      fill(color);
      stroke(color);
      vertex(x * SUBDIVISIONS,terrainHeight[_z][_x] , z * SUBDIVISIONS);
      vertex(x * SUBDIVISIONS, terrainHeight[_z + 1][_x], (z + 1) * SUBDIVISIONS);
      
      _x++;
    }
    _z++;

    endShape();
  }
  pop();

}

function terrainOrigin(player) { //returns the position in terms of subdivisions of the given class
  let _x = Math.floor(player.position.x/SUBDIVISIONS);
  let _z = Math.floor(player.position.z/SUBDIVISIONS);

  originVector = createVector(_x, 0, _z);

  return originVector;
}

function showPlane(originVector) {
  push();
  translate(originVector.x * SUBDIVISIONS, MIN_HEIGHT + 50, originVector.z * SUBDIVISIONS);
  rotateX(PI/2);
  fill(color(15,94,156));
  stroke(color(15,94,156));
  plane(TERRAIN_X * 5, TERRAIN_Z * 5);
  pop();
}

function terrainUpdate(player) { //updates the terrain based on the position of a craft
  origin = terrainOrigin(player);

  showPlane(origin);

  terrainHeight = generateHeight(cols, rows, seed, origin);
  _showTerrain(origin);

}

function colorMap(height) {
  if (height < MAX_HEIGHT/3) {
    return color(19,109,21); //grass
  }
  else if (height < 0) {
    return color(225,191,146); //sand color
  }
  else if (height < MIN_HEIGHT/2) {
    return color(116,204,244); // light ocean
  }
  else if (height < MIN_HEIGHT){
    return color(15,94,156); // deep blue
  }
}

