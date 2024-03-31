import { useEffect, useState } from "react";
import image1 from "/assets/image1.jpg";
import image2 from "/assets/image2.jpg";
import image3 from "/assets/image3.jpg";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaArrowAltCircleDown } from "react-icons/fa";
import ListingItem from "../component/ListingItem";
import Footer from "../component/Footer";

function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const [sidebarData, setsidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setsidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);


  const showMoreClick = async()=>{
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  }

  useEffect(() => {
    // const tl = gsap.timeline()
    gsap.to("#image1", {
      // opacity: 1,
      height: "200px",
      duration: 1,
    }),
      gsap.to("#textspan", {
        color: "yellow",
        delay: 1,
      });

    gsap.to("#mainsection", {
      scrollTrigger: {
        trigger: "#section2",
        start: "top 25%",
        end: "25% 25%",
        scrub: 1,
      },
      backgroundColor: "#000000",
      ease: "none",
    });

    gsap.to("#text2", {
      opacity: 1,
      y:0,
      duration: 1,

      scrollTrigger: {
        trigger: "text2",

        start: "75% top",
        end: "25% 25%",
        scrub: 1,
      },
    });
    gsap.to("#sec2Img", {
      y: 0,
      width: "95vw",
      duration: 1,
      stagger: 0.5,

      scrollTrigger: {
        trigger: "#sec2Img",
        start: "-10% 80%",
        end: "-10% 65%",
        scrub: 1,
      },
    });
   
  });

  return (
    <section id="mainsection" className="absolute">
      <div className="w-screen h-screen flex flex-col-reverse md:flex-row items-center justify-center  gap-10">
        <div className=" relative px-5 ">
          <h1 className=" text-4xl text-white md:text-6xl font-bold">
            Find your next <span id="textspan"> perfect</span> <br /> place with
            ease
          </h1>
        </div>
        <div className=" relative overflow-hidden flex flex-col justify-start gap-2 px-5 ">
          <img
            id="image1"
            src={image1}
            alt="image1"
            className=" w-[100vw] md:w-[50vw] md: h-[0vh]  object-cover "
          />
          <img
            id="image1"
            src={image2}
            alt="image1"
            className=" w-[100vw] md:w-[50vw] md: h-[0vh]  object-cover "
          />
          <img
            id="image1"
            src={image3}
            alt="image1"
            className=" w-[100vw] md:w-[50vw] md: h-[0vh]  object-cover "
          />
        </div>
      </div>

      <div
        id="section2"
        className="w-screen  md:h-screen overflow-hidden flex items-stretch justify-center"
      >
        <div>
          <h1
            id="text2"
            className="flex flex-col items-center justify-center text-xl p-5 pt-10  text-center md:text-6xl font-bold text-white opacity-0 translate-y-10 "
          >
            Aditya Estate will help you find your home fast, <br /> easy and
            comfortable.
            <span>Our expert support are always available.</span>
            <Link to={"/search"}>
              <FaArrowAltCircleDown className=" text-5xl mt-5 text-blue-600 animate-bounce" />
            </Link>
          </h1>
          <div className=" w-full flex items-center justify-center">
            <img
              id="sec2Img"
              src={image1}
              alt=""
              className=" h-full w-[90vw] rounded-3xl translate-y-32 md:translate-y-24"
            />
          </div>
        </div>
      </div>
      <div id="listing" className="section3 flex flex-col items-center py-10 bg-[#043f3b]" >
        <h1 className=" text-white text-4xl">Recent Listings</h1>
      <div  className=" flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-10 p-10">
          {!loading && listings && listings.map((listing)=>(
            <ListingItem  key={listing._id} listing={listing}/>
          ))}
          
          </div>
          {showMore && (
            <button onClick={showMoreClick} className="text-sm font-semibold bg-blue-300 p-2 rounded-lg flex gap-2 items-center "> Show More <MdExpandMore className="text-lg font-bold" />
            </button>
          )}
      </div>
      <Footer/>

      
    </section>
  );
}

export default Home;
