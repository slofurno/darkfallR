using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Timers;
using System.Diagnostics; // 1

namespace daggersRage
{
    public static class DaggersRage
    {

        public static DaggerGame daggersrage = new DaggerGame();
        public static DateTime stTime = DateTime.Now;
       

        public static void Update(object source, ElapsedEventArgs e)
        {



            //daggersrage.Update(.045f);
            daggersrage.Update(.025);






        }

        public static void InitLevel()
        {


        }

        public static void SendState(object source, ElapsedEventArgs e)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<DaggerHub>();
            //context.Clients.All.updateGame(daggersrage.singleplayer.currentstate.x_position, daggersrage.singleplayer.currentstate.y_position);

            /*
            
            vector2 temp = new vector2();

            vector2 tempv = new vector2();

            temp.x = daggersrage.singleplayer.currentstate.x_position;
            temp.y = daggersrage.singleplayer.currentstate.y_position;

            tempv.x = daggersrage.singleplayer.currentstate.x_velocity;
            tempv.y = daggersrage.singleplayer.currentstate.y_velocity;

            context.Clients.All.updateGame(temp, tempv);
             * 
             * 
            */
            context.Clients.All.updateState(daggersrage.playerArray.ToArray());
            context.Clients.All.updateProjectiles(daggersrage.pointArray.ToArray());
            //context.Clients.All.updateEffects();


            if (daggersrage.updatedblocks.Count > 0)
            {

                context.Clients.All.updateBlocks(daggersrage.updatedblocks.ToArray());
                daggersrage.updatedblocks.Clear();
            }


            //context.Clients.All.updateProjectiles(daggersrage.pointArray.ToArray());

        }

        public static void SendClassicFireball(int id)
        {
            


        }

        public static void StartCast(int id, int num)
        {

            PlayerObject result = (PlayerObject)daggersrage.playerArray.Find(x => x.id == id);

            if (result != null)
            {

                result.castingspell = num;

            }


        }

        public static void SendGunAngle(int id, float rad)
        {
            PlayerObject result = (PlayerObject)daggersrage.playerArray.Find(x => x.id == id);

            if (result != null)
            {
                result.playerInput.MOUSEANGLE = rad;
            }

        }

        public static void SendMouseAngle(float rad, int id, int num2)
        {

            var context = GlobalHost.ConnectionManager.GetHubContext<DaggerHub>();

            PointObject temp;

            PlayerObject result = (PlayerObject)daggersrage.playerArray.Find(x => x.id == id);

            if (result != null)
            {

                if (result.life > 0)
                {

                    int num = num2;

                    if (num == 1)
                    {
                        temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position - 12 + Math.Cos(rad) * 16, result.currentstate.y_position +48 - 2*result.halfheight - 16 + Math.Sin(rad) * 16, rad, 300, "fireball", false, new Explosion(), id);

                    }
                    else if (num == 2)
                    {
                        temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position, result.currentstate.y_position, rad, 300, "fireball", false, new Explosion(), id);

                    }
                    else if (num == 3)
                    {
                        temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position, result.currentstate.y_position, rad, 300, "fireball", false, new Explosion(), id);

                    }
                    else if (num == 4)
                    {
                        temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position, result.currentstate.y_position, rad, 500, "launch", false, new Launch(), id);

                    }


                    else
                    {
                        temp = new PointObject(daggersrage.getNextId(), result.currentstate.x_position, result.currentstate.y_position, rad, 300, "fireball", false, new Explosion(), id);


                    }

                    result.castingspell = 0;
                    daggersrage.pointArray.Add(temp);


                    context.Clients.All.addProjectile(temp.id, temp.currentstate, temp.name);
                }



            }



            

            
           
            //Debug.WriteLine("projectiles : " + daggersrage.pointArray.Count + "  latest : " + temp.id);

        }

        public static void SendMouse(int x, int y, int num)
        {

            /*
            daggersrage.playerInput.MOUSEX = x;
            daggersrage.playerInput.MOUSEY = y;
            daggersrage.playerInput.MOUSEDOWN = true;

            Debug.WriteLine("mouse : " + x + "  " + y);
             * 
             * */

            daggersrage.addBlock(x, y, num);
            //daggersrage.AddMob(x, y);

            //daggersrage.Serialize();


        }

        public static void SendKey(int key, int down, int pid)
        {

            //PlayerController temp = daggersrage.playerInput;
            PlayerController temp = new PlayerController(); ;


            foreach (PlayerObject p in daggersrage.playerArray.OfType<PlayerObject>())
            {


                if (p.id == pid)
                {
                    temp = p.playerInput;

                }



            }

            bool pressed = false;

            if (down == 1)
            {
                pressed = true;

            }

            if (key == 87)
            {
                //daggersrage.playerInput.UPKEY = pressed;
                temp.UPKEY = pressed;

            }
            else if (key == 83)
            {
                temp.DOWNKEY = pressed;
                //daggersrage.DOWNKEY = down;

            }
            else if (key == 65)
            {
                temp.LEFTKEY = pressed;
                temp.RECENTKEY = -1;
                //daggersrage.LEFTKEY = down;

            }
            else if (key == 68)
            {
                temp.RIGHTKEY = pressed;
                temp.RECENTKEY = 1;
                //daggersrage.RIGHTKEY = down;

            }


        }


    }

    public enum BlockType
    {
        Brick, Grass, Air

    }

    public class DaggerBlock
    {


        public bool isSolid;
        public BlockType blockType;


        public DaggerBlock()
        {

            this.isSolid = false;
            this.blockType = BlockType.Air;

        }

        public DaggerBlock(BlockType type)
        {

            this.isSolid = true;
            this.blockType = type;

        }



    }


}