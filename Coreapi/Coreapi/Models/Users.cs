using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coreapi.Models
{
    public class Users
    {
        public int ID { get; set; }
        public int January { get; set; }
        public int February { get; set; }
        public int March { get; set; }
        public string Name { get; set; }
        public List<int> userlist { get; set; }
    }
}
