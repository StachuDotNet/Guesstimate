using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Models;

namespace Web.Persistance
{
    public class Repository : IRepository
    {
        public Repository()
        {
            var password = "password";

            _UserList = _UserList ?? new List<User>(){ 
                new User{Name = "Stachu", Online = false, Password = password},
                new User{Name = "Troy", Online = false, Password = password},
                new User{Name = "Weymouth", Online = false, Password = password},
                new User{Name = "James", Online = false, Password = password},
                new User{Name = "Ed", Online = false, Password = password},
                new User{Name = "Brian", Online = false, Password = password},
                new User{Name = "Jeremy", Online = false, Password = password}
            };

            _Votes = _Votes ?? new Dictionary<string, string>();
        }

        private static List<User> _UserList;
        private static Dictionary<string, string> _Votes;

        private const string _adminPass = "adminPass";

        public bool LogOn(string name, string pass)
        {
            var user = GetUser(name, pass);
            if (user != null)
            {
                user.Online = true;
                return true;
            }
            return false;
        }

        public bool LogOff(string name, string pass)
        {
            var user = GetUser(name, pass);
            if (user != null)
            {
                user.Online = false;
                return true;
            }
            return false;
        }

        public IEnumerable<User> UserList()
        {
            return _UserList.ToList();
        }



        public Dictionary<string, string> VoteList()
        {
            return _Votes;
        }

        public bool Vote(string name, string pass, string vote)
        {
            var user = GetUser(name, pass);
            if (user != null)
            {
                _Votes[name] = vote;
                return true;
            }
            return false;
        }

        public bool ClearVotes(string adminPass)
        {
            if (adminPass == _adminPass)
            {
                _Votes = new Dictionary<string, string>();
                return true;
            }
            return false;
        }

        private User GetUser(string name, string pass)
        {
            var user = _UserList.FirstOrDefault(u => u.Name == name);

            return user == null || user.Password != pass
                ? null
                : user;
        }


        public bool ClaimAdmin(string adminPass)
        {
            return adminPass == _adminPass;
        }
    }
}