using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using API.Entity.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }

        public DbSet<Order> Orders {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //fluent configurations
            builder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne() //One to one relationship
                .HasForeignKey<UserAddress>(a =>a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id=1,Name="Member",NormalizedName="MEMBER"},
                    new Role{Id=2, Name="Admin",NormalizedName="ADMIN"}
                );
        }
    }
}