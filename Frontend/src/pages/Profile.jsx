import {useSelector } from "react-redux";
function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
   <div className=" p-3 max-w-lg mx-auto">
    <h1 className=" text-3xl font-semibold text-white text-center py-16">Profile</h1>
    <form className="flex flex-col gap-5 py-3">
    <img src={currentUser.image}  alt="pfp" className=" rounded-full h-24 w-24 cursor-pointer object-cover self-center" />
    <input type="text " placeholder=" Username" className="border p-3 rounded-lg" id="username" />
    <input type="text " placeholder=" Email" className="border p-3 rounded-lg" id="email" />
    <input type="text " placeholder=" Password" className="border p-3 rounded-lg" id="password" />
    <button className=" bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">Save Update</button>

    </form>
    <div className="flex flex-row justify-between">
      <span className="text-red-700 font-semibold cursor-pointer ">Delete Account</span>
      <span className="text-red-700 font-semibold cursor-pointer ">Sign Out</span>
    </div>
   </div>
    )
}

export default Profile
