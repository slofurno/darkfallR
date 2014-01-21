using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;

namespace daggersRage
{
    public abstract class PhysicsObject
    {

        public PhysicalState currentstate;
        public PhysicalState desiredstate;
        public double x_force;
        public double y_force;
        public bool isAlive;
        public int id;
        public static int nextid = 0;
        public string type;
        public string name = " ";
        public int life;
        public int frame = 0;
        public float halfheight;
        public float halfwidth;
        public float collisioncoefficient;
        public int invultimer;
        protected float GRAVITY = 60 * 9.8f;
        public bool canBreak = false;
        public int jumpcounter = 0;
        public bool grounded = true;
        public bool wasgrounded = true;
        public int castingspell = 0;
        public int face = 1;
        public float lookangle = 0;

        public PhysicsObject()
        {

        }

        public virtual void Update(double dt)
        {


        }

        public virtual void RegisterHit(PhysicsObject po)
        {


        }

        public UpdatePacket getUpdatePacket()
        {
            return new UpdatePacket(this);

        }
        public virtual bool getDown()
        {

            return false;
        }
        public virtual bool getUp()
        {

            return false;
        }

        public void setId()
        {

            this.id = nextid;
            nextid++;

        }


    }

    public class PointObject : PhysicsObject
    {

        private float bounceheight = 0;
        private float MAXBOUNCEHEIGHT = 30;
        public int creatorid;
        public PhysicsField effect { get; set; }
        public double localgravity = 0;


        //temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position, result.currentstate.y_position, rad, new Explosion(), id);
        public PointObject(int id, double x, double y, float rad, int speed, string name, bool gravity, PhysicsField effect, int creatorid)
        {

            //this.id = id;

            setId();
            currentstate = new PhysicalState();
            desiredstate = new PhysicalState();
            x_force = 0;
            y_force = 0;
            currentstate.x_position = 200;
            currentstate.y_position = 100;
            this.type = "point";
            this.name = name;
            this.life = 1;
            this.collisioncoefficient = 1;
            this.effect = effect;
            this.creatorid = creatorid;

            this.currentstate.x_position = x;
            this.currentstate.y_position = y;

            this.currentstate.x_velocity = speed * Math.Cos(rad);
            this.currentstate.y_velocity = speed * Math.Sin(rad);


            if (gravity)
            {
                this.localgravity = 1.9;

            }
        }

        public override void Update(double dt)
        {


            this.frame++;
            //y_force = y_force + 16 * 9.8f;
            //desiredstate.y_velocity = currentstate.y_velocity + y_force * dt;
            //desiredstate.x_velocity = currentstate.x_velocity + x_force * dt;


            
            desiredstate.y_velocity = currentstate.y_velocity + this.localgravity;
            desiredstate.x_velocity = currentstate.x_velocity;


            desiredstate.y_position = (currentstate.y_position + desiredstate.y_velocity * dt);
            desiredstate.x_position = (currentstate.x_position + desiredstate.x_velocity * dt);

            /*
            if (desiredstate.y_position < currentstate.y_position)
            {
                bounceheight += (currentstate.y_position - desiredstate.y_position);

                if (bounceheight >= MAXBOUNCEHEIGHT)
                {

                    desiredstate.y_position += (bounceheight - MAXBOUNCEHEIGHT);
                    bounceheight = 0;
                    desiredstate.y_velocity = -desiredstate.y_velocity;
                }


            }
             * */

            y_force = 0;
            x_force = 0;

            /*
            if (desiredstate.x_velocity > 200f)
            {
                desiredstate.x_velocity = 200f;

            }
            if (desiredstate.x_velocity < -200f)
            {
                desiredstate.x_velocity = -200f;

            }
            if (desiredstate.y_velocity > 200f)
            {
                desiredstate.y_velocity = 200f;

            }
            if (desiredstate.y_velocity < -200f)
            {
                desiredstate.y_velocity = -200f;

            }
             * */

        }

    }

    public class PlayerObject : PhysicsObject
    {

        //public float halfheight = 16;
        //public float halfwidth = 8;
        public PlayerController playerInput;
        public bool invul;


        
        public float runspeed = 250f;

        bool hasreleasedjump = true;

