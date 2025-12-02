import { useContext } from "react";
import OrderDetail from "../../Component/admin/OrderDetail";
import ProductDetail from "../../Component/admin/ProductDetail";
import UserDetail from "../../Component/admin/UserDetail";
import Layout from "../../Component/Layout/Layout";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import myContext from "../../context/MyContext";
const AdminDash = () => {
    const user = JSON.parse(localStorage.getItem("users"));
  // console.log(user);
  const {name,email,date,role} = user;
  const context = useContext(myContext);
  const {getAllProduct, getAllOrder, allUser} = context;

  return (
    <Layout>
      <div className="py-2 lg:py-10 px-0 lg:px-2">
        <div className="text-center max-w-7xl mx-auto py-4  ">
          <h2 className="inline font-semibold text-3xl lg:5xl border bg-gray-100 py-2 px-20 rounded-md">
            Admin
          </h2>
        </div>
        <div className="mt-1 lg:mt-2 mb-10">
          <div className="flex flex-col items-center justify-center max-w-4xl  lg:max-w-6xl border mx-auto rounded-md bg-gray-100 shadow-md py-4 lg:py-6 px-4 lg:px-6">
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full mb-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWOFXk4y0sZ1sdcBEEHKGdmAFXuSpafSP1Q&s"
                alt="loading"
                className="w-full rounded-full"
              />
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <h2 className="font-semibold text-gray- 00">
                <span className="font-bold mr-1 text-black">Name:</span> {name}
              </h2>
              <h2 className="font-semibold text-gray- 00">
                <span className="font-bold mr-1 text-black">Email:</span>{email}
              </h2>
              <h2 className="font-semibold text-gray- 00">
                <span className="font-bold mr-1 text-black">Date:</span>{date}
              </h2>
              <h2 className="font-semibold text-gray- 00">
                <span className="font-bold mr-1 text-black">Role:</span>{role}
              </h2>
            </div>
          </div>
          <div className="max-w-4xl border-t-2 lg:max-w-6xl mx-auto">
            <Tabs>
              <TabList className=" grid grid-cols-1 lg:grid-cols-3 gap-4 mt-1 lg:mt-2 py-2 lg:py-4">
                <Tab className="flex flex-col items-center justify-center space-y-1 py-2 rounded-md hover:shadow-md hover:bg-gray-300 cursor-pointer bg-gray-100 border">
                  <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full">
                    <svg
                      fill="#000000"
                      width="800px"
                      height="800px"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m47.44 61.66a1 1 0 0 1 1 .91v14.37a3.06 3.06 0 0 1 -2.87 3h-20.49a3.06 3.06 0 0 1 -3-2.88v-14.38a1 1 0 0 1 .91-1h24.5zm29.51 0a1 1 0 0 1 1 .91v14.37a3.06 3.06 0 0 1 -2.87 3h-20.49a3.06 3.06 0 0 1 -3-2.88v-14.38a1 1 0 0 1 .91-1h24.5zm-37.36 4.23-.09.11-5.82 6.32-2.63-2.55a.77.77 0 0 0 -1-.08l-.09.08-1.09 1a.62.62 0 0 0 -.07.9l.07.08 3.73 3.54a1.56 1.56 0 0 0 1.08.45 1.43 1.43 0 0 0 1.09-.45l3.14-3.32.63-.67 3.14-3.31a.78.78 0 0 0 .06-.9l-.06-.08-1.09-1a.76.76 0 0 0 -1-.12zm29.51 0-.1.11-5.82 6.32-2.64-2.55a.75.75 0 0 0 -1-.08l-.09.08-1.09 1a.62.62 0 0 0 -.07.9l.07.08 3.73 3.54a1.54 1.54 0 0 0 1.08.45 1.43 1.43 0 0 0 1.09-.45l3.14-3.32.63-.67 3.14-3.31a.78.78 0 0 0 .06-.9l-.06-.08-1.07-1.01a.76.76 0 0 0 -1-.11zm-23.43-14.41a3 3 0 0 1 2.85 2.87v3.24a1 1 0 0 1 -.84 1h-26.68a1 1 0 0 1 -.94-.9v-3.16a3 3 0 0 1 2.69-3.05h23zm31.48 0a3 3 0 0 1 2.85 2.87v3.24a1 1 0 0 1 -.84 1h-26.73a1 1 0 0 1 -1-.9v-3.16a3 3 0 0 1 2.68-3.05h23zm-15-21.29a1 1 0 0 1 1 .91v14.37a3.06 3.06 0 0 1 -2.87 3.05h-20.44a3.06 3.06 0 0 1 -3.05-2.87v-14.44a1 1 0 0 1 .9-1h24.51zm-7.85 4.22-.09.08-5.82 6.32-2.59-2.56a.76.76 0 0 0 -1-.07l-.09.07-1.08 1a.61.61 0 0 0 -.07.9l.07.08 3.72 3.53a1.56 1.56 0 0 0 1.09.45 1.43 1.43 0 0 0 1.08-.45l3.14-3.31.64-.67 3.13-3.32a.78.78 0 0 0 .06-.9l-.06-.07-1.08-1a.77.77 0 0 0 -1-.08zm7.9-14.41a3.06 3.06 0 0 1 3 2.88v3.23a1 1 0 0 1 -.91 1h-28.52a1 1 0 0 1 -1-.91v-3.14a3.06 3.06 0 0 1 2.87-3h24.56z" />
                    </svg>
                  </div>
                  <h2 className="font-bold">{getAllProduct.length}</h2>
                  <h3 className="font-semibold">Total Products</h3>
                </Tab>
                <Tab className="flex flex-col items-center justify-center space-y-1 py-2 rounded-md hover:shadow-md hover:bg-gray-300 cursor-pointer bg-gray-100 border">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full">
                    <svg
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      xml:space="preserve"
                      className="w-full rounded-full"
                    >
                      <g>
                        <g>
                          <path
                            fill="#00000"
                            d="M78.8,62.1l-3.6-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,70.6c-1.2,0.6-2.7,0.6-3.9,0L26.5,60.4
			c-0.5-0.3-1.2-0.3-1.7,0l-3.6,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,78.5c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,65,80.4,62.8,78.8,62.1z"
                          />
                        </g>
                        <g>
                          <path
                            fill="#00000"
                            d="M78.8,48.1l-3.7-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,56.6c-1.2,0.6-2.7,0.6-3.9,0L26.6,46.4
			c-0.5-0.3-1.2-0.3-1.7,0l-3.7,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,64.6c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,51.1,80.4,48.9,78.8,48.1
			z"
                          />
                        </g>
                        <g>
                          <path
                            fill="#00000"
                            d="M21.2,37.8l26.8,12.7c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7c1.6-0.8,1.6-2.9,0-3.7L51.9,21.4
			c-1.2-0.6-2.7-0.6-3.9,0L21.2,34.2C19.6,34.9,19.6,37.1,21.2,37.8z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="font-bold">{getAllOrder.length}</h2>
                  <h3 className="font-semibold">Total Order</h3>
                </Tab>
                <Tab className="flex flex-col items-center justify-center space-y-1 py-2 rounded-md hover:shadow-md hover:bg-gray-300 cursor-pointer bg-gray-100 border">
                  <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full">
                    <svg
                      fill="#000000"
                      width="70px"
                      height="70px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                      
                       d="M16 21.416c-5.035 0.022-9.243 3.537-10.326 8.247l-0.014 0.072c-0.018 0.080-0.029 0.172-0.029 0.266 0 0.69 0.56 1.25 1.25 1.25 0.596 0 1.095-0.418 1.22-0.976l0.002-0.008c0.825-3.658 4.047-6.35 7.897-6.35s7.073 2.692 7.887 6.297l0.010 0.054c0.127 0.566 0.625 0.982 1.221 0.982 0.69 0 1.25-0.559 1.25-1.25 0-0.095-0.011-0.187-0.031-0.276l0.002 0.008c-1.098-4.78-5.305-8.295-10.337-8.316h-0.002zM9.164 11.102c0 0 0 0 0 0 2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM9.164 3.25c0 0 0 0 0 0 1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM22.926 11.102c2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM22.926 3.25c1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM31.311 19.734c-0.864-4.111-4.46-7.154-8.767-7.154-0.395 0-0.784 0.026-1.165 0.075l0.045-0.005c-0.93-2.116-3.007-3.568-5.424-3.568-2.414 0-4.49 1.448-5.407 3.524l-0.015 0.038c-0.266-0.034-0.58-0.057-0.898-0.063l-0.009-0c-4.33 0.019-7.948 3.041-8.881 7.090l-0.012 0.062c-0.018 0.080-0.029 0.173-0.029 0.268 0 0.691 0.56 1.251 1.251 1.251 0.596 0 1.094-0.417 1.22-0.975l0.002-0.008c0.684-2.981 3.309-5.174 6.448-5.186h0.001c0.144 0 0.282 0.020 0.423 0.029 0.056 3.218 2.679 5.805 5.905 5.805 3.224 0 5.845-2.584 5.905-5.794l0-0.006c0.171-0.013 0.339-0.035 0.514-0.035 3.14 0.012 5.765 2.204 6.442 5.14l0.009 0.045c0.126 0.567 0.625 0.984 1.221 0.984 0.69 0 1.249-0.559 1.249-1.249 0-0.094-0.010-0.186-0.030-0.274l0.002 0.008zM16 18.416c-0 0-0 0-0.001 0-1.887 0-3.417-1.53-3.417-3.417s1.53-3.417 3.417-3.417c1.887 0 3.417 1.53 3.417 3.417 0 0 0 0 0 0.001v-0c-0.003 1.886-1.53 3.413-3.416 3.416h-0z"></path>
                    </svg>
                  </div>
                  <h2 className="font-bold">{allUser.length}</h2>
                  <h3 className="font-semibold">Total User</h3>
                </Tab>
              </TabList>
              <TabPanel>
                <ProductDetail></ProductDetail>
              </TabPanel>
              <TabPanel>
                <OrderDetail></OrderDetail>
              </TabPanel>
              <TabPanel>
                <UserDetail></UserDetail>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDash;
