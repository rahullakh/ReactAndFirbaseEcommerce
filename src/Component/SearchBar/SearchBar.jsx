import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Woman from "../../assets/images/woman.jpg";
import Shirt from "../../assets/images/shirt.jpg";
import Jacket from "../../assets/images/jacket.jpg";
import Mobile from "../../assets/images/mobile.jpg";
import Laptop from "../../assets/images/laptop.jpg";
import TV from "../../assets/images/tv.jpg";

export const searchData = [
  {
    name: "Fashion",
    image: Woman,
    desc: "Stay stylish with the latest fashion trends and timeless designs for every occasion.",
    price: "₹499",
  },
  {
    name: "Shirt",
    image: Shirt,
    desc: "Comfortable cotton shirt perfect for daily wear and casual outings.",
    price: "₹299",
  },
  {
    name: "Jacket",
    image: Jacket,
    desc: "Trendy winter jacket with premium warmth and modern street style.",
    price: "₹899",
  },
  {
    name: "Mobile",
    image: Mobile,
    desc: "High-performance smartphone with stunning display and long-lasting battery.",
    price: "₹80,000",
  },
  {
    name: "Laptop",
    image: Laptop,
    desc: "Powerful laptop built for work, gaming, and everyday multitasking.",
    price: "₹50,000",
  },
  {
    name: "TV",
    image: TV,
    desc: "Smart LED TV with vibrant colors and immersive sound quality.",
    price: "₹10,000",
  },
];

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const filterSearchData = searchData.filter((item) => {
    return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <div>
      <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
        <input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          className="flex-1 text-black font-medium min-w-0 sm:w-64 md:w-72 lg:w-80 py-2 px-3 rounded-md text-sm focus:outline-none"
        />
        {/* <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300">
          <FaSearch />
        </button> */}
      </div>
      <div className="flex">
        {search && (
          <div
            className="block absolute bg-gray-50 shadow-md text-black w-96 md:2-96 lg:w-96 z-50
           my-3 rounded-lg px-2 py-2"
          >
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 flex items-center gap-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h2>
                        <p className="text-blue-600 font-bold mb-2">
                          ₹{item.price}
                        </p>
                        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img className="w-20" src="" alt="img" />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
