import { CiSearch } from "react-icons/ci";
import { Link , useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();

  const navItems = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "about",
      link: "/about",
    },
  ];

const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
}

useEffect(() => {
 const urlParams = new URLSearchParams(window.location.search);
const searchTermFromUrl = urlParams.get('searchTerm')
 if(searchTermFromUrl){
  setSearchTerm(searchTermFromUrl);
 }
},[location.search])


  return (
    
     
      <div className="absolute z-50 w-screen h-20 p-5 flex flex-row items-center justify-around  text-white ">
        <h1 className="text-xl font-semibold flex items-center">
          <span>Aditya</span>
          <span className="text-gray-800 font-bold">Estate</span>
        </h1>
        {/* nav items */}
        <div className=" md:w-[400px] md:flex   items-center justify-center   gap-10 text-sm  ">
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
          
        <Link className=" hidden md:block md:w-[120px]  bg-blue-500 hover:opacity-70 text-[#ffffff] font-bold py-2 text-center rounded-lg" to="/createListing">Create Listing</Link>
        </div>

        <form onSubmit={handleSubmit}
          action=""
          className="flex items-center bg-[#00544f] px-2 rounded-md text-black md:bg-[#00544f] drop-shadow-lg"
        >
          <input
            className=" p-2 bg-[#00544f] focus:outline-none text-white "
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
          <CiSearch />
          </button>
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
