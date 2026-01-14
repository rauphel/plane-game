class enemy {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.radius = 50;

    this.health = 1000;
  }

  update() {
    this.display();
  }
  display() {
    push();
    translate(this.position);
    sphere(this.radius);
    pop();
  }
  bulletCollision(ray) {
    let l = p5.Vector.sub(this.position, ray.origin);

    let tc = p5.Vector.dot(l, ray.direction);
    console.log(l.mag() + 'l');
    console.log(tc + 'tc');
    if (tc < 0 ) {
      return false;
    }
    // let d2 = tc**2 - l.mag()**2;
    // console.log(Math.sqrt(d2)+ 'd');
    // if (d2 > this.radius**2) {
    //   return false;
    // }
    
    // let t1c = Math.sqrt(this.radius**2 - d2);
    return true;
  }
}