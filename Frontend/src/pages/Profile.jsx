import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ImCross } from "react-icons/im";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";


function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imgRef = useRef(null);
  const [isShown, setIsShown] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  console.log(formData);
  // console.log(fileUploadError);
  // console.log(filePercentage);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      //
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, image: downloadURL })
        );
      }
    );
  };

  const handleUpdate = () => {
    setIsShown((current) => !current);
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
 

  const handleDelete =async()=>{
try {
  dispatch(deleteUserStart());
  const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))

} catch (error) {
  dispatch(deleteUserFailure(error.message))
}
  }

 const logoutUser = async ()=>{
try {
  dispatch(logoutUserStart());
  const res = await fetch('/api/auth/logout');
  const data = await res.json();
  if(data.success === false){
    dispatch(logoutUserFailure(data.message));
    return
  }
  dispatch(logoutUserSuccess(data));

} catch (error) {
  dispatch(logoutUserFailure(error.message))
}
 }



  return (
    //  <div className=" p-3 max-w-lg mx-auto">
    //   <h1 className=" text-3xl font-semibold text-white text-center py-16">Profile</h1>
    //   <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={imgRef} hidden accept="image/*" />
    //   <form className="flex flex-col gap-5 py-3">
    //   <img onClick={()=>imgRef.current.click()} src={currentUser.image}  alt="pfp" className=" rounded-full h-24 w-24 cursor-pointer object-cover self-center" />
    //   <input type="text " placeholder=" Username" className="border p-3 rounded-lg" id="username" />
    //   <input type="text " placeholder=" Email" className="border p-3 rounded-lg" id="email" />
    //   <input type="text " placeholder=" Password" className="border p-3 rounded-lg" id="password" />
    //   <button className=" bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">Save Update</button>

    //   </form>
    //   <div className="flex flex-row justify-between">
    //     <span className="text-red-700 font-semibold cursor-pointer ">Delete Account</span>
    //     <span className="text-red-700 font-semibold cursor-pointer ">Sign Out</span>
    //   </div>
    //  </div>

    <section className="w-full h-screen p-5 md:p-20 flex md:flex-row flex-col items-center ">
      <div className="md:h-full md:w-1/2 h-1/3 mt-10 md:py-10 py-20 flex flex-col items-center md:justify-center">
        <div className=" relative md:h-1/2 w-full flex flex-col gap-5 items-center justify-center md:justify-normal   ">
         
          <form onSubmit={handleSubmit} className=" flex flex-col items-center gap-6">
            <img
              onClick={() => imgRef.current.click()}
              src={setFormData.image || currentUser.image}
              alt="pfp"
              className="cursor-pointer object-cover object-center rounded-full h-56 w-56 md:h-[200px] md:w-[200px]  hover:opacity-85"
            />

            
          </form>
        </div>
      </div>
      <div className="md:h-full h-1/3 mt-20 py-20 flex flex-col items-center justify-center">
        <div className=" h-full w-full px-10 flex flex-col items-center md:items-start  md:gap-4">
          <input disabled className="  text-2xl md:text-5xl font-bold focus:outline-none bg-transparent " placeholder="HELLO"/>
           
          
          <input disabled className=" text-white w-2/3 text-4xl md:text-7xl capitalize font-semibold mb-4 focus:outline-none bg-transparent " defaultValue={currentUser.username}/>
           
        </div>
        <div className="h-full w-full px-10 flex flex-col items-center md:items-start gap-2 md:gap-4 ">
          <h3 className="  text-xl font-semibold text-white  ">
            Email : { currentUser.email || formData.email}
          </h3>
          <div className="w-full h-full flex flex-row justify-center md:justify-start gap-4 pt-10">
            <button
              className="md:w-[150px] md:h-1/3 h-full  bg-white hover:opacity-70 text-[#00544f] font-bold py-2 px-4 rounded-full 
        focus:outline-none focus:shadow-outline flex  items-center justify-center "
              onClick={handleUpdate}
            >
              Update Profile
            </button>
            <button
              className="md:w-1/3 md:h-1/3 h-full  bg-rose-400 hover:opacity-90 text-[#ffffff] font-bold py-2 px-4 rounded-full 
        focus:outline-none focus:shadow-outline flex  items-center justify-center "
        onClick={logoutUser}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
      {isShown && (
        <div
          id="Update"
          className=" absolute z-20 w-[350px] h-[550px] top-30 md:left-96 p-10 bg-[#00544f] shadow-xl"
        >
          <form  onSubmit={handleSubmit} className="flex flex-col gap-3 py-3  ">
            <div
              className=" absolute top-5 right-10 cursor-pointer "
              onClick={handleUpdate}
            >
              <ImCross className=" text-white hover:text-rose-500" />
            </div>
            <h1 className=" text-center text-2xl font-semibold text-white">
              Update personal details
            </h1 >
            <div className="w-full flex flex-col gap-3
            ">
              <div className=" flex flex-row gap-2 items-center justify-start">
              <img
              onClick={() => imgRef.current.click()}
              src={formData.image || currentUser.image}
              alt="pfp"
              className="cursor-pointer rounded-full h-[50px] w-[50px]  hover:opacity-85"
            />
            <p className="text-sm font-semibold ">
              {fileUploadError ? (
                <span className=" text-red-500">
                  Error found : Image upload error
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className=" text-green-600">{`Uploading ${filePercentage}%`}</span>
              ) : filePercentage == 100 ? (
                <span className=" text-green-500">
                  {" "}
                  Image Successfully Uploaded !
                </span>
              ) : (
                ""
              )}
            </p></div>
            <input
            onChange={(e) => setFile(e.target.files[0])}
            id="Avtar"
            type="file"
            ref={imgRef}
            accept="image/*"
          /></div>

            <input
              type="text "
              placeholder=" Username"
              className="  p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="username"
              onChange={handleChange}
            />
            <input
              type="text "
              placeholder=" Email"
              className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="email"
              onChange={handleChange}
            />
            <input
              type="text "
              placeholder=" Password"
              className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="password"
              onChange={handleChange}
            />
            <input
              type="number "
              placeholder=" Mobile"
              className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="mobile"
              onChange={handleChange}
            />
             {/* onClick={()=>window.location.reload()} */}
            <button  onClick={logoutUser} className=" bg-slate-800 text-white rounded-lg p-3  uppercase hover:opacity-90 disabled:opacity-80">
              Save Update
            </button>
            <p className="text-[10px]  font-semibold text-white text-center">After Updation you will be logged out automatically</p>
          </form>
          
          <p onClick={handleDelete} className=" font-semibold text-rose-500 underline cursor-pointer w-[114px] hover:text-red-800 ">Delete Account </p>
        </div>
      )}
    </section>
  );
}

export default Profile;
