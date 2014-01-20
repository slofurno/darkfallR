var mouseX;
var mouseY;

var keyboard;

var lothar;

var ctx;
var canvaswidth;
var canvasheight;

var mouseangle;
var currentangle;

var tempx;
var tempy;


var particlearray;

var tempspiral;
var tempcloud;
var tempaura;
var tempfire;
var tempfire2;
var tempfire3;
var tempfire4;

var tempexplode2;

var tempexplode;

var forwardvelocity = 0;

function PlayerManager() {

    this.playerarray = new Array();


}

function Player(id, position) {

    this.id = id;
    this.position = new vectortwo(position.x, position.y);
    this.velocity = new vectortwo(0,0);

}



function Color(r,g,b,a){

    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;

}

Color.prototype.getCS = function () {

    return ('rgba(' + Math.floor(this.r) + ',' + Math.floor(this.g) + ',' + Math.floor(this.b) + ',' + this.a + ')');

};

function vectortwo(x,y,scale){

    this.x = x;
    this.y = y;

    if (typeof (scale) != "undefined") {
        this.scale = scale;
    }
    else {

        scale = 1;
    }

    

}

function vectorthree(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}



function particle(position, velocity, radius, color, endcolor, time, endradius, accel) {

    this.position = position;
    this.velocity = velocity;
    this.startvelocity = new vectortwo(velocity.x, velocity.y);
    this.endvelocity = new vectortwo(velocity.x/4, velocity.y/4);
    this.radius = radius;
    

    this.startradius = radius;
    if (typeof (endradius) != "undefined") {
        this.endradius = endradius;
    }
    else {

        this.endradius = radius;
    }

    if (typeof (accel) != "undefined") {
        this.accel = accel;
    }
    else {

        this.accel = new vectortwo(0,0);
    }

    this.color = color;
    this.time = time;
    this.maxtime = time;
    //this.startcolor = new Color(255, 255, 255, 1);

    this.startcolor = new Color(color.r, color.g, color.b, color.a);

    this.endcolor = endcolor;
    //this.endcolor = new Color(255, 100, 0, .1);


}

particle.prototype.draw = function () {

   
    

    ctx.beginPath();
    ctx.arc(Math.floor(this.position.x), Math.floor(this.position.y), this.radius, 0, 2 * Math.PI);

    ctx.fillStyle = this.color.getCS();
    ctx.fill();

    

};

particle.prototype.update = function () {

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.time--;
    //this.color.a = (this.time / this.maxtime);

    this.color.r = this.startcolor.r + ((this.maxtime - this.time) / this.maxtime) * (this.endcolor.r - this.startcolor.r);
    this.color.g = this.startcolor.g + ((this.maxtime - this.time) / this.maxtime) * (this.endcolor.g - this.startcolor.g);
    this.color.b = this.startcolor.b + ((this.maxtime - this.time) / this.maxtime) * (this.endcolor.b - this.startcolor.b);
    this.color.a = this.startcolor.a + ((this.maxtime - this.time) / this.maxtime) * (this.endcolor.a - this.startcolor.a);

    //this.velocity.x += this.accel.x;
    //this.velocity.y += this.accel.y;

    this.velocity.x = this.startvelocity.x + ((this.maxtime - this.time) / this.maxtime) * (this.endvelocity.x - this.startvelocity.x);
    this.velocity.y = this.startvelocity.y + ((this.maxtime - this.time) / this.maxtime) * (this.endvelocity.y - this.startvelocity.y);


    this.radius = this.startradius + ((this.maxtime - this.time) / this.maxtime) * (this.endradius - this.startradius);
};

function fireball(position, velocity) {

    this.position = position;
    this.velocity = velocity;
    this.parts = new Array();

    //this.parts.push(new particle(new vectortwo(this.position.x, this.position.y), this.velocity, 5, new Color(255, 255, 255, 1),90));
    //this.parts.push(new particle(new vectortwo(this.position.x, this.position.y), this.velocity, 10, new Color(255, 0, 255, 0.8),90));

    //

}

