/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyPrism;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

    this.vertices = [
 	];

 	this.indices = [
 	];

 	this.normals = [
 	];


 	var angulo = (2*Math.PI)/this.slices;
	for (var q = 0; q <= this.stacks; q++) {
		for (var i = 0; i < this.slices; i++) {
		this.vertices.push(0.5 * Math.cos(i*angulo));
		this.vertices.push(0.5 * Math.sin(i*angulo));
		this.vertices.push(q);

		this.normals.push(0.5 * Math.cos(i*angulo));
		this.normals.push(0.5 * Math.sin(i*angulo));
		this.normals.push(0);
		}
	}

	for (var q = 0; q < this.stacks; q++) {
		for (var i = 0; i < this.slices; i++) {
			this.indices.push(this.slices*q+i);
			this.indices.push(this.slices*q+i+1);
			this.indices.push(this.slices*(q+1)+i);
			if (i != (this.slices - 1)) {
				this.indices.push(this.slices*(q+1)+i+1);
				this.indices.push(this.slices*(q+1)+i);
				this.indices.push(this.slices*q+i+1);
				}
			else {
				this.indices.push(this.slices*q);
				this.indices.push(this.slices*q+i+1)
				this.indices.push(this.slices*q+i);
				}
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
