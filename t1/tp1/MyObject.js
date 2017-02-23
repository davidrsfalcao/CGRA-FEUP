/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyObject(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyObject.prototype = Object.create(CGFobject.prototype);
MyObject.prototype.constructor=MyObject;

MyObject.prototype.initBuffers = function () {
	this.vertices = [

	        // x    y    z
            -0.5, -0.5, 0, // Vertice 0
            0.5, -0.5, 0, // Vertice 1
            -0.5, 0.5, 0, // Vertice 2
            0.5, 0.5, 0, // Vertice 3

			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1,
			
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
