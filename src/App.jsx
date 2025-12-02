import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import NoPage from "./Pages/NoPage/Nopage";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import ScrolTop from "./Component/ScrolTop/ScrolTop";
import CartPage from "./Pages/Cartpage/CartPage";
import AllProduct from "./Pages/allProduct/AllProduct";
import Login from "./Pages/Registeration/Login";
import SIgnup from "./Pages/Registeration/SIgnup";
import UserDashBoard from "./Pages/User/UserDashBoard";
import AdminDash from "./Pages/Admin/AdminDash";
import AddProduct from "./Pages/Admin/AddProduct";
import UpdateProduct from "./Component/admin/UpdateProduct";
import MyState from "./context/MyState";
import { SecureUser } from "./secureRoute/SecureUser";
import { SecureAdmin } from "./secureRoute/SecureAdmin";
 import CategoryPage from "./Pages/Category/CategoryPage";
function App() {
  return (
    <MyState>
      <Router>
        <ScrolTop></ScrolTop>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/allProduct" element={<AllProduct></AllProduct>}></Route>
          <Route
            path="/productInfo/:id"
            element={<ProductInfo></ProductInfo>}
          ></Route>
          <Route path="/login" element = {<Login></Login>}></Route>
          <Route path="/signup" element = {<SIgnup></SIgnup>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/*" element={<NoPage></NoPage>}></Route>
          <Route path="/category/:categoryname" element = {<CategoryPage></CategoryPage>}></Route>
          <Route path="/user-Dash" element = {
             <SecureUser>
              <UserDashBoard></UserDashBoard>
             </SecureUser>
          }></Route>
          <Route path="/admin-Dash" element = {
            <SecureAdmin>
              <AdminDash></AdminDash>
            </SecureAdmin>
          }></Route>
          <Route path="/addProduct" element = {
            <SecureAdmin>
              <AddProduct></AddProduct>
            </SecureAdmin>
          }></Route>
          <Route path="/updateProduct/:id" element = {
            <SecureAdmin>
              <UpdateProduct></UpdateProduct>
            </SecureAdmin>
          }></Route>
        </Routes>
      </Router>
    </MyState>
  );
}

export default App;
