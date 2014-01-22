
var particlearray;
var currentangle;
var gunangle;
var ctx;

var mouseX;
var mouseY;

var offsetx;
var offsety;

var physicsTimer;

var update_ms = 30;
var update_s = update_ms / 1000;


var lastupdate = 0;
var currenttime = 0;

var wtfface = 1;
var wtfangle = 0;

var halfresx = 0;
var halfresy = 0;

var myspell = new spellfire();
var caststart = 0;

var writeblock = false;

var elitegun = new Image();
elitegun.src = 'img/elitegun.png';

var elitehead = new Image();
elitehead.src = 'img/elitehead.png';

var lothargun = new Image();
lothargun.src = 'img/marinetwo.png';

var lothargunleft = new Image();
lothargunleft.src = 'img/marinegunleft.png';

var lotharhead = new Image();
lotharhead.src = 'img/marinehead.png';

var lotharheadleft = new Image();
lotharheadleft.src = 'img/marineheadleft.png';

var offsetarray = [0,1,2,1,0,1,2,1];


function State(state) {

    var self = this;

    this.x_position = state.px;
    this.y_position = state.py;
    this.x_velocity = state.vx;
    this.y_velocity = state.vy;





};

function eLine(point1, point2) {

    this.p1x = point1.x;
    this.p1y = point1.y;
    this.p2x = point2.x;
    this.p2y = point2.y;
    this.lifespan = 10;

}

