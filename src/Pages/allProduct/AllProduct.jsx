import { useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/MyContext";
import Loader from "../../Component/Loader/Loader"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

//  const productsCard = [
//   {
//     id: 1,
//     image:
//       "https://images.meesho.com/images/products/442435579/auwgs_512.avif?width=360",
//     title: "Men's Classic White Shirt",
//     desc: "Soft cotton slim-fit white shirt perfect for casual or layering style.",
//     price: 499,
//     trendingProductName: "Bestseller",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image: "https://m.media-amazon.com/images/I/51SoIAEAZFL._AC_UY1100_.jpg",
//     title: "Men's Black T-Shirt",
//     desc: "Trendy printed black T-shirt with premium breathable fabric.",
//     price: 599,
//     trendingProductName: "Trending",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQuY0E0KLj3uJNIjZeNpixQ7UYpXQzLv_rXux_-XZP7oJBaqRVqdTO0lRYec1Jlb-9cWK-2nqhvQVF7q0WQynpQPatp4o2jcaW-qpmd7crs6cxRvYP4pFF26ZaLVgFr0ay2let08A&usqp=CAc",
//     title: "Men's Blue Polo Shirt",
//     desc: "Smart casual polo tee with a soft collar and high-quality stitching.",
//     price: 699,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },

//   {
//     id: 4,
//     image: "https://m.media-amazon.com/images/I/51ohHRRET1L._SY679_.jpg",
//     title: "Women's Oversized Beige Tee",
//     desc: "Comfy oversized tee made from organic cotton with minimal design.",
//     price: 649,
//     trendingProductName: "Popular",
//     quantity: 1,
//   },
//   {
//     id: 5,
//     image: "https://m.media-amazon.com/images/I/3150aCP-fvL.jpg",
//     title: "Women's Pink Crop Top",
//     desc: "Trendy crop top with soft stretchable fabric and pastel pink tone.",
//     price: 550,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 6,
//     image: "https://m.media-amazon.com/images/I/61lLsREfwxL._SY679_.jpg",
//     title: "Women's White Graphic T-Shirt",
//     desc: "Casual printed T-shirt with modern art design and relaxed fit.",
//     price: 499,
//     trendingProductName: "Bestseller",
//     quantity: 1,
//   },

//   {
//     id: 7,
//     image: "https://m.media-amazon.com/images/I/81+cFoDdC2L._SY679_.jpg",
//     title: "Men's Slim Fit Jeans",
//     desc: "Classic blue slim-fit denim jeans made from stretchable fabric.",
//     price: 1199,
//     trendingProductName: "Trending",
//     quantity: 1,
//   },
//   {
//     id: 8,
//     image: "https://m.media-amazon.com/images/I/51av9BPY18L._SY679_.jpg",
//     title: "Men's Chino Pants",
//     desc: "Comfortable cotton chinos with modern cut and multiple color options.",
//     price: 1099,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 9,
//     image: "https://m.media-amazon.com/images/I/61aDArxxBlL._SY679_.jpg",
//     title: "Men's Cargo Pants",
//     desc: "Stylish olive green cargo pants with side pockets and rugged look.",
//     price: 1299,
//     trendingProductName: "Popular",
//     quantity: 1,
//   },

//   {
//     id: 10,
//     image: "https://m.media-amazon.com/images/I/41MHiIf1esL._SY606_.jpg",
//     title: "Women's High-Waist Jeans",
//     desc: "Stretchable skinny jeans with high-rise waist and modern wash.",
//     price: 1199,
//     trendingProductName: "Bestseller",
//     quantity: 1,
//   },
//   {
//     id: 11,
//     image: "https://m.media-amazon.com/images/I/61qm54ohWbL._SY679_.jpg",
//     title: "Women's Wide-Leg Trousers",
//     desc: "Elegant wide-leg trousers with a classy fit for office or casual wear.",
//     price: 999,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 12,
//     image: "https://m.media-amazon.com/images/I/51YfUeBvc5L._SY679_.jpg",
//     title: "Women's Black Joggers",
//     desc: "Soft fleece joggers with an elastic waist and trendy tapered legs.",
//     price: 899,
//     trendingProductName: "Trending",
//     quantity: 1,
//   },
// ];
const AllProduct = () => {
  const context = useContext(myContext);
  const { Loading, getAllProduct } = context;
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/productInfo/${id}`); // <-- id URL me bhej di
  };
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item)=>{
    dispatch(addToCart(item));
    alert("Added to cart...");
  }

  const deleteCart = (item)=>{
    dispatch(deleteFromCart(item));
    alert("Deleted cart..");
  }


  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="mt-12 py-10 px-4 sm:px-8 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            🛍️ All Products
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Discover our most popular and trending items this season
          </p>
        </div>
        {/* <div className="text-center sm:text-end py-4 px-2">
           <button className="bg-[#31cd31] font-semibold  text-white text-sm px-4 py-2 rounded-lg hover:bg-[#05cf05] transition-colors"
        //    onClick={()=> setProduct(true)}
           >
             + Add Product</button>
         </div> */}

        <div className="py-5 lg:py-10">
          <div className="flex justify-center">
            {Loading && <Loader></Loader>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {getAllProduct.map((item,index) => {
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
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
