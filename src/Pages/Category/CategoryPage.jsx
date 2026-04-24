import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { useContext, useEffect, useMemo } from "react";
import myContext from "../../context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const { getAllProduct, Loading } = useContext(myContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);


  const cartIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.id));
  }, [cartItems]);


  const filteredProducts = useMemo(() => {
    if (!getAllProduct) return [];

    return getAllProduct.filter(
      (p) =>
        p.category?.toLowerCase() === categoryname?.toLowerCase()
    );
  }, [getAllProduct, categoryname]);

  const addCart = (item) => {
    dispatch(addToCart(item));
    
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-6 lg:py-8">

     
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
            {categoryname}
          </h1>
        </div>

       
        {Loading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}

       
        {!Loading && (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md hover:shadow-xl transition-all rounded-md duration-300 overflow-hidden flex flex-col"
                  >
                   
                    <div className="relative group">
                      <div className="w-full py-2 px-2 border">
                        <img
                          src={item.productImg}
                          alt={item.title}
                          loading="lazy" 
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        Trending
                      </span>
                    </div>

              
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {item.title}
                      </h2>

                      <p className="text-lg font-bold text-gray-900 mb-2">
                        ₹{item.price}
                      </p>

                     
                      {cartIds.has(item.id) ? (
                        <button
                          onClick={() => deleteCart(item)}
                          className="bg-red-500 font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(item)}
                          className="bg-green-500 font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-64">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                    {categoryname} products not found 😓
                  </h1>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;