/**
 * MyWing
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWing(scene, length, length_triangle) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.length = length - (length_triangle*2);
    this.width = 0.3;
    this.thickness = 0.05;
    this.length_triangle = length_triangle;

    this.rectangle = new MyQuad(scene,0,1,0,1);
    this.triangle = new MyTriangle(scene);
    this.cube = new MyUnitCubeQuad(scene);

};

MyWing.prototype = Object.create(CGFobject.prototype);
MyWing.prototype.constructor=MyWing;

MyWing.prototype.display = function () {

    //centro
    this.scene.pushMatrix();
    this.scene.scale(this.length, this.thickness, this.width);
    this.cube.display();
    this.scene.popMatrix();

    //Asa direita
    this.scene.pushMatrix();
    /* Triangulo de cima*/
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2,this.thickness/2,-this.width/2);
    /* */this.scene.scale(this.length_triangle,this.thickness, this.width);
    /* */this.triangle.display();
    /* */this.scene.popMatrix();

    /* Triangulo de baixo */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2,-this.thickness/2,-this.width/2);
    /* */this.scene.rotate(Math.PI,1,0,1);
    /* */this.scene.scale(this.width,this.thickness, this.length_triangle);
    /* */this.triangle.display();
    /* */this.scene.popMatrix();

    /* Retangulo cateto */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2+this.length_triangle/2,0,-this.width/2);
    /* */this.scene.rotate(Math.PI,1,0,0);
    /* */this.scene.scale(this.length_triangle,this.thickness, this.width);
    /* */this.rectangle.display();
    /* */this.scene.popMatrix();

    var comprimento = Math.sqrt(Math.pow(this.length_triangle,2)+ Math.pow(this.width,2));
    var angulo = Math.acos(this.length_triangle/comprimento);

    /* Retangulo hipotenusa */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2+this.length_triangle/2,0,0);
    /* */this.scene.rotate(angulo,0,1,0);
    /* */this.scene.scale(comprimento,this.thickness, this.width);
    /* */this.rectangle.display();
    /* */this.scene.popMatrix();

    this.scene.popMatrix();


    //Asa esquerda
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,0,1);

    /* Triangulo de cima*/
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2,this.thickness/2,-this.width/2);
    /* */this.scene.scale(this.length_triangle,this.thickness, this.width);
    /* */this.triangle.display();
    /* */this.scene.popMatrix();

    /* Triangulo de baixo */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2,-this.thickness/2,-this.width/2);
    /* */this.scene.rotate(Math.PI,1,0,1);
    /* */this.scene.scale(this.width,this.thickness, this.length_triangle);
    /* */this.triangle.display();
    /* */this.scene.popMatrix();

    /* Retangulo cateto */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2+this.length_triangle/2,0,-this.width/2);
    /* */this.scene.rotate(Math.PI,1,0,0);
    /* */this.scene.scale(this.length_triangle,this.thickness, this.width);
    /* */this.rectangle.display();
    /* */this.scene.popMatrix();

    var comprimento = Math.sqrt(Math.pow(this.length_triangle,2)+ Math.pow(this.width,2));
    var angulo = Math.acos(this.length_triangle/comprimento);

    /* Retangulo hipotenusa */
    /* */this.scene.pushMatrix();
    /* */this.scene.translate(this.length/2+this.length_triangle/2,0,0);
    /* */this.scene.rotate(angulo,0,1,0);
    /* */this.scene.scale(comprimento,this.thickness, comprimento);
    /* */this.rectangle.display();
    /* */this.scene.popMatrix();

    this.scene.popMatrix();

    this.primitiveType=this.scene.gl.TRIANGLES;
};