fireball.prototype.update = function () {

    var temp;
 
    for (var x = this.position.x-2; x<=this.position.x+2;x++){

        for (var y = this.position.y - 2; y <= this.position.y + 2; y++) {
            temp = Math.random();

            if (temp > .95) {

                this.parts.push(new particle(new vectortwo(x, y), new vectortwo(this.velocity.x, this.velocity.y), 4, new Color(255, 255, 255, 1), new Color(255, 100, 0, .1), 55));

            }
            else if (temp > .92) {
                this.parts.push(new particle(new vectortwo(x, y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 4, new Color(0, 0, 0, .2), new Color(0, 0, 0, .1), 55));

            }

        }


    }

    //this.parts.push(new particle(this.position, this.velocity, 3, new Color(75,75,75,1)));
    //this.parts.push(new particle(new vectortwo(this.position.x,this.position.y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 10, new Color(255, 0, 255, 0.8),55));


    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;
};

fireball.prototype.draw = function () {




    for (var i = this.parts.length-1; i>=0; i--) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {

            
            this.parts[i].draw();

        }
    }


    /*
    ctx.beginPath();

    ctx.arc(Math.floor(this.position.x), Math.floor(this.position.y), 5, 0, 2 * Math.PI);

    ctx.fillStyle = 'RGBA(255, 0, 255, .8)';

    ctx.fill();
    
    
    ctx.beginPath();
    ctx.arc(Math.floor(this.position.x), Math.floor(this.position.y), 3, 0, 2 * Math.PI);

    ctx.fillStyle = 'RGBA(255, 255, 255, 1)';

    ctx.fill();

    */
};

//function particle(position, velocity, radius, color, time) {

function firefield(x,y) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 80;
    this.maxtime = this.time;

}
//function particle(position, velocity, radius, color, endcolor, time, endradius) {
firefield.prototype.update = function () {
    
 
    var temp = Math.random();

    //if (temp > .64) { 
            if (this.time % 3 == 0){

                this.parts.push(new particle(new vectortwo(this.center.x+Random(-1,1), this.center.y), new vectortwo(Random(-.7,.7), -1), 7, new Color(255, 255, 255, .8), new Color(255, 100, 0, .3), 22,16));

            }
    //else if (temp > .3) { 
    else if (this.time %4 == 0){

                this.parts.push(new particle(new vectortwo(this.center.x, this.center.y - 2), new vectortwo(Random(-.5, .5), -2), 12, new Color(0, 0, 0, .3), new Color(0, 0, 0, 0), 80, 30));

            }

 

    //this.parts.push(new particle(this.position, this.velocity, 3, new Color(75,75,75,1)));
    //this.parts.push(new particle(new vectortwo(this.position.x,this.position.y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 10, new Color(255, 0, 255, 0.8),55));


    //this.position.x = this.position.x + this.velocity.x;
    //this.position.y = this.position.y + this.velocity.y;

            this.time--;

};


firefield.prototype.update2 = function () {

    var temp;

    for (var x = this.center.x - 4; x <= this.center.x + 4; x++) {

        for (var y = this.center.y - 2; y <= this.center.y + 2; y++) {
            temp = Math.random();

            if (temp > .95) {

                this.parts.push(new particle(new vectortwo(x, this.center.y + 1), new vectortwo(0, -.5), 1, new Color(255, 255, 255, .5), new Color(255, 100, 0, .3), 12, 14));

            }
            else if (temp > .9) {

                this.parts.push(new particle(new vectortwo(x, y - 1), new vectortwo(Random(-.5, .5), -2), 12, new Color(0, 0, 0, 1), new Color(0, 0, 0, 0), 55, 20));

            }

        }


    }

    //this.parts.push(new particle(this.position, this.velocity, 3, new Color(75,75,75,1)));
    //this.parts.push(new particle(new vectortwo(this.position.x,this.position.y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 10, new Color(255, 0, 255, 0.8),55));


    //this.position.x = this.position.x + this.velocity.x;
    //this.position.y = this.position.y + this.velocity.y;

};

