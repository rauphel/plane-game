class aircraft {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.speed;
    this.direction = createVector(0,0,1);
    
    this.mass;
    

    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.x, this.y, this.z);
    this.rY = 0;  // rotation based on the y-axis
    this.rX = -90; // rotation based on the x-axis
    this.camVector; //vector for where it's looking

    this.sensitivity = 0.1;
  }
  update() {
    this.display();
    this.look();
  }
  display() {
    push();

    cone(30, 50, 5);
    pop();
  }

  physics() {

  }
  move() {

  }
  look() { //instead of locking plane to the camera, try locking cam to plane
    this.rY -= movedX * this.sensitivity;
    this.rX -= movedY * this.sensitivity;

    this.rX = this.rX % 360; // constraints cam rotation based on x axis
    this.rY = this.rY % 360;  // keeps cam rotation on y-axis from 1-360 degrees
    // creates a vector from the origin to the angles stated the first being theta(x axis rotation) and the second being phi(y-axis rotation) and angles taken from mouse movement
    this.camVector = p5.Vector.fromAngles(radians(this.rX), radians(this.rY)); 
    //translates the vector to the cameras coordinates and makes the camera look at that point
    this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);
  }
}