using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto,Product>();
            CreateMap<UpdateProductDto,Product>();
        }
    }
}