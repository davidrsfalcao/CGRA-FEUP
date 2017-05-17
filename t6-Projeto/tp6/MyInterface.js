/**
* MyInterface
* @constructor
*/

function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
* init
* @param {CGFapplication} application
*/
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();


    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;
    var lights=this.gui.addFolder("Lights");
    lights.add(this.scene, 'Light0');
    lights.add(this.scene, 'Light1');
    lights.add(this.scene, 'Light2');
    lights.add(this.scene, 'Light3');

    var clock=this.gui.addFolder("Clock");
    clock.add(this.scene, 'pause');

    var submarine=this.gui.addFolder("Submarine");
    submarine.add(this.scene, 'speed', -1, 2, 0.1);
    submarine.add(this.scene, 'textures', { texture1: 0, texture2: 1, texture3: 2} );

    return true;
};

/**
* processKeyboard
* @param event {Event}
*/
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this,event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    switch (event.keyCode)
    {
        //Move Front (0) w
        case (87):	{
            this.scene.submarine.move(0);
            break;
        }
        case (119):	{
            this.scene.submarine.move(0);
            break;
        }

        //Move Back (1) s
        case (83):	{
            this.scene.submarine.move(1);
            break;
        }
        case (115):	{
            this.scene.submarine.move(1);
            break;
        }

        //Move Right (2) d
        case (68):	{
            this.scene.submarine.move(2);
            break;
        }
        case (100):	{
            this.scene.submarine.move(2);
            break;
        }

        // Move Left (3) a
        case (65):	{
            this.scene.submarine.move(3);
            break;
        }
        case (97):{
            this.scene.submarine.move(3);
            break;
        }

    };
};
