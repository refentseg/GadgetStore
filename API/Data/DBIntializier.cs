using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DBIntializier
    {
        public static async Task IntializeAsync(StoreContext context, UserManager<User> userManager)
        {
            //Users
            
            if(!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "john",
                    Email = "john@test.com"
                };

                await userManager.CreateAsync(user,"Pa$$w0rd");
                await userManager.AddToRoleAsync(user,"Member");

                var admin = new User
                {
                    UserName ="admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin,"D1sser@345");
                await userManager.AddToRolesAsync(admin,new[] {"Member","Admin"});
            }



            //Products 

            if(context.Products.Any())return;

            var products = new List<Product>
            {
                new Product
                {
                    Name="DNG Drone",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/drone-png-1.png",
                    Brand = "DNG",
                    Type="Outdoor",
                    QuantityInStock= 300
                },
                new Product
                {
                    Name="Samsung Smart Watch",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 500000,
                    PictureUrl = "/images/products/samsung-watch-1.png",
                    Brand = "Samsung",
                    Type="Watch",
                    QuantityInStock= 300
                },
                new Product
                {
                    Name="Smart Plug",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/smart-plug-1.png",
                    Brand = "Koogeek",
                    Type="Electrict appliance",
                    QuantityInStock= 300
                },
                new Product
                {
                    Name="Alexa",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 300000,
                    PictureUrl = "/images/products/alexa-amazon-1.png",
                    Brand = "Koogeek",
                    Type="Smart Home assistant",
                    QuantityInStock= 300
                },

                //create more products for testing pagination
                new Product
                {
                    Name="Smart Apple Watch",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 6500000,
                    PictureUrl = "/images/products/smart-apple-1.png",
                    Brand = "Apple",
                    Type="Watch",
                    QuantityInStock= 250
                },
                new Product
                {
                    Name="Huawei Smart Watch",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 545000,
                    PictureUrl = "/images/products/huawei-watch-1.png",
                    Brand = "Huawei",
                    Type="Watch",
                    QuantityInStock= 300
                },
                new Product
                {
                    Name="Humidifier",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 23000,
                    PictureUrl = "/images/products/humidifier-1.png",
                    Brand = "Goojo",
                    Type="Electrict appliance",
                    QuantityInStock= 300
                },
                new Product
                {
                    Name="Samsung Smart TV",
                    Description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 450000,
                    PictureUrl = "/images/products/samsung-smart-tv-1.png",
                    Brand = "Samsung",
                    Type="TV",
                    QuantityInStock= 150
                },


            };


            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }

        
    }
}