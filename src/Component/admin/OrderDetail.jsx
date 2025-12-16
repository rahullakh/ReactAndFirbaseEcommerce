import React, { useContext } from "react";
import myContext from "../../context/MyContext";
const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, deleteOrder } = context;
 
  return (
    <div>
      <div className="flex items-center justify-between lg:py-2">
        <h1 className="text-xl font-semibold">All Order</h1>
        
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                S.No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Order ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Quantity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Total Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Customer Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Address
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Pincode
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Phone Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {getAllOrder.map((order, index) => {
              const {
                id: orderId,
                status,
                email,
                addressInfo,
                cartItems,
              } = order;
              const { name, address, pincode, mobileNumber } = addressInfo;

              return cartItems.map((item) => {
                const {
                  id: itemId,
                  title,
                  category,
                  price,
                  quantity,
                  productImg,
                } = item;

                return (
                  <tr
                    key={`${orderId}-${itemId}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {orderId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      <img
                        src={productImg}
                        alt={title}
                        className="w-12 h-12 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      ₹{price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      ₹{price * quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {pincode}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {order.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      {mobileNumber}
                    </td>
                    <td onClick={()=> deleteOrder(order.id)} className="border cursor-pointer border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      <span className="font-semibold text-red-600">Delete</span>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
