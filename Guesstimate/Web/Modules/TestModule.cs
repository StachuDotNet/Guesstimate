using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Modules
{
    public class TestModule : NancyModule
    {
        public TestModule() : base("test")
        {
            Get["/"] = _ => View["test.html"];
        }
    }
}