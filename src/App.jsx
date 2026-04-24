import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrolTop from "./Component/ScrolTop/ScrolTop";
import MyState from "./context/MyState";
import { SecureUser } from "./secureRoute/SecureUser";
import { SecureAdmin } from "./secureRoute/SecureAdmin";

const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const NoPage = lazy(() => import("./Pages/NoPage/NoPage"));
const ProductInfo = lazy(() => import("./Pages/ProductInfo/ProductInfo"));
const CartPage = lazy(() => import("./Pages/Cartpage/CartPage"));
const AllProduct = lazy(() => import("./Pages/allProduct/AllProduct"));
const Login = lazy(() => import("./Pages/Registeration/Login"));
const Signup = lazy(() => import("./Pages/Registeration/SIgnup"));
const UserDashBoard = lazy(() => import("./Pages/User/UserDashBoard"));
const AdminDash = lazy(() => import("./Pages/Admin/AdminDash"));
const AddProduct = lazy(() => import("./Pages/Admin/AddProduct"));
const UpdateProduct = lazy(() => import("./Component/admin/UpdateProduct"));
const CategoryPage = lazy(() => import("./Pages/Category/CategoryPage"));

function App() {
  return (
    <MyState>
      <Router>
        <ScrolTop />

       
        <Suspense fallback={<h2 className="text-center py-10">Loading Page...</h2>}>

          <Routes>

         
            <Route path="/" element={<HomePage />} />
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/productInfo/:id" element={<ProductInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} />

          
            <Route
              path="/user-Dash"
              element={
                <SecureUser>
                  <UserDashBoard />
                </SecureUser>
              }
            />

            <Route
              path="/admin-Dash"
              element={
                <SecureAdmin>
                  <AdminDash />
                </SecureAdmin>
              }
            />

            <Route
              path="/addProduct"
              element={
                <SecureAdmin>
                  <AddProduct />
                </SecureAdmin>
              }
            />

            <Route
              path="/updateProduct/:id"
              element={
                <SecureAdmin>
                  <UpdateProduct />
                </SecureAdmin>
              }
            />

       
            <Route path="*" element={<NoPage />} />

          </Routes>

        </Suspense>
      </Router>
    </MyState>
  );
}

export default App;