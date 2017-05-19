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

	this.gl.clearColor(0.0, 0.0, 0.4, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.materialDefault = new CGFappearance(this);

	//ligths
	this.Light0=true;
	this.Light1=true;
	this.Light2=true;
	this.Light3=true;

	//Submarine control
	this.speed = 0;
	this.v_max = 5;
	this.v_min = -3;

	//Run/Pause control
	this.pause = false;
	this.time = 0;
	this.lastUpdate = 0;
	this.frames = 100;

	//Camera
	this.cameraChosen = 0;


	//submarine
	this.Light = false;
	this.submarine = new MySubmarine(this);
	this.temp = new CGFappearance(this);


	//Textures submarine
	this.submarineAppearanceList = [ 'Metal', 'Military', 'Monster'];
	this.currSubmarineAppearance = 'Metal';
	this.submarineAppearances = [];

	//METAL TEXTURE
	/* 0 */this.metalAppearance = new CGFappearance(this);
	/* 0 */this.metalAppearance.loadTexture("../resources/images/metal.png");
	/* 0 */this.submarineAppearances.push(this.metalAppearance);

	/* 1 */this.myAppearance = new CGFappearance(this);
	/* 1 */this.myAppearance.loadTexture("../resources/images/black.png");
	/* 1 */this.submarineAppearances.push(this.myAppearance);

	// MILITARY TEXTURE
	/* 2 */this.militaryAppearance = new CGFappearance(this);
	/* 2 */this.militaryAppearance.loadTexture("../resources/images/military.png");
	/* 2 */this.submarineAppearances.push(this.militaryAppearance);

	/* 3 */this.militaryAppearance1 = new CGFappearance(this);
	/* 3 */this.militaryAppearance1.loadTexture("../resources/images/military1.png");
	/* 3 */this.submarineAppearances.push(this.militaryAppearance1);

	// MONSTER TEXTURE
	/* 4 */this.monsterAppearance = new CGFappearance(this);
	/* 4 */this.monsterAppearance.loadTexture("../resources/images/monster.png");
	/* 4 */this.submarineAppearances.push(this.monsterAppearance);

	/* 5 */this.monsterAppearance1 = new CGFappearance(this);
	/* 5 */this.monsterAppearance1.loadTexture("../resources/images/monster1.png");
	/* 5 */this.submarineAppearances.push(this.monsterAppearance1);

	/* 6 */this.monsterAppearance2 = new CGFappearance(this);
	/* 6 */this.monsterAppearance2.loadTexture("../resources/images/black1.png");
	/* 6 */this.submarineAppearances.push(this.monsterAppearance2);

	//Clock
	this.clock = new MyClock(this);
	this.currClockAppearance = 0;
	this.clockAppearances = [];

	/* 0 */this.clock1 = new CGFappearance(this);
	/* 0 */this.clock1.setAmbient(0.3,0.3,0.3,1);
	/* 0 */this.clock1.setDiffuse(0.9,0.9,0.9,1);
	/* 0 */this.clock1.setSpecular(0.1,0.1,0.1,1);
	/* 0 */this.clock1.setShininess(2);
	/* 0 */this.clock1.loadTexture("../resources/images/clock1.png");
	/* 0 */this.clockAppearances.push(this.clock1);

	/* 1 */this.clock2 = new CGFappearance(this);
	/* 1 */this.clock2.setAmbient(0.3,0.3,0.3,1);
	/* 1 */this.clock2.setDiffuse(0.9,0.9,0.9,1);
	/* 1 */this.clock2.setSpecular(0.1,0.1,0.1,1);
	/* 1 */this.clock2.setShininess(2);
	/* 1 */this.clock2.loadTexture("../resources/images/clock2.png");
	/* 1 */this.clockAppearances.push(this.clock2);

	/* 2 */this.clock3 = new CGFappearance(this);
	/* 2 */this.clock3.setAmbient(0.3,0.3,0.3,1);
	/* 2 */this.clock3.setDiffuse(0.9,0.9,0.9,1);
	/* 2 */this.clock3.setSpecular(0.1,0.1,0.1,1);
	/* 2 */this.clock3.setShininess(2);
	/* 2 */this.clock3.loadTexture("../resources/images/clock3.png");
	/* 2 */this.clockAppearances.push(this.clock3);

	this.pole = new MyCylinder(this,500,1);
	this.rustAppearance = new CGFappearance(this);
	this.rustAppearance.loadTexture("../resources/images/rust.jpg");


	//Ocean
	this.oceanFloor = new MyPlane(this,100,0,10,0,10);
	this.OceanAppearance = new CGFappearance(this);
	this.OceanAppearance.loadTexture("../resources/images/sand.png");
	this.OceanAppearance.setTextureWrap("REPEAT" , "REPEAT");
	this.water_wall = new MyPlane(this,100,0,1,0,1);
	this.waterAppearance = new CGFappearance(this);
	this.waterAppearance.loadTexture("../resources/images/water.png");


	//this.audio=new Audio("../resources/lalala.mp3");
	//this.audio.play();
	this.setUpdatePeriod(1000/this.frames);

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
	this.lights[4].setSpecular( 1, 1, 1, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable();

};

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
	this.metalAppearance.apply();
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
	this.rustAppearance.apply();
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

	if (this.Light == true){
		this.lights[4].enable();
	} else {
		this.lights[4].disable();
	}

}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}
	this.switchLigths();

}

LightingScene.prototype.updateFrames = function(){
	this.setUpdatePeriod(1000/this.frames);
}

LightingScene.prototype.updateCamera = function(){

	var x = this.submarine.x - 10*Math.sin(this.submarine.angle_mult * this.submarine.turn_angle);
	var y = this.submarine.y + 4;
	var z = this.submarine.z - 10*Math.cos(this.submarine.angle_mult * this.submarine.turn_angle);
	this.camera.setPosition(vec3.fromValues(x, y, z));

	var xl, yl, zl;
	xl = this.submarine.x + 5*Math.sin(this.submarine.angle_mult * this.submarine.turn_angle);
	yl = this.submarine.y + 0.6;
	zl = this.submarine.z + 5*Math.cos(this.submarine.angle_mult * this.submarine.turn_angle);

	this.camera.setTarget(vec3.fromValues(xl, yl, zl));

}

LightingScene.prototype.update = function(currTime) {

	this.updateFrames();

	if(!this.pause){
		this.clock.update(this.time);
		this.time += currTime-this.lastUpdate;
	}

	this.submarine.update(currTime-this.lastUpdate);

	if (this.cameraChosen == 1){
		this.updateCamera(); //camera 3ª pessoa
	}
	//else camera livre

};
