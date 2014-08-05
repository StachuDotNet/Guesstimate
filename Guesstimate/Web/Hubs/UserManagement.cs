using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Hubs
{
    public partial class TeamHub : Hub
    {
        public bool LogOn(string name, string pass)
        {
            if (_repo.LogOn(name, pass))
            {
                UpdateClientUserList();
                return true;
            }

            return false;
        }

        public bool LogOff(string name, string pass)
        {
            if (_repo.LogOff(name, pass))
            {
                UpdateClientUserList();
                return true;
            }

            return false;
        }

        private void UpdateClientUserList()
        {
            Clients.All.UpdateUserList(
                javascriptSerializer.Serialize(_repo.UserList().Where(u => u.Online).Select(u => u.Name))
            );
        }
    }
}