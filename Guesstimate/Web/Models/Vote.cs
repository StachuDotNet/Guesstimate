using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class Vote
    {
        public int ID { get; set; }
        public virtual User TeamUser { get; set; }
        public int PointsApplied { get; set; }
    }
}