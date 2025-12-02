import { useState, useEffect } from "react";
import { searchData } from "../Searchbar/Searchbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === searchData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? searchData.length - 1 : prev - 1));
  };

  const currentItem = searchData[currentIndex];
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] bg-gray-100 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between bg-white rounded-md shadow-lg transition-all duration-700 ease-in-out py-2">
        <div className="flex-1 flex items-center justify-center w-full">
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="
          w-[90%]
          sm:w-[80%]
          md:w-[70%]
          lg:w-[90%]
          h-auto
          sm:h-[350px]
          md:h-[420px]
          lg:h-[500px]
          object-cover
          rounded-md
          shadow-xl
          mx-auto
          transition-all
          duration-500
        "
          />
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left p-6 sm:p-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            {currentItem.name}
          </h3>

          <p className="text-gray-600 mt-3 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
            {currentItem.desc}
          </p>

          <p className="font-semibold text-lg sm:text-xl mt-4 text-[#32cd32]">
            {currentItem.price}
          </p>

          <button className="mt-4 sm:mt-3 bg-[#25c625] text-white px-5 py-2 sm:px-4 cursor-pointer sm:py-3 rounded-lg hover:bg-[#2cf516] transition-all duration-300">
            Buy Now
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-600/60 text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 transition"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-600/60 text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 transition"
        >
          <FaChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-5 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {searchData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
