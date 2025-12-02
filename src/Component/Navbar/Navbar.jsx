import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  // 🔹 Get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔹 Logout function
  const userLogOut = () => {
    localStorage.removeItem("users"); // only remove user data
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  // 🔹 Navigation list
  const navList = (
    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 text-white font-medium text-md px-5">
      <li>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
      </li>

      {/* All Products */}
      <li>
        <Link to="/allProduct" onClick={() => setOpen(false)}>
          All Products
        </Link>
      </li>

      {/* Dashboard Links (Conditional by Role) */}
      {user?.role === "user" && (
        <li>
          <Link to="/user-Dash" onClick={() => setOpen(false)}>
            {user?.name}
          </Link>
        </li>
      )}

      {user?.role === "admin" && (
        <li>
          <Link to="/admin-Dash" onClick={() => setOpen(false)}>
            {user?.name}
          </Link>
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to="/cart" onClick={() => setOpen(false)}>
          Cart({cartItems.length})
        </Link>
      </li>

      {/* Signup / Login buttons */}
      {!user && (
        <>
          <li>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-1 lg:py-1 px-2 lg:px-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-1 lg:py-1 px-2 lg:px-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Login
            </Link>
          </li>
        </>
      )}

      {/* Logout Button */}
      {user && (
        <li className="cursor-pointer" onClick={userLogOut}>
          Logout
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 lg:px-8 space-y-2 lg:space-y-0">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to={"/"}>
            <h2 className="font-semibold text-2xl text-center">E-Shop</h2>
          </Link>
        </div>

        <div
          className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-3/4 lg:w-auto bg-gray-900 lg:bg-transparent flex flex-col lg:flex-row items-center justify-center gap-6 transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-500 ease-in-out`}
        >
          {navList}
        </div>

        <div className="flex items-center justify-between gap-2 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none">
            <SearchBar />
          </div>

          <div
            className="lg:hidden cursor-pointer text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
