using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Web.Persistance;

namespace Web.Hubs
{
    public partial class TeamHub : Hub
    {
        public JavaScriptSerializer javascriptSerializer;
        public IDataService _repo;

        public TeamHub()
        {
            _repo = new DataService();
            javascriptSerializer = new JavaScriptSerializer();
        }
    }
}