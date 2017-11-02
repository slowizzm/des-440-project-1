

function Particle(_v)
{
  theta = 0.1;
  this.pos = createVector(width/2,height/2);
  this.vel = createVector(random(-_v,_v),random(-_v,_v));
  this.acc = createVector(0,_v/33);

  this.update = function()
  {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function()
  {
    var cent = dist(this.pos.x,this.pos.y,width/2,height/2);
    rectMode(CENTER);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(theta);
    noStroke();
    fill(map(cent,0,width,0,255),map(cent,0,width,0,255), cent);
    rect(0,0,_v*3,_v*3);
    pop();

    theta+=33;
  }

  this.edges = function()
  {
    if (this.pos.x <= 0 || this.pos.x >= width)
    {
      this.vel.x *= -1;
    }

    if (this.pos.y <= 0 || this.pos.y >= height)
    {
      this.vel.y *= -1;
    }
  }
}
