class enemy {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);

    this.health = 1000;
  }

  update() {

  }
  display() {
    sphere();
  }
}