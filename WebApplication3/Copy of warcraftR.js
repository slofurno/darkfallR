var ctx;
var canvas;
var canvasheight;
var canvaswidth;

var turtle;
var turtlespot = 50;


var testinc;
var testarray = new Array();
var testanim;

function Main() {
    
    testarray.push([151, 11, 32, 43]);
    testarray.push([151, 11, 32, 43]);
    testarray.push([151, 11, 32, 43]);
    testarray.push([151, 11, 32, 43]);
    testarray.push([151, 11, 32, 43]);
    testarray.push([144, 63, 39, 42]);
    testarray.push([144, 63, 39, 42]);
    testarray.push([144, 63, 39, 42]);
    testarray.push([144, 63, 39, 42]);
    testarray.push([144, 63, 39, 42]);
    testarray.push([144, 114, 38, 42]);
    testarray.push([144, 114, 38, 42]);
    testarray.push([144, 114, 38, 42]);
    testarray.push([144, 114, 38, 42]);
    testarray.push([144, 114, 38, 42]);
    testarray.push([146, 165, 36, 42]);
    testarray.push([146, 165, 36, 42]);
    testarray.push([146, 165, 36, 42]);
    testarray.push([146, 165, 36, 42]);
    testarray.push([146, 165, 36, 42]);
    testarray.push([146, 220, 31, 41]);
    testarray.push([146, 220, 31, 41]);
    testarray.push([146, 220, 31, 41]);
    testarray.push([146, 220, 31, 41]);
    testarray.push([146, 220, 31, 41]);

    testanim = new Animation(testarray);

    testinc = 0;

    $(document).keydown(function (e) {



    });

    var canvas = document.getElementById('warcraftctx');
    ctx = canvas.getContext('2d');
    canvaswidth = canvas.width;
    canvasheight = canvas.height;

    turtle = new Image();
    turtle.src = 'img/troll.gif';
    
    turtle.onload = function () {
        //ctx.drawImage(turtle, 0, 0);
        render();
    };

    ctx.fillStyle = "#a52a2a"
    ctx.fillRect(0,0,canvaswidth,canvasheight);

    //alert("Hello! I am an alert box!!");


};

function render() {
    ctx.fillRect(0, 0, canvaswidth, canvasheight);

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
    

    var ggg = testanim.animationarray[testinc];

    //ggg[0] = testarray[0][0];

    ctx.drawImage(turtle, ggg[0], ggg[1], ggg[2], ggg[3], turtlespot, 50,ggg[2],ggg[3]);


    testinc++;

    if (testinc >= testanim.animationarray.length) {

        testinc = 0;
    }

    turtlespot = turtlespot + 2;

    requestAnimationFrame(render);

};

function Animation(coordarray) {

    var xmin;
    var xmax;

    xmin = coordarray[0][0];
    xmax = coordarray[0][0] + coordarray[0][2];

    for (var i = 1; i < coordarray.length; i++) {

        if (coordarray[i][0] < xmin) {
            xmin = coordarray[i][0];
        }

        if ((coordarray[i][0] + coordarray[i][2]) > xmax) {
            xmax = coordarray[i][0] + coordarray[i][2];

        }


    }

    xmax = xmax - xmin;

    this.animationarray = new Array();

    for (var i = 1; i < coordarray.length; i++) {

        this.animationarray.push([ xmin,coordarray[i][1],xmax,coordarray[i][3] ]);


    }
};

function Model(image, coordarray) {

    this.image = image;
    //store coords to all animations
    //


};

Model.prototype.draw = function () {


}