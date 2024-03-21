
import { Link , useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { useState  } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {signInFailure ,signInStart ,signInSuccess} from '../redux/user/userSlice.js'
import OAuth from "../component/OAuth.jsx";
import { GiHangingSign } from "react-icons/gi";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
  
      });
      const data = await res.json();
      if(data.success ===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
      
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  

  return (
    <>
      

      <section className="w-screen h-screen flex items-center justify-center p-20 drop-shadow-lg">
        <div className=" h-[500px] w-[350px] bg-[#00544f] rounded-xl">
          <div className="w-full h-28  flex items-center justify-center">
          <GiHangingSign className="text-6xl text-white " />
          </div>
          <form
              onSubmit={handleSubmit}
              action=""
              className=" flex flex-col gap-3 px-8  justify-center"
            >
              <label className="mt-5 text-[10px] font-mono font-bold"> Email</label>
              <input
                className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none  "
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
              <label className="mt-5 text-[10px] font-mono font-bold"> Password</label>
              <input
                className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
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
                {loading ? 'Loading...':'Sign In'} <IoIosLogIn className=" text-xl font-extrabold" />
              </button>
              <OAuth />
              </div>
            </form>
              <div className="w-full border-t-[1px] border-white border-opacity-40 flex flex-col items-center justify-center p-3">
              <p className=" text-[13px]  font-mono font-semibold flex flex-row gap-2">
                Do not have an Account ?
                <Link to={"/signup"}>
                  <h1 className=" text-white hover:text-red-700  ">SignUp</h1>
                </Link>
              </p>
              <p className=" text-[12px]  text-white font-mono font-semibold flex flex-row gap-2">
              {error && <p className="border-b-2 border-red-900">{error}</p>}
              </p>
              </div>

        </div>

      </section>
    </>
  );
};
