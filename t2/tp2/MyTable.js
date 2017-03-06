/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
 	CGFobject.call(this, scene);

 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();
 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display_legs = function() {
 	// legs
    //Perna1
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,4.25);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
    
     //Perna2
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,-4.25);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
    
    //Perna3
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,-4.25);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    //Perna4
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,4.25);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();

    
 }

 MyTable.prototype.display_top = function() {
    //Tampo da mesa
    this.scene.pushMatrix();
    this.scene.translate(0,3.5,0);
    this.scene.scale(5,0.3,3);
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
 }
