/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	this.vertices = [
 	];

 	this.indices = [
 	];

 	this.normals = [
 	];

  var comprimento = 1;
  var largura = 1;
  var theta = 2*Math.PI / this.slices; //used to generate vertices around origin
  var theta_slices = (Math.PI/2)/this.stacks; //used to give sphere like effect
  var inc_slices= largura / this.stacks;

  for (var k = 0; k <= this.stacks; k++) //ciclo para a stacks
  {
    for (var n = 0; n < this.slices; n++) // ciclo para as slices
    {
      var x = (largura*Math.cos(k*theta_slices)) * Math.cos(n * theta);
      var y = (largura*Math.cos(k*theta_slices)) * Math.sin(n * theta);
      var z = Math.sin(k*theta_slices);//k * inc_slices; 

      this.vertices.push(x, y, z);
      this.normals.push(x, y, 0);
    }

  }

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
