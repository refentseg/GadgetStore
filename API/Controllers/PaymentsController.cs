using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BasicApiController
{
    //Stripe
    #region 
    private readonly PaymentsService _paymentsService;
    private readonly StoreContext _context;
    private readonly IConfiguration _config;

    public PaymentsController(PaymentsService paymentsService,StoreContext context,IConfiguration config)
    {
        _config = config;
        _context = context;
        _paymentsService = paymentsService;
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> InitializePayment()
    {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null) return NotFound();

            var intent = await _paymentsService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails{Title="Problem creating payment"});

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _context.Update(basket);

        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return BadRequest(new ProblemDetails{Title="Problem updating basket"});

        return basket.MapBasketToDto();
    }
    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        var stripeEvent = EventUtility.ConstructEvent(json,Request.Headers["Stripe-Signature"],
             _config["StripeSettings:WhSecret"]);

        var charge = (Charge)stripeEvent.Data.Object;

        var order = await _context.Orders.FirstOrDefaultAsync(x => 
            x.PaymentIntentId == charge.PaymentIntentId);
        if(charge.Status == "succeeded") order.OrderStatus = Entity.OrderAggregate.OrderStatus.PaymentReceived;

        await _context.SaveChangesAsync();
        return new EmptyResult();

    }
 #endregion

//PayStack
    // [Authorize]
    // [HttpPost]
    // public async Task<ActionResult<BasketDto>> InitializePayment()
    // {
    //     var basket = _context.Baskets
    //         .RetrieveBasketWithItems(User.Identity.Name)
    //         .FirstOrDefault();

    //     if (basket == null) return NotFound();

    //     var response = await _paymentsService.CreateOrUpdatePaymentIntent(basket);

    //     if (response.Status == false) {
    //         string errorMessage = response.Message ?? "Problem creating payment";
    //         return BadRequest(new ProblemDetails { Title = errorMessage });
    //      }

    //     basket.PaymentIntentId = basket.PaymentIntentId ?? response.Data.Reference;
    //     basket.ClientSecret = basket.ClientSecret ?? response.Data.AccessCode;

    //     _context.Update(basket);

    //     var result = _context.SaveChanges() > 0;

    //     if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket" });

    //     return basket.MapBasketToDto();
    // }

}
}