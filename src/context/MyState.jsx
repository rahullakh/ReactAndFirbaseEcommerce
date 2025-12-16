import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { ref, query, orderByChild,get, onValue, off, remove } from "firebase/database";
import { db } from "../firbase/FirebaseConfig";
const MyState = ({ children }) => {
  const [Loading, setLoading] = useState(false);


  const [getAllProduct, setAllProduct] = useState([]);
  const [getAllOrder,setAllOrders] = useState([]);

 const getAllProductData = async () => {
    setLoading(true);
    try {
      // kis form me data get hoga
      const q = query(ref(db, "products"), orderByChild("time"));
      
      // yeh ek eventLinstener hai jisme ek callback func hai jab bhi data change hoga yeh fir se chelega
      const unsubscribe = onValue(q, (snapshot) => {
        const data = snapshot.val(); //object form me
        let productsData = [];

        if (data) {
         
          productsData = Object.keys(data).map((key) => ({ //convert array form me
            id: key, 
            ...data[key],
          }));
        }

        setAllProduct(productsData);
        setLoading(false);
      });

      return () => off(q, "value", unsubscribe);  
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

const getAllOrderFun = async () => {
  setLoading(true);
  try {
    const ordersRef = ref(db, "orders");

    const q = query(ordersRef, orderByChild("timestamp"));

    const snapshot = await get(q);

    if (snapshot.exists()) {
      const data = snapshot.val();
      
      const allOrders = Object.entries(data).map(([id, order]) => ({
        id,
        ...order,
      }));
      setAllOrders(allOrders); 
      return ()=> allOrders;

    } else {
      setAllOrders([]);
    }
    
    setLoading(false);
  } catch (error) {
    console.log("Error fetching orders:", error);
    setLoading(false);
  }
};

const deleteOrder = async (id) => {
  setLoading(true);

  try {
    await remove(ref(db, `orders/${id}`));
    alert("Order Deleted Successfully!");
    getAllOrderFun();
    setLoading(false);
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
    setLoading(false);
  }
}

const[allUser, setUsers] = useState([]);

const getAllUser = async () => {
  setLoading(true);

  try {
    const usersRef = ref(db, "users");

   
    const usersQuery = query(usersRef, orderByChild("name"));

    const snapshot = await get(usersQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const usersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setUsers(usersArray);
    } else {
      setUsers([]);
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    alert("Not User!");
    setLoading(false);
  }
};

  useEffect(()=>{
     getAllProductData();
     getAllOrderFun();
     getAllUser();
  },[])


  return (
    <MyContext.Provider value={{ 
      Loading,
      setLoading,
      getAllProduct 
      ,getAllProductData,
      getAllOrder,
      deleteOrder,
      allUser
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
