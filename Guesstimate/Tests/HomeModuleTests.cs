using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Nancy.Testing;
using Web.Modules;
using Nancy;

namespace Tests
{
    [TestClass]
    public class HomeModuleTests
    {
        private Browser sut;

        public HomeModuleTests()
        {
            sut = new Browser(new DefaultNancyBootstrapper());
        }

        [TestMethod]
        public void TestModuleHelloWorldShouldReturnHelloImNancy()
        {
            var actual = sut.Get("/helloworld/");

            Assert.AreEqual("Hello, I'm Nancy!", actual.Body.AsString());
        }

        [TestMethod]
        public void TestModuleHelloOtherShouldReturnHelloImNancy()
        {
            var suffix = "test";

            var actual = sut.Get("/hello/" + suffix);

            Assert.AreEqual("Hello, " + suffix, actual.Body.AsString());
        }
    }
}
