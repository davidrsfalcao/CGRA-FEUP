/**
* MyChest
* @constructor
*/
function MyChest(scene, x , z , size) {
    CGFobject.call(this,scene);
    this.scene = scene;

		this.x = x;
		this.z = z;
		this.size = size;
        this.open= false;

		this.side_chest = new MyQuad(this.scene,1,0,1,0);
		this.lid = new MyLid(this.scene,x,z,size);
        this.lid1 = new MyLid(this.scene, this.x, this.z , this.size);
};

MyChest.prototype = Object.create(CGFobject.prototype);
MyChest.prototype.constructor = MyChest;

MyChest.prototype.display = function() {

        if (!this.open){
            this.lid.display();
        }
        else {
            this.scene.pushMatrix();
        		this.scene.translate( (this.x-0.5)*this.size , 0.6*this.size , this.z*this.size );
        		this.scene.rotate(Math.PI/4,0,0,1);
        		this.scene.translate( (-this.x+0.5)*this.size ,-0.6*this.size , (-this.z*this.size) );
        		this.lid1.display();
        	this.scene.popMatrix();
        }

		//Back face
		this.scene.pushMatrix();
			this.scene.translate( (-0.5+this.x)*this.size ,0.3*this.size,(0+this.z)*this.size );
			this.scene.scale(1*this.size,0.6*this.size,1*this.size);
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.chestBackAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

		//lower face
		this.scene.pushMatrix();
			this.scene.translate( this.x*this.size , 0 , this.z*this.size );
			this.scene.scale(1*this.size,1*this.size,1*this.size);
			this.scene.rotate(Math.PI/2 ,1,0,0);
			this.scene.chestBackAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

		//front face
		this.scene.pushMatrix();
			this.scene.translate( (0.5+this.x)*this.size ,0.3*this.size, this.z*this.size );
			this.scene.scale(1*this.size,0.6*this.size,1*this.size);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.chestFrontAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

		//Side of the chest
		this.scene.pushMatrix();
			this.scene.translate( this.x*this.size ,0.3*this.size, (0.5+this.z)*this.size );
			this.scene.scale(1*this.size,0.6*this.size,1*this.size);
			this.scene.chestSideAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

		//Side of the chest
		this.scene.pushMatrix();
			this.scene.translate( this.x*this.size ,0.3*this.size, (-0.5+this.z)*this.size );
			this.scene.scale(1*this.size,0.6*this.size,1*this.size);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.chestSideAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

		//Inside of chest
		this.scene.pushMatrix();
			this.scene.translate( this.x*this.size ,0.6*this.size, this.z*this.size );
			this.scene.scale(1*this.size,0.6*this.size,1*this.size);
			this.scene.rotate(-Math.PI/2 ,1,0,0);
			this.scene.chestInsideAppearance.apply();
			this.side_chest.display();
		this.scene.popMatrix();

}


MyChest.prototype.openLid = function(){
    this.open = true;

}
