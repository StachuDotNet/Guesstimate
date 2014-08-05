using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Models;

namespace Web.Persistance
{
    public interface IRepository
    {
        bool LogOn(string name, string pass);

        bool LogOff(string name, string pass);

        IEnumerable<User> UserList();

        Dictionary<string, string> VoteList();

        bool Vote(string name, string pass, string vote);

        // admin stuff
        bool ClearVotes(string adminPass);

        bool ClaimAdmin(string adminPass);
    }
}