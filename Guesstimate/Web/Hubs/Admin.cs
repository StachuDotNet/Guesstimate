using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Hubs
{
    public partial class TeamHub : Hub
    {
        public bool ClaimAdmin(string adminPass)
        {
            if (_repo.ClaimAdmin(adminPass))
            {
                Groups.Add(Context.ConnectionId, "admins");

                UpdateClientUserList();
                return true;
            }

            return false;
        }

        public bool ClearVotesAdmin(string adminPass)
        {
            if (!_repo.ClearVotes(adminPass))
            {
                UpdateClientVoteList();
                return false;
            }

            Clients.All.ClearVotes();
            return true;
        }
    }
}