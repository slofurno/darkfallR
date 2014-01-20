using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace daggersRage
{
    public abstract class PhysicsField
    {
        public int duration;
        public vector2 position = new vector2();
        public float radius;
        public string type;
        public int id;
        public int nextid = 0;

        public PhysicsField()
        {
            this.duration = 0;

        }

        public void Update()
        {
            this.duration--;

        }

        public void setId()
        {

            this.id = nextid;
            nextid++;

        }

    }

    public class ForceField : PhysicsField
    {

       

        public ForceField()
        {
            this.duration = 200;
            this.radius = 32;
            this.type = "forcefield";
        }


    }

    public class Launch : PhysicsField
    {

        

        public Launch()
        {
            this.duration = 200;
            this.radius = 32;
            this.type = "launch";
        }


    }

    public class Explosion : PhysicsField
    {

        

        public Explosion()
        {

            this.radius = 50;
            this.duration = 1;
            this.type = "explosion";

        }

    }

}