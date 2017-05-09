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
    this.orientation = 'N';
    this.angle = 0;

    this.body = new MySubmarineBody(this.scene);
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

    this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.angle *(Math.PI/2),0,1,0);

    this.scene.pushMatrix();
    this.body.display();
    this.scene.popMatrix();

}

MySubmarine.prototype.moveFront = function(){

    switch (this.orientation) {
        case 'N':{
            this.z += 1;
            break;
        }

        case 'S':{
            this.z -= 1;
            break;
        }

        case 'W':{
            this.x += 1;
            break;
        }

        case 'E':{
            this.x -= 1;
            break;
        }

    }

}

MySubmarine.prototype.moveBack = function(){

    switch (this.orientation) {
        case 'N':{
            this.z -= 1;
            break;
        }

        case 'S':{
            this.z += 1;
            break;
        }

        case 'W':{
            this.x -= 1;
            break;
        }

        case 'E':{
            this.x += 1;
            break;
        }

    }
}

MySubmarine.prototype.turnRight = function(){

    this.angle -= 1;

    switch (this.orientation) {
        case 'N':{
            this.orientation = 'E';
            break;
        }

        case 'S':{
            this.orientation = 'W';
            break;
        }

        case 'W':{
            this.orientation = 'N';
            break;
        }

        case 'E':{
            this.orientation = 'S';
            break;
        }

    }


}

MySubmarine.prototype.turnLeft = function(){

    this.angle += 1;

    switch (this.orientation) {
        case 'N':{
            this.orientation = 'W';
            break;
        }

        case 'S':{
            this.orientation = 'E';
            break;
        }

        case 'W':{
            this.orientation = 'S';
            break;
        }

        case 'E':{
            this.orientation = 'N';
            break;
        }

    }

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
