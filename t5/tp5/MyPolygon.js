/**
 * MyPolygon
 * @constructor
 */
 function MyPolygon(scene, sides) {
 	CGFobject.call(this,scene);

	this.sides = sides;

 	this.initBuffers();
 };

 MyPolygon.prototype = Object.create(CGFobject.prototype);
 MyPolygon.prototype.constructor = MyPolygon;

 MyPolygon.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
  this.texCoords = [];
  var comprimento = 1;
  var largura = 1;
  var theta = 2*Math.PI / this.sides;

  for (var n = 0; n < this.sides; n++) // ciclo para as slices
  {
    var x = largura * Math.cos(n * theta);
    var y = largura * Math.sin(n * theta);

    this.vertices.push(x, y, 0);
    this.normals.push(x, y, 0);
 //   this.texCoords.push(x+0.5 , y+0.5);
    this.texCoords.push(Math.cos(theta * n) / 2 + 0.5, 1 - (Math.sin(theta * n) / 2 + 0.5));

  }
  this.vertices.push(0,0,0);
  this.normals.push(0,0,1);
  var x = largura * Math.cos(0);
  var y = largura * Math.cos(0);
  var z = comprimento;
  this.vertices.push(x, y, z);
  this.normals.push(x, y, 0);
  for (var n = 0; n < this.sides; n++){ // ciclo para as slices
    this.indices.push(n,(((n+1)%this.sides)==0) ? 0 : n+1,this.sides);
  }



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
