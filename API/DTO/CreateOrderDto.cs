using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity.OrderAggregate;

namespace API.DTO
{
    public class CreateOrderDto
    {
        public bool SaveAddress{get;set;}
        public ShippingAddress ShippingAddress { get; set; } 
    }
}