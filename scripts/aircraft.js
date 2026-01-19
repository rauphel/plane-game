class aircraft {
  constructor(x, y, z) {

    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    this.accelRate = 0;

    this.maxSpeed = 10;
    
    this.direction = createVector(0, 0, 1);
    
    this.mass = 10;
    this.shipWidth = 30;
    this.shipLength = 60;
    this.color = color(132,132,130);

    this.LASERLENGTH = 2000;
    this.firing = false;
    this.DAMAGE = 20;

    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.position.x, this.position.y - 50, this.position.z - 200);
    this.cam.lookAt(this.direction.x, this.direction.y - 25, this.direction.z);
    this.rY = 0;  // rotation based on the y-axis
    this.rX = 0; // rotation based on the x-axis
    this.camVector; //vector for where it's looking

    this.sensitivity = 0.1;
    this.showHud = true;
  }
  update(enemies) { // updates all functions needed in one function
    this.inputs();
    this.look();
    this.setCam();
    this.move();
    this.groundCollision();
    this.lazerGun(enemies);
    this.display();
    this.hudDisplay();

  }
  display() { 
    //translates to position and then turns to camera direction by using the same values that setCam() uses
    
    push();
    translate(this.position);
    rotateY(radians(this.rY));
    rotateX(-(radians(this.rX) + PI/2));
   
    push();
    rotateY(PI);
    rotateX(PI/2);
    fill(this.color);
    noStroke();
    cone(this.shipWidth, this.shipLength, 5);
    pop();
    pop();
  }
  
  move() {
    let heading = this.direction.copy(); 
    //changes in heading is the same as change in acceleartion; when not acceleratiing the current velocity is saves
    //and then changes in acceleration is made with a dummy variable and then velocity is set to its previous mag
    if (this.accelRate === 0) {
      let currentVelocity = this.velocity.mag();
      heading.setMag(1);
      this.acceleration = heading;
      this.velocity.add(this.acceleration);
      this.velocity.setMag(currentVelocity);
    }
    else {
      heading.setMag(this.accelRate);
      
      this.acceleration = heading;
      this.velocity.add(this.acceleration);
    }
    // checks when decelerating if the velocity's direction has changed from the camera direction and sets it to 0
    // solve decelerating too quick when turning
    if (this.accelRate < 0 &&
      !(this.direction.angleBetween(this.velocity) < PI/2 && this.direction.angleBetween(this.velocity) > -PI/2)) {
      this.velocity.set();
    }

    // limits velocity to a max speed and then updates position
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
  }
  
  look() { //instead of locking plane to the camera, try locking cam to plane
    this.rY -= movedX * this.sensitivity;
    this.rX -= movedY * this.sensitivity;
    
    this.rX = this.rX % 360; // constraints cam rotation based on x axis
    this.rY = this.rY % 360;  // keeps cam rotation on y-axis from 1-360 degrees
    // creates a vector from the origin to the angles stated the first being theta(x axis rotation) and the second being phi(y-axis rotation) and angles taken from mouse movement
    this.direction = p5.Vector.fromAngles(radians(this.rX), radians(this.rY));
    this.direction.setMag(1);

  }
  setCam() { //set camPosition to be position - direction and look at position + direction
    this.cam.setPosition(this.position.x - this.direction.x*200, this.position.y - this.direction.y*200 - 50, this.position.z - this.direction.z*200);
  
    this.cam.lookAt(this.position.x + this.direction.x, this.position.y + this.direction.y, this.position.z + this.direction.z);
    this.direction.setMag(1);
  }

  inputs() {
    if (keyIsDown(16)) { //shift key; accelerate
      this.accelRate = 0.1;
    }
    else if (keyIsDown(17)) { //ctrl key; decelerate
      this.accelRate = -0.1;
    }
    else {
      this.accelRate = 0;
    }
    if (mouseIsPressed) { // firing the lazer
      this.firing = true;
    }
    else {
      this.firing = false;
    }
  }

  lazerGun(enemies) {
    if (this.firing){
    // make a line and copy of current direction then apply transformation to move line in direction;
      let target = this.direction.copy();

      let ray = {
        origin: this.position,
        direction: target,
      };
      for (let enemy of enemies) { // checks every enemy if it is being hit 
        let hit = enemy.bulletCollision(ray);

        if (hit) { 
          enemy.health -= this.DAMAGE/frameRate();
        }
        if (enemy.health <= 0) { //checks if enemy is dead and then gets rid of it
          enemyList.splice(enemyList.indexOf(enemy), 1);
        }
      }
      target.setMag(this.LASERLENGTH);
      target.add(this.position.x, this.position.y, this.position.z);
      push();
      stroke('red'); //the visible laser
      line(this.position.x, this.position.y, this.position.z, target.x, target.y, target.z);
      pop();
    }

  }
  groundCollision() {
    if (this.position.y > terrainHeight[9][9]) { //finds the height of the center most piece of the terrain height array 
      //and compares to current height and repositions to be above if below
      this.position.y = terrainHeight[9][9] - this.shipWidth;
    }
  }
  hudDisplay() { // hud system by finding the cameras current angles and position and then positioning text in front
    if (this.showHud) {

      push();
      // the angles of the camera between its location and where its looking
      let _pan = atan2(this.cam.eyeZ - this.cam.centerZ, this.cam.eyeX - this.cam.centerX); 
      let _tilt = atan2(this.cam.eyeY - this.cam.centerY, dist(this.cam.centerX, this.cam.centerZ, this.cam.eyeX, this.cam.eyeZ));
      translate(this.cam.eyeX, this.cam.eyeY, this.cam.eyeZ);
      rotateY(-_pan);
      rotateZ(_tilt + PI);
      translate(100, 0,0); //distance from camera
      // sphere()
      push();
      rotateY(-PI/2);
      rotateZ(PI);
      translate(-100, -50, 0);
      fill('black');
      text('left mouse button: shoot, shift: accelerate, ctrl: decelerate, r; randomize seed, c: toggle texts, goal: find and shoot down sphere', 0, 0, 200, 800);
      pop();
      pop();
    }
  }
}   