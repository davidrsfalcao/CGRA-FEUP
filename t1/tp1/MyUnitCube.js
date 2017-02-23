function MyUnitCube(scene) {
 CGFobject.call(this,scene);

 this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

 MyUnitCube.prototype.initBuffers = function () {
 this.vertices = [
            -0.5, -0.5, -0.5, //0
            0.5, -0.5, -0.5, //1
            -0.5, 0.5, -0.5, //2
            0.5, 0.5, -0.5,  //3


           -0.5, -0.5, 0.5,  //4
            0.5, -0.5, 0.5,  //5
            -0.5, 0.5, 0.5,  //6
            0.5, 0.5, 0.5      //7
           
   ];

 this.indices = [
 //face de trás           
            2,1,0,
            1,2,3,            
 //face da frente
            4,5,6,            
            7,6,5,            
 //face da direita
            3,7,5,            
            5,1,3,            
 //face da esquerda
   0,4,2,   
   4,6,2,   
 //face de baixo
   1,5,4,
   1,4,0,   
 //face de cima
   6,7,2,    
   7,3,2   
        
        ];
  
 this.primitiveType=this.scene.gl.TRIANGLES;
 this.initGLBuffers();
};