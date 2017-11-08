var starDust = [],
    NUM_STARS = 10;
    minSpd = -2,
    maxSpd = 2;

// Izzm
function Star(_v)
{

    this.pos = new THREE.Vector3(izzmRandom(-133,133), izzmRandom(0,window.innerHeight*0.3), izzmRandom(-10, 0));
    this.vel = new THREE.Vector3(Math.random() * 9000 / 33, Math.random() * 9000 / 3333, -Math.random() * 9000 / 333);
    this.acc = new THREE.Vector3(0, izzmRandom(Math.sin(9000)) / 333, 0);

    this.dust = new THREE.Mesh(starGeo, starMat);


    this.update = function ()
    {

        var dBait = math.distance([this.pos.x, this.pos.y], [mousePos.x, mousePos.y, 133]);
        this.acc.subVectors(mousePos, this.pos);
        this.acc.setLength(map_range(dBait, 333, 0, 0, 0.07));
        this.vel.normalize();
        this.vel.add(this.acc);
        this.vel.clampScalar(minSpd, maxSpd);
        this.pos.add(this.vel);
        this.acc.set(0, 0, 0);
    };


    this.display = function ()
    {
        var dist = math.distance([this.pos.x, this.pos.y, this.pos.z], [mousePos.x,mousePos.y,0]);
        this.dust.position.set(this.pos.x, this.pos.y, this.pos.z);
        this.dust.scale.set(dist / 33, dist / 33, dist / 33);
        this.dust.geometry.dynamic = true;
    };

    this.edges = function()
    {
      var dustDist = math.distance([this.pos.x, this.pos.y], [mousePos.x,mousePos.y]);

      if (dustDist < 3)
      {
        this.pos.x = izzmRandom(-133,133);
        this.pos.y = izzmRandom(0,333);
        this.pos.z = izzmRandom(-3,3);
      }
    }
};
