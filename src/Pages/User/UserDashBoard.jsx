import React from "react";
import { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import myContext from "../../context/MyContext";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";

const UserDashBoard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllOrder } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { name, email, date, role } = user;
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
  // const removeItem = (id) => {
  //   setProducts(cart.filter((p) => p.id !== id));
  // };

  // const increaseQty = (id) => {
  //   setProducts(
  //     products.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
  //   );
  // };

  // const decreaseQty = (id) => {
  //   setProducts(
  //     products.map((p) =>
  //       p.id === id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
  //     )
  //   );
  // };

  // const subtotal = products.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );
  // const totalDiscount = products.reduce(
  //   (acc, item) => acc + (item.originalPrice - item.price) * item.qty,
  //   0
  // );
  // const total = subtotal;
  return (
    <Layout>
      <div className="py-4 lg:py-8">
        <div className="top flex flex-col items-center justify-center max-w-4xl border-t-2 lg:max-w-6xl mx-auto rounded-md bg-gray-50 shadow-md py-4 lg:py-6 px-4 lg:px-6">
          <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full mb-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELHkecg1vR8tdZFfgHVpnCMC2eLRqRNCQ2w&s"
              alt="loading"
              className="w-full rounded-full"
            />
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <h2 className="font-semibold text-gray-500">
              <span className="font-bold mr-1  text-black">Name:</span>
              {name}
            </h2>
            <h2 className="font-semibold text-gray-500">
              <span className="font-bold mr-1  text-black">Email:</span> {email}
            </h2>
            <h2 className="font-semibold text-gray-500">
              <span className="font-bold mr-1  text-black">Date:</span> {date}
            </h2>
            <h2 className="font-semibold text-gray-500">
              <span className="font-bold mr-1  text-black">Role:</span> {role}
            </h2>
          </div>
        </div>

        <div className="bottom py-2 lg:py-4">
          <div className="max-w-5xl lg:max-w-6xl mx-auto  py-4 lg:py-6 px-4 lg:px-6">
            <h2 className="font-semibold text-center lg:text-start text-2xl mb-4">
              Order Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {getAllOrder
                .filter((order) => order.userId === user.uid)
                .map((order) => {
                  console.log(order);
                  const totalAmount = order.cartItems.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.price) * Number(item.quantity),
                    0
                  );

                  return (
                    <React.Fragment key={order.id}>
                     
                      <div className="left bg-gray-200 pt-8 lg:pt-10 pl-8 lg:pl-12 space-y-3 border rounded-md">
                        <div>
                          <h2 className="font-bold">Order ID</h2>
                          <p className="text-gray-600 font-semibold">
                            #{order.id}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-bold">Date</h2>
                          <p className="text-gray-600 font-semibold">
                            {order.date}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-bold">Total Amount</h2>
                          <p className="text-gray-600 font-semibold">
                            ₹{totalAmount}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-bold">Order Status</h2>
                          <p
                            className={`font-semibold ${
                              order.status === "confirmed"
                                ? "text-green-700"
                                : "text-red-500"
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>

                     
                      <div className="mid border-r-2 pr-3 flex flex-col sm:flex-row items-start justify-start">
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 w-full"
                        >
                          {order.cartItems.map((item) => {
                            const {
                              productImg,
                              title,
                              price,
                              quantity,
                              desc,
                              category,
                              id,
                            } = item;

                            return (
                              <li
                                key={id}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 items-start"
                              >
                               
                                <div className="w-full h-60 sm:h-40 rounded-lg overflow-hidden border">
                                  <img
                                    src={productImg}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex flex-col justify-between h-full space-y-3">
                                  
                                  <div>
                                    <div className="flex justify-between font-semibold text-gray-900">
                                      <h3 className="text-lg">{title}</h3>
                                      <p className="text-blue-600 text-lg">
                                        ₹{Number(price) * Number(quantity)}
                                      </p>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                      {category} — {desc}
                                    </p>
                                  </div>

                               
                                  <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => handleDecrement(id)}
                                        className="px-3 py-1 bg-gray-200 rounded-md"
                                      >
                                        -
                                      </button>

                                      <span className="text-md font-semibold">
                                        {quantity}
                                      </span>

                                      <button
                                        onClick={() => handleIncrement(id)}
                                        className="px-3 py-1 bg-gray-200 rounded-md"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => deleteCart(id)}
                                      className="text-red-500 hover:text-red-600 text-sm"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                     
                      <div className="right bg-gray-100 p-6 border rounded-md min-w-[220px]">
                        <h2 className="font-bold mb-3 text-lg">
                          Price Details
                        </h2>

                        <div className="space-y-2 text-gray-700">
                          <p>
                            Total Items:{" "}
                            <span className="font-semibold">
                              {order.cartItems.length}
                            </span>
                          </p>
                          <p>
                            Total Amount:{" "}
                            <span className="font-semibold">
                              ₹{totalAmount}
                            </span>
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>

            {/* <div className="right pt-2 lg:pt-3 px-4">
                <h2 className="text-lg text-start lg:text-center font-medium text-gray-800 mb-4">
                  Price Details
                </h2>

                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-800 font-semibold pt-2 border-t border-gray-200">
                    <span>Total</span>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashBoard;