        public PlayerObject(PlayerController p)
        {

            setId();

            currentstate = new PhysicalState();
            desiredstate = new PhysicalState();
            x_force = 0;
            y_force = 0;


            currentstate.x_position = 200;
            currentstate.y_position = 100;
            this.playerInput = p;
            this.type = "player";
            this.life = 30;
            this.invul = false;
            this.invultimer = 0;

            this.halfheight = 16;
            this.halfwidth = 8;

            

            //this.jumpcounter = 0;
            this.collisioncoefficient = 0;

        }

        public override bool getDown()
        {

            return this.playerInput.DOWNKEY;

        }
        public override bool getUp()
        {

            return this.playerInput.UPKEY;

        }

        public override void Update(double dt)
        {
            this.invul = false;

            this.lookangle = this.playerInput.MOUSEANGLE;

            desiredstate.y_velocity = currentstate.y_velocity;
            desiredstate.x_velocity = currentstate.x_velocity;

            if (this.invultimer > 0)
            {

                this.invultimer--;
            }

            if (playerInput.LEFTKEY == true)
            {

                if (currentstate.x_velocity > 0)
                {
                    x_force += -runspeed;

                }
                else if (currentstate.x_velocity > -runspeed)
                {
                    desiredstate.x_velocity = -runspeed;

                }

                this.face = -1;



            }
            else if (playerInput.RIGHTKEY == true)
            {

                if (currentstate.x_velocity < 0)
                {
                    x_force += runspeed;

                }
                else if (currentstate.x_velocity < runspeed)
                {
                    desiredstate.x_velocity = runspeed;

                }

                this.face = 1;


            }
            else
            {
                if (currentstate.x_velocity > runspeed)
                {
                    desiredstate.x_velocity += -runspeed;
                }
                else if (currentstate.x_velocity < -runspeed)
                {
                    desiredstate.x_velocity += runspeed;
                }
                else
                {
                    desiredstate.x_velocity = 0;
                }


            }
        

            if (playerInput.UPKEY == true)
            {




                if ((this.grounded) || (this.wasgrounded))
                {

                    if (this.hasreleasedjump)
                    {
                        this.canBreak = true;
                        y_force = y_force - 600;
                        //this.jumpcounter = 12;
                        this.grounded = false;
                        this.hasreleasedjump = false;
                    }
                }

            }
            else if (this.hasreleasedjump == false)
            {
                this.hasreleasedjump = true;
            }

            
           

       
           
            
            y_force = y_force + 50;
            

            desiredstate.y_velocity += y_force;
            desiredstate.x_velocity += x_force;
            //desiredstate.x_velocity = -40;

            desiredstate.y_position = currentstate.y_position + ((desiredstate.y_velocity + currentstate.y_velocity)/2) * dt;
            desiredstate.x_position = currentstate.x_position + ((desiredstate.x_velocity + currentstate.x_velocity)/2) * dt;


            

            y_force = 0;
            x_force = 0;
            
            if (desiredstate.x_velocity > 500f)
            {
                desiredstate.x_velocity = 500f;

            }
            if (desiredstate.x_velocity < -500f)
            {
                desiredstate.x_velocity = -500f;

            }
            if (desiredstate.y_velocity > 500f)
            {
                desiredstate.y_velocity = 500f;

            }
            if (desiredstate.y_velocity < -500f)
            {
                desiredstate.y_velocity = -500f;

            }

            if (this.grounded == true)
            {
                this.wasgrounded = true;

                /*
                if (this.desiredstate.x_velocity > 2*runspeed)
                {
                    Debug.WriteLine("vel : " + desiredstate.x_velocity);
                    x_force += -runspeed;
                }
                else if (this.desiredstate.x_velocity < -2 * runspeed)
                {
                    x_force += runspeed;

                }
                else if (this.desiredstate.x_velocity > .5 * runspeed)
                {
                    x_force += -runspeed/2;
                }
                else if (this.desiredstate.x_velocity < -.5 * runspeed)
                {
                    x_force += runspeed / 2;
                }
                else
                {
                    x_force += -this.desiredstate.x_velocity;
                }
                */

            }
            else
            {
                this.wasgrounded = false;
            }

            

            this.grounded = false;
            //Debug.WriteLine("TEST : " + desiredstate.x_position);
        }



    }

