/**
* MyTorpedo
* @constructor
*/
function MyTorpedo(scene, sub, target) {
    CGFobject.call(this,scene);
    this.scene = scene;

    //Coordinates of the torpedo
    this.x = sub.x+0.35;
    this.y = sub.y+0.75;
    this.z = sub.z+2.5;

		this.x_angle = sub.angle_mult*Math.PI/45;

		this.time = 0.0;
		this.t = 0.0;
		this.target = target;

		//Fin Vertical movement
    this.finV_angle = sub.finV_angle;

    //Fin Horizontal movement
    this.finH_angle = sub.finH_angle;

    this.back_fin = new MyWing(this.scene, 2.34, 0.35);
		this.cylinder = new MyCylinder(this.scene, 500, 1, false);
    this.front = new MyLamp(this.scene, 500, 10);

		this.generatePoints();
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

		this.scene.translate(this.x , this.y , this.z );
		this.scene.rotate(this.x_angle,0,1,0);

		// Main Cylinder
		this.scene.pushMatrix();
			this.scene.translate( 0+this.x , 0+this.y , 1+this.z );
			this.scene.scale( 0.1 , 0.1 , 1); // 0.73 x 1.20 x 4.08
			this.scene.rotate(Math.PI,0,1,0);
			this.cylinder.display();
		this.scene.popMatrix();

		// Submarine Front
    this.scene.pushMatrix();
	    this.scene.translate(0+this.x , 0+this.y , 1+this.z );
	    this.scene.scale( 0.1 , 0.1 , 0.1); // 0.73 x 1.20 x 0.46
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.front.display();
    this.scene.popMatrix();

    // Submarine Back
    this.scene.pushMatrix();
			this.scene.translate( this.x , this.y , this.z );
	    this.scene.scale( 0.1  , 0.1 , 0.1 ); // 0.73 x 1.20 x 0.46
	    this.scene.rotate(-Math.PI/2,1,0,0);
	    this.front.display();
    this.scene.popMatrix();

    //Barbatana traseira horizontal
    this.scene.pushMatrix();
			this.scene.translate( this.x , this.y , this.z );
			this.scene.scale(0.2 , 0.2 , 0.2 );
    	this.scene.rotate(-this.finH_angle,1,0,0);
    	this.back_fin.display();
    this.scene.popMatrix();

    //Barbatana traseira vertical
    this.scene.pushMatrix();
			this.scene.translate( this.x , this.y , this.z );
			this.scene.scale(0.2 , 0.2 , 0.2 );
    	this.scene.rotate(this.finV_angle,0,1,0);
    	this.scene.rotate(Math.PI/2,0,0,1);
    	this.back_fin.display();
    this.scene.popMatrix();
}

MyTorpedo.prototype.generatePoints = function(){
    this.distance = Math.sqrt(Math.pow(this.scene.chests[0].x - this.x ,2) +
		 							  				  Math.pow(-this.y ,2) +
															Math.pow(this.scene.chests[0].z - this.z ,2));

		this.pt1 = [this.x, 0 ,this.z];
		this.pt2 = [this.x + 6 ,  0  , this.z ];
		this.pt3 = [this.scene.chests[0].x,3,this.scene.chests[0].z ];
		this.pt4 = [this.scene.chests[0].x,0,this.scene.chests[0].z ];
}

MyTorpedo.prototype.move = function (currTime){
	var delta_t = 0;
	if (this.time != 0.0)
		delta_t = (currTime - this.time)/1000;

	this.time = currTime;

	this.t += delta_t / this.distance;

	if (this.t >= 1){
		return 1;
	}

	var b1 = Math.pow(1-this.t , 3),
			b2 = 3*this.t*Math.pow((1-this.t),2),
			b3 = 3*Math.pow(this.t,2)*(1-this.t),
			b4 = Math.pow(this.t,3);

	var next_x = this.pt1[0]*b1 + this.pt2[0]*b2 + this.pt3[0]*b3 + this.pt4[0]*b4,
			next_y = this.pt1[1]*b1 + this.pt2[1]*b2 + this.pt3[1]*b3 + this.pt4[1]*b4,
			next_z = this.pt1[2]*b1 + this.pt2[2]*b2 + this.pt3[2]*b3 + this.pt4[2]*b4;

	this.x = next_x;
	this.y = next_y;
	this.z = next_z;


	return 0;
}
