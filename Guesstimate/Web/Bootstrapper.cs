using Nancy;
using Nancy.Conventions;
using Nancy.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("/assets")
            );

            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("/app")
            );
        }
    }
}