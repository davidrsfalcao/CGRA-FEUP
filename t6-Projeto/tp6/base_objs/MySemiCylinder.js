/**
* MySemiCylinder
* @constructor
*/
function MySemiCylinder(scene, slices, stacks) {
    CGFobject.call(this,scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MySemiCylinder.prototype = Object.create(CGFobject.prototype);
MySemiCylinder.prototype.constructor = MySemiCylinder;

MySemiCylinder.prototype.initBuffers = function() {
    var angle_inc = Math.PI/this.slices;
    var ang = 0;

    this.indices = [];
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    verts = 0;

		for (i = 0 ; i <= this.slices ; i++ ){
			this.vertices.push( Math.cos(angle_inc*i) , 0 , Math.sin(angle_inc*i) );
			this.normals.push( Math.cos(angle_inc*i) , 0 , Math.sin(angle_inc*i) );
			this.texCoords.push(i/this.slices , 0);

			this.vertices.push( Math.cos(angle_inc*i) , 1 , Math.sin(angle_inc*i) );
			this.normals.push( Math.cos(angle_inc*i) , 1 , Math.sin(angle_inc*i) );
			this.texCoords.push(i/this.slices , 1);
		}

		for (i = 0 ; i <= this.slices ; i++ ){
			this.vertices.push( Math.cos(angle_inc*i) , 0 , Math.sin(angle_inc*i) );
			this.normals.push( -Math.cos(angle_inc*i) , 0 , -Math.sin(angle_inc*i) );
			this.texCoords.push(i/this.slices , 0);

			this.vertices.push( Math.cos(angle_inc*i) , 1 , Math.sin(angle_inc*i) );
			this.normals.push( -Math.cos(angle_inc*i) , 1 , -Math.sin(angle_inc*i) );
			this.texCoords.push(i/this.slices , 1);
		}
		var i = 0;
		for (i ; i < (2*this.slices) ; i++ ){
			if ( (i%2) != 0) //not even
				this.indices.push(i+2 , i+1 , i );
			else
				this.indices.push(i, i+1, i+2);
		}

		for (i ; i < (4*this.slices+2) ; i++ ){
			if ( (i%2) != 0) //not even
				this.indices.push(i+2 , i , i+1 );
			else
				this.indices.push(i+2, i+1, i );
		}

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
