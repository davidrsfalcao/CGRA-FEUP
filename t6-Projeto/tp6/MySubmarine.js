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

    //Periscope movement
    this.periscope_max = 0.60;
    this.periscope_heigth = 0.30;
    this.periscope_min = 0.15;

    //Propeller Vertical movement
    this.propellerV_angle = 0;


    this.body = new MySubmarineBody(this.scene);
    this.periscope = new MyPeriscope(this.scene);
    this.propeller_left = new MyPropeller(this.scene,1);
    this.propeller_right = new MyPropeller(this.scene,-1);
    this.middle_fin = new MyWing(this.scene, 1.42, 0.25);
    this.back_fin = new MyWing(this.scene, 2.34, 0.35);
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {


    this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.angle_mult *this.turn_angle,0,1,0);

    this.scene.pushMatrix();
    this.body.display();
    this.scene.popMatrix();

    switch (this.scene.currSubmarineAppearance) {
        case 'Metal':
            this.scene.submarineAppearances[1].apply();
            break;

        case 'Military':
            this.scene.submarineAppearances[3].apply();
            break;
        case 'Monster':
            this.scene.submarineAppearances[5].apply();
            break;
    }

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
    this.scene.translate(0.5255,-0.3,0);
    this.propeller_left.display();
    this.scene.popMatrix();

    //Helice direita (do ponto de vista do submarino)
    this.scene.pushMatrix();
    this.scene.translate(-0.5255,-0.3,0);
    this.propeller_right.display();
    this.scene.popMatrix();

    //Barbatana da torre
    this.scene.pushMatrix();
    this.scene.translate(0,0.8,2.5);
    //this.scene.rotate(-Math.PI/4,1,0,0);
    this.middle_fin.display();
    this.scene.popMatrix();

    //Barbatana traseira horizontal
    this.scene.pushMatrix();
    this.scene.translate(0,0.1,-0.15);
    //this.scene.rotate(-Math.PI/4,1,0,0);
    this.back_fin.display();
    this.scene.popMatrix();

    //Barbatana traseira vertical
    this.scene.pushMatrix();
    this.scene.translate(0,0,-0.15);
    this.scene.rotate(this.propellerV_angle,0,1,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.back_fin.display();
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

    if (this.scene.speed < this.scene.v_max){
        this.scene.speed++;
    }

}

MySubmarine.prototype.moveBack = function(){

    if (this.scene.speed > this.scene.v_min){
        this.scene.speed--;
    }
}

MySubmarine.prototype.turnRight = function(){

    this.angle_mult -= 1;
    this.propellerV_angle = Math.PI/8;
}

MySubmarine.prototype.turnLeft = function(){

    this.angle_mult += 1;
    this.propellerV_angle = -Math.PI/8;
}

MySubmarine.prototype.stopTurning = function(){
    this.propellerV_angle = 0;
}

MySubmarine.prototype.move = function() {

    this.z += Math.cos(this.angle_mult*this.turn_angle)*0.1*(this.scene.speed);
    this.x += Math.sin(this.angle_mult*this.turn_angle)*0.1*(this.scene.speed);

}

MySubmarine.prototype.upPeriscope = function(){
    if(this.periscope_heigth < this.periscope_max){
        this.periscope_heigth += 0.01;
    }
}

MySubmarine.prototype.downPeriscope = function(){
    if(this.periscope_heigth > this.periscope_min){
        this.periscope_heigth -= 0.01;
    }
}

MySubmarine.prototype.update = function(){

    this.move();
    this.propeller_left.update();
    this.propeller_right.update();
    this.updateLights();
}
