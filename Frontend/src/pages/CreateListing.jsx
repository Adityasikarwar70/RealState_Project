const CreateListing = () => {
  return (
    //     <main className=" h-full w-full py-10 flex flex-col flex-wrap ">
    //       <h1 className=" text-center pt-20 md:pt-10 pb-5  text-4xl font-bold text-white border-b-2 border-opacity-30 border-gray-500">
    //         Create a listing
    //       </h1>
    //       <div className=" h-full w-full  flex md:flex-row flex-col items-center justify-between">
    //         <form
    //           action=""
    //           className="w-[400px] md:[1/2] h-[520px] flex flex-col gap-10 md:flex-row  items-center  text-white text-lg md:px-16"
    //         >
    //         <div className="">
    // <div className="w-full  flex flex-col gap-5 p-10 ">
    //   <input
    //     type="text"
    //     placeholder="Name"
    //     id="name"
    //     className="p-2 bg-transparent border-b-[1px] focus:outline-none"
    //     required
    //   />
    //   <textarea
    //     type="text"
    //     placeholder="Discription"
    //     id="discription"
    //     className="p-2 bg-transparent border-b-[1px] focus:outline-none"
    //     required
    //   />
    //   <input
    //     type="text"
    //     placeholder="Address"
    //     id="address"
    //     className="p-2 bg-transparent border-b-[1px] focus:outline-none"
    //     required
    //   />
    // </div>
    // <div className=" px-10 gap-3 items-center flex flex-wrap">
    //   <div className="flex items-center">
    //     <input
    //       type="checkbox"
    //       className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       Sell
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="checkbox"
    //       className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       Rent
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="checkbox"
    //       className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       Parking spot
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="checkbox"
    //       className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       Furnished
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="checkbox"
    //       className="w-5 h-5 bg-red-600 rounded  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       Offer
    //     </label>
    //   </div>
    // </div>
    // <div className=" w-full  p- flex  flex-wrap items-center justify-start  gap-3 px-6 ">
    //   <div className="flex items-center gap-5">
    //     <input
    //       type="number"
    //       className="w-[100px] h-10   bg-transparent border-b-[1px] focus:outline-none   "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white ">
    //       BedRooms
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="number"
    //       className="w-[100px] h-10  bg-transparent border-b-[1px] focus:outline-none  dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white">
    //       BathRooms
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="number"
    //       className="w-[100px] h-10 bg-transparent border-b-[1px] focus:outline-none dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white flex flex-col">
    //       Regular Price <span>(Rs: /Month)</span>
    //     </label>
    //   </div>
    //   <div className="flex items-center me-4">
    //     <input
    //       type="number"
    //       className="w-[100px] h-10 bg-transparent border-b-[1px] focus:outline-none dark:ring-offset-gray-800 "
    //     />
    //     <label className="ms-2 text-sm font-medium text-white flex flex-col">
    //       Discounted Prise
    //       <span>(Rs: /Month)</span>
    //     </label>
    //   </div>
    // </div>
    // </div>
    //           <div className="w-full h-full flex flex-col gap-5 p-10 ">
    // vdsdvava
    //           </div>
    //         </form>
    //       </div>
    //     </main>

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
                <div className=" w-[350px] flex items-center flex-col justify-center gap-4">
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
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </label>
                  <button className=" w-full p-3 bg-transparent border-2 border-green-500 hover:bg-green-500 hover:opacity-70 text-white text-xl font-semibold rounded-lg">
                    UPLOAD
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
