using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entity
{
    //User and Address is a one-to-one relationship
    public class User: IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}