import { SiGnuprivacyguard } from "react-icons/si";
import { Link , useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { useState  } from "react";
import OAuth from "../component/OAuth";
export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, seterror] = useState(null)
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
  
      });
      const data = await res.json();
      if(data.success ===false){
        seterror(data.message);
        setloading(false);
        return;
      }
      setloading(false);
      seterror(false)
      navigate('/signin')
      
      
    } catch (error) {
      setloading(false)
      seterror(error.message)
    }
  };
  

  return (
    <>
      {/* <div className="h-screen w-screen flex flex-col  items-center justify-center">
        <h1 className=" relative top-[20vh] md:top-[15vh] text-4xl font-bold text-white md:text-red-700">
          Signup
        </h1>
        <div className="w-[80vw] md:w-[50vw] h-screen  flex flex-col md:flex-row items-center justify-center rounded-lg overflow-hidden ">
          <div className="w-full h-1/4 md:h-[55vh]  rounded-t-lg md:rounded-t-none md:rounded-l-lg ">
            <img
              className="abslute object-cover md:h-full md:rounded-l-lg  "
              src={signup}
              alt=""
            />
          </div>
          <div className="w-full h-[50vh] md:h-[55vh] bg-white  rounded-b-lg md:rounded-r-xl md:rounded-b-none ">
            <form
              onSubmit={handleSubmit}
              action=""
              className=" flex flex-col gap-3 px-8 py-5"
            >
              <input
                className="p-2 rounded-sm"
                type="text"
                placeholder="Full Name"
                id="username"
                onChange={handleChange}
              />
              <input
                className="p-2 rounded-sm"
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
              <input
                className="p-2 rounded-sm"
                type="number"
                placeholder="Mob Number"
                id="mobile"
                onChange={handleChange}
              />
              <input
                className="p-2 rounded-sm"
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
              <button
              disabled={loading}
                className="w-[25vw] md:w-[10vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex  items-center justify-center gap-2 "
                type="submit"
              >
                {loading ? 'Loading...':'Sign Up'} <IoIosLogIn className=" text-xl font-extrabold" />
              </button>
              <OAuth/>
              <p className=" text-[12px] font-mono font-semibold flex flex-row gap-2">
                Already have an Account ?
                <Link to={"/signin"}>
                  <h1 className=" text-red-600 hover:text-red-700  ">Login</h1>
                </Link>
              </p>
              <p className=" text-[12px] text-red-600 font-mono font-semibold flex flex-row gap-2">
              {error && <p>{error}</p>}
              </p>
              
            </form>
          </div>
        </div>
      </div> */}

<section className="w-screen h-screen flex items-center justify-center p-20 drop-shadow-lg">
        <div className=" h-[500px] w-[350px] bg-[#00544f] rounded-xl">
          <div className="w-full h-28  flex items-center justify-center">
          <SiGnuprivacyguard  className="text-6xl text-white " />
          </div>
          <form
              onSubmit={handleSubmit}
              action=""
              className=" flex flex-col gap-3 px-8  justify-center"
            >
            
              <input
                className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
                type="text"
                placeholder="Full Name"
                id="username"
                onChange={handleChange}
              />
             
              <input
                className="p-2  bg-[#00544f] border-b-[1px] focus:outline-none "
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
              <input
                className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Mob Number"
                id="mobile"
                onChange={handleChange}
              />
              <input
                className="p-2  bg-[#00544f] border-b-[1px] focus:outline-none"
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
              <div className="w-full p-4 flex flex-col gap-2 items-center justify-center">
              <button
              disabled={loading}
                className="w-3/4  bg-white hover:opacity-90 text-[#00544f] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex  items-center justify-center   gap-2 "
                type="submit"
              >
                {loading ? 'Loading...':'Sign Up'} <IoIosLogIn className=" text-xl font-extrabold" />
              </button>
              <OAuth />
              </div>
            </form>
              <div className="w-full border-t-[1px] border-white border-opacity-40 flex flex-col items-center justify-center p-2">
              <p className=" text-[13px] font-mono font-semibold flex flex-row gap-2">
                Aready have an Account ?
                <Link to={"/signin"}>
                  <h1 className=" text-white hover:text-red-700  ">SignIn</h1>
                </Link>
              </p>
              <p className=" text-[12px] text-white font-mono font-semibold flex flex-row gap-2">
              {error && <p className="border-b-2 border-red-900">{error}</p>}
              </p>
              </div>

        </div>

      </section>
    </>
  );
};
