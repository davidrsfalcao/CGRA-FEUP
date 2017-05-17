/**
* LightingScene
* @constructor
*/
function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	this.enableTextures(true);

	this.initLights();


	//ligths
	this.Light0=true;
	this.Light1=true;
	this.Light2=true;
	this.Light3=true;

	//Run/Pause control
	this.speed = 1;
	this.pause = false;
	this.stoppedTime = 0;

	//Textures
	this.textures = 0;



	this.gl.clearColor(0.0, 0.0, 0.4, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.materialDefault = new CGFappearance(this);

	this.wing = new MyWing(this);

	//submarine
	this.submarine = new MySubmarine(this);
	this.temp = new CGFappearance(this);
	this.temp.setAmbient(0.01,0.01,0.01,1);
	this.temp.setDiffuse(0.1,0.1,0.1,1);
	this.temp.setSpecular(0.1,0.1,0.1,0.1);
	this.temp.setShininess(100);

	//Clock
	this.pole = new MyCylinder(this,500,1);
	this.rustAppearance = new CGFappearance(this);
	this.rustAppearance.loadTexture("../resources/images/rust.jpg");
	this.clock = new MyClock(this);


	//Ocean
	this.oceanFloor = new MyPlane(this,100,0,10,0,10);
	this.OceanAppearance = new CGFappearance(this);
	this.OceanAppearance.loadTexture("../resources/images/sand.png");
	this.OceanAppearance.setTextureWrap("REPEAT" , "REPEAT");


	this.water_wall = new MyPlane(this,100,0,1,0,1);
	this.waterAppearance = new CGFappearance(this);
	this.waterAppearance.loadTexture("../resources/images/water.png");
	this.waterAppearance.setTextureWrap("REPEAT" , "REPEAT");

	this.setUpdatePeriod(100);

};

LightingScene.prototype.Pause = function (){
	this.pause = !this.pause;
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0,0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[4].setPosition(0, 0.6, 5, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setSpecular( 1, 1, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);


	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setAmbient(0.3, 0.3, 0.3, 1);
	this.lights[3].setSpecular( 1, 1, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.1);

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setSpecular( 1, 1, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	// this.lights[4].enable();
	// this.lights[4].setVisible(true);

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}
	this.switchLigths();

}

LightingScene.prototype.switchLigths = function() {
	if (this.Light0 == true){
		this.lights[0].enable();
	} else {
		this.lights[0].disable();
	}

	if (this.Light1 == true){
		this.lights[1].enable();
	} else {
		this.lights[1].disable();
	}

	if (this.Light2 == true){
		this.lights[2].enable();
	} else {
		this.lights[2].disable();
	}

	if (this.Light3 == true){
		this.lights[3].enable();
	} else {
		this.lights[3].disable();
	}

}

LightingScene.prototype.display = function() {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();
	this.materialDefault.apply();

	//Submarine
	this.pushMatrix();
	this.translate(0,1.2,0);
//	this.rustAppearance.apply();
	this.submarine.display();
	this.popMatrix();


	//Pole
	this.pushMatrix();
	this.translate(8,5,0);
	this.rotate(Math.PI/2,1,0,0);
	this.scale(0.1,0.1,5);
	this.rustAppearance.apply();
	this.pole.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
	this.translate(8, 5, 0);
	this.clock.display();
	this.popMatrix();

	//FLOOR
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-Math.PI/2, 1, 0, 0);
	this.scale(50, 50, 1);
	this.OceanAppearance.apply();
	this.oceanFloor.display();
	this.popMatrix();

	//Wall Right
	this.pushMatrix();
	this.translate(7.5, 7.5, -17.5);
	this.scale(50, 15, 1);
	this.waterAppearance.apply();
	this.water_wall.display();
	this.popMatrix();

	//Wall Left
	this.pushMatrix();
	this.translate(-17.5, 7.5, 7.5);
	this.rotate(Math.PI/2,0,1,0);
	this.scale(50, 15, 1);
	this.waterAppearance.apply();
	this.water_wall.display();
	this.popMatrix();

	// ---- END Primitive drawing section

};

LightingScene.prototype.update = function(currTime) {

	if(!this.pause){
		this.clock.update(currTime-this.stoppedTime);
	}
	else {
		this.stoppedTime += 100; // update period
	}

	this.submarine.propeller_left.update();
	this.submarine.propeller_right.update();

};
