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
    
     
      <div className="absolute w-screen h-20 p-5 flex flex-row items-center justify-around  text-white ">
        <h1 className="text-xl font-semibold flex items-center">
          <span>Aditya</span>
          <span className="text-gray-800 font-bold">Estate</span>
        </h1>
        {/* nav items */}
        <div className=" md:flex   items-center   gap-10 text-sm  ">
          {navItems.map((items, index) => {
            return (
              <a className="hidden md:flex capitalize hover:text-zinc-300 font-semibold " key={index} href={items.link}>
                {" "}
                {items.name}
              </a>
            );
          })}
              <Link to="/profile">
            {currentUser? (
            <div className="w-[40px] h-[40px] ">
              <img src={currentUser.image} className=" sm:flex w-full h-full rounded-full object-cover border-2 border-white" alt="" />
              </div>
            ):(
              
              <button className=" px-3 py-2 bg-red-400 text-sm rounded-md">Sign In</button>
            )}
          </Link>
        </div>

        <form
          action=""
          className="flex items-center bg-[#00544f] px-2 rounded-md text-black md:bg-[#00544f] drop-shadow-lg"
        >
          <input
            className=" p-2 bg-[#00544f] focus:outline-none text-white "
            type="text"
            placeholder="Search Here"
          />
          <CiSearch />
        </form>
    
        {/* <Link to="/signin" className="md:hidden">
          <button className="  px-3 py-2 bg-red-400 rounded-md">
            Sign In
          </button>
        </Link> */}
      </div>
      
    
  );
};

export default Header;
