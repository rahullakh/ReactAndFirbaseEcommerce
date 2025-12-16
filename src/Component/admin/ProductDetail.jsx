import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { ref, remove } from "firebase/database";
import { db } from "../../firbase/FirebaseConfig";
const ProductDetail = () => {
  const context = useContext(myContext);
  const {Loading, setLoading, getAllProduct, getAllProductData} = context;
  const navigate = useNavigate();
  const deleteProduct = async (id)=>{
    setLoading(true);
    try {
    const productRef = ref(db, `products/${id}`); 
    await remove(productRef); 

    alert("✅ Product Deleted Successfully...");
    getAllProductData(); 
  } catch (error) {
    console.error("❌ Failed deleting product:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
  }
  return (
    <div>
      <div className="flex items-center justify-between lg:py-2 my-2">
        <h1 className="text-xl font-semibold">All Product</h1>
        <Link to={"/addProduct"}>
          <button className="bg-[#31cd31] font-semibold  text-white text-sm px-4 py-2 rounded-lg hover:bg-[#05cf05] transition-colors">
            + Add Product
          </button>
        </Link>
      </div>
     
      <div className="w-full overflow-x-auto mt-2">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                S.No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center">
                Date
              </th>
              <th
                className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center"
                colSpan={1}
              >
                Action
              </th>
              <th
                className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 text-center"
                colSpan={1}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {getAllProduct.map((p, index) => {
              const{id,productImg,title,price,category,date,} = p;
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">{index + 1}</td>
                  <td className="flex items-center justify-center border border-gray-300 px-4 py-2 text-center text-gray-800">
                    <img className="w-24" src={productImg}/>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">{title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">{price}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">{category}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">{date}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                    onClick={()=> navigate(`/updateProduct/${id}`)}
                     className="text-green-600 font-medium hover:text-green-700 transition">
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                    onClick={()=> deleteProduct(id)}
                     className="text-red-600 font-medium hover:text-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
