import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/MyContext";
import { db } from "../../firbase/FirebaseConfig";
import { child, get, ref } from "firebase/database";
import Loader from "../../Component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// import { productsCard } from "../../Component/Products/HomePageProductCard";
const ProductInfo = () => {
  const context = useContext(myContext);
  const { Loading, setLoading } = context;

  const { id } = useParams();
  const [product, setProduct] = useState("");
  console.log(product);

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
  const getProduct = async () => {
    setLoading(true);

    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `products/${id}`));

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);

        setProduct({ ...data, id: id });
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-10 text-red-600 font-bold text-xl">
          Product Not Found 😢
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 px-4 sm:px-6 bg-gray-50">
        <div className="flex justify-center">
          {Loading && <Loader></Loader>}
        </div>
        <div
          className="max-w-4xl mx-auto shadow-md px-6 py-6 
            flex flex-col sm:flex-row items-center sm:items-start 
            justify-between gap-8 bg-white rounded-md"
        >
          <div className="w-full sm:w-1/2 border rounded-md overflow-hidden shadow flex justify-center items-center bg-white">
            <img
              src={product.productImg}
              alt={product.title}
              className="w-full max-h-[450px] object-contain"
            />
          </div>

          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.title}
            </h2>

            <p className="text-xl font-bold text-gray-900">${product.price}</p>

            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full w-max">
              Trending
            </span>

            <div className="mt-4 w-full">
              {cartItems.some((p) => p.id === product.id) ? (
                <button
                  onClick={() => deleteCart(product)}
                  className="bg-red-500 font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete from Cart
                </button>
              ) : (
                <button
                  onClick={() => addCart(product)}
                  className="bg-green-600 font-semibold w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
