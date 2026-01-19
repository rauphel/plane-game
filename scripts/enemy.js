class enemy {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.position.add(this.locationRandomizer());
    this.groundCollision();
    this.radius = 50;

    this.health = 100;
    this.color = 'white';
    this.phase = 0;
  }

  update() {
    this.display();
  }

  locationRandomizer() {
    // let _x = random();
    // let _y = random();
    // let _z = random();
    let randomDist = SUBDIVISIONS*Math.ceil(random(0, 5));
    let randomDirection = p5.Vector.random3D();
    randomDirection.setMag(randomDist);
    return randomDirection;
  }

  display() {
    push();
    translate(this.position);
    fill(this.color);
    sphere(this.radius);
    pop();
  }
  bulletCollision(ray) {
    let l = p5.Vector.sub(this.position, ray.origin);

    let tc = p5.Vector.dot(l, ray.direction);
    // console.log(ray.direction.toString() + 'r');
    // console.log(l.toString() + l.mag());
    // console.log(tc + 'tc');
    if (tc < 0 ) {
      return false;
    }
    let d2 = Math.sqrt(l.mag()**2 - tc**2);
    // console.log(d2 + "d2");
    // console.log(Math.sqrt(d2)+ 'd');
    if (d2 > this.radius) {
      return false;
    }
    this.healthDisplay();

    // let t1c = Math.sqrt(this.radius**2 - d2);
    return true;
  }
  healthDisplay() {
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
}