firefield.prototype.draw = function () {

    ctx.save();
    //ctx.globalCompositeOperation = 'lighter';

    for (var i = 0; i < this.parts.length; i++) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }

    ctx.restore();

};

function spiral(x,y) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 80;
    this.maxtime = this.time;

}

spiral.prototype.update = function () {

    if (this.time > 0) {

        var temp = get2D(new vectorthree(this.radius * Math.cos(this.theta), this.height, this.radius * Math.sin(this.theta)));

        temp.y = temp.y + this.center.y + this.height;
        temp.x = temp.x + this.center.x;

        this.parts.push(new particle(temp, new vectortwo(0, .1), 6 * temp.scale, new Color(0, 255, 0, .6), new Color(0, 255, 0, .05), 140, 8*temp.scale) );

        /*
        temp = get2D(new vectorthree(this.radius * Math.cos(this.theta2), this.height, this.radius * Math.sin(this.theta2)));

        temp.y = temp.y + this.center.y + this.height;
        temp.x = temp.x + this.center.x;

        this.parts.push(new particle(temp, new vectortwo(0, -.02), 6 * temp.scale, new Color(0, 0, 255, .4), new Color(200, 200, 255, .1), 120));
        */

        this.theta += Math.PI / 10;
        this.theta2 += Math.PI / 10;

        if (this.theta > 2 * Math.PI) {

            this.theta -= 2 * Math.PI;

        }

        if (this.theta2 > 2 * Math.PI) {

            this.theta2 -= 2 * Math.PI;

        }

       
            this.height--;
        

        this.time--;
    }
};

spiral.prototype.draw = function () {

    /*
    var temp = get2D(new vectorthree(this.center.x + this.radius * Math.cos(this.theta), this.height, this.center.y + this.radius * Math.sin(this.theta)));

    var grd = ctx.createRadialGradient(temp.x, temp.y, 1, temp.x, temp.y, 6);
    grd.addColorStop(0, 'RGBA(255,255,255,.6)');

    grd.addColorStop(1, 'RGBA(255,255,255,0)');

    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.arc(Math.floor(temp.x), Math.floor(temp.y), 6, 0, 2 * Math.PI);
    ctx.fill();
    */

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }



};

function aura(x,y) {
    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 40;
    this.time = 300;
    this.maxtime = this.time;



}

aura.prototype.update = function () {

    if (this.time > 0) {

        if (this.time % 35 == 0) {


            for (var t = 0; t < 2 * Math.PI; t = t + Math.PI / 16) {

                var temp = get2D(new vectorthree(this.radius * Math.cos(t), this.height, this.radius * Math.sin(t)));

                temp.y = temp.y + this.center.y + this.height;
                temp.x = temp.x + this.center.x;

                this.parts.push(new particle(temp, new vectortwo(0, -1), 3 * temp.scale, new Color(255, 0, 0, .3 * temp.scale * temp.scale * temp.scale), new Color(255, 00, 0, .05), 140, 3 * temp.scale));

            }
            /*
    
            if (Random(-2,1)>=0) {
    
                var temp = get2D(new vectorthree(this.radius * Math.cos(this.theta), this.height, this.radius * Math.sin(this.theta)));
    
                temp.y = temp.y + this.center.y + this.height;
                temp.x = temp.x + this.center.x;
    
                this.parts.push(new particle(temp, new vectortwo(0, -1), 2 * temp.scale, new Color(255, 0, 0, .6), new Color(255, 00, 0, .05), 140, 2 * temp.scale));
    
                /*
                temp = get2D(new vectorthree(this.radius * Math.cos(this.theta2), this.height, this.radius * Math.sin(this.theta2)));
        
                temp.y = temp.y + this.center.y + this.height;
                temp.x = temp.x + this.center.x;
        
                this.parts.push(new particle(temp, new vectortwo(0, -.02), 6 * temp.scale, new Color(0, 0, 255, .4), new Color(200, 200, 255, .1), 120));
                */






            //this.height--;

        }
        this.theta += Math.PI / 10;
        this.theta2 += Math.PI / 10;

        if (this.theta > 2 * Math.PI) {

            this.theta -= 2 * Math.PI;

        }

        if (this.theta2 > 2 * Math.PI) {

            this.theta2 -= 2 * Math.PI;

        }


        this.time--;
    }
    
};

