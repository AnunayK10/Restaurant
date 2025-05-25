import { Link } from "react-router-dom";
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

      <div className="w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('./assets/home_bg2.jpg')] bg-center bg-cover">
            
            <div className="pt-12 text-center">
  <h1 className="font-serif text-[#FFA07A] text-2xl lg:text-4xl uppercase tracking-wider drop-shadow-lg hover:text-[#FFD700] transition-colors duration-300">
    From Our Kitchen to Your Cravings—Delight Awaits!
  </h1>
</div>
        <div className="flex flex-col max-w-6xl gap-6 p-40 px-4 mx-auto">
        
          <div className="text-[#d4d4d4] text-xs sm:text-base font-serif italic tracking-wide">
          <span className="text-[#FFA07A] hover:text-[#FFD700] transition-colors duration-300">
          Join us on a flavorful adventure. <br /> 
          Discover beautifully crafted dishes, <br />
          a welcoming atmosphere, and <br />
          moments worth savoring. Your table is just a tap away!
          </span>
          </div>
          <div className="flex-row">
          <Link to="/signin">
            <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full bg-[#000000] hover:bg-[#8B4513] border-2 border-[#FFA07A]">
              Signin now
            </button>
            </Link>
            <Link to="/about">
              <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full border-2 border-[#FFA07A] hover:border-[#CD853F] mx-6">
                Learn More
              </button>
            </Link>
          </div>
        
     
          
          </div>
        </div>
  );
}
