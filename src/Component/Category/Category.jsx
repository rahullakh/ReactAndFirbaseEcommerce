import Woman from "../../assets/images/woman.jpg";
import Shirt from "../../assets/images/shirt.jpg";
import Jacket from "../../assets/images/jacket.jpg";
import Mobile from "../../assets/images/mobile.jpg";
import Laptop from "../../assets/images/laptop.jpg";
import TV from "../../assets/images/tv.jpg";
import Shoes from "../../assets/images/Shoes.jpg";
import Home from "../../assets/images/Home.jpg";
import Book from "../../assets/images/Book.jpg";
import { useNavigate } from "react-router-dom";
const category = [
  {
    image: Woman,
    name: "Fashion",
  },
  {
    image: Shirt,
    name: "Shirt",
  },
  {
    image: Jacket,
    name: "Jacket",
  },
  {
    image: Mobile,
    name: "Mobile",
  },
  {
    image: Laptop,
    name: "Laptop",
  },
  {
    image: TV,
    name: "TV",
  },
  {
    image: Shoes,
    name: "Shoes",
  },
  {
    image: Home,
    name: "Home",
  },
  {
    image: Book,
    name: "Books",
  },
];

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 my-4 py-4">
      {category.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center  py-2"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
            onClick={()=> navigate(`/category/${item.name}`)}
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="mt-2 font-semibold cursor-pointer">{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