aura.prototype.draw = function () {

    /*
    var temp = get2D(new vectorthree(this.center.x + this.radius * Math.cos(this.theta), this.height, this.center.y + this.radius * Math.sin(this.theta)));

    var grd = ctx.createRadialGradient(temp.x, temp.y, 1, temp.x, temp.y, 6);
    grd.addColorStop(0, 'RGBA(255,255,255,.6)');

    grd.addColorStop(1, 'RGBA(255,255,255,0)');

    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.arc(Math.floor(temp.x), Math.floor(temp.y), 6, 0, 2 * Math.PI);
    ctx.fill();
    */

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }



};

function cloud(x,y) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 500;
    this.maxtime = this.time;

}

cloud.prototype.update = function () {

    if (this.time > 0) {



        if ((this.time % 10) == 0) {

            this.parts.push(new particle(new vectortwo(this.center.x + Random(-5, 5), this.center.y + Random(-3, 3)), new vectortwo(Random(-1, 1), Random(-.5, .5)), 25, new Color(0, 75, 0, .6), new Color(0, 75, 0, .1), 120, 30));
        }
        else if ((this.time % 5) == 0) {

            this.parts.push(new particle(new vectortwo(this.center.x + Random(-5, 5), this.center.y + Random(-3, 3)), new vectortwo(Random(-1, 1), Random(-.5, .5)), 25, new Color(0, 56, 0, .6), new Color(0, 56, 0, .1), 120, 30));
        }

        this.time--;
    }
};

cloud.prototype.draw = function () {

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }

};


function explode(x, y, colorstart, colorend) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 40;
    this.maxtime = this.time;
    this.colorstart = colorstart;
    this.colorend = colorend;

}

explode.prototype.update = function () {

    if (this.time > 0) {

        var temp = Math.random();

        //if (temp > .64) { 
        if (this.maxtime - this.time < 10) {
            //new Color(255, 100, 0, .3), 22, 22)
            //new Color(255, 255, 255, .8), 22, 22)
            this.parts.push(new particle(new vectortwo(this.center.x + Random(-2, 2), this.center.y + Random(-2, 2)), new vectortwo(0, 0), 7, new Color(this.colorstart.r, this.colorstart.g, this.colorstart.b, this.colorstart.a), new Color(this.colorend.r, this.colorend.g, this.colorend.b, this.colorend.a), 30, 25));

        }
            //else if (temp > .3) { 
        else if (this.time % 4 == 0) {

            //this.parts.push(new particle(new vectortwo(this.center.x, this.center.y - 2), new vectortwo(Random(-.5, .5), -2), 12, new Color(0, 0, 0, .3), new Color(0, 0, 0, 0), 80, 30));

        }



        this.time--;

    }
};


explode.prototype.update2 = function () {

    if (this.time > 0) {

        if (this.time >= 20) {

            this.parts.push(new particle(new vectortwo(this.center.x, this.center.y), new vectortwo(0, 0), 5, new Color(255, 255, 255, 1), new Color(255, 255, 255, .3), 16, 70));

        }

        if (this.time == 4) {

            var temp;
            var temp2;
            for (var i = 0; i < 50; i++) {
                temp = Random(0, 2 * Math.PI);
                temp2 = Random(1, 3);
                this.parts.push(new particle(new vectortwo(this.center.x, this.center.y), new vectortwo(temp2*Math.cos(temp), temp2*Math.sin(temp)), 6, new Color(100, 100, 50, 1), new Color(100, 100, 50, .1), 50, 12));

            }
        }

        

        this.time--;
    }
};

