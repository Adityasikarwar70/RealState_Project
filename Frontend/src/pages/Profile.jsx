import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ImCross } from "react-icons/im";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imgRef = useRef(null);
  const [isShown, setIsShown] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={imgRef}
            hidden
            accept="image/*"
          />
          <div className=" flex flex-col items-center gap-6">
            <img
              onClick={() => imgRef.current.click()}
              src={formData.image || currentUser.image}
              alt="pfp"
              className="cursor-pointer rounded-full h-56 w-56 md:h-[200px] md:w-[200px]  hover:opacity-85"
            />

            <p className="text-lg font-semibold">
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
            </p>
          </div>
        </div>
      </div>
      <div className="md:h-full h-1/3 mt-20 py-20 flex flex-col items-center justify-center">
        <div className=" h-full w-full px-10 flex flex-col items-center md:items-start  md:gap-4">
          <h1 className=" text-[#40c4bb] text-2xl md:text-5xl font-bold">
            HELLO
          </h1>
          <h1 className=" text-white text-4xl md:text-7xl capitalize font-semibold mb-4 ">
            {currentUser.username}
          </h1>
        </div>
        <div className="h-full w-full px-10 flex flex-col items-center md:items-start gap-2 md:gap-4 ">
          <h3 className="  text-xl font-semibold text-white  ">
            Email : {currentUser.email}
          </h3>
          <div className="w-full h-full flex flex-row justify-center md:justify-start gap-4 pt-10">
            <button
              className="md:w-1/3 md:h-1/3 h-full  bg-white hover:opacity-70 text-[#00544f] font-bold py-2 px-4 rounded-full 
        focus:outline-none focus:shadow-outline flex  items-center justify-center "
              onClick={handleUpdate}
            >
              Update Profile
            </button>
            <button
              className="md:w-1/3 md:h-1/3 h-full  bg-rose-400 hover:opacity-90 text-[#ffffff] font-bold py-2 px-4 rounded-full 
        focus:outline-none focus:shadow-outline flex  items-center justify-center "
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
      {isShown && (
        <div
          id="Update"
          className=" absolute z-20 w-[350px] h-[500px] top-32 md:left-96 p-10 bg-[#00544f] shadow-xl"
        >
          <form className="flex flex-col gap-5 py-3  ">
            <div
              className=" absolute top-5 right-10 cursor-pointer "
              onClick={handleUpdate}
            >
              <ImCross className=" text-white hover:text-rose-500" />
            </div>
            <h1 className=" text-center text-2xl font-semibold text-white">
              Update personal details
            </h1>

            <input
              type="text "
              placeholder=" Username"
              className="  p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="username"
            />
            <input
              type="text "
              placeholder=" Email"
              className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="email"
            />
            <input
              type="text "
              placeholder=" Password"
              className="p-2 bg-[#00544f] border-b-[1px] focus:outline-none"
              id="password"
            />
            <button className="   bg-slate-800 text-white rounded-lg p-3 mt-5 uppercase hover:opacity-90 disabled:opacity-80">
              Save Update
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default Profile;
