function MyClockHand(scene, width) {
	CGFobject.call(this, scene);
    this.scene = scene;

    this.width = width;

    this.angle = 0; // radians
    this.hand = new MyQuad(scene,0,1,0,1);
}

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, 1);
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(this.width, 1, 1);
        this.hand.display();
    this.scene.popMatrix();
}

// Angle in degrees.
MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle * Math.PI / 180;
}