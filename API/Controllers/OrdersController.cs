using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Entity.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BasicApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders ()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x=> x.BuyerId == User.Identity.Name)
                .ToListAsync();
                
        }

        [HttpGet("{id}",Name ="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto) //whilst testing on api remove buyerId on local storage first
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name) 
                .FirstOrDefaultAsync();

            //provision if you cant find basket
            if(basket == null) return BadRequest(new ProblemDetails{Title="Could not find basket"});

            var items = new List<OrderItem>();

            foreach(var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 10000 ? 0 :500;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                PaymentIntentId = basket.PaymentIntentId
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if(orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(i => i.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                    
                var address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    Province = orderDto.ShippingAddress.Province,
                    PostalCode = orderDto.ShippingAddress.PostalCode,
                    Country = orderDto.ShippingAddress.Country,
                    
                };
                user.Address = address;
                //_context.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetOrder",new {id = order.Id},order.Id);

            return BadRequest("Problem creating order");
        }
    }
}