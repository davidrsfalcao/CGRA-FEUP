/**
* MyPeriscope
* @constructor
*/
function MyPeriscope(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;

    this.cylinder = new MyCylinder(this.scene, 500, 1);
    this.cover = new MyPolygon(this.scene, 500);

};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function() {


    this.scene.pushMatrix();
    this.scene.scale(0.05,0.05,0.2);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.05);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.scale(0.05,0.05,1);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.2);
    this.scene.scale(0.1,0.1,1);
    this.cover.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI,0,1,0);
    this.scene.scale(0.1,0.1,1);
    this.cover.display();
    this.scene.popMatrix();

}
