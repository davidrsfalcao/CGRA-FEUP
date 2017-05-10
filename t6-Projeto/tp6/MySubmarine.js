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

    //Orientation - N , S, W or E
    this.angle_mult = 0;
    this.turn_angle = Math.PI/18; // angulo de viragem - 10 graus

    this.body = new MySubmarineBody(this.scene);
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

    this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.angle_mult *this.turn_angle,0,1,0);

    this.scene.pushMatrix();
    this.body.display();
    this.scene.popMatrix();

}

MySubmarine.prototype.moveFront = function(){

    this.z += Math.cos(this.angle_mult*this.turn_angle);
    this.x += Math.sin(this.angle_mult*this.turn_angle);
}

MySubmarine.prototype.moveBack = function(){

    this.z -= Math.cos(this.angle_mult*this.turn_angle);
    this.x -= Math.sin(this.angle_mult*this.turn_angle);
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

}