    public class MobObject : PhysicsObject
    {




        public MobObject(float x, float y)
        {

            setId();

            currentstate = new PhysicalState();
            desiredstate = new PhysicalState();
            x_force = 0;
            y_force = 0;


            currentstate.x_position = x;
            currentstate.y_position = y;
            currentstate.x_velocity = 16;

            this.type = "mob";
            this.life = 2;

            this.halfheight = 11.5f;
            this.halfwidth = 8;


            this.collisioncoefficient = 1;

        }

        public override void RegisterHit(PhysicsObject po)
        {
            //base.RegisterHit(po);
            if (this.life < 1)
            {
                if (this.type == "mob")
                {
                    this.type = "shell";
                    this.life++;

                    this.desiredstate.y_position += (10);

                    this.halfheight = 8;

                    this.desiredstate.x_velocity = 0;


                }
                else if (this.type == "shell")
                {

                    this.life++;
                    this.type = "movingshell";


                    if (po.desiredstate.x_position > this.desiredstate.x_position)
                    {
                        this.desiredstate.x_velocity += -200;

                    }
                    else
                    {
                        this.desiredstate.x_velocity += 200;

                    }


                }
                else if (this.type == "movingshell")
                {
                    this.life++;
                    this.type = "shell";
                    this.desiredstate.x_velocity = 0;

                }

            }

        }

        public override void Update(double dt)
        {


            if (this.invultimer > 0)
            {
                this.invultimer--;

            }


            y_force = y_force + 50;
            desiredstate.y_velocity = currentstate.y_velocity + y_force;
            desiredstate.x_velocity = currentstate.x_velocity + x_force;
            //desiredstate.x_velocity = -40;

            //desiredstate.y_position = currentstate.y_position + desiredstate.y_velocity * dt;
            //desiredstate.x_position = currentstate.x_position + desiredstate.x_velocity * dt;

            desiredstate.y_position = currentstate.y_position + ((desiredstate.y_velocity + currentstate.y_velocity) / 2) * dt;
            desiredstate.x_position = currentstate.x_position + ((desiredstate.x_velocity + currentstate.x_velocity) / 2) * dt;

            y_force = 0;
            x_force = 0;

            if (desiredstate.x_velocity > 500f)
            {
                desiredstate.x_velocity = 500f;

            }
            if (desiredstate.x_velocity < -500f)
            {
                desiredstate.x_velocity = -500f;

            }
            if (desiredstate.y_velocity > 500f)
            {
                desiredstate.y_velocity = 500f;

            }
            if (desiredstate.y_velocity < -500f)
            {
                desiredstate.y_velocity = -500f;

            }


            //Debug.WriteLine("TEST : " + desiredstate.x_position);
        }



    }

    public class UpdatePacket
    {

        public int id;
        public PS state;
        public string type;
        public float halfheight;
        public int life;
        public string name;
        public int face;
        public float angle;


        public UpdatePacket(PhysicsObject p)
        {

            this.id = p.id;
            this.state = new PS((int)p.currentstate.x_velocity, (int)p.currentstate.y_velocity, (int)p.currentstate.x_position, (int)p.currentstate.y_position);
            this.type = p.type;
            this.halfheight = p.halfheight;
            this.life = p.life;
            this.name = p.name;
            this.face = p.face;
            this.angle = p.lookangle;


        }


    }

    public class PS
    {
        public int vx;
        public int vy;
        public int px;
        public int py;

        public PS(int vx, int vy, int px, int py)
        {
            this.vx = vx;
            this.vy = vy;
            this.px = px;
            this.py = py;

        }


    }

    public class PhysicalState
    {

        public double x_velocity;
        public double y_velocity;
        public double x_position;
        public double y_position;

        public PhysicalState()
        {
            x_velocity = 0;
            y_velocity = 0;
            x_position = 0;
            y_position = 0;

        }

        public PhysicalState(double vx, double vy, double px, double py)
        {
            this.x_velocity = vx;
            this.y_velocity = vy;
            this.x_position = px;
            this.y_position = py;

        }

    }
}