import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadingGif from "../../public/assets/loading.gif";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { MdLocationPin } from "react-icons/md";
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
} from 'react-icons/fa';

// import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <section className="bg-white h-full w-full">
      {loading && (
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-black font-semibold text-xl ">
          <img className=" h-[80px] w-[80px]" src={loadingGif} />
          <h1>Loading.. </h1>
        </div>
      )}
      {error && (
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-black font-semibold text-xl ">
          <img className=" h-[80px] w-[80px]" src={loadingGif} />
          <h1>Something went wrong! </h1>
        </div>
      )}

      {listing && !loading && !error && (<>
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] w-screen shadow-2xl drop-shadow-2xl  '
                >
                    <img className=" h-full w-full object-cover content-center "  src={url} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div >
            <h1 className=" text-2xl md:text-5xl text-black font-bold capitalize text-center px-10 py-6
            ">{listing.name}</h1>
            <p className=" flex  items-center justify-center gap-2 text-lg font-semibold capitalize "><MdLocationPin className="text-blue-600 text-xl" />  {listing.address}</p>
            {listing.type=="rent" ? (<div className=" flex py-5 px-14 items-center justify-center  text-blue-500  text-lg font-bold capitalize">
                       <h1>This Property is available on <span className=" text-rose-500"> {listing.type} : {+listing.regularPrice - +listing.discountPrice} Rs/month </span> </h1>
                        </div>):(<div className="flex py-5 px-14 items-center justify-center text-lg text-blue-500 font-bold capitalize">
                           <h1>This Property is on sell with <span className=" text-rose-500"> Price : {+listing.regularPrice - +listing.discountPrice} Rs </span> </h1>
                        </div>)}
        </div>
        <div className="  max-h-[400px] p-10 w-full flex flex-col md:flex-row items-start justify-center gap-4">
            <div className="md:w-1/2 p-5 text-[16px] font-semibold  ">
                <p> <span className=" font-bold"> Description  :</span> {listing.description}</p>
            </div>
            <div className=" md:w-1/2 p-5 flex flex-col   gap-4 text-[16px]  font-semibold  ">
              {listing.offer && (<h1  className=" md:max-w-64 w-52 p-2 text-center text-white bg-[#00544f] rounded-md hover:opacity-80 cursor-pointer"> Discounted Price {listing.discountPrice} Rs</h1>)}
              
              
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

           
              
            </div>

        </div>
        
        </>
      )}
    </section>
  );
};

export default Listing;
