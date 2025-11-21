class MovableCam {
  constructor(x, y, z) { 
    this.x = x; // world coordinates
    this.y = y;
    this.z = z;
    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.x, this.y, this.z);

    this.rY = 0;  // rotation based on the y-axis
    this.rX = -90; // rotation based on the x-axis
    this.camVector; //vector for where it's looking
    this.MIN_PITCH = 1;
    this.MAX_PITCH = 179;

    this.sensitivity = 0.1; //cam sensitivity and speed
    this.speed = 10;
  }

  update() {
    // centralizes class' functions
    this.look();
    this.pointCam();
    this.move();

  }

  look() { 
    // gets mouse movement on x and y axis and converts into degrees 
    this.rY -= movedX * this.sensitivity;
    this.rX += movedY * this.sensitivity;

    this.rX = constrain(this.rX, this.MIN_PITCH, this.MAX_PITCH); // constraints cam rotation based on x axis
    this.rY = this.rY % 360;  // keeps cam rotation on y-axis from 1-360 degrees
  }

  pointCam() {
    // creates a vector from the origin to the angles stated the first being theta(x axis rotation) and the second being phi(y-axis rotation) and angles taken from mouse movement
    this.camVector = p5.Vector.fromAngles(radians(this.rX), radians(this.rY)); 
    //translates the vector to the cameras coordinates and makes the camera look at that point
    this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);

  }
  move() {
    //movement is done through the camera's local axis'
    if (keyIsDown(87)) { // w; forward
      this.cam.move(0, 0, -1 * this.speed);
    }
    if (keyIsDown(83)) { // s; back
      this.cam.move(0, 0, 1 * this.speed);
    }
    if (keyIsDown(65)) { // a; left
      this.cam.move(-1 * this.speed, 0, 0);
    }
    if (keyIsDown(68)) { // d; right
      this.cam.move(1 * this.speed, 0, 0);
    }
    if (keyIsDown(16)) { // shift; down
      this.cam.move(0, 1 * this.speed, 0);
    }
    if (keyIsDown(32)) { // space; up
      this.cam.move(0, -1 * this.speed, 0);
    }
    // updates object's coords with camera coords
    this.x = this.cam.eyeX;
    this.y = this.cam.eyeY;
    this.z = this.cam.eyeZ;
  }
}