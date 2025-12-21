import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import {auth} from  "../../firbase/FirebaseConfig";
import {db} from  "../../firbase/FirebaseConfig";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../Component/Loader/Loader";
const SIgnup = () => {
  const context = useContext(myContext);
  const {Loading, setLoading} = context;
  
  const navigate = useNavigate();

  const[user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    role:"user"
  })

   const userSignup = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
     
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

    
      const uid = userCredential.user.uid;

 
      const userData = {
        name: user.name,
        email: user.email,
        uid: uid,
       role: user.role || "user",
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

  
      await set(ref(db, "users/" + uid), userData);
 
      setUser({ name: "", email: "", password: "" });
      alert("Signup Successfully...");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className=" rounded-lg shadow border p-5 w-full max-w-sm sm:max-w-sm">
        {Loading && <Loader></Loader>}
        <form className="space-y-4" onSubmit={userSignup}>
          <h2 className="text-center font-semibold text-2xl mb-2">Signup</h2>
          <div className="input-groups space-y-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                id="fullname"
                value={user.name}
                onChange={(e)=>{setUser({
                  ...user,name:e.target.value
                })}}
                className="peer w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none"
              />
              <label
                htmlFor="fullname"
                className="absolute left-3 top-2.5 bg-white px-1 text-gray-900 font-semibold 
               transition-all duration-300 
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black"
              >
                Full Name
              </label>
            </div>

            <div className="input-box w-full relative">
              <input
                type="email"
                id="Email"
                value={user.email}
                 onChange={(e)=>{setUser({
                  ...user,email:e.target.value
                })}}
                className="peer w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none"
              />
              <label htmlFor="Email"
                className="absolute left-3 top-2.5 bg-white px-1 text-gray-900 font-semibold 
               transition-all duration-300 
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black">
                Email
              </label>
            </div>
            <div className="input-box w-full relative">
              <input
                id="Password"
                type="password"
                value={user.password}
                 onChange={(e)=>{setUser({
                  ...user,password:e.target.value
                })}}
               className="peer w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none"
              />
              <label  htmlFor="Password"
              className="absolute left-3 top-2.5 bg-white px-1 text-gray-900 font-semibold 
               transition-all duration-300 
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black">
                Password
              </label>
            </div>
            <div className="btn-box w-full text-center">
              <button
                type="submit"
                disabled = {Loading}
                className="px-4 py-2 w-full font-semibold text-white rounded text-sm bg-[#27c32a] hover:bg-[#1aea1a]"
              >
                 {Loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </div>
          <p className="font-semibold">
            Have an account
            <span className="ml-2 text-[#33ef33]">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SIgnup;
