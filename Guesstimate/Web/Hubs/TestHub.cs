using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Hubs
{
    public class TestHub : Hub
    {
        public void ServerFunc(string bar)
        {
            Clients.All.ClientFunc("Hello!");
        }
    }
}