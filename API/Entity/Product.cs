using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string PictureUrl{get;set;}

        public string Description { get; set; }

       //stripe uses long to keep it simple
        public long Price { get; set; }

        public string Type { get; set; }

        public string Brand {get; set; }

        public int QuantityInStock { get; set; }

        public string PublicId {get;set;}
    }
}