using Raven.Client;
using Raven.Client.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Models;
using Web.Persistance;

namespace Web.Services
{
    public class RavenDataService : IDataService
    {
        DocumentStore docStore;
        private static Dictionary<string, string> _Votes;
        private const string _adminPass = "adminPass";

        public RavenDataService()
        {
            docStore = new DocumentStore { Url = "http://localhost:8081//" };
            docStore.Initialize();

            _Votes = _Votes ?? new Dictionary<string, string>();

            using (var session = docStore.OpenSession())
            {
                if (!session.Query<User>().Any())
                {
                    session.Store(new User { 
                        ID = 1, 
                        Name = "Stachu", 
                        Online = false, 
                        Password = "password" 
                    });
                    session.SaveChanges();
                }
            }
        }

        public bool LogOn(string name, string pass)
        {
            var session = docStore.OpenSession();

            var user = GetUser(session, name, pass);
            if (user != null)
            {
                user.Online = true;
                session.SaveChanges();
                return true;
            }
            
            return false;
        }

        public bool LogOff(string name, string pass)
        {
            var session = docStore.OpenSession();

            var user = GetUser(session, name, pass);
            if (user != null)
            {
                user.Online = false;
                session.SaveChanges();
                return true;
            }

            return false;
        }

        public IEnumerable<Models.User> UserList()
        {
            var session = docStore.OpenSession();

            return session.Query<User>().ToList();
        }

        public Dictionary<string, string> VoteList()
        {
            return _Votes;
        }

        public bool Vote(string name, string pass, string vote)
        {
            var session = docStore.OpenSession();
            var user = GetUser(session, name, pass);
            if (user != null)
            {
                _Votes[name] = vote;
                return true;
            }
            return false;
        }

        public bool ClaimAdmin(string adminPass)
        {
            if (adminPass != _adminPass) { return false; }
         
            _Votes = new Dictionary<string, string>();
            return true;
        }

        public bool AddUser(string adminPass, string name)
        {
            if (adminPass != _adminPass) { return false; }

            var session = docStore.OpenSession();


            if (session.Query<User>().ToList().Select(u => u.Name.ToLower())
                .Any(u => u == name.ToLower())) { return false; }

            var newUser = new User
            {
                Name = name,
                Online = false,
                Password = "password"
            };

            session.Store(newUser);
            session.SaveChanges();

            return true;
        }

        private User GetUser(IDocumentSession session, string name, string pass)
        {
            var user = session.Query<User>().ToList()
                .FirstOrDefault(u => u.Name.ToLower() == name.ToLower());

            return user == null || user.Password != pass
                ? null
                : user;
        }
    }
}