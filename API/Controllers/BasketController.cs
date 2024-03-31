using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace API.Controllers
{
    public class BasketController:BasicApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

      

        [HttpPost] //api/basket?productId=3&QueryTranslationPreprocessorFactory=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
        {
            // get basket || create basket

            var basket = await RetriveBasket();

            if(basket== null) basket= CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);

            if(product == null) return BadRequest(new ProblemDetails{Title="Product not found"});

            //add item
            basket.AddItem(product,quantity);

            //save changes
            var result = await _context.SaveChangesAsync() >0;
            if(result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));
            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItemt(int productId,int quantity)
        {
            //get basket
            var basket = await RetriveBasket();

            if(basket== null) return NotFound();
            //remove item
            basket.RemoveItem(productId,quantity);
            //save changes
            var result = await _context.SaveChangesAsync() >0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem deleting item from basket"});

            
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

  private static BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    PictureUrl = item.Product.PictureUrl,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }
         private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions{IsEssential= true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);

            var basket = new Basket{BuyerId=buyerId};

            _context.Baskets.Add(basket);
            return basket;
        }
    }
}