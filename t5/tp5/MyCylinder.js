/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

 	this.vertices = [
 	];

 	this.indices = [
 	];

 	this.normals = [
 	];

  this.texCoords=[];

  var comprimento = 1;
  var largura = 1;
  var theta = 2*Math.PI / this.slices;
  var inc_stack = comprimento / this.stacks;
  var inc_text = 1/this.slices;

  for (var k = 0; k <= this.stacks; k++) //ciclo para a stacks
  {
    for (var n = 0; n < this.slices; n++) // ciclo para as slices
    {
      var x = largura * Math.cos(n * theta);
      var y = largura * Math.sin(n * theta);
      var z = k * inc_stack;

      this.vertices.push(x, y, z);
      this.normals.push(x, y, 0);
      this.texCoords.push(1-inc_text*n , z);
    }
  }
  var x = largura * Math.cos(0);
  var y = largura * Math.cos(0);
  var z = comprimento;
  this.vertices.push(x, y, z);
      this.normals.push(x, y, 0);

  for (var k = 0; k < this.stacks; k++)  // ciclo para as stacks
  {
    for (var n = 0; n < this.slices; n++) // ciclo para as slices
    {
      /*
        Por exemplo:
        (0,1,this.slices)

      */
      var sk =  this.slices * k;
      var sk1 = this.slices*(k+1);

      this.indices.push(sk+n, sk+n+1, sk1 +n);

      if (n == (this.slices - 1)) {
        this.indices.push(sk, sk+n+1, sk+n);

      }
      else {
        this.indices.push(sk1+n+1, sk1+n, sk+n+1);
      }
    }
  }



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
