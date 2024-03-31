import Slider from "react-slick";
import image1 from "../../Assets/Hero/Banner1.jpg"
import image2 from "../../Assets/Hero/Banner2.jpg"
import image3 from "../../Assets/Hero/Banner3.jpg"
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  const slides = [
    {
      image: image1,
      description: "Discover Our Latest Collection",
      buttonText: "Shop Now",
    },
    {
      image: image2,
      description: "Explore Exclusive Deals",
      buttonText: "Shop Now",
    },
    {
      image: image3,
      description: "Get Inspired with Our Products",
      buttonText: "Shop Now",
    },
  ];

  return (
    <>
      <div>
        <Slider {...settings} className="flex">
          {slides.map((slide, index) => (
            <div key={index}>
              <div
                className="h-[80vh] pl-[30vh] "
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute flex flex-col py-[30vh] justify-center ">
                    <div>
                    <h1 className="text-4xl text-white mb-4">{slide.description}</h1>
                    </div>
                  
                  <div className="flex items-center gap-x-2">
                    <button className="flex items-center gap-x-2 bg-black text-white rounded-full border-transparent px-5 py-3 w-auto font-semibold" onClick={() =>{navigate('/catalog')}}>
                        Shop Now <ShoppingCart />
                    </button>
                </div>
                </div>
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
