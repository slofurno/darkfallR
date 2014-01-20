var ctx;
var canvas;
var canvasheight;
var canvaswidth;

var turtle;
var turtlespot = 50;

var testunit;

var testinc;
var testarray;
var testanim;

var lotharunit;

function Main() {
    
    


    testarray = [[20, 9, 34, 46], [150, 11, 32, 43], [199, 11, 39, 42], [255, 11, 34, 43], [82, 11, 28, 44], [24, 60, 29, 48], [81, 63, 34, 42], [143, 63, 39, 42], [196, 62, 41, 45], [257, 63, 32, 44], [81, 113, 32, 41], [143, 114, 38, 42], [199, 113, 38, 44], [256, 114, 33, 42], [21, 113, 32, 46], [200, 165, 33, 39], [17, 163, 38, 47], [145, 165, 36, 42], [74, 164, 47, 50], [254, 166, 39, 44], [145, 220, 31, 41], [256, 221, 33, 41], [78, 219, 37, 48], [200, 223, 34, 37], [18, 220, 37, 47], [260, 271, 43, 47], [202, 270, 36, 51], [139, 272, 42, 50], [74, 278, 37, 45], [11, 280, 37, 46], [260, 330, 26, 48], [195, 330, 46, 51], [63, 333, 45, 52], [126, 337, 55, 45], [19, 333, 29, 58], [3, 403, 1, 1], [204, 394, 35, 51], [73, 396, 45, 51], [145, 396, 34, 51], [4, 401, 51, 45], [254, 403, 53, 39], [24, 450, 33, 47], [190, 454, 41, 45], [145, 456, 34, 43], [83, 458, 32, 42], [248, 458, 38, 44], [23, 473, 1, 1]];

    var lothararray = [[217, 2, 32, 40], [311, 4, 32, 36], [15, 4, 36, 38], [117, 4, 29, 42], [596, 5, 32, 40], [502, 7, 32, 36], [403, 6, 38, 41], [699, 7, 29, 42], [802, 8, 34, 39], [1481, 8, 28, 40], [1375, 10, 36, 36], [904, 11, 28, 39], [1002, 13, 36, 36], [1287, 14, 32, 34], [1184, 15, 38, 35], [1094, 17, 32, 33], [309, 74, 36, 38], [215, 74, 30, 40], [111, 76, 34, 40], [13, 78, 36, 36], [496, 77, 36, 38], [596, 77, 30, 40], [800, 77, 39, 40], [403, 78, 34, 41], [696, 79, 34, 40], [1465, 80, 40, 40], [1377, 82, 32, 39], [904, 83, 40, 40], [1000, 85, 32, 39], [1283, 86, 34, 39], [1177, 87, 41, 40], [1092, 89, 34, 39], [798, 155, 36, 56], [215, 168, 29, 40], [311, 168, 36, 42], [597, 171, 29, 40], [1457, 170, 48, 44], [109, 172, 34, 40], [494, 171, 36, 42], [407, 174, 30, 38], [15, 176, 32, 34], [904, 173, 48, 44], [1355, 176, 52, 36], [698, 175, 34, 40], [1002, 179, 52, 36], [1265, 178, 48, 42], [1096, 181, 48, 42], [1188, 187, 36, 50], [1469, 256, 40, 54], [900, 259, 40, 54], [215, 270, 32, 36], [403, 270, 30, 36], [800, 269, 32, 38], [13, 272, 36, 34], [305, 272, 34, 34], [119, 270, 34, 42], [1365, 272, 40, 36], [594, 273, 32, 36], [502, 275, 34, 34], [688, 273, 34, 42], [1004, 275, 40, 36], [1261, 274, 50, 40], [1098, 277, 50, 40], [1191, 285, 35, 40], [796, 361, 38, 40], [215, 362, 36, 40], [13, 364, 36, 38], [117, 364, 32, 42], [309, 366, 28, 36], [1477, 362, 32, 48], [590, 365, 36, 40], [1369, 366, 40, 40], [401, 366, 38, 41], [504, 369, 28, 36], [692, 367, 32, 42], [900, 365, 32, 48], [1275, 368, 40, 40], [1000, 369, 40, 40], [1094, 371, 40, 40], [1186, 381, 36, 34]];

    //testanim = new Animation(testarray);

    testinc = 0;

    $(document).keydown(function (e) {



    });

    var canvas = document.getElementById('warcraftctx');
    ctx = canvas.getContext('2d');
    canvaswidth = canvas.width;
    canvasheight = canvas.height;

    var lothar = new Image();
    lothar.src = 'img/lothar.gif';

    lothar.onload = function () {

        lotharunit = new Unit(new Model(lothar, lothararray));
        render();
    };

    turtle = new Image();
    turtle.src = 'img/troll2.gif';
    
    turtle.onload = function () {

        testanim = new Model(turtle, testarray);

        testunit = new Unit(testanim);

        //ctx.drawImage(turtle, 0, 0);
        //render();
    };

    ctx.fillStyle = "#a52a2a"
    ctx.fillRect(0,0,canvaswidth,canvasheight);

    //alert("Hello! I am an alert box!!");


};