explode.prototype.draw = function () {

    ctx.save();
    //ctx.globalCompositeOperation = 'lighter';

    for (var i = 0; i < this.parts.length; i++) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }

    ctx.restore();

};

function bubble(x, y) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 1000;
    this.maxtime = this.time;

}

bubble.prototype.update = function () {

    if (this.time > 0) {

        if (this.time == this.maxtime) {

            this.parts.push(new particle(new vectortwo(this.center.x, this.center.y), new vectortwo(0, 0), 60, new Color(0, 0, 66, .2), new Color(0, 0, 66, .2), this.maxtime, 60));

        }

        if ((this.time % 100) == 0) {

            this.parts.push(new particle(new vectortwo(this.center.x , this.center.y), new vectortwo(0, 0), 60, new Color(0, 0, 0, .3), new Color(0, 0, 255, .1), 50, 2));
        }
  

        this.time--;
    }
};

bubble.prototype.draw = function () {

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

        if (this.parts[i].time >= 0) {


            this.parts[i].draw();

        }
    }

};


function render() {

    if (keyboard.upkey) {

        forwardvelocity = forwardvelocity + .1;

       

    }

    if (forwardvelocity >= .1) {

        tempx = tempx + forwardvelocity * Math.cos(currentangle);
        tempy = tempy + forwardvelocity * Math.sin(currentangle);

        forwardvelocity = forwardvelocity - .01 * forwardvelocity;

    }
    

    if (keyboard.leftkey) {

        tempx = tempx + Math.cos(currentangle-Math.PI/2);
        tempy = tempy + Math.sin(currentangle-Math.PI/2);

    }
    else if (keyboard.rightkey) {

        tempx = tempx + Math.cos(currentangle + Math.PI / 2);
        tempy = tempy + Math.sin(currentangle + Math.PI / 2);

    }




    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    //currentangle = Math.atan2(mouseY - .5 * canvasheight, mouseX - .5 * canvaswidth);
    currentangle = Math.atan2(mouseY - tempy, mouseX - tempx);


    ctx.fillStyle = 'RGB(75,75,75)';
    
    
    ctx.fillRect(0, 0, canvaswidth, canvasheight);

    /*

    var grd = ctx.createRadialGradient(700, 111, 1, 700, 111, 30);
    grd.addColorStop(0, 'RGBA(255,255,255,.6)');
    
    grd.addColorStop(1, 'RGBA(255,255,255,0)');

    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.arc(Math.floor(700), 111, 30, 0, 2 * Math.PI);
    ctx.fill();
    */
    
    ctx.save();

    ctx.translate(tempx, tempy);
    ctx.rotate(currentangle);



    ctx.drawImage(lothar, -.5*lothar.width, -.5*lothar.height);


    ctx.restore();



    for (var i = 0; i < particlearray.length; i++) {

        particlearray[i].update();
        particlearray[i].draw();

    }

    tempspiral.update();
    tempspiral.draw();

    tempcloud.update();
    tempcloud.draw();

    tempaura.update();
    tempaura.draw();

    tempfire.update();
    tempfire.draw();

    tempfire2.update();
    tempfire2.draw();

    tempfire3.update();
    tempfire3.draw();

    tempfire4.update();
    tempfire4.draw();

    tempexplode.update();
    tempexplode.draw();

    requestAnimationFrame(render);

};

