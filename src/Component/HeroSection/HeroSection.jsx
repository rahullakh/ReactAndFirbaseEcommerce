import { useState, useContext} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const context = useContext(myContext);
  const { Loading, getAllProduct } = context;
  
  const navigate = useNavigate();

  // ------------------- Safeguard -------------------
  if (Loading || getAllProduct.length === 0) {
    return <h2 className="text-center py-10">Loading...</h2>;
  }
  // -------------------------------------------------

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === getAllProduct.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? getAllProduct.length - 1 : prev - 1
    );
  };



  const currentItem = getAllProduct[currentIndex];
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] bg-gray-100 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between bg-white rounded-md shadow-lg">
        <div
          onClick={() => navigate(`/productInfo/${currentItem.id}`)}
          className="flex-1 flex items-center justify-center w-full"
        >
          <img
            src={currentItem.productImg}
            alt={currentItem.title}
            className="
    w-[70%]
    sm:w-[60%]
    md:w-[55%]
    lg:w-[50%]
    max-h-[350px]
    sm:max-h-[400px]
    md:max-h-[450px]
    lg:max-h-[500px]
    object-contain
    rounded-md
    shadow-xl
    mx-auto
    transition-all
    duration-500
  "
          />
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start justify-center p-6 sm:p-10">
          <h3 className="text-3xl font-bold text-gray-800">
            {currentItem.title}
          </h3>
          <p className="text-gray-600 mt-3 text-lg max-w-md">
            {currentItem.desc}
          </p>
          <p className="font-semibold text-xl mt-4 text-green-600">
            ₹{currentItem.price}
          </p>

          <button
            type="button"
            className=" bg-[#31cd32] hover:bg-[#27ed27] text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-600/60 text-white p-3 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-600/60 text-white p-3 rounded-full"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {getAllProduct.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentIndex ? "bg-blue-600 scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};
export default HeroSection;
