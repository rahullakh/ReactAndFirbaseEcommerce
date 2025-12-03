import { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import BuyOrderInfo from "../../Component/BuyOrder/BuyOrderInfo";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { db } from "../../firbase/FirebaseConfig";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showAddressPopup, setShowAddressPopup] = useState(false);
  // const navigate = useNavigate();

  const deleteCart = (id) => {
    dispatch(deleteFromCart(id));
    alert("Deleted Cart...");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const user = JSON.parse(localStorage.getItem("users"));
  // const handleBuyNowClick = () => {
  //   if (!user) {
  //     navigate("/login");
  //     return;
  //   }
  //   setShowAddressPopup(true);
  // };
  const [addressInfo, setAddInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: serverTimestamp(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

   const buyNowOrder = () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return alert("All Fields are required");
    }

    // store object for orderinfo
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userId: user.uid,
      status: "confirmed",
      time: serverTimestamp(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = ref(db, "orders");
      const newOrderRef = push(orderRef);
      set(newOrderRef, orderInfo);
      setAddInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error storing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section className="rounded-lg bg-gray-50 p-6 shadow-sm lg:col-span-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Items in your cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((product, index) => {
                      const {
                        id,
                        title,
                        price,
                        productImg,
                        quantity,
                        category,
                      } = product;
                      return (
                        <li
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-2  py-6 sm:py-6"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={productImg}
                              alt={title}
                              className="h-56 w-full sm:h-28 sm:w-48 rounded-md object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 mt-2 sm:mt-0 flex flex-1 flex-col justify-between space-y-2 sm:space-x-0">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{title}</h3>
                                <p>₹{price * quantity}</p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {category}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleDecrement(id)}
                                  className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <span className="text-gray-800">
                                  {product.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleIncrement(id)}
                                  className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => deleteCart(id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="font-bold text-center  text-gray-500">
                        Not Found
                      </h2>
                    </div>
                  </>
                )}
              </ul>
            </section>

            <section className="mt-10 lg:mt-0 lg:col-span-4 bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Price Details
              </h2>

              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({cartItemTotal} item)</span>
                  <span>₹{cartTotal}</span>
                </div>

                <div className="flex justify-between text-gray-800 font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddressPopup(true)}
                className="w-full bg-[#31cd32] hover:bg-[#27ed27] text-white px-4 py-2 rounded"
              >
                Buy Now
              </button>

              {showAddressPopup && (
                <BuyOrderInfo
                  addressInfo={addressInfo}
                  setAddInfo={setAddInfo}
                  buyNowOrder={buyNowOrder}
                  closePopup={() => setShowAddressPopup(false)}
                />
              )}
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
