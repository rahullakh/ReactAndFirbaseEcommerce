import { signInWithEmailAndPassword } from "firebase/auth";
import myContext from "../../context/MyContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firbase/FirebaseConfig";
import Loader from "../../Component/Loader/Loader";
import { ref, get, child } from "firebase/database";
const Login = () => {
  const context = useContext(myContext);
  const { Loading, setLoading } = context;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const userLogin = async (e) => {
  e.preventDefault();

  if (!user.email || !user.password) {
    alert("All Fields are required");
    return;
  }

  setLoading(true);

  try {
   
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const uid = userCredential.user.uid; 

    
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users/${uid}`)); 

    if (snapshot.exists()) {
    
      const userData = snapshot.val();

  
      localStorage.setItem("users", JSON.stringify(userData));

     
      setUser({
        email: "",
        password: "",
      });

      setLoading(false);

    
      if (userData.role === "user") {
        navigate("/user-Dash");
      } else {
        navigate("/admin-Dash");
      }
    } else {
      alert("User data not found in database!");
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    alert("Login failed: " + error.message);
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className=" rounded-lg shadow border p-5 w-full max-w-sm sm:max-w-sm">
        {Loading && <Loader></Loader>}
        <form className="space-y-4">
          <h2 className="text-center font-semibold text-2xl mb-2">Login</h2>
          <div className="input-groups space-y-6 relative">
            <div className="input-box w-full relative">
              <input
                type="email"
                id="Email"
                value={user.email}
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
                className="peer w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none"
              />
              <label
                htmlFor="Email"
                className="absolute left-3 top-2.5 bg-white px-1 text-gray-900 font-semibold 
               transition-all duration-300 
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black"
              >
                Email
              </label>
            </div>
            <div className="input-box w-full relative">
              <input
                id="Password"
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
                className="peer w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none"
              />
              <label
                htmlFor="Password"
                className="absolute left-3 top-2.5 bg-white px-1 text-gray-900 font-semibold 
               transition-all duration-300 
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black"
              >
                Password
              </label>
            </div>
            <div className="btn-box w-full text-center">
              <button
                onClick={userLogin}
                type="submit"
                className="px-4 py-2 w-full font-semibold text-white rounded text-sm bg-[#27c32a] hover:bg-[#1aea1a]"
              >
                Login
              </button>
            </div>
          </div>
          <p className="font-semibold">
            Don't Have an account
            <span className="ml-2 text-[#33ef33]">
              <Link to={"/signup"}>Signup</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
