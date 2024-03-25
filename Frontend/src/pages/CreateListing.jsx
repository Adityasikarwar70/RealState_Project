import { useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { MdDeleteForever } from "react-icons/md";
 

const CreateListing = () => {

 const [files, setFiles] = useState([]);
 const [formData, setFormData] = useState({
  imageUrls:[],
 })
//  console.log(files);
// console.log(formData);
const [imageUploadError, setimageUploadError] = useState(false)
const [loading, setLoading] = useState(false)

 const handleSubmit =(e)=>{
  if(files.length >0 && files.length + formData.imageUrls.length < 7){
    setLoading(true);
    setimageUploadError(false)
    const promises = []; 

    for (let i = 0; i < files.length; i++) {
     promises.push(storeImage(files[i]));
      
    }
    Promise.all(promises).then((urls)=>{
      setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});

      setimageUploadError(false);
      setLoading(false)
    }).catch((err)=>{
      setimageUploadError('Image Upload error')
      setLoading(false)
    })
  }else{
    setimageUploadError('you can only upload 6 images')
    setLoading(false)
  }
 }
 const storeImage =async(file)=>{
  return new Promise ((resolve,reject)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(`${progress}`);
      },
      (error)=>{
        reject(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          resolve(downloadURL)
        })
      }
    )
  });
 }

 const handleDeleteImage = (index) => {
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  });
};



  return (
   

    <section className="h-screen w-full py-10 ">
      <h1 className=" text-center pt-10  pb-5  text-4xl font-bold text-white border-b-2 border-opacity-30 border-gray-500">
        Create a listing
      </h1>
      <div className=" w-full md:h-[80%] h-full ">
        <form
          action=" "
          className="w-full h-full flex flex-col md:flex-row gap-10 items-center justify-center "
        >
          <div className="w-[400px] mt-10">
            <div className="w-full  flex flex-col gap-5 p-10 ">
              <input
                type="text"
                placeholder="Name"
                id="name"
                className="p-2 bg-transparent border-b-[1px] focus:outline-none"
                required
              />
              <textarea
                type="text"
                placeholder="Discription"
                id="discription"
                className="p-2 bg-transparent border-b-[1px] focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Address"
                id="address"
                className="p-2 bg-transparent border-b-[1px] focus:outline-none"
                required
              />
            </div>

            <div className="py-5">
              <div className=" px-10 gap-3 items-center flex flex-wrap">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
                  />
                  <label className="ms-2 text-sm font-medium text-white">
                    Sell
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
                  />
                  <label className="ms-2 text-sm font-medium text-white">
                    Rent
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
                  />
                  <label className="ms-2 text-sm font-medium text-white">
                    Parking spot
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
                  />
                  <label className="ms-2 text-sm font-medium text-white">
                    Furnished
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
                  />
                  <label className="ms-2 text-sm font-medium text-white">
                    Offer
                  </label>
                </div>
              </div>
            </div>

            <div className=" flex flex-row flex-wrap items-start justify-start px-10 gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-[70px] h-10   bg-transparent border-b-[1px] focus:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-white ">
                  BedRooms
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  type="number"
                  className="w-[70px] h-10  bg-transparent border-b-[1px] focus:outline-none  dark:ring-offset-gray-800 "
                />
                <label className="ms-2 text-sm font-medium text-white">
                  BathRooms
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-[100px] h-10 bg-transparent border-b-[1px] focus:outline-none dark:ring-offset-gray-800 "
                />
                <label className="ms-2 text-sm font-medium text-white flex flex-col">
                  Regular Price{" "}
                  <span className="text-[10px] text-center">(Rs: /Month)</span>
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  type="number"
                  className="w-[100px] h-10 bg-transparent border-b-[1px] focus:outline-none dark:ring-offset-gray-800 "
                />
                <label className="ms-2 text-sm font-medium text-white flex flex-col">
                  Discounted Prise
                  <span className="text-[10px] text-center ">(Rs: /Month)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-[400px] flex flex-col    items-center justify-center">
            <div className="flex flex-col items-center justify-center" > 
              <h1 className=" text-lg my-2 font-semibold text-white">
                Images :{" "}
                <span className=" text-sm font-semibold text-slate-400">
                  The first image will be the cover (MAX 6)
                </span>
              </h1>
              <div>
                <div className=" w-[350px] h-full flex items-center flex-col justify-center gap-4">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                       PNG, JPG 
                      </p>
                    </div>
                    <input
                    onChange={(e)=>setFiles(e.target.files)}
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-red-400">{imageUploadError&& imageUploadError}</p>
                  <div className="flex items-center justify-center flex-wrap gap-3">
                  {
                    formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
                      
                      <div className="relative" key={url}>
                      <img src={url}  alt="image" className="w-[80px] h-[80px] object-cover rounded-lg" />
                      <button type="button" onClick={()=>handleDeleteImage(index)} className="relative bg-rose-500 text-white p-[2px] rounded-full -top-[85px] -right-[65px] drop-shadow-xl shadow-white flex items-center justify-center hover:bg-rose-600 "><MdDeleteForever /></button>
                      </div>
                    ))
                  }
                  </div>
                  <button disabled={loading} type="button" onClick={handleSubmit} className=" w-full p-3 bg-transparent border-2 border-green-500 hover:bg-green-500 hover:opacity-70 text-white text-xl font-semibold rounded-lg">
                    {loading ? 'UPLOADING..' : 'UPLOAD'}
                  </button>
                </div>
              </div>
            </div>
              <button className=" mt-4 w-[90%] p-3 bg-rose-400 rounded-lg text-xl font-semibold text-white hover:bg-rose-500 disabled:opacity-80 ">
                CREATE LISTING
              </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;
