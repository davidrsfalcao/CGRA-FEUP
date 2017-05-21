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

		this.target = target;

    //Orientation
    this.angle_mult = sub.angle_mult;//
    this.turn_angle = Math.PI/45; // angulo de viragem - 4 graus
    this.vertical_angle = sub.vertical_angle;

		//Fin Vertical movement
    this.finV_angle = sub.finV_angle;

    //Fin Horizontal movement
    this.finH_angle = sub.finH_angle;

    this.back_fin = new MyWing(this.scene, 2.34, 0.35);
		this.cylinder = new MyCylinder(this.scene, 500, 1, false);
    this.front = new MyLamp(this.scene, 500, 10);

		this.move(sub);
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {
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

MyTorpedo.prototype.move = function (sub){
	this.x = sub.x+0.35;
	this.y = sub.y+0.75;
	this.z = sub.z+2.5;

	var angle = Math.acos( this.z / ( Math.sqrt( Math.pow(this.z,2) + Math.pow(this.x,2) ) ) );

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle_mult *this.turn_angle,0,1,0);
		this.scene.translate(-this.x, -this.y , -this.z );
		this.display();
	this.scene.popMatrix();
}

MyTorpedo.prototype.generatePoints = function(){
    this.distance = Math.sqrt(Math.pow(target.x - this.x,2) + Math.pow(target.y - this.y,2) + Math.pow(target.z - this.z,2));

		this.pt1 = [this.x,this.y,this.z];
		this.pt2 = [this.x + 6 , this.y , this.z ];
		this.pt3 = [this.target.x,this.target.y + 3,this.target.z ];
		this.pt4 = [this.target.x,this.target.y,this.target.z ];
}

//points is an array of 4 positions
MyTorpedo.prototype.bezierCurve = function ( points , t){
	var pt1 = points[0], pt2 = points[1], pt3 = points[2], pt4 = points[3];

}
