using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BasicApiController
    {
        private readonly StoreContext _context;

        private readonly IMapper _mapper;

        private readonly ImageService _imageService;
        public ProductsController(StoreContext context,IMapper mapper,ImageService imageService)
        {  
            _mapper = mapper;
            _context = context;
            _imageService = imageService;
        }

        //Endpoint
        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams) //From Query to show request
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands,productParams.Types)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }
        [HttpGet("{id}",Name="GetProduct")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = _context.Products.Find(id);

            if(product == null) return NotFound();

            return product;
        }
        //How user will filter products
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p =>p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p =>p.Type).Distinct().ToListAsync();

            return Ok(new {brands,types});
            
        }

        //Create Products
        #region Create Product

        [Authorize(Roles="Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if(productDto.File !=null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if(imageResult.Error !=null)
                    return BadRequest(new ProblemDetails{Title=imageResult.Error.Message});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetProduct",new {Id= product.Id},product);
            return BadRequest(new ProblemDetails{Title = "Problem creating new product"});
        }

        #endregion
        
        //Update Products
        #region Update Product

        [Authorize(Roles ="Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            //Finding the product First on the database
            var product = await _context.Products.FindAsync(productDto.Id);

            if(product == null) return NotFound();

            _mapper.Map(productDto,product);

            //Updating image if there is one on cloudinary or keeps the old one if empty
            if(productDto.File !=null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if(imageResult.Error !=null) 
                  return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                if(!string.IsNullOrEmpty(product.PublicId)) 
                    await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync()>0;

            if(result) return NoContent();
            return BadRequest(new ProblemDetails{Title="Problem updating product"});
        }

        #endregion
       
        //Delete Products
        #region DeleteProducts

        [Authorize(Roles ="Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            //Find Product
            var product = await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            _context.Products.Remove(product);

            //Have to remove it on cloudinary
            if(!string.IsNullOrEmpty(product.PublicId)) 
                    await _imageService.DeleteImageAsync(product.PublicId);

            var result = await _context.SaveChangesAsync()>0;

            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem deleting product"});


        }

        #endregion
        
    }
}