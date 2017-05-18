/**
* MyClock
* @constructor
*/

var degToRad = Math.PI / 180.0;

function MyClock(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;

    this.cylinder = new MyCylinder(this.scene,12,1);
    this.seconds = new MyClockHand(this.scene,0.4,'seconds',270);
    this.minutes = new MyClockHand(this.scene,0.3,'minutes',180);
    this.hours = new MyClockHand(this.scene,0.2,'hours',90);
    this.top = new MyPolygon(this.scene,12);
    this.back = new MyPolygon(this.scene,12);

    this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
    this.clockAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
    this.clockAppearance.setShininess(2);
    this.clockAppearance.loadTexture("../resources/images/clock1.png");

    this.handAppearance = new CGFappearance(this.scene);
    this.handAppearance.setAmbient(0,0,0,0);
    this.handAppearance.setDiffuse(0,0,0,0);
    this.handAppearance.setSpecular(0,0,0,0);
    this.handAppearance.setShininess(0);

    this.handSeconds = new CGFappearance(this.scene);
    this.handSeconds.setAmbient(0,0,0,0);
    this.handSeconds.setDiffuse(1,0,0,1);
    this.handSeconds.setSpecular(0,0,0,0);
    this.handSeconds.setShininess(0);
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.translate(0,0,-0.1);

    this.scene.pushMatrix();
    this.scene.scale(0.5,0.5,0.3);
    this.scene.translate(0,0,0);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.handSeconds.apply();
    this.scene.translate(0,0,0.301);
    this.scene.rotate(- this.seconds.angle * degToRad,0,0,1);
    this.seconds.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.301);
    this.handAppearance.apply();
    this.scene.rotate(- this.minutes.angle * degToRad,0,0,1);
    this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.301);
    this.handAppearance.apply();
    this.scene.rotate(- this.hours.angle * degToRad,0,0,1);
    this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180*degToRad,0,1,0);
    this.back.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.clockAppearance.apply();
    this.scene.translate(0,0,0.3);
    this.top.display();
    this.scene.popMatrix();

};

MyClock.prototype.update = function(currTime) {
    this.seconds.update(currTime);
    this.hours.update(currTime);
    this.minutes.update(currTime);
};
