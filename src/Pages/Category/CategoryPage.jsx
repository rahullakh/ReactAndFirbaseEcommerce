import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const CategoryPage = () => {
  const { categoryname } = useParams();
  const { getAllProduct, Loading } = useContext(myContext);

  // Filter Products
  const filteredProducts = getAllProduct.filter((p) =>
    p.category.toLowerCase().includes(categoryname.toLowerCase())
  );
     const cartItems = useSelector((state) => state.cart);

  console.log(cartItems);

  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    alert("Added to Cart...");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    alert("Deleted Cart...");
  };

  useEffect(()=>{
   localStorage.setItem("cart", JSON.stringify(cartItems));
  },[cartItems]);
  return (
    <Layout>
      <div className="py-6 lg:py-8">

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
            {categoryname}
          </h1>
        </div>

        {/* Loader */}
        {Loading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}

        <div className="flex justify-center items-center">
        {!Loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md hover:shadow-xl transition-all rounded-md duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative group">
                    <div className="w-full py-2 px-2 border">
                      <img
                        src={item.productImg}
                        alt={item.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <span className="absolute top-3 left-3 bg-[#03c103] text-white text-xs px-3 py-1 rounded-full">
                      Trending
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {item.title}
                    </h2>
                    <p className="text-lg font-bold text-gray-900 mb-2">
                        ${item.price}
                      </p>
                    <div className="mt-2">
                      
                     
                       {cartItems.some((p) => p.id === item.id) ? (
                      <button
                        onClick={() => deleteCart(item)}
                        className="bg-[#31cd31] font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-[#05cf05] transition-colors"
                      >
                        Delete to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(item)}
                        className="bg-[#31cd31] font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-[#05cf05] transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Not Found Center
              <div className="col-span-full flex justify-center items-center h-64">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                  {categoryname} products not found 😓
                </h1>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
