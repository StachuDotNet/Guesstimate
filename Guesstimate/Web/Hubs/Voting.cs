using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Web.Hubs
{
    public partial class TeamHub : Hub
    {
        public bool SubmitVoteForCurrentRound(string name, string pass, string vote)
        {
            if (_repo.Vote(name, pass, vote))
            {
                UpdateClientVoteList();
                return true;
            }

            return false;
        }

        private void UpdateClientVoteList()
        {
            Clients.All.UpdateVoteList(
                javascriptSerializer.Serialize(_repo.VoteList().Select(v => new { name = v.Key, vote = v.Value }))
            );
        }
    }
}