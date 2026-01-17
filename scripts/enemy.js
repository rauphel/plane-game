class enemy {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.radius = 50;

    this.health = 100;
    this.color = 'white';
  }

  update() {
    this.display();
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
    
    // let t1c = Math.sqrt(this.radius**2 - d2);
    return true;
  }
  health() {
    
  }
}