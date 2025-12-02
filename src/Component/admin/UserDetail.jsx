import React, { useContext } from "react";
import myContext from "../../context/MyContext";

const UserDetail = () => {
  const context = useContext(myContext);
  const { allUser } = context;

  return (
    <div>
      <div className="flex items-center justify-between lg:py-2">
        <h1 className="text-xl font-semibold">All User</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                S.No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                User ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Full Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
              Date
              </th>
              {/* <th
          className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 text-center"
          colSpan={1}
        >
          Actions
        </th> */}
            </tr>
          </thead>

          <tbody>
            {allUser.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                    {item.uid}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                  {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                    {item.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                   {item.date}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2 text-center">
          <button className="text-blue-600 font-medium hover:text-blue-700 transition">
            Edit
          </button>
        </td> */}
                  {/* <td className="border border-gray-300 px-4 py-2 text-center">
          <button className="text-red-600 font-medium hover:text-red-700 transition">
            Delete
          </button>
        </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;
