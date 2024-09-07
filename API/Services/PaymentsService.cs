using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Stripe;
using PayStack.Net;


namespace API.Services
{
    public class PaymentsService
    {
        //Stripe below region
        #region
        private readonly IConfiguration _config;
        public PaymentsService(IConfiguration config)
        {
            _config = config;
            
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
            var deliveryFee = subtotal >1000?0:500;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency="usd",
                    PaymentMethodTypes = new List<string>{"card"}
                };
                intent = await service.CreateAsync(options);
            }else{
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee
                };
                await service.UpdateAsync(basket.PaymentIntentId,options);
            }

            return intent;

        }
        #endregion
    //PayStack
    #region 
    
    // private readonly string _paystackSecretKey;

    // public PaymentsService(IConfiguration configuration)
    // {
    //     _paystackSecretKey = configuration["PaystackSettings:SecretKey"];
    // }

    // public async Task<TransactionInitializeResponse> CreateOrUpdatePaymentIntent(Basket basket)
    // {
    //     var paystackApi = new PayStackApi(_paystackSecretKey);

    //     var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
    //     var deliveryFee = subtotal > 1000 ? 0 : 500;
    //     var totalAmountInZAR = (int)(subtotal + deliveryFee);
    //     var totalAmountInKobo = (int)totalAmountInZAR;

    //   TransactionInitializeResponse response;

    //  if(string.IsNullOrEmpty(basket.PaymentIntentId))
    //  {
    //     var request = new TransactionInitializeRequest
    //     {
    //         Email = "user.test@gmail.com", // Replace this with the email of the user
    //         AmountInKobo = totalAmountInKobo,
    //         Currency = "ZAR",
    //         Reference = Guid.NewGuid().ToString()
    //     };

    //     response = await Task.Run(()=>paystackApi.Transactions.Initialize(request));
    //     basket.PaymentIntentId = response.Data.Reference;

    //  }else
    //  {
    //     var request = new TransactionInitializeRequest
    //     {
    //         Email = "refentse.dev@gmail.com", // Replace this with the email of the user
    //         AmountInKobo = totalAmountInKobo,
    //         Currency = "ZAR",
    //         Reference = basket.PaymentIntentId
    //     };
    //     response = await Task.Run(()=>paystackApi.Transactions.Initialize(request));
    //  }

        

    //     return response;
    // }

    #endregion
}
}