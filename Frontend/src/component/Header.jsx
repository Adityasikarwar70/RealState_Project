import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)

  const navItems = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "about",
      link: "/about",
    },
    // {
    //   name: "profile",
    //   link: "/profile",
    // },
  ];
  return (
    
     <div>
      <div className=" absolute flex flex-row justify-between items-center px-20 py-5 text-white ">
        <h1 className="text-xl font-semibold">
          <span>Aditya</span>
          <span className="text-gray-800 font-bold">Estate</span>
        </h1>
        {/* nav items */}
        <div className="hidden md:flex   items-center  gap-10 text-sm  ">
          {navItems.map((items, index) => {
            return (
              <a className=" capitalize hover:text-zinc-300 font-semibold " key={index} href={items.link}>
                {" "}
                {items.name}
              </a>
            );
          })}
              <Link to="/signin">
            {currentUser? (
            
              <img src={currentUser.image} className=" w-10 rounded-full object-cover border-2 border-black" alt="" />
       
            ):(
              
              <button className="px-3 py-2 bg-red-400 rounded-md">Sign In</button>
            )}
          </Link>
        </div>

        <form
          action=""
          className="flex items-center bg-white px-2 rounded-md text-black md:bg-slate-200"
        >
          <input
            className=" w-[25vw] md:w-[13vw]  p-2 rounded-md text-black md:bg-slate-200 border-none border-0  "
            type="text"
            placeholder="Search Here"
          />
          <CiSearch />
        </form>
        <Link to="/sign-in" className="md:hidden">
          <button className="  px-3 py-2 bg-red-400 rounded-md">
            Sign In
          </button>
        </Link>
      </div>
      </div>
    
  );
};

export default Header;