function render() {
    ctx.fillRect(0, 0, canvaswidth, canvasheight);

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
    

    //var ggg = testanim.coordarray[Math.floor(testinc)];

    //ggg[0] = testarray[0][0];

    //ctx.drawImage(turtle, ggg[0], ggg[1], ggg[2], ggg[3], turtlespot, 50,ggg[2],ggg[3]);


    //testunit.Draw();
    lotharunit.Draw();

    
    testinc=testinc + .1;

    if (testinc >= 5) {

        testinc = 0;
    }

    

    turtlespot = turtlespot + 2;

    requestAnimationFrame(render);

};

//pass in a array of sprite positions representing a single animation
//alters the size so they are correct and saves a new array


//pass in array of coordinate arrays, cuts it up into individual animation arrays and saves in new array
//needs array of animations
function Model(image, xcoordarray) {
    
    var self = this;

    this.pimage = image;
    this.imwidth = image.width;
    this.imheight = image.height;
    this.maxrange = 0;
    
    xcoordarray.sort(function (a, b) {
        return ((50 * Math.floor(a[1] / 50) * self.imwidth + a[0]) - (50 * Math.floor(b[1] / 50) * self.imwidth + b[0]));
    });


    for (var i = 0; i < xcoordarray.length; i++) {

        if ((xcoordarray[i][2]) > self.maxrange) {

            self.maxrange = (xcoordarray[i][2]);

        }

    }

    for (var i = 0; i < xcoordarray.length; i++) {

        xcoordarray[i][0] = ((2 * xcoordarray[i][0] + xcoordarray[i][2]) - self.maxrange) / 2;
        xcoordarray[i][2] = self.maxrange;

    }

    this.coordarray = xcoordarray;
    //store coords to all animations
    //


};

var animationkey = new Array();

for (var i = 0; i < 16; i++) {

    animationkey.push([0+i, 16+i, 32+i, 48+i, 64+i]);

}





function Unit(mymodel) {


    var self = this;
    this.model = mymodel;
    //self.velocity = new Vector2d();
    this.animation = 1;
    this.flipanimation = 0;


}

Unit.prototype.Draw = function () {

    var xcod = 0;
    var ycod = 0;

    var xoffset = 0;
    var yoffset = 0;

    //var spriteindex = animationkey[this.animation][1];

    var spriteindex;

    for (var i = 0; i < 16; i++) {

        spriteindex = animationkey[i][Math.floor(testinc)];

        //console.log("coord : " + this.model.coordarray[0]);

        //for (var spriteindex = 0; spriteindex < this.model.coordarray.length; spriteindex++) {

        if (this.model.coordarray[i][0] < this.model.coordarray[spriteindex][0]) {



        }


        if (i == 12) {

            ctx.drawImage(this.model.pimage, this.model.coordarray[spriteindex][0], this.model.coordarray[spriteindex][1], this.model.coordarray[spriteindex][2], this.model.coordarray[spriteindex][3], 50 * i-.5*this.model.coordarray[spriteindex][2], 10, this.model.coordarray[spriteindex][2], this.model.coordarray[spriteindex][3]);

        }
        else{

            ctx.drawImage(this.model.pimage, this.model.coordarray[spriteindex][0], this.model.coordarray[spriteindex][1], this.model.coordarray[spriteindex][2], this.model.coordarray[spriteindex][3], 50 * i - .5 * this.model.coordarray[spriteindex][2], 50 - this.model.coordarray[spriteindex][3], this.model.coordarray[spriteindex][2], this.model.coordarray[spriteindex][3]);

        }
        /*
            xcod = xcod + 40;
    
            if (xcod >= 800) {
                ycod = ycod + 50;
                xcod = 0;
            }
    
        }
        */
    }
    
};

Unit.prototype.update = function () {




};

function Vector2d() {

    var self = this;
    self.x = 0;
    self.y = 0;

}

Model.prototype.draw = function (ctx) {



}