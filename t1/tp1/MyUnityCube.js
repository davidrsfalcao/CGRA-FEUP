/**
 * MyUnityCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnityCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnityCube.prototype = Object.create(CGFobject.prototype);
MyUnityCube.prototype.constructor=MyUnityCube;

MyUnityCube.prototype.initBuffers = function () {
	//R -> x , G -> y , B -> z
	this.vertices = [
            -0.5, -0.5, -0.5, //Vertice 0(A)
            0.5, -0.5, -0.5, // Vertice 1(B)
            -0.5, 0.5, -0.5, //Vertice 2(C)
            0.5, 0.5, -0.5, //Vertice 3(D)
            -0.5,-0.5,0.5, //Vertice 4 (E)
            0.5,-0.5,0.5, //Vertice 5 (F)
          	-0.5,0.5,0.5, //Vertice 6 (G)
          	0.5 , 0.5 ,0.5 //Vertice 7 (H)
			];

 	//Seguindo a regra da mao direita o triangulo é visivel do lado
 	// do polegar 
	this.indices = [
            3,0,1, //DAB
            3,2,0, //DCA

            3,7,6, //DHG
            3,6,2, //DGC

            7,5,4, //HFE
            7,4,6, //HEG

            6,4,0, //GEA
            0,2,6, //ACG

            4,5,1, //EFB
            1,0,4, //BAE

            1,5,7, //BFH
            1,7,3  //BHD

        ];

    //this.indices = [
    //        1, 2, 0, //Formar triangulo vom certices 1,2,0
	//		3, 2, 1, //Formar com vertices 3,2,1
	//		4, 5, 6
    //    ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};