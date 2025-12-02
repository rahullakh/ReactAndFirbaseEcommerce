import { ref, update, get, child} from "firebase/database";
import { db } from "../../firbase/FirebaseConfig";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/database";
const categoryList = [
  {
    name:"fashion"
  },
  {
    name:"shirt"
  },
  {
    name:"jacket"
  },
  {
    name:"books"
  },
  {
    name:"mobile"
  },
  {
    name:"laptop"
  },
  {
    name:"shoes"
  },
  {
    name:"tv"
  },
   {
    name:"home"
  },
];
const UpdateProduct = () => {
  const context = useContext(myContext);
  const { Loading, setLoading, getAllProductData } = context;

  const { id } = useParams();
  const navigate = useNavigate();


  const [updateProduct, setUpdateProduct] = useState({
    title: "",
    price: "",
    productImg: "",
    category: "",
    desc: "",
    qty: 1,
    time: serverTimestamp(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // 🔹 Existing data fetch for edit form prefill
  // jo bhi products db me pada hai usko fetch krke lao
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `products/${id}`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setUpdateProduct(data);
        } else {
          alert("No product found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🔹 Update function
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await update(ref(db, `products/${id}`), updateProduct);
      alert("Product updated successfully!");
      getAllProductData(); // Refresh product list
      navigate("/admin-Dash");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-40 p-4 z-50">
            <div className="bg-white border rounded-lg shadow-lg p-5 w-full max-w-sm sm:max-w-md">
              {Loading && <Loader></Loader>}
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Update Product
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  value={updateProduct.title}
                  onChange={(e)=>{
                    setUpdateProduct({
                      ...updateProduct,title:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={updateProduct.price}
                  onChange={(e)=>{
                    setUpdateProduct({
                      ...updateProduct,price:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Price"
                />

                <input
                  type="text"
                  value={updateProduct.productImg}
                   onChange={(e)=>{
                    setUpdateProduct({
                      ...updateProduct,productImg:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="ProductImgURL"
                />
                <select 
                  value={updateProduct.category}
                  onChange={(e)=>{setUpdateProduct({
                    ...updateProduct, category:e.target.value
                  })}}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option disabled>Select Product Category</option>
                  {
                    categoryList.map((val,index)=>{
                      const {name} = val
                      return (
                        <option key={index} className="first-letter:uppercase">{name}</option>
                      )
                    })
                  }

                </select>

                <textarea 
                value={updateProduct.desc}
                onChange={(e)=>{
                  setUpdateProduct({
                    ...updateProduct,desc:e.target.value
                  })
                }}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Description"
                >
                 
                </textarea>
                
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={()=>navigate('/admin-Dash')}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-800 text-sm"
                >
               Cancle
                </button>
                <button
                  disabled={Loading}
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 text-white rounded text-sm bg-[#2ebc2e] hover:bg-[#22f222]"
                  
                >
                  {Loading ? "Updating" :"Update"}
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default UpdateProduct
