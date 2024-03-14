import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const Header = () => {
  const navItems = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "about",
      link: "/about",
    },
    {
      name: "profile",
      link: "/profile",
    },
  ];
  return (
    
      <div className=" absolute flex justify-between items-center   gap-[10vw] p-4  w-full bg-slate-200 md:bg-transparent md:shadow-none shadow-md  md:items-center md:justify-center ">
        <h1 className="text-2xl font-semibold">
          <span>Aditya</span>
          <span className="text-gray-800 font-bold">Estate</span>
        </h1>
        {/* nav items */}
        <div className="hidden md:flex   items-center gap-10 text-lg ">
          {navItems.map((items, index) => {
            return (
              <a className=" capitalize" key={index} href={items.link}>
                {" "}
                {items.name}
              </a>
            );
          })}
          <Link to="/sign-in">
            <button className="px-3 py-1 bg-red-400 rounded-md">Sign In</button>
          </Link>
        </div>

        <form
          action=""
          className="flex items-center bg-white px-2 rounded-md text-black md:bg-slate-200"
        >
          <input
            className=" w-[25vw] md:w-[13vw]  p-2 rounded-md text-black md:bg-slate-200  "
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
    
  );
};

export default Header;
