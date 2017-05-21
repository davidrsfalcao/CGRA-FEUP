/**
* MyLid
* @constructor
*/
function MyLid(scene, x , z , size) {
    CGFobject.call(this,scene);
    this.scene = scene;

		this.x = x;
		this.z = z;
		this.size = size;

		this.chest_side = new MySemiCircle(this.scene,20);
		this.chest_top  = new MySemiCylinder(this.scene,20,1);
};

MyLid.prototype = Object.create(CGFobject.prototype);
MyLid.prototype.constructor = MyLid;

MyLid.prototype.display = function() {
	//Top side chest
	this.scene.pushMatrix();
		this.scene.translate( (0+this.x)*this.size ,0.6*this.size, (0.5+this.z)*this.size );
		this.scene.scale(0.5*this.size,0.4*this.size,1*this.size);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.chestTopSideAppearance.apply();
		this.chest_side.display();
	this.scene.popMatrix();

	//Top side chess
	this.scene.pushMatrix();
		this.scene.translate( (0+this.x)*this.size ,0.6*this.size, (-0.5+this.z)*this.size );
		this.scene.scale(0.5*this.size,0.4*this.size,1*this.size);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.chestTopSideAppearance.apply();
		this.chest_side.display();
	this.scene.popMatrix();

	//Chest Lid
	this.scene.pushMatrix();
		this.scene.translate( (0+this.x)*this.size ,0.6*this.size, (0.5+this.z)*this.size );
		this.scene.scale(0.5*this.size,0.4*this.size,1*this.size);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.chestBackAppearance.apply();
		this.chest_top.display();
	this.scene.popMatrix();
}

MyLid.prototype.getRotateAxis = function(){
	return 0.1*this.size;
}
