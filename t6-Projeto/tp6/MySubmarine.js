/**
* MySubmarine
* @constructor
*/
function MySubmarine(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.triangle = new MyTriangle(this.scene);
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.horizontal = false;
    this.vertical = true;

};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.translate(this.x,this.y,this.z);
    this.triangle.display();
    this.scene.popMatrix();

}

MySubmarine.prototype.moveFront = function(){
    this.z += 1;
}

MySubmarine.prototype.moveBack = function(){
    this.z -= 1;
}

MySubmarine.prototype.turnRight = function(){

}

MySubmarine.prototype.turnLeft = function(){

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
