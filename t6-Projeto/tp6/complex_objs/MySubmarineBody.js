/**
* MySubmarineBodyBody
* @constructor
*/
function MySubmarineBody(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;

    this.cylinder = new MyCylinder(this.scene, 500, 1, false);
    this.front = new MyLamp(this.scene, 500, 10);
    this.cover = new MyPolygon(this.scene, 500);
};

MySubmarineBody.prototype = Object.create(CGFobject.prototype);
MySubmarineBody.prototype.constructor = MySubmarineBody;

MySubmarineBody.prototype.display = function() {

    switch (this.scene.currSubmarineAppearance) {
        case 'Metal':{
            this.scene.submarineAppearances[0].apply();
            break;
        }

        case 'Military':{
            this.scene.submarineAppearances[2].apply();
            break;
        }

        case 'Monster':{
            this.scene.submarineAppearances[4].apply();
            break;
        }

    }
    // Main Cylinder
    this.scene.pushMatrix();
    this.scene.translate(0,0,4.08);
    this.scene.scale(0.73/2,1.2/2,4.08); // 0.73 x 1.20 x 4.08
    this.scene.rotate(Math.PI,0,1,0);
    this.cylinder.display();
    this.scene.popMatrix();

    //Submarine Tower
    this.scene.pushMatrix();
    this.scene.translate(0,1.13,2.5);

    if (this.scene.currSubmarineAppearance == 'Monster'){
        this.scene.submarineAppearances[6].apply();
    }

    /* *///Submarine Tower Cylinder Cover
    /* */this.scene.pushMatrix();
    /* */this.scene.scale(0.6,1,0.88);
    /* */this.scene.rotate(-Math.PI/2,1,0,0);
    /* */this.cover.display();
    /* */this.scene.popMatrix();

    /* *///Submarine Tower Cylinder
    /* */this.scene.pushMatrix();
    /* */this.scene.scale(0.60/2,0.80,0.88/2); // 0.6 x 0.57 x 0.88
    /* */this.scene.rotate(Math.PI/2,1,0,0);
    /* */this.cylinder.display();
    /* */this.scene.popMatrix();

    this.scene.popMatrix();

    switch (this.scene.currSubmarineAppearance) {
        case 'Metal':{
            this.scene.submarineAppearances[0].apply();
            break;
        }

        case 'Military':{
            this.scene.submarineAppearances[3].apply();
            break;
        }

        case 'Monster':{
            this.scene.submarineAppearances[6].apply();
            break;
        }

    }

    // Submarine Front
    this.scene.pushMatrix();
    this.scene.translate(0,0,4.08);
    this.scene.scale(0.73/2,1.2/2,0.46); // 0.73 x 1.20 x 0.46
    this.scene.rotate(Math.PI/2,1,0,0);
    this.front.display();
    this.scene.popMatrix();

    // Submarine Back
    this.scene.pushMatrix();
    this.scene.scale(0.73/2,1.2/2,0.46); // 0.73 x 1.20 x 0.46
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.front.display();
    this.scene.popMatrix();
}
