/**
 * MyWing
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWing(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;

    this.rectangle = new MyQuad(scene,0,1,0,1);
    this.triangle = new MyTriangle(scene);

};

MyWing.prototype = Object.create(CGFobject.prototype);
MyWing.prototype.constructor=MyWing;

MyWing.prototype.display = function () {
    //down face
    this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(+Math.PI/2,1,0,0);
        this.rectangle.display();
    this.scene.popMatrix();
    //upper face
    this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.rectangle.display();
    this.scene.popMatrix();
    //behind submarine face
    this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.rectangle.display();
    this.scene.popMatrix();
    //middle submarine face
    this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.rectangle.display();
    this.scene.popMatrix();
    //behind left face
    this.scene.pushMatrix();
        this.scene.translate(1,0,-0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.rectangle.display();
    this.scene.popMatrix();
    //behind right face
    this.scene.pushMatrix();
        this.scene.translate(-1,0,-0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.rectangle.display();
    this.scene.popMatrix();
    //left diagonal face
    this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.scale(Math.sqrt(2),1,1);
        this.rectangle.display();
    this.scene.popMatrix();
    //right diagonal face
    this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.rotate(-Math.PI/4,0,1,0);
        this.scene.scale(Math.sqrt(2),1,1);
        this.rectangle.display();
    this.scene.popMatrix();
    //upper right triangle
    this.scene.pushMatrix();
        this.scene.translate(-0.5 , 0.5 ,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.triangle.display();
    this.scene.popMatrix();
    //upper left triangle
    this.scene.pushMatrix();
        this.scene.translate(0.5 , 0.5 ,-0.5);
        this.triangle.display();
    this.scene.popMatrix();
    //bottom right triangle
    this.scene.pushMatrix();
        this.scene.translate(0.5 , -0.5 ,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.triangle.display();
    this.scene.popMatrix();
    //bottom left triangle
    this.scene.pushMatrix();
        this.scene.translate(-0.5 , -0.5 ,-0.5);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.triangle.display();
    this.scene.popMatrix();   

    this.primitiveType=this.scene.gl.TRIANGLES;
};
