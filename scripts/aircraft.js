class aircraft {
  constructor(x, y, z) {

    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    this.accelRate = 0;

    this.maxSpeed = 10;
    
    this.direction = createVector(0, 0, 1);
    
    this.mass = 10;
    
    this.xAxis = createVector(1,0,0); 
    this.yAxis = createVector(0,1,0);
    // this.zAxis = createVector(0,0,1);

    this.firing = false;


    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.position.x, this.position.y - 50, this.position.z - 200);
    this.cam.lookAt(this.direction.x, this.direction.y - 25, this.direction.z);
    this.rY = 0;  // rotation based on the y-axis
    this.rX = 0; // rotation based on the x-axis
    this.camVector; //vector for where it's looking

    this.sensitivity = 0.1;
  }
  update(enemies) {
    this.inputs();
    this.look();
    this.setCam();
    this.move();
    this.lazerGun(enemies);
    this.display();
    // console.log(this.direction.angleBetween(this.velocity) < PI/2 && this.direction.angleBetween(this.velocity) > -PI/2);
    // console.log(radians(this.rX));
    // console.log(this.velocity.toString());
    // console.log(this.direction.heading());
  }
  display() { // rotate based on direction with y values set 0
    let tempx = createVector(this.direction.x, 0 , this.direction.z).setMag(1); //after 180 degrees 
    // let tempy = createVector(0, this.direction.y , this.direction.z);
    
    push();
    // stroke('blue');
    // line(0,0,0, tempx.x*100, tempx.y*100, tempx.z*100);
    // line(0,0,0, 100, 0, 0);
    translate(this.position);
    
    rotateY(radians(this.rY));
    rotateX(-(radians(this.rX) + PI/2));
   
    push();
    // translate(0,30,0);
    rotateY(PI);
    rotateX(PI/2);
    fill(255, 255, 255, 50);
    noStroke();
    cone(30, 60, 5);
    pop();
    pop();
  }
  
  physics() {
    
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
    // console.log(this.direction.toString());
    // this.direction = createVector(this.position.x + this.camVector.x, this.position.y + this.camVector.y, this.position.z + this.camVector.z);
    // this.direction.add(this.camVector);
    //translates the vector to the cameras coordinates and makes the camera look at that point
    
    // this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);
  }
  setCam() { //set camPos to be pos - direction and look at pos + dir
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
    if (mouseIsPressed) {
      this.firing = true;
    }
    else {
      this.firing = false;
    }
  }

  lazerGun(enemies) {
    if (this.firing){
    //   // make a line and copy of current direction then apply transformation to move line in direction;
      let target = this.direction.copy();
      // target.setMag(1000);
      let ray = {
        origin: this.position,
        direction: target,
      };
      for (let enemy of enemies) {
        let hit = enemy.bulletCollision(ray);
        // console.log(hit);
        if (hit) {
          enemy.color = 'gray';
          enemy.health -= 1/frameRate();
        }
        else {
          enemy.color = 'white';
        }
        target.setMag(1000);
        target.add(this.position.x, this.position.y, this.position.z);
        // stroke('blue');
        line(this.position.x, this.position.y, this.position.z, target.x, target.y, target.z);
      }
    }

  }
}   