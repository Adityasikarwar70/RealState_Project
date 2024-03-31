/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { MdLocationPin } from "react-icons/md";


const ListingItem = ({listing}) => {
  return (
    <div className="  h-[360px] w-[300px] md:w-[250px] bg-[#043f3b] drop-shadow-lg  overflow-hidden">
     <Link to={`/listing/${listing._id}`} className="flex flex-col gap-1 ">
     <div className="wfull h-[200px] overflow-hidden  ">
      <img src={listing.imageUrls[0] || "https://cdn.vectorstock.com/i/preview-1x/57/64/creative-real-estate-house-logo-symbol-vector-41955764.jpg"} alt="" className="w-full h-full hover:scale-105 transition-all duration-300 object-cover " />
     </div>
     <h1 className=" w-full truncate text-white px-2 font-semibold text-lg ">
      {listing.name}
     </h1>
    
     <p className=" flex  items-center  gap-2 px-1 text-[13px] text-yellow-200  capitalize "><MdLocationPin className="text-blue-600 text-sm" />  {listing.address}</p>

     <p className=" w-full line-clamp-2 px-2 text-slate-400 text-[11px]">{listing.description}</p>
     <h1 className=" w-full line-clamp-2 px-2 text-lg font-semibold text-rose-300 "><span className="font-normal"> Rs : </span>{listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')} {listing.type==='rent' && '/ month'} </h1>
     <div className=" flex gap-2 text-blue-400 text-sm px-2 font-semibold">
      <p>{listing.bedrooms} Beds</p>
      <p>{listing.bathrooms} Baths</p>
     </div>
 

     </Link>
    </div>
  )
}

export default ListingItem
