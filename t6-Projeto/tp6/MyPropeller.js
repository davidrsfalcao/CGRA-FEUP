/**
* MyPropeller
* @constructor
*/
function MyPropeller(scene, orientation) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.orientation = orientation;
    this.angle = (36*Math.PI) * this.scene.speed * this.orientation;
    this.position = 0;


    this.cylinder = new MyCylinder(this.scene, 500, 1);
    this.cylinder1 = new MyCylinderInverted(this.scene,500,1);

    this.center = new MyLamp(this.scene,50,10);
    this.helice = new MyPrism(this.scene,4,1);
    this.cover = new MyPolygon(this.scene, 4);
};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor = MyPropeller;

MyPropeller.prototype.display = function() {

    //bordas
    this.scene.pushMatrix();
    this.scene.scale(0.4/2,0.4/2,0.2);
    this.cylinder.display();
    this.cylinder1.display();
    this.scene.popMatrix();

    //centro
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.1);
    /* */this.scene.pushMatrix();
    /* */this.scene.scale(0.1/2,0.1/2,0.05);
    /* */this.center.display();
    /* */this.scene.popMatrix();

    /* */this.scene.pushMatrix();
    /* */this.scene.rotate(Math.PI,1,0,0);
    /* */this.scene.scale(0.1/2,0.1/2,0.05);
    /* */this.center.display();
    /* */this.scene.popMatrix();
    this.scene.popMatrix();

    //helice
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.075);
    this.scene.rotate(this.angle,0,0,1);
    this.scene.scale(0.50,0.05,0.05);

    /* */this.scene.pushMatrix();
    /* */this.scene.rotate(Math.PI/4,0,0,1);
    /* */this.scene.scale(0.5,0.5,1);
    /* */this.helice.display();
    /* */this.scene.popMatrix();

    /* */this.scene.pushMatrix();
    /* */this.scene.rotate(Math.PI,0,1,0);
    /* */this.scene.rotate(Math.PI/4,0,0,1);
    /* */this.cover.display();
    /* */this.scene.popMatrix();

    /* */this.scene.pushMatrix();
    /* */this.scene.translate(0,0,1);
    /* */this.scene.rotate(Math.PI/4,0,0,1);
    /* */this.cover.display();
    /* */this.scene.popMatrix();
    this.scene.popMatrix();
}

MyPropeller.prototype.update = function(){
    this.position++;
    this.angle = ((36*Math.PI)/180) * this.scene.speed * this.orientation * this.position;
}