function dProj(newid, newstate, type) {
    var self = this;
    this.id = newid;

    this.type = type;
    this.life = 0;
    this.state = new State(newstate);
    this.oldstate = new State(newstate);
    this.halfheight = 16;
    this.halfwidth = 8;

    self.updateState = function (newstate) {

        this.oldstate.x_position = this.state.x_position;
        this.oldstate.y_position = this.state.y_position;
        this.oldstate.x_velocity = this.state.x_velocity;
        this.oldstate.y_velocity = this.state.y_velocity;

        this.state.x_position = newstate.px;
        this.state.y_position = newstate.py;
        this.state.x_velocity = newstate.vx;
        this.state.y_velocity = newstate.vy;

    };


    //var alive = true;


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


$(function () {

    var canvas = document.getElementById('daggerctx');
    ctx = canvas.getContext('2d');


    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    //ctx.translate(.5,.5);
    ctx.scale(2,2);
    var CANVASWIDTH = 1400//canvas.width; 1400
    var CANVASHEIGHT = 800//canvas.height;800

    var canvasrenderwidth = 700;
    var canvasrenderheight = 400;

    
    particlearray = new Array();

    var self = this;
    var mapx, mapy;
    var MYID = -1;

    var selectedability = 1;
    var casttimes = new Array();

    


    var d = new Date();


    var NEWUPDATE = 1;
    var OLDUPDATE = 1;

    //var CANVASHEIGHT = 600;
   // var CANVASWIDTH = 800;



    $('#daggerctx').bind("contextmenu", function (event) {
        event.preventDefault();



    });


    var grass = new Image();
    grass.src = 'img/grass_side.PNG';

    var dirt = new Image();
    dirt.src = 'img/dirt.PNG';

    var stone = new Image();
    stone.src = 'img/stone.PNG';

    var smoothstone = new Image();
    smoothstone.src = 'img/stonebricksmooth.PNG';

    var wood = new Image();
    wood.src = 'img/wood.PNG';

    var turtle = new Image();
    turtle.src = 'img/turtle.gif';

    var shell = new Image();
    shell.src = 'img/shell.gif';

    var tile1 = new Image();
    tile1.src = 'img/red.gif';

    var tile2 = new Image();
    tile2.src = 'img/brickoverlay.gif';

    var tile3 = new Image();
    tile3.src = 'img/yellowtile.bmp';

    var player1 = new Image();
    player1.src = 'img/luigi.gif';

    var playerleft = new Image();
    playerleft.src = 'img/luigileft.gif';


    var ladder = new Image();
    ladder.src = 'img/ladder.gif';

    var lotharunit;
    var lotharunitleft;

    var eliteunit;

    var elite = new Image();
    elite.src = 'img/eliteonenew.png';

    elite.onload = function () {

        eliteunit = new Model2(elite, 41, 48);

    };

    //var lothararray = [[175, 3, 20, 35], [146, 4, 20, 34], [27, 4, 20, 35], [112, 5, 25, 33], [4, 5, 20, 34], [46, 5, 26, 34], [77, 6, 30, 32], [202, 7, 21, 32]];
    var lothararray = [[175, 3, 19, 35], [146, 4, 20, 34], [27, 4, 16, 35], [112, 5, 25, 33], [4, 5, 18, 34], [46, 5, 26, 34], [77, 6, 30, 32], [202, 7, 21, 32]];
    var lotharleftarray = [[30, 3, 19, 35], [58, 4, 20, 34], [87, 5, 25, 33], [181, 4, 16, 35], [117, 6, 30, 32], [152, 5, 26, 34], [202, 5, 18, 34], [1, 7, 21, 32]];

    var lothar = new Image();
    lothar.src = 'img/marineone.png';

    var lotharleft = new Image();
    lotharleft.src = 'img/marineoneleft.png';

    lotharleft.onload = function () {

        lotharunitleft = new Model(lotharleft, lotharleftarray, true);
        
    };

    lothar.onload = function () {

        lotharunit = new Model(lothar, lothararray,false);

        
        
    };






    var hub = $.connection.daggerHub;

    var keyboard = new KeyboardState();

    var parray = [];
    var parraylength = 0;


    var playerarray = [];
    var playerarraylength = 0;

    var effectarray = [];
    var effectarraylength = 0;


    var leveldata = [];
    var levelwidth = 50;
    var levelheight = 50;

    
    var wtfx = 200;
    var wtfy = 200;
    var wtfvx = 0;
    var wtfvy = 0;
    var wtfleft = false;
    var wtflife = 30;

    var oldwtfx = 200;
    var oldwtfy = 200;

       offsetx = 600 - oldwtfx;
       offsety = 400 - oldwtfy;


    var prox = 0;
    var proy = 0;



    hub.client.addProjectile = function (id, state, type) {


        /*
        parray[parraylength] = new dProj(parseFloat(id), state, "p");
        parraylength++;
        */

        if (type == "fireball") {

            particlearray.push(new fireball(parseInt(id), new vectortwo(state.x_position, state.y_position), new vectortwo(.8 * parseFloat(state.x_velocity) * update_s, .8 * parseFloat(state.y_velocity) * update_s)));

        }
        else if (type == "launch") {

            particlearray.push(new simplebolt(parseInt(id), new vectortwo(parseFloat(state.x_position), parseFloat(state.y_position)), new vectortwo(parseFloat(state.x_velocity)*update_s, parseFloat(state.y_velocity)*update_s),new Color(255,255,255,.8)));
            
        }



    };

    hub.client.addField = function (id, type, position) {
        
        if (type == "explosion") {

            particlearray.push(new explode(parseInt(id), parseFloat(position.x), parseFloat(position.y), new Color(255, 255, 255, .5), new Color(255, 100, 0, 0)));

        }
        else if (type == "launch") {

            particlearray.push(new aura(parseInt(id), position.x, position.y));
        }
        
    }

    hub.client.addEffect = function (startpoint, endpoint) {

        //alert(startpoint.x + "  " + startpoint.y + "  " + endpoint.x + "  " + endpoint.y);

        effectarray[effectarraylength] = new eLine(startpoint, endpoint);
        effectarraylength++;

    }

    hub.client.updateProjectiles = function (arr) {

        //var newproj;

        //console.log(arr.toString());

        $.each(arr, function (index, proj) {


            if (proj.name == "emit") {

                for (var i = particlearray.length - 1; i >= 0; i--) {

                    if (particlearray[i].id == proj.id) {

                        particlearray[i].recupdate(proj.currentstate.x_position, proj.currentstate.y_position);


                    }

                }

            }


            /**
            
            for (var i = parraylength - 1; i >= 0; i--) {

                if (parray[i].id == proj.id) {


                    newproj = 0;

                    if (proj.life < 1) {
                        parray.splice(i, 1);
                        parraylength--;
                    }
                    else {

                        parray[i].updateState(proj.currentstate);
                    }
              
                    break;

                }



            }
                */


        });


    };



    hub.client.updateState = function (objectarray) {

        var newplayerobject = true;

        //console.log(objectarray);
        

        $.each(objectarray, function (index, object) {


            newplayerobject = true;

            if (parseFloat(object.id) == MYID) {

                

                wtflife = object.life;
                oldwtfx = wtfx;
                oldwtfy = wtfy;
                OLDUPDATE = NEWUPDATE;
                d = new Date();
                NEWUPDATE = d.getTime();

                wtfface = parseInt(object.face);
                wtfangle = parseFloat(object.angle);


                wtfx = parseFloat(object.state.px);
                wtfy = parseFloat(object.state.py);

                if (wtfx > oldwtfx) {
                    wtfleft = false;
                }
                else if (wtfx < oldwtfx) {
                    wtfleft = true;
                }

                newplayerobject = false;
                //myspell.recupdate(wtfx, wtfy, parseInt(object.castingspell));

            }
            else {

                $.each(playerarray, function (index2, pl) {

                    if (parseFloat(object.id) == pl.id) {

                        pl.updateState(object.state);
                        pl.life = object.life;
                        newplayerobject = false;

                        if (object.type == "shell") {

                            pl.type = shell;
                            pl.halfheight = object.halfheight;

                        }

                    }

                });

            }

            if (newplayerobject) {

                if (object.type == "mob") {
                    playerarray[playerarraylength] = new dProj(parseFloat(object.id), object.state, turtle);
                }
                else if (object.type == "player") {

                    playerarray[playerarraylength] = new dProj(parseFloat(object.id), object.state, player1);
                }
                else {
                    playerarray[playerarraylength] = new dProj(parseFloat(object.id), object.state, shell);

                }
                playerarray[playerarraylength].halfheight = object.halfheight;
                playerarraylength++;
            }


        });




    };

    hub.client.updateBlocks = function (blocks) {

        $.each(blocks, function (index, b) {

            leveldata[parseInt(b.x)][parseInt(b.y)] = parseInt(b.value);

        });

    };

    hub.client.updateGame = function (temp, tempv) {

        oldwtfx = wtfx;
        oldwtfy = wtfy;

        OLDUPDATE = NEWUPDATE;
        d = new Date();
        NEWUPDATE = d.getTime();

        wtfx = parseFloat(temp.x);
        wtfy = parseFloat(temp.y);

        wtfvx = parseFloat(tempv.x);
        wtfvy = parseFloat(tempv.y);


    };

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













    
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvasrenderwidth, canvasrenderheight);




    window.onbeforeunload = function () {

        hub.server.printLevel();

    };


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
        else if (keyid == 51) {

            selectedability = 3;

        }
        else if (keyid == 52) {

            selectedability = 4;

        }
        else if (keyid == 53) {

            selectedability = 5;

        }
        else if (keyid == 54) {

            selectedability = 6;

        }
        else if (keyid == 55) {

            selectedability = 7;

        }
        else if (keyid == 56) {

            selectedability =8;

        }
        else if (keyid == 57) {

            selectedability = 9;

        }
        else if (keyid == 48) {

            selectedability = 0;

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


    $("#daggerctx").mouseup(function (e) {

        if (e.which > 1) {


        }
        else {

            if (caststart == 0) {


            }

            else if (currenttime - caststart >= 1000) {




                hub.server.sendMouseAngle(gunangle, MYID, selectedability);


            }

            caststart = 0;

            writeblock = false;
        }

    });

    $("#daggerctx").mousedown(function (e) {

        //particlearray.push(new fireball(new vectortwo(CANVASWIDTH / 2, CANVASHEIGHT / 2), new vectortwo(6 * Math.cos(currentangle), 6 * Math.sin(currentangle))));

    

        //hub.server.sendMouseAngle(currentangle, MYID, selectedability);

            if (e.which > 1) {
                //right click
                hub.server.sendMouse(halfresx,halfresy, selectedability);
            }
            else {

                d = new Date();

                caststart = d.getTime();


                hub.server.startCast(MYID, selectedability);
            }
        
        return false;

    });


    $("#daggerctx").mousemove(function (e) {

        mapx = e.pageX - this.offsetLeft + offsetx;
        mapy = e.pageY - this.offsetTop + offsety;

        halfresx = (e.pageX - this.offsetLeft)/2 + offsetx;
        halfresy = (e.pageY - this.offsetTop)/2 + offsety;
     
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

    });







    $.connection.hub.start().done(function () {



        //myName = prompt('Enter your name:', 'noname');


        hub.server.initData();
        $('#sendmessage').click(function () {


            var d = new Date();

            lastupdate = d.getTime();

            self.draw();
            
            physicsTimer = window.setInterval(self.Update, update_ms);

            $('#sendmessage').css("visibility", "hidden");




        });






    });

    //left to right


    //when minimized, chrome + firefox force the minimum timer frequency to be 1000ms. the update function must be looped extra times to account for this

    self.Update = function () {
  

        var d = new Date();

        currenttime = d.getTime();

        


        while((currenttime - lastupdate) > update_ms){

           

            for (var i = 0; i < particlearray.length; i++) {

                particlearray[i].update();
                //myspell.update();
            }

           
            
            lastupdate = lastupdate + update_ms;

        }

        
        
        hub.server.sendGunAngle(MYID, gunangle);
        

    };




    self.draw = function () {

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        currentangle = Math.atan2(mouseY - .5*CANVASHEIGHT, mouseX - .5*CANVASWIDTH);
        gunangle = Math.atan2(mouseY - (.5 * CANVASHEIGHT-24), mouseX - (.5 * CANVASWIDTH-3) );


        d = new Date();
        var RENDERTIME = d.getTime() - NEWUPDATE;

        var RATIO = RENDERTIME / 20;


        
        if (RATIO > 1) {

            RATIO = 1;

        }
      
        

        var newoffsetx = Math.floor(((wtfx * RATIO) + (oldwtfx * (1 - RATIO))) - (canvasrenderwidth / 2));
        var newoffsety = Math.floor(((wtfy * RATIO) + (oldwtfy * (1 - RATIO))) - (canvasrenderheight / 2));


        if (((newoffsetx - offsetx) * (newoffsetx - offsetx)) >= 4) {

            offsetx = newoffsetx;

        }

        if (((newoffsety - offsety) * (newoffsety - offsety)) >= 4) {

            offsety = newoffsety;

        }
        /*

        if (offsetx > levelwidth * 16 - CANVASWIDTH) {

            offsetx = levelwidth * 16 - CANVASWIDTH;

        }
        else if (offsetx < 0) {

            offsetx = 0;

        }


        if (offsety > levelheight * 16 - CANVASHEIGHT) {

            offsety = levelheight * 16 - CANVASHEIGHT;

        }
        else if (offsety < 0) {

            offsety = 0;

        }
        */


        ctx.clearRect(0, 0, canvasrenderwidth, canvasrenderheight);
        ctx.fillStyle = "#7C6EFF"

        for (var i = 0; i < levelwidth; i++) {
            for (var j = 0; j < levelheight; j++) {

                if (leveldata[i][j] == 0) {


                    ctx.fillStyle = "#7C6EFF"
                    ctx.fillRect(i * 16 - offsetx, j * 16 - offsety, 16, 16)



                }
                else {

                    if (leveldata[i][j] == 1) {
                        ctx.fillStyle = "#7C6EFF"
                        ctx.fillRect(i * 16 - offsetx, j * 16 - offsety, 16, 16)
                        ctx.drawImage(ladder, i * 16 - offsetx, j * 16 - offsety);

                    }
                    else if (leveldata[i][j] == 2) {

                        ctx.fillStyle = "#d2691e";
                        ctx.fillRect(i * 16 - offsetx, j * 16 - offsety, 16, 16);
                        ctx.drawImage(tile2, i * 16 - offsetx, j * 16 - offsety);

                    }
                    else if (leveldata[i][j] == 3) {

                        ctx.fillStyle = "#a52a2a";
                        ctx.fillRect(i * 16 - offsetx, j * 16 - offsety, 16, 16);
                        ctx.drawImage(tile2, i * 16 - offsetx, j * 16 - offsety);

                    }

                    else if (leveldata[i][j] == 4) {
                        ctx.drawImage(stone, i * 16 - offsetx, j * 16 - offsety);
                        

                    }
                    else if (leveldata[i][j] == 5) {

                        ctx.drawImage(smoothstone, i * 16 - offsetx, j * 16 - offsety);

                    }
                    else if (leveldata[i][j] == 6) {
                        ctx.drawImage(grass, i * 16 - offsetx, j * 16 - offsety);
                        

                    }
                    else if (leveldata[i][j] == 7) {

                        ctx.drawImage(dirt, i * 16 - offsetx, j * 16 - offsety);

                    }
                    else if (leveldata[i][j] == 8) {
                        ctx.drawImage(wood, i * 16 - offsetx, j * 16 - offsety);


                    }
                    else {
                        //ctx.fillRect(i * 16, j * 16, 16, 16)
                        ctx.drawImage(tile3, i * 16 - offsetx, j * 16 - offsety);
                    }

                    

                }
            }
        }

        ctx.font = "12px Arial";
        ctx.fillStyle = "black";

        console.log("angle : " + wtfangle);

        if ((gunangle > 1.57) || (gunangle < -1.57)) {

            
            //lotharunitleft.draw(Math.floor(((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8) - offsetx), Math.floor(((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16) - offsety));


            eliteunit.draw(Math.floor(((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) ) - offsetx), Math.floor(((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) ) - offsety),true);

            //ctx.drawImage(playerleft, ((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8) - offsetx, ((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16) - offsety);


        }
        else {

            //ctx.drawImage(player1, (wtfx  - 8) - offsetx, (wtfy  - 16) - offsety);
            eliteunit.draw(Math.floor(((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) ) - offsetx), Math.floor(((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) ) - offsety),false);
            //lotharunit.draw(Math.floor(((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8) - offsetx), Math.floor(((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16) - offsety));

            //ctx.drawImage(player1, ((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8) - offsetx, ((wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16) - offsety);

        }

        //ctx.fillText(wtflife, (wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8 - offsetx, (wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16 - offsety);

        if (caststart == 0) {


        }
        else {
            ctx.strokeStyle = '#ff0000';
            var linelen = (currenttime - caststart) / 50;

            if (linelen >= 20) {

                linelen = 20;

                ctx.strokeStyle = '#00ff00';
            }
            //ctx.save();
            ctx.lineWidth = 3;

            
            
            ctx.beginPath();
            ctx.moveTo((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8 - offsetx, (wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16 - offsety -5 );
            ctx.lineTo((wtfx * RATIO) + (oldwtfx * (1 - RATIO)) - 8 - offsetx + linelen, (wtfy * RATIO) + (oldwtfy * (1 - RATIO)) - 16 - offsety - 5);
            ctx.stroke();

            //ctx.restore();
            

        }

      


        $.each(playerarray, function (index, pl) {



            //ctx.drawImage(player1, pl.state.x_position - 8 - offsetx, pl.state.y_position - 16 - offsety);
            ctx.drawImage(pl.type, (pl.state.x_position * RATIO) + (pl.oldstate.x_position * (1 - RATIO)) - 8 - offsetx, (pl.state.y_position * RATIO) + (pl.oldstate.y_position * (1 - RATIO)) - 16 + (16 - pl.halfheight) - offsety);

            ctx.fillText(pl.life, (pl.state.x_position * RATIO) + (pl.oldstate.x_position * (1 - RATIO)) - 8 - offsetx, (pl.state.y_position * RATIO) + (pl.oldstate.y_position * (1 - RATIO)) - 16 + (16 - pl.halfheight) - offsety);
            //ctx.fillText(pl.life, pl.state.x_position - 8 - offsetx, pl.state.y_position - 16 - offsety);

        });







        for (var ii = 0; ii < parraylength; ii++) {

            //some kind of interpolation between two most recent states
            ctx.drawImage(tile1, (parray[ii].state.x_position * RATIO) + (parray[ii].oldstate.x_position * (1 - RATIO)) - 8 - offsetx, (parray[ii].state.y_position * RATIO) + (parray[ii].oldstate.y_position * (1 - RATIO)) - 8 - offsety);

        }

        /*
        for (var iii = 0; iii < effectarraylength; iii++) {

            if (effectarray[iii].lifespan > 0) {

                ctx.beginPath();
                ctx.moveTo(effectarray[iii].p1x - offsetx, effectarray[iii].p1y - offsety);
                ctx.lineTo(effectarray[iii].p2x - offsetx, effectarray[iii].p2y - offsety);
                ctx.strokeStyle = '#00ffff';
                ctx.stroke();
                effectarray[iii].lifespan--;

            }

        }
        */

        for (var i = 0; i < particlearray.length; i++) {

            
            particlearray[i].draw();

        }

        //myspell.draw();

        requestAnimationFrame(self.draw);



    };






});




function Color(r, g, b, a) {

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

}

Color.prototype.getCS = function () {

    return ('rgba(' + Math.floor(this.r) + ',' + Math.floor(this.g) + ',' + Math.floor(this.b) + ',' + this.a + ')');

};

function vectortwo(x, y, scale) {

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
    this.endvelocity = new vectortwo(velocity.x / 4, velocity.y / 4);
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

        this.accel = new vectortwo(0, 0);
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
    ctx.arc(Math.floor(this.position.x-offsetx), Math.floor(this.position.y-offsety), this.radius, 0, 2 * Math.PI);

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


    this.velocity.y += this.accel.y;

    this.radius = this.startradius + ((this.maxtime - this.time) / this.maxtime) * (this.endradius - this.startradius);
};

function simplebolt(id, position, velocity, color){

    this.id = id;
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.time = 0;
    this.parts = new Array();

}
simplebolt.prototype.update = function () {

    var temp;

    if ((this.time % 3)==0){

        this.parts.push(new particle(new vectortwo(this.position.x, this.position.y), new vectortwo(this.velocity.x, this.velocity.y), 4, new Color(this.color.r, this.color.g, this.color.b, this.color.a), new Color(200, 255, 200, .1), 20,4));

    }

    //this.parts.push(new particle(this.position, this.velocity, 3, new Color(75,75,75,1)));
    //this.parts.push(new particle(new vectortwo(this.position.x,this.position.y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 10, new Color(255, 0, 255, 0.8),55));


    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;

   

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

    }

    this.time++;


};

simplebolt.prototype.draw = function () {


    for (var i = this.parts.length - 1; i >= 0; i--) {

        if (this.parts[i].time >= 0) {

            this.parts[i].draw();

        }
    }


};


function fireball(id, position, velocity) {


    this.id = id;

    this.position = position;
    this.velocity = velocity;

    this.parts = new Array();

    //this.parts.push(new particle(new vectortwo(this.position.x, this.position.y), this.velocity, 5, new Color(255, 255, 255, 1),90));
    //this.parts.push(new particle(new vectortwo(this.position.x, this.position.y), this.velocity, 10, new Color(255, 0, 255, 0.8),90));

    //

}

fireball.prototype.update = function () {

    var temp;

    for (var x = this.position.x - 2; x <= this.position.x + 2; x++) {

        for (var y = this.position.y - 2; y <= this.position.y + 2; y++) {
            temp = Math.random();

            if (temp > .95) {

                this.parts.push(new particle(new vectortwo(x, y), new vectortwo(this.velocity.x, this.velocity.y), 4, new Color(255, 255, 255, 1), new Color(255, 100, 0, .1), 50,4,new vectortwo(0,.05)));

            }
            else if (temp > .92) {
                this.parts.push(new particle(new vectortwo(x, y), new vectortwo(this.velocity.x, this.velocity.y), 4, new Color(0, 0, 0, .2), new Color(0, 0, 0, .1), 50,6, new vectortwo(0,.05)));

            }

        }


    }

    //this.parts.push(new particle(this.position, this.velocity, 3, new Color(75,75,75,1)));
    //this.parts.push(new particle(new vectortwo(this.position.x,this.position.y), new vectortwo(this.velocity.x/2, this.velocity.y/2), 10, new Color(255, 0, 255, 0.8),55));


    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;

    this.velocity.y += +.045;

    for (var i = this.parts.length - 1; i >= 0; i--) {

        this.parts[i].update();

    }


};

fireball.prototype.draw = function () {




    for (var i = this.parts.length - 1; i >= 0; i--) {

        //this.parts[i].update();

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

function spellfire() {

    this.center = new vectortwo(0, 0);
    this.parts = new Array();
    this.time = 0;
    this.color = new Color(0,255,0,.8);
    this.active = false;

}

spellfire.prototype.recupdate = function (x,y, spellnum) {

    if (spellnum == 0) {

        this.active = false;
    }
    else {

        this.active = true;
        this.center.x = x;
        this.center.y = y;

    }
};

spellfire.prototype.update = function () {

    if (this.active) {
        var temp = Math.random();

        //if (temp > .64) { 
        if (this.time % 2 == 0) {

            this.parts.push(new particle(new vectortwo(this.center.x + Random(-1, 1), this.center.y), new vectortwo(Random(-.7, .7), -1), 5, new Color(this.color.r, this.color.g, this.color.b, this.color.a), new Color(this.color.r, this.color.g, this.color.b, .1), 12, 6));

        }

        this.time++;

        for (var i = this.parts.length - 1; i >= 0; i--) {

            this.parts[i].update();

        }
    }
};

spellfire.prototype.draw = function () {

    if (this.active) {

        for (var i = this.parts.length - 1; i >= 0; i--) {



            if (this.parts[i].time >= 0) {


                this.parts[i].draw();

            }
        }

    }

};


function firefield(x, y) {

    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 30;
    this.time = 80;
    this.maxtime = this.time;

}

firefield.prototype.update = function () {


    var temp = Math.random();

    //if (temp > .64) { 
    if (this.time % 3 == 0) {

        this.parts.push(new particle(new vectortwo(this.center.x + Random(-1, 1), this.center.y), new vectortwo(Random(-.7, .7), -1), 7, new Color(255, 255, 255, .8), new Color(255, 100, 0, .3), 22, 16));

    }
        //else if (temp > .3) { 
    else if (this.time % 4 == 0) {

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



function spiral(x, y) {

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

        this.parts.push(new particle(temp, new vectortwo(0, .1), 6 * temp.scale, new Color(0, 255, 0, .6), new Color(0, 255, 0, .05), 140, 8 * temp.scale));

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

function aura(id, x, y) {

    this.id = id;
    this.center = new vectortwo(x, y);
    this.parts = new Array();
    this.height = 0;
    this.theta = 0;
    this.theta2 = Math.PI;
    this.radius = 32;
    this.time = 200;
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

function cloud(x, y) {

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


function explode(id, x, y, colorstart, colorend) {

    this.id = id;
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
                this.parts.push(new particle(new vectortwo(this.center.x, this.center.y), new vectortwo(temp2 * Math.cos(temp), temp2 * Math.sin(temp)), 6, new Color(100, 100, 50, 1), new Color(100, 100, 50, .1), 50, 12));

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

            this.parts.push(new particle(new vectortwo(this.center.x, this.center.y), new vectortwo(0, 0), 60, new Color(0, 0, 0, .3), new Color(0, 0, 255, .1), 50, 2));
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

function Random(min, max) {
    return Math.random() * (max - min) + min;
}

function get2D(point) {

    var fov = 250;


    var scale = fov / (fov + point.z);







    //always use same view angle
    return new vectortwo((point.x * scale), (50 * scale), scale);

}

function Main() {


}

function Model2(image, width, height) {

    this.image = image;
    this.width = width;
    this.height = height;
    this.frame = 0;


}

Model2.prototype.draw = function (x, y, isleft) {

    18, 7

    if (isleft) {
        ctx.drawImage(this.image, Math.floor(this.frame) * this.width, this.height, this.width, this.height, x-.5*this.width, y-.5*this.height, this.width, this.height);

        ctx.drawImage(elitehead, 0, .5 * elitehead.height, elitehead.width, .5 * elitehead.height, x - .5 * this.width + 19 - elitehead.width+4, y - .5 * this.height + -3 - offsetarray[Math.floor(this.frame)], elitehead.width, .5 * elitehead.height);

        ctx.save();

        ctx.translate(x - .5 * this.width + 18  + 4 - 3, y - .5 * this.height + 7 - offsetarray[Math.floor(this.frame)]+3);

        ctx.rotate(gunangle+Math.PI);


        ctx.drawImage(elitegun, 0, .5 * elitegun.height, elitegun.width, .5 * elitegun.height, 3-elitegun.width, -3, elitegun.width, .5 * elitegun.height);
        ctx.restore();
        //ctx.drawImage(elitegun, 0, .5 * elitegun.height, elitegun.width, .5 * elitegun.height, x - .5 * this.width + 18-elitegun.width+4, y - .5 * this.height + 7 - offsetarray[Math.floor(this.frame)], elitegun.width, .5 * elitegun.height);

        this.frame -= .2;

    }
    else {

        ctx.drawImage(this.image, Math.floor(this.frame) * this.width, 0, this.width, this.height, x-.5*this.width, y-.5*this.height, this.width, this.height);

       

        ctx.drawImage(elitehead, 0, 0, elitehead.width, .5 * elitehead.height, x - .5 * this.width + 19, y - .5 * this.height + -3 - offsetarray[Math.floor(this.frame)], elitehead.width, .5 * elitehead.height);


        ctx.save();

        ctx.translate(x - .5 * this.width + 18 + 3, y - .5 * this.height + 7 - offsetarray[Math.floor(this.frame)]+3);
        
        ctx.rotate(gunangle);

        
        ctx.drawImage(elitegun, 0, 0, elitegun.width, .5 * elitegun.height, -3,-3, elitegun.width, .5 * elitegun.height);
        ctx.restore();
        //ctx.drawImage(elitegun, 0, 0, elitegun.width, .5 * elitegun.height, x - .5 * this.width + 18, y - .5 * this.height + 7 - offsetarray[Math.floor(this.frame)], elitegun.width, .5 * elitegun.height);




        this.frame += .2;
    }

    



    if (this.frame >= 8) {
        this.frame = 0;
    }
    else if (this.frame < 0) {

        this.frame = 7.8;
    }

};

function Model(image, xcoordarray, isleft) {

    var self = this;
    this.frame = 0;
    this.pimage = image;
    this.imwidth = image.width;
    this.imheight = image.height;
    this.maxrange = 0;
    this.isleft = isleft;

    

    if (isleft) {
        xcoordarray.sort(function (a, b) {
            return (a[0] - b[0]);
        });

    }
    else {
        xcoordarray.sort(function (a, b) {
            return (a[0] - b[0]);
        });
    }



    this.coordarray = xcoordarray;
    //store coords to all animations
    //


};

Model.prototype.draw = function (x,y) {

    if (this.isleft) {

        ctx.drawImage(this.pimage, this.coordarray[Math.floor(this.frame)][0], 0, this.coordarray[Math.floor(this.frame)][2], 40, x - .5 * this.coordarray[Math.floor(this.frame)][2], y - 8, this.coordarray[Math.floor(this.frame)][2], 40);
        //ctx.drawImage(this.pimage, this.coordarray[Math.floor(this.frame)][0], this.coordarray[Math.floor(this.frame)][1], this.coordarray[Math.floor(this.frame)][2], this.coordarray[Math.floor(this.frame)][3], x -  this.coordarray[Math.floor(this.frame)][2]+9, y - this.coordarray[Math.floor(this.frame)][3]+17, this.coordarray[Math.floor(this.frame)][2], this.coordarray[Math.floor(this.frame)][3]);
        ctx.drawImage(lotharheadleft, x-.5*lotharheadleft.width-3, y - lotharhead.height + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));

        ctx.save();

        ctx.translate(x + 2, y + 1 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));
        //ctx.translate(x - 8 + 4 - .5 * (this.coordarray[Math.floor(this.frame)][2] - this.coordarray[0][2]), y - 16 + 3 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));

        ctx.rotate(gunangle + Math.PI);

        //ctx.drawImage(lothargun, x - 8 - .5*(this.coordarray[Math.floor(this.frame)][2] - this.coordarray[0][2]), y - 16 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));
        ctx.drawImage(lothargunleft, 3 - lothargunleft.width, -3);
        ctx.restore();


    }
    else {
        
        ctx.drawImage(this.pimage, this.coordarray[Math.floor(this.frame)][0], 0, this.coordarray[Math.floor(this.frame)][2], 40, x - .5 * this.coordarray[Math.floor(this.frame)][2], y - 8, this.coordarray[Math.floor(this.frame)][2], 40);
        //ctx.drawImage(this.pimage, this.coordarray[Math.floor(this.frame)][0], this.coordarray[Math.floor(this.frame)][1], this.coordarray[Math.floor(this.frame)][2], this.coordarray[Math.floor(this.frame)][3], x -  this.coordarray[Math.floor(this.frame)][2]+9, y - this.coordarray[Math.floor(this.frame)][3]+17, this.coordarray[Math.floor(this.frame)][2], this.coordarray[Math.floor(this.frame)][3]);
        ctx.drawImage(lotharhead, x - .5 * lotharhead.width+3, y - lotharhead.height + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));

        ctx.save();

        ctx.translate(x - 2, y + 1 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));
        //ctx.translate(x - 8 + 4 - .5 * (this.coordarray[Math.floor(this.frame)][2] - this.coordarray[0][2]), y - 16 + 3 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));

        ctx.rotate(gunangle);

        //ctx.drawImage(lothargun, x - 8 - .5*(this.coordarray[Math.floor(this.frame)][2] - this.coordarray[0][2]), y - 16 + (this.coordarray[Math.floor(this.frame)][1] - this.coordarray[0][1]));
        ctx.drawImage(lothargun, -3, -3);
        ctx.restore();

        

    }

    if (wtfface < 0) {
        this.frame += -.2;

    }
    else {
        this.frame += .2;

    }

    if (this.frame >= this.coordarray.length) {
        this.frame = 0;
    }
    else if (this.frame < 0) {
        this.frame = this.coordarray.length - .2;
    }


}