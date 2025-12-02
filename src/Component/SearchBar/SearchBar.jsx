import React, { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [search, setSearch] = useState("");
  const context = useContext(myContext);
  const {getAllProduct} = context;

  const filterSearchData = getAllProduct.filter((item) => {
    return item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const naviget = useNavigate();

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
                  onClick={()=> naviget(`/productInfo/${item.id}`)}
                    key={index}
                    className="p-3 cursor-pointer flex items-center gap-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={item.productImg}
                      alt={item.title}
                      className="w-28 h-24 object-cover cursor-pointer rounded-lg hover:scale-105 transition-transform duration-300"
                    />

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.title}
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
