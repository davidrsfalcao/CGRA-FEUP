/**
* MyParticle
* @constructor
*/
function MyParticle(scene, x, y, z, i) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.z = z;
    this.i = i;

    this.img = new MyUnitCubeQuad(scene);
};

MyParticle.prototype = Object.create(CGFobject.prototype);
MyParticle.prototype.constructor = MyParticle;

MyParticle.prototype.display = function() {

    this.scene.translate(this.x, this.y, this.z);
    this.img.display();
}

MyParticle.prototype.update = function(delta_t) {

    this.x = this.x + (this.i / (delta_t/1000));
    this.y = this.y + (Math.abs(this.i) / (delta_t/1000));
    this.z = this.z + (this.i / (delta_t/1000));
}
