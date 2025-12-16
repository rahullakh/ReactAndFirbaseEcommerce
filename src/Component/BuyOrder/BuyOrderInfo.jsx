import React from "react";

const BuyOrderInfo = ({ addressInfo, setAddInfo, buyNowOrder, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-scaleUp">

        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Enter Delivery Information
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

          <div>
            <label className="text-gray-600 text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={addressInfo.name}
              onChange={(e) =>
                setAddInfo({ ...addressInfo, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

         
          <div>
            <label className="text-gray-600 text-sm font-medium">Address</label>
            <input
              type="text"
              value={addressInfo.address}
              onChange={(e) =>
                setAddInfo({ ...addressInfo, address: e.target.value })
              }
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">Pincode</label>
            <input
              type="number"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddInfo({ ...addressInfo, pincode: e.target.value })
              }
              placeholder="Enter your pincode"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="number"
              value={addressInfo.mobileNumber}
              onChange={(e) =>
                setAddInfo({ ...addressInfo, mobileNumber: e.target.value })
              }
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={async () => {
                const success = await buyNowOrder();
                if (success) closePopup();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium tracking-wide"
            >
              Confirm Order
            </button>

            <button
              type="button"
              onClick={closePopup}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium tracking-wide"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyOrderInfo;
