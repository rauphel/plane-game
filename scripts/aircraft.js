class aircraft {
  constructor(x, y, z) {

    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    
    this.direction = createVector(0, 0, 1);
    
    this.mass = 10;
    

    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.position.x, this.position.y - 50, this.position.z - 200);
    this.cam.lookAt(this.direction.x, this.direction.y - 25, this.direction.z);
    this.rY = 0;  // rotation based on the y-axis
    this.rX = 0; // rotation based on the x-axis
    this.camVector; //vector for where it's looking

    this.sensitivity = 0.1;
  }
  update() {
    this.look();
    this.move();
    this.display();
  }
  display() {
    this.cam.setPosition(this.position.x, this.position.y - 50, this.position.z - 200);

    // this.cam.lookAt(this.direction.x, this.direction.y - 25, this.direction.z);
    // push();
    // translate(this.cam.eyeX, this.cam.eyeY, this.cam.eyeZ);
    // sphere(5);
    // pop();
    push();
    
    translate(this.position);
    // rotateX(this.rX);
    // rotateY(this.rY);
    push();
    sphere(5);
    rotateX(PI/2);
    cone(30, 60, 5);
    pop();
    pop();
  }

  physics() {

  }
  move() {
    let heading = this.direction.copy();
    heading.setMag(0.5);
    this.acceleration = heading;
    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
    this.position.add(this.velocity);
  }
  
  look() { //instead of locking plane to the camera, try locking cam to plane
    this.rY += movedX * this.sensitivity;
    this.rX -= movedY * this.sensitivity;

    this.rX = this.rX % 360; // constraints cam rotation based on x axis
    this.rY = this.rY % 360;  // keeps cam rotation on y-axis from 1-360 degrees
    // creates a vector from the origin to the angles stated the first being theta(x axis rotation) and the second being phi(y-axis rotation) and angles taken from mouse movement
    // this.camVector = p5.Vector.fromAngles(radians(this.rX), radians(this.rY)); 
    // this.direction = createVector(this.position.x + this.camVector.x, this.position.y + this.camVector.y, this.position.z + this.camVector.z);
    // this.direction.add(this.camVector);
    //translates the vector to the cameras coordinates and makes the camera look at that point
    
    // this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);
  }
}