function Main() {

    particlearray = new Array();
    tempspiral = new spiral(600, 300);
    tempcloud = new cloud(150, 150);
    tempaura = new aura(300, 150);
    keyboard = new KeyboardState();
    tempfire = new firefield(150, 450);
    tempfire2 = new firefield(225, 450);
    tempfire3 = new firefield(300, 450);
    tempfire4 = new firefield(375, 450);

    var hub = $.connection.daggerHub;

    hub.client.initLevel = function (maparray, newpid, width, height) {

        MYID = newpid;
        levelwidth = width;
        levelheight = height;




        $.each(maparray, function (index, row) {

            leveldata[index] = [];

            $.each(row, function (index2, tile) {

                leveldata[index][index2] = parseInt(tile);


            });


        });




    };

    //new Color(255, 100, 0, .3), 22, 22)
    //new Color(255, 255, 255, .8), 22, 22)
    tempexplode = new explode(500, 100, new Color(255, 255, 255, .5), new Color(255, 100, 0, 0));

    //tempexplode = new explode(500, 100, new Color(255, 0, 255, .5), new Color(0, 100, 255, 0));

    $("#warcraftctx").mousemove(function (e) {

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

    });

    $("#warcraftctx").mousedown(function (e) {

        //particlearray.push(new fireball(new vectortwo(canvaswidth / 2, canvasheight / 2), new vectortwo(6 * Math.cos(currentangle), 6 * Math.sin(currentangle))));

        hub.server.sendMouseAngle(currentangle, MYID, 1);

    });

    $(document).keydown(function (e) {


        var keyid = e.which;

        if ((keyid == 87) || (keyid == 83) || (keyid == 65) || (keyid == 68)) {

            //keyboard.setkeydown(keyid, MYID);

            if (keyboard.checkKey(keyid)) {

                hub.server.sendKey(keyid, 1, MYID);
            }

        }
        else if (keyid == 49) {

            selectedability = 1;

        }
        else if (keyid == 50) {

            selectedability = 2;

        }


    });

    $(document).keyup(function (e) {


        var keyid = e.which;

        if ((keyid == 87) || (keyid == 83) || (keyid == 65) || (keyid == 68)) {

            //keyboard.setkeyup(keyid, MYID);
            keyboard.setKey(keyid);
            hub.server.sendKey(keyid, 0, MYID);

        }

    });



    //testanim = new Animation(testarray);



 

    var canvas = document.getElementById('warcraftctx');
    ctx = canvas.getContext('2d');



    canvaswidth = canvas.width;
    canvasheight = canvas.height;


    tempx = canvaswidth / 2;
    tempy = canvasheight / 2;



    

    ctx.fillStyle = "#a52a2a";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);

    //alert("Hello! I am an alert box!!");

    $.connection.hub.start().done(function () {



        //myName = prompt('Enter your name:', 'noname');


        hub.server.initData();
        $('#sendmessage').click(function () {




            self.draw();
            //physicsLoopId = window.setInterval(self.Update, 50);

            $('#sendmessage').css("visibility", "hidden");




        });



    });


};




function KeyboardState() {

    var self = this;

    self.upkey = false;
    self.downkey = false;
    self.leftkey = false;
    self.rightkey = false;

    self.setKey = function (keynum) {

        if (keynum == 87) {

            self.upkey = false;



        }
        else if (keynum == 83) {

            self.downkey = false;




        }
        else if (keynum == 65) {



            self.leftkey = false;

        }
        else if (keynum == 68) {


            self.rightkey = false;

        }

    };

    self.checkKey = function (keynum) {

        if (keynum == 87) {
            if (self.upkey === false) {
                self.upkey = true;

                return true;
            }

        }
        else if (keynum == 83) {
            if (self.downkey === false) {
                self.downkey = true;
                return true;


            }
        }
        else if (keynum == 65) {

            if (self.leftkey === false) {

                self.leftkey = true;
                return true;
            }
        }
        else if (keynum == 68) {
            if (self.rightkey === false) {

                self.rightkey = true;
                return true;
            }
        }

        return false;
    };



}

function Random(min, max) {
    return Math.random() * (max - min) + min;
}

function get2D(point) {

    var fov = 250;


    var scale = fov / (fov + point.z);

  

 



    //always use same view angle
    return new vectortwo((point.x * scale), (50 * scale), scale);

}