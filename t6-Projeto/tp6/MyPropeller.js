/**
* MyPropeller
* @constructor
*/
function MyPropeller(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.angle = 30;
    this.position = 0;

    this.cylinder = new MyCylinder(this.scene, 500, 1);
    this.cylinder1 = new MyCylinderInverted(this.scene,500,1);
};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor = MyPropeller;

MyPropeller.prototype.display = function() {

}
