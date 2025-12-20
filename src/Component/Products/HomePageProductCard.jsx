import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";



const HomePageProductCard = () => {

  const context = useContext(myContext);
  const { Loading, getAllProduct } = context;


  const cartItems = useSelector((state) => state.cart);

  console.log(cartItems);

  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    alert("Added to Cart...");
  };

  const deleteCart = (id) => {
    dispatch(deleteFromCart(id));
    alert("Deleted Cart...");
  };

  useEffect(()=>{
   localStorage.setItem("cart", JSON.stringify(cartItems));
  },[cartItems]);
  
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/productInfo/${id}`); 
  };

  return (
    <div className="mt-12 py-10 px-4 sm:px-8 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          🛍️ Bestselling Products
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Discover our most popular and trending items this season
        </p>
      </div>

      <div className="py-5 lg:py-10">
        <div className="flex justify-center">
          {Loading && <Loader></Loader>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getAllProduct.map((item, index) => {
            const { id, title, price, productImg } = item;
            return (
              <div
                key={index}
                onClick={() => handleClick(id)}
                className="bg-white shadow-md hover:shadow-xl transition-all rounded-md duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative group">
                  <div className="w-full py-2 px-2 border ">
                    <img
                      src={productImg}
                      alt={title}
                      className="w-full h-80 object-cover  group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-[#03c103] text-white text-xs px-3 py-1 rounded-full">
                    Trending
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {title}
                  </h2>
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    ${price}
                  </p>
                  <div className="mt-2">
                    {cartItems.some((p) => p.id === item.id) ? (
                      <button
                        onClick={() => deleteCart(item.id)}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePageProductCard;
