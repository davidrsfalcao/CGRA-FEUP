/**
* MySubmarine
* @constructor
*/
function MySubmarine(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;


    //Coordinates of submarine
    this.x = 0;
    this.y = 0;
    this.z = 0;

    //Orientation
    this.angle_mult = 0;
    this.turn_angle = Math.PI/90; // angulo de viragem - 2 graus

    //Periscope movemente
    this.periscope_heigth = 0.30;

    this.body = new MySubmarineBody(this.scene);
    this.periscope = new MyPeriscope(this.scene);
    this.propeller_left = new MyPropeller(this.scene,1);
    this.propeller_right = new MyPropeller(this.scene,-1);
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {


    this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.angle_mult *this.turn_angle,0,1,0);

    this.scene.pushMatrix();
    this.body.display();
    this.scene.popMatrix();

    //Periscope
    this.scene.pushMatrix();
    this.scene.translate(0,1.13,2.5);
        this.scene.pushMatrix();
        this.scene.translate(0,this.periscope_heigth,-0.05);
        this.periscope.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

    //Helice esquerda (do ponto de vista do submarino)
    this.scene.pushMatrix();
    this.scene.translate(0.526,-0.3,0);
    this.propeller_left.display();
    this.scene.popMatrix();

    //Helice direita (do ponto de vista do submarino)
    this.scene.pushMatrix();
    this.scene.translate(-0.526,-0.3,0);
    this.propeller_right.display();
    this.scene.popMatrix();



}
MySubmarine.prototype.updateLights = function(){
    var xl, yl, zl;
    xl = this.x + 5*Math.sin(this.angle_mult * this.turn_angle);
    yl = this.y + 0.6;
    zl = this.z + 5*Math.cos(this.angle_mult * this.turn_angle);

    this.scene.lights[4].setPosition(xl, yl, zl, 1);
}


MySubmarine.prototype.moveFront = function(){

    this.z += Math.cos(this.angle_mult*this.turn_angle)*Math.abs(this.scene.speed);
    this.x += Math.sin(this.angle_mult*this.turn_angle)*Math.abs(this.scene.speed);
    this.updateLights();
}

MySubmarine.prototype.moveBack = function(){

    this.z -= Math.cos(this.angle_mult*this.turn_angle)*Math.abs(this.scene.speed);
    this.x -= Math.sin(this.angle_mult*this.turn_angle)*Math.abs(this.scene.speed);
}

MySubmarine.prototype.turnRight = function(){

    this.angle_mult -= 1;
}

MySubmarine.prototype.turnLeft = function(){

    this.angle_mult += 1;
}

MySubmarine.prototype.move = function(direction) {

    switch (direction) {
        case 0:{
            this.moveFront();
            break;
        }

        case 1:{
            this.moveBack();
            break;
        }

        case 2:{
            this.turnRight();
            break;
        }

        case 3:{
            this.turnLeft();
            break;
        }
        default:

    }
    this.updateLights();

}
