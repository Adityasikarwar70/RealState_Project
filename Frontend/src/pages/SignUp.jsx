import signup from "/assets/signup.jpg";
import {Link} from "react-router-dom"
import { IoIosLogIn } from "react-icons/io";
export const SignUp = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col  items-center justify-center">
        <h1 className=" relative top-[20vh] md:top-[15vh] text-4xl font-bold text-white md:text-red-700">Signup </h1>
        <div className="w-[80vw] md:w-[50vw] h-screen  flex flex-col md:flex-row items-center justify-center rounded-lg overflow-hidden ">
          
          <div className="w-full h-1/4 md:h-1/2  rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            <img className="abslute object-cover md:h-full overflow-hidden " src={signup} alt="" />
            
          </div>
          <div className="w-full h-[50vh] md:h-1/2 bg-white  rounded-b-lg md:rounded-r-xl md:rounded-b-none overflow-hidden">
            <form action="" className=" flex flex-col gap-3 px-8 py-5">
              <input className="p-2 rounded-sm" type="text" placeholder="Full Name" id="Name" />
              <input className="p-2 rounded-sm" type="email" placeholder="Email" id="email" />
              <input className="p-2 rounded-sm" type="number" placeholder="Mob Number" id="email" />
              <input className="p-2 rounded-sm" type="passward" placeholder="passward" id="passward" />
              <button
                className="w-[25vw] md:w-[10vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex  items-center gap-2 "
                type="submit"
              >
                SignUp <IoIosLogIn className=" text-xl font-extrabold" />
              </button>
              <p className=" text-[12px] font-mono font-semibold flex flex-row gap-2">
                Already have an Account ?
                <Link to={"/login"}>
                  <h1 className=" text-red-600 hover:text-red-700  ">Login</h1>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
