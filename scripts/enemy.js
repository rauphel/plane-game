class enemy {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);

    this.health = 1000;
  }

  update() {
    this.display();
  }
  display() {
    push();
    translate(this.position);
    sphere();
    pop()
  }
  bulletCollision(ray) {

  }
}