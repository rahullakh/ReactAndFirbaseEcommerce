
import { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import myContext from "../../context/MyContext";


const UserDashBoard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllOrder } = context;
  if (!user) {
    return <p className="text-center mt-10">User not logged in</p>;
  }
    const { name, email, date, role} = user;
  
 
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

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

          <div className="space-y-6">
            {getAllOrder?.filter(order => String(order.userId) === String(uid)).map(order => {
              const cartItems = Array.isArray(order.cartItems)
                ? order.cartItems
                : Object.values(order.cartItems || {});

              const totalAmount = cartItems.reduce(
                (sum, item) => sum + Number(item?.price || 0) * Number(item?.quantity || 0),
                0
              );

              return (
                <div key={order.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6 border p-4 rounded-md">
                  <div className="bg-gray-200 p-4 rounded-md space-y-2">
                    <p><b>Order ID:</b> #{order.id}</p>
                    <p><b>Date:</b> {order.date}</p>
                    <p><b>Total:</b> ₹{totalAmount}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span className={order.status === "confirmed" ? "text-green-700" : "text-red-500"}>
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500">No items in this order</p>
                    ) : (
                      <ul className="divide-y">
                        {cartItems.map(item => (
                          <li key={item.id} className="flex gap-4 py-4">
                            <img
                              src={item.productImg}
                              alt={item.title}
                              className="w-28 h-28 object-cover border rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-500">{item.category} — {item.desc}</p>
                              <p className="mt-1">Qty: {item.quantity}</p>
                              <p className="font-semibold text-blue-600">
                                ₹{Number(item.price) * Number(item.quantity)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
            {getAllOrder?.length === 0 && <p className="text-center text-gray-500">No orders found</p>}
          </div>
        </div>
     </div>
    </Layout>
  );
};

export default UserDashBoard;
