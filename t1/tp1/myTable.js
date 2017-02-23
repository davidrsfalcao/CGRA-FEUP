function myTable(scene) {
 CGFobject.call(this,scene);

 this.MyUnitCubeQuad =new MyUnitCubeQuad(this.scene);
 this.MyUnitCubeQuad.initBuffers();
};

myTable.prototype = Object.create(CGFobject.prototype);
myTable.prototype.constructor = myTable;

myTable.prototype.display = function () {
    

    // As pernas têm dimensões (0.3*3.5*0.3)
    // O tampo tem dimensões (5*0.3*3)

    //Perna1
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();
    
     //Perna2
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,-4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();
    
    //Perna3
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,-4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

    //Perna4
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

    //Tampo da mesa
    this.scene.pushMatrix();
    this.scene.translate(0,3.5,0);
    this.scene.scale(5,0.3,3);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

};