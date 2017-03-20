function MyTable(scene) {
 CGFobject.call(this,scene);

 this.MyUnitCubeQuad =new MyUnitCubeQuad(this.scene);
 this.MyUnitCubeQuad.initBuffers();

  this.materialDefault = new CGFappearance(this.scene);

    this.metallic = new CGFappearance(this.scene);
	this.metallic.setAmbient(0.74,0.78,0.8,1);
	this.metallic.setDiffuse(0.74,0.78,0.8,1);
	this.metallic.setSpecular(0.74,0.78,0.8,1);	
	this.metallic.setShininess(120);

	this.wood = new CGFappearance(this.scene);
	//this.wood.setAmbient(0.4,0.2,0,1);
	//this.wood.setDiffuse(0.4,0.2,0,1);
	//this.wood.setSpecular(0.4,0.2,0,0);
	//this.wood.setShininess(50);
    this.wood.loadTexture("../resources/images/table.png");
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function () {


    //PRIMEIRA PERNA
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,4.25);
    this.metallic.apply();
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();
    
     //SEGUNDA PERNA
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(7.5,0.5,-4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();
    
    //TERCEIRA PERNA
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,-4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

    //QUARTA PERNA
    this.scene.pushMatrix();
    this.scene.scale(0.3,3.5,0.3);
    this.scene.translate(-7.5,0.5,4.25);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

    //TAMPO
    this.wood.apply();
    this.scene.pushMatrix();
    this.scene.translate(0,3.5,0);
    this.scene.scale(5,0.3,3);
    this.MyUnitCubeQuad.display();
    this.scene.popMatrix();

};