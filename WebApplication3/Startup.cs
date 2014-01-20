using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(daggersRage.Startup))]
namespace daggersRage
{

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}