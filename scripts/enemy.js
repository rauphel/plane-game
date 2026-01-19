class enemy { // simple enemy where you can tell it where to spawn in a general location and then moves a random amount
  constructor(x, y, z) {
    this.position = createVector(x, y, z); 
    this.position.add(this.locationRandomizer());
    this.groundCollision();
    this.radius = 50;

    this.health = 100;
    this.color = 'white';
    this.phase = 0;
  }

  update(player) {
    this.render(player); 
  }

  locationRandomizer() { //returns a random direction to move to
    let randomDist = SUBDIVISIONS*Math.ceil(random(0, 5));
    let randomDirection = p5.Vector.random3D();
    randomDirection.setMag(randomDist);
    return randomDirection;
  }

  display() { // simple display of a sphere
    push();
    translate(this.position);
    fill(this.color);
    sphere(this.radius);
    pop();
  }
  bulletCollision(ray) { //takes in a ray from the craft and then checks for a hit using ray/sphere intersection
    // by using the dot product between the direction of the ray and the line between the craft and the enemy 
    //and the checks the distance between the enemy position and the dot product if it is less than the radius of the enemy
    let l = p5.Vector.sub(this.position, ray.origin);
    let tc = p5.Vector.dot(l, ray.direction);

    if (tc < 0 ) {
      return false;
    }

    let d2 = Math.sqrt(l.mag()**2 - tc**2);

    if (d2 > this.radius) {
      return false;
    }

    this.healthDisplay(); //since if this function is ran it is being hit, the health can then be checked aswell
    return true;
  }
  healthDisplay() { // changes the color and position with certain health value changes and is split into 4 phases
    if (this.health > 75 && this.phase === 0) {
      this.color = 'green';
      this.phase++;

    }
    else if (this.health < 75 && this.health > 50 && this.phase === 1) {
      this.color = 'yellow';
      this.phase++;
      this.position.add(this.locationRandomizer());
      this.groundCollision();
    }
    else if (this.health < 50 && this.health > 25 && this.phase === 2) {
      this.color = 'orange';
      this.phase++;
      this.position.add(this.locationRandomizer());
      this.groundCollision();
    }
    else if (this.health < 25 && this.health > 0 && this.phase === 3){
      this.color = 'red';
      this.phase++;
      this.position.add(this.locationRandomizer());
      this.groundCollision();
    }
  }
  groundCollision() {
    let currentPosition = terrainOrigin(this);
    let xPosition = Math.abs(currentPosition.x%terrainHeight.length);
    let zPosition = Math.abs(currentPosition.z%terrainHeight.length);
    if (this.position.y > terrainHeight[xPosition][xPosition]) {
      this.position.y = terrainHeight[zPosition][zPosition];
      console.log(true);
    }
  }
  render(player) {
    if (player.position.dist(this.position) < RENDER_DISTANCE*3) {
      this.display();
    }
    else if (player.position.dist(this.position) < RENDER_DISTANCE/2) {
      this.groundCollision();
    }
  }
}