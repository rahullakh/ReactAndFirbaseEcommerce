import { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firbase/FirebaseConfig";
import Loader from "../../Component/Loader/Loader";
import {ref,push,serverTimestamp } from "firebase/database";
import { Link } from "react-router-dom";
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
const AddProduct = () => {
  const context = useContext(myContext);
  const {Loading, setLoading} = context;

  const navigate = useNavigate();

 const [Product, setProduct] = useState({
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
 
 const addProduct = async () => {
    if (!Product.title || !Product.price || !Product.productImg || !Product.category) {
      alert("⚠️ All fields are required");
      return;
    }

    setLoading(true);
    try {
     
      const productRef = ref(db, "products");
      
     
      await push(productRef, Product);

      alert("✅ Product added successfully!");
      navigate("/admin-Dash");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert(error.message);
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
                Add New Product
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  value={Product.title}
                  onChange={(e)=>{
                    setProduct({
                      ...Product,title:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={Product.price}
                  onChange={(e)=>{
                    setProduct({
                      ...Product,price:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Price"
                />

                <input
                  type="text"
                  value={Product.productImg}
                   onChange={(e)=>{
                    setProduct({
                      ...Product,productImg:e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="ProductImgURL"
                />
                <select 
                  value={Product.category}
                  onChange={(e)=>{setProduct({
                    ...Product, category:e.target.value
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

                <textarea value={Product.desc}
                onChange={(e)=>{
                  setProduct({
                    ...Product,desc:e.target.value
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
                onClick={addProduct}
                  className="px-4 py-2 text-white rounded text-sm bg-[#2ebc2e] hover:bg-[#22f222]"
                  
                >
                  Add
                </button>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default AddProduct
