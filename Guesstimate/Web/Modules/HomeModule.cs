using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = _ => View["index"];

            Get["/helloworld"] = ctx => "Hello, I'm Nancy!";

            Get["/hello/{something}"] = ctx => "Hello, " + ctx.something;
        }
    }
}