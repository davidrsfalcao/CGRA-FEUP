/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks)
{
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.minS = 0.0
	this.maxS = 1.0
	this.minT = 0.0
	this.maxT = 1.0
	this.texelLengthS = (this.maxS - this.minS) / this.slices;
	this.texelLengthT = (this.maxT - this.minT) / this.stacks;
	this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function()
{
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	this.vertices = [];

	var phi = 0;
	var sCoord = this.maxS;
	var phiIncrement = (2 * Math.PI) / this.slices;
	var thetaIncrement = Math.PI / (2 * this.stacks);

	for (var i = 0; i <= this.slices; i++)
	{
		var theta = 0;
		var tCoord = this.minT;

		for (var j = 0; j <= this.stacks; j++)
		{
			var x = Math.cos(phi) * Math.sin(theta);
			var z = Math.sin(phi) * Math.sin(theta);
			var y = Math.cos(theta);

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			this.texCoords.push(sCoord, tCoord);

			theta += thetaIncrement;
			tCoord += this.texelLengthT;
		}

		phi += phiIncrement;
		sCoord -= this.texelLengthS;
	}

	var vertexNumber = 1;

	for (var i = 0; i < this.slices; i++)
	{
		for (var j = 0; j < this.stacks; j++)
		{
			this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber + this.stacks + 1);
			this.indices.push(vertexNumber + this.stacks, vertexNumber, vertexNumber - 1);
			this.indices.push(vertexNumber + this.stacks + 1, vertexNumber + this.stacks, vertexNumber);
			this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber - 1);

			vertexNumber++;
		}

		vertexNumber++;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
