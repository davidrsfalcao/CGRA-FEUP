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

    this.gui.add(this.scene, 'frames', 1, 200);
    this.gui.add(this.scene, 'cameraChosen', {Free: 0, ThirdPerson: 1});

    var lights=this.gui.addFolder("Lights");
    lights.add(this.scene, 'Light0');
    lights.add(this.scene, 'Light1');
    lights.add(this.scene, 'Light2');
    lights.add(this.scene, 'Light3');

    var clock=this.gui.addFolder("Clock");
    clock.add(this.scene, 'pause');
    clock.add(this.scene, 'currClockAppearance', { Simple: 0, Old: 1, J_Walker: 2} );

    var submarine=this.gui.addFolder("Submarine");
    submarine.add(this.scene, 'Light');
    submarine.add(this.scene, 'speed', this.scene.v_min, this.scene.v_max);
    submarine.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList );


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

        /*
        PERISCOPE MOVEMENT
        */
        case (80): /* P */	{
            this.scene.submarine.upPeriscope();
            break;
        }
        case (112):	/* p */ {
            this.scene.submarine.upPeriscope();
            break;
        }

        case (76): /* L */	{
            this.scene.submarine.downPeriscope();
            break;
        }
        case (108): /* l */	{
            this.scene.submarine.downPeriscope();
            break;
        }

        /*
        SUBMARINE MOVEMENT
        */
        case (87):	/* W */ {
            this.scene.submarine.moveFront();
            break;
        }
        case (119):	/* w */ {
            this.scene.submarine.moveFront();
            break;
        }
        case (83):	/* S */ {
            this.scene.submarine.moveBack();
            break;
        }
        case (115):	/* s */ {
            this.scene.submarine.moveBack();
            break;
        }
        case (68):	/* D */ {
            if(this.scene.speed != 0){
                this.scene.submarine.turnRight();
            }
            break;
        }
        case (100):	/* d */ {
            if(this.scene.speed != 0){
                this.scene.submarine.turnRight();
            }
            break;
        }
        case (65):	/* A */ {
            if(this.scene.speed != 0){
                this.scene.submarine.turnLeft();
            }
            break;
        }
        case (97):  /* a */ {
            if(this.scene.speed != 0){
                this.scene.submarine.turnLeft();
            }
            break;
        }
        case (81):	/* Q */ {
            if(this.scene.speed != 0){
                this.scene.submarine.tiltUp();
            }
            break;
        }
        case (113):	/* q */ {
            if(this.scene.speed != 0){
                this.scene.submarine.tiltUp();
            }
            break;
        }
        case (69):	/* E */ {
            if(this.scene.speed != 0 && (this.scene.submarine.y > 0)){
                this.scene.submarine.tiltDown();
            }
            break;
        }
        case (101):  /* e */ {
            if(this.scene.speed != 0 && (this.scene.submarine.y > 0)){
                this.scene.submarine.tiltDown();
            }
            break;
        }
        case (78):	/* N */ {
            this.scene.Light = (!this.scene.Light);
            break;
        }
        case (110):  /* n */ {
            this.scene.Light = (!this.scene.Light);
            break;
        }
        case (110):  /* n */ {
            this.scene.Light = (!this.scene.Light);
            break;
        }
        case (70):  /* F */ {
            this.scene.launchTorpedo();
            break;
        }
        case (102): /* f */{
            this.scene.launchTorpedo();
            break;
        }




    };
};

MyInterface.prototype.processKeyUp = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyUp.call(this,event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

    switch (event.keyCode) {

        case (68):	/* D */ {
            this.scene.submarine.stopTurning();
            break;
        }
        case (100):	/* d */ {
            this.scene.submarine.stopTurning();
            break;
        }
        case (65):	/* A */ {
            this.scene.submarine.stopTurning();
            break;
        }
        case (97):  /* a */ {
            this.scene.submarine.stopTurning();
            break;
        }
        case (81):	/* Q */ {
            this.scene.submarine.stopTilt();
            break;
        }
        case (113):	/* q */ {
            this.scene.submarine.stopTilt();
            break;
        }
        case (69):	/* E */ {
            this.scene.submarine.stopTilt();
            break;
        }
        case (101):  /* e */ {
            this.scene.submarine.stopTilt();
            break;
        }


    };
};
