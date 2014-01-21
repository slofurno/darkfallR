using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Collections;
using System.Diagnostics;

namespace daggersRage
{
    public class DaggerHub : Hub
    {



        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void InitUser()
        {
            Debug.WriteLine("init called");

        }

        public void SendOrder(int itemid, string buyer)
        {



        }

        public void initData()
        {

            //Clients.Caller.initLevel(DaggersRage.daggersrage.toArray(), DaggersRage.daggersrage.levelwidth, DaggersRage.daggersrage.levelheight);

            Clients.Caller.initLevel(DaggersRage.daggersrage.blockarray, DaggersRage.daggersrage.AddPlayer(), DaggersRage.daggersrage.levelwidth, DaggersRage.daggersrage.levelheight);

        }

        public void SendMouse(float x, float y, int num)
        {
            DaggersRage.SendMouse((int)x, (int)y, num);

        }

        public void PrintLevel()
        {
            /*
            for (int i = 0; i < DaggersRage.daggersrage.levelwidth; i++)
            {
                for (int j = 0; j < DaggersRage.daggersrage.levelheight; j++)
                {

                    if (DaggersRage.daggersrage.blockarray[i][j] > 0)
                    {

                        Debug.WriteLine("blockarray[" + i + "][" + j + "] = " + DaggersRage.daggersrage.blockarray[i][j] + ";");

                    }

                }


            }
            */

            

            DaggersRage.daggersrage.Serialize();
            


        }

        public void StartCast(int id, int num)
        {

            DaggersRage.StartCast(id, num);

        }

        public void SendMouseAngle(float rad, int id, int num)
        {

            DaggersRage.SendMouseAngle(rad, id, num);

            //DaggersRage.SendClassicFireball(id);

        }

        public void SendGunAngle(int id, float rad)
        {
            DaggersRage.SendGunAngle(id, rad);


        }

        public void ClassicFireball(int id)
        {



        }

        public void SendKey(int key, int down, int myid)
        {
            DaggersRage.SendKey(key, down, myid);

        }

        public void civMove(int playerid, int unitid, int xcord, int ycord)
        {


        }

        public void addData(int x, int y, string clan, int count, string verb)
        {




        }
    }
}