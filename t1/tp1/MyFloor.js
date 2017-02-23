function myFloor(scene) {
 CGFobject.call(this,scene);

 this.MyUnitCubeQuad =new MyUnitCubeQuad(this.scene);
 this.MyUnitCubeQuad.initBuffers();
};

myFloor.prototype = Object.create(CGFobject.prototype);
myFloor.prototype.constructor = myFloor;

myFloor.prototype.display = function () {

    // Chão com dimensões (8*0.1*6)
    this.scene.pushMatrix();
    this.scene.scale(8,0.1,6);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

};