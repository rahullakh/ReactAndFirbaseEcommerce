import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Woman from "../../assets/images/woman.jpg";
import Shirt from "../../assets/images/shirt.jpg";
import Jacket from "../../assets/images/jacket.jpg";
import Mobile from "../../assets/images/mobile.jpg";
import Laptop from "../../assets/images/laptop.jpg";
import TV from "../../assets/images/tv.jpg";
import Shoes from "../../assets/images/Shoes.jpg";
import Home from "../../assets/images/Home.jpg";
import Book from "../../assets/images/Book.jpg";


const category = [
  { image: Woman, name: "fashion" },
  { image: Shirt, name: "shirt" },
  { image: Jacket, name: "jacket" },
  { image: Mobile, name: "mobile" },
  { image: Laptop, name: "laptop" },
  { image: TV, name: "tv" },
  { image: Shoes, name: "shoes" },
  { image: Home, name: "home" },
  { image: Book, name: "book" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 my-4 py-4">

      {category.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center py-2"
        >
          <div
            className="w-20 h-20 rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"   
              className="w-full h-full object-cover"
            />
          </div>

          <h3
            className="mt-2 font-semibold cursor-pointer capitalize hover:text-green-600"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            {item.name}
          </h3>
        </div>
      ))}

    </div>
  );
};


export default memo(Category);