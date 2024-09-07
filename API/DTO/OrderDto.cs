using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity.OrderAggregate;

namespace API.DTO
{
    public class OrderDto
    {
        public int Id{get;set;}

        public string BuyerId{get;set;}

        public ShippingAddress ShippingAddress {get;set;}

        public DateTime OrderDate {get;set;} = DateTime.UtcNow;

        public List<OrderItemDto> OrderItems {get;set;}

        public long Subtotal {get;set;}
        public long DeliveryFee{get;set;}

        public string OrderStatus {get;set;} 

        public long Total {get;set;}
    }
}