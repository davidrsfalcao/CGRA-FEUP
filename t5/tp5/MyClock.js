/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;
	this.slices = 10;
	this.stacks = 1;
  this.height = 0.15;


  this.cyl = new MyCylinder(this.scene,this.slices,this.stacks);
  this.cyl.initBuffers();
  this.top = new MyPolygon(this.scene,this.slices);
  this.top.initBuffers();
  this.hour_hand = new MyClockHand(this.scene , 0.16);
  this.hour_hand.initBuffers();
  this.min_hand = new MyClockHand(this.scene , 0.07);
  this.min_hand.initBuffers();
  this.sec_hand = new MyClockHand(this.scene , 0.02);
  this.sec_hand.initBuffers();

  //00:00:00
  this.hour_hand.setAngle(0);
  this.min_hand.setAngle(0);
  this.sec_hand.setAngle(0);

 	//this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
  this.scene.pushMatrix();
    this.scene.side_text.apply();
    this.scene.scale(1,1,this.height);
    this.cyl.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    //this.scene.top_text.apply();
    this.scene.translate(0,0,this.height);
    this.top.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.hand_text.apply();
    this.scene.translate(0,0,0.25);
    this.scene.scale(0.4,0.4,1);
    this.hour_hand.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.hand_text.apply();
    this.scene.translate(0,0,0.25);
    this.scene.scale(0.6,0.6,1);   
    this.min_hand.display(); 
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.hand_text.apply();
    this.scene.translate(0,0,0.25);
    this.scene.scale(0.9,0.9,1);
    this.sec_hand.display();
  this.scene.popMatrix();
 };


MyClock.prototype.update = function(currTime) {
  let sec = (currTime / 1000) % 60;
  let min = (currTime / (1000 * 60)) % 60;
  let hrs = (currTime / (1000 * 60 * 60)) % 24;
  
  let hour_angle = hrs * 30;
  let min_angle = -min * 6;
  let sec_angle = -sec * 6;

  this.hour_hand.setAngle(hour_angle);
  this.min_hand.setAngle(min_angle);
  this.sec_hand.setAngle(sec_angle);
}