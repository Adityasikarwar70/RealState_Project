import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ImCross } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imgRef = useRef(null);
  const [isShown, setIsShown] = useState(false);
  const [isListingShown, setIsListingShown] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setSetshowListingError] = useState(false);
  const [showListings, setshowListings] = useState([]);
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

  const handleListing = async () => {
    setIsListingShown((current) => !current);

    try {
      setSetshowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setSetshowListingError(true);
        return;
      }
      setshowListings(data);
    } catch (error) {
      setSetshowListingError(true);
    }
  };

  const handleUpdate = () => {
    setIsShown((current) => !current);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const logoutUser = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };

  return (
    <section className="w-full h-screen p-5 md:p-20 flex md:flex-row flex-col items-center ">
      <div className="md:h-full md:w-1/2 h-1/3 mt-10 md:py-10 py-20 flex flex-col items-center md:justify-center">
        <div className=" relative md:h-1/2 w-full flex flex-col gap-5 items-center justify-center md:justify-normal   ">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center gap-6"
          >
            <img
              onClick={() => imgRef.current.click()}
              src={setFormData.image || currentUser.image}
              alt="pfp"
              className="cursor-pointer object-cover object-center rounded-full h-56 w-56 md:h-[200px] md:w-[200px]  hover:opacity-85"
            />
            <button
              onClick={handleListing}
              className=" h-full  bg-[#082c2a] hover:opacity-90 hover:border-x-2 text-[#ffffff] font-bold py-2 px-4 rounded-full drop-shadow-lg
        focus:outline-none focus:shadow-outline flex  items-center justify-center"
            >
              Show Listings
            </button>
            <p className="text-[10px]  font-semibold text-rose-600 text-center">
              {showListingError ? "Error showing Listings" : ""}
            </p>
          </form>
        </div>
      </div>
      <div className="md:h-full h-1/3 mt-20 py-20 flex flex-col items-center justify-center">
        <div className=" h-full w-full px-10 flex flex-col items-center md:items-start  md:gap-4">
          <h1 disabled className="  text-2xl md:text-5xl my-2 text-white ">
            HELLO
          </h1>

          <input
            disabled
            className=" text-white text-center md:text-left w-2/3 text-4xl md:text-7xl capitalize font-semibold mb-4 focus:outline-none bg-transparent "
            defaultValue={currentUser.username}
          />
        </div>
        <div className="h-full w-full px-10 flex flex-col items-center md:items-start gap-2 md:gap-4 ">
          <h3 className="  text-xl font-semibold text-white  ">
            Email : {currentUser.email || formData.email}
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
          <Link
            className=" md:hidden mt-3 md:w-1/3 w-[250px] md:h-1/3 h-full  bg-blue-500 hover:opacity-90 text-[#ffffff] font-bold py-2 px-4 rounded-full 
        focus:outline-none focus:shadow-outline flex  items-center justify-center"
            to="/createListing"
          >
            Create Listing
          </Link>
        </div>
      </div>
      {isShown && (
        <div
          id="Update"
          className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[350px] h-[550px] md:left-96 p-10 bg-[#00544f] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-3  ">
            <div
              className=" absolute top-5 right-10 cursor-pointer "
              onClick={handleUpdate}
            >
              <ImCross className=" text-white hover:text-rose-500" />
            </div>
            <h1 className=" text-center text-2xl font-semibold text-white">
              Update personal details
            </h1>
            <div
              className="w-full flex flex-col gap-3
            "
            >
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
                </p>
              </div>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="Avtar"
                type="file"
                ref={imgRef}
                accept="image/*"
              />
            </div>

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
            <button
              onClick={logoutUser}
              className=" bg-slate-800 text-white rounded-lg p-3  uppercase hover:opacity-90 disabled:opacity-80"
            >
              Save Update
            </button>
            <p className="text-[10px]  font-semibold text-white text-center">
              After Updation you will be logged out automatically
            </p>
          </form>

          <p
            onClick={handleDelete}
            className=" font-semibold text-rose-500 underline cursor-pointer w-[114px] hover:text-red-800 "
          >
            Delete Account{" "}
          </p>
        </div>
      )}

      {isListingShown && (
        <div
          id="Update"
          className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 w-[350px] md:w-[70vw] h-[650px] md:h-[80vh]  bg-[#00544f] shadow-xl overflow-auto"
        >
          <h1 className=" text-center text-2xl font-semibold text-white pt-4">Your Listings </h1>
          <div
            className=" absolute top-5 right-10 cursor-pointer "
            onClick={handleListing}
          >
                        <ImCross className=" text-white hover:text-rose-500" />
          </div>
          <div className="h-full w-full px-10 py-2  flex flex-wrap gap-3 justify-around ">
            {showListings &&
              showListings.length > 0 &&
              showListings.map((listing) => (
                <div key={listing._id} className=" flex">
                  <div className="w-[300px] h-[300px] p-5 my-4 bg-[#00544f] flex flex-col justify-center gap-2 shadow-2xl rounded-lg">
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing"
                        className=" h-[150px] w-[250px] object-contain"
                      />
                    </Link>
                    <Link to={`/listing/${listing._id}`}>
                      <h3 className="text-white font-semibold">
                        {listing.name}
                      </h3>
                    </Link>
                  <div className="flex gap-5 mt-4 px-4 justify-end">
                    <button className="flex items-center gap-1 text-yellow-300 hover:text-yellow-400 hover:underline text-sm font-semibold "><MdEditSquare />Edit</button>
                    <button className="flex items-center gap-1 text-rose-400 hover:text-rose-500 hover:underline text-sm font-semibold"> <MdDeleteForever /> Delete</button>
                  </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
