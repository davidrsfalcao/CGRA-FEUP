/**
* MyExplosion
* @constructor
*/
function MyExplosion(scene, x, y, z) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.state = "ON";
    this.time = 0;

    //Coordinates of submarine
    this.x = x;
    this.y = y;
    this.z = z;

    this.particles = [];

    var n;
    for (var i = 0; i < 500; i++) {
        n = this.scene.getRandomInt(-4,4);
        this.particles.push(new MyParticle(this.scene,x,y,z,n));
    }


};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {

    this.scene.translate(this.x,this.y,this.z);
    this.scene.scale(1,1,1);
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].display();
    }

}

MyExplosion.prototype.update = function(delta_t) {

    this.time += delta_t;
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update(delta_t);
        this.particles[i].display();
    }

    if (this.time > 5000)
    {
        this.state = "OF";
    }
}
