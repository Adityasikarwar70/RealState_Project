
const Footer = () => {
    const navItems = [
        {
          name: "home",
          link: "/",
        },
        {
          name: "about",
          link: "/about",
        },
        {
            name:'profile',
            link:'/profile',
        }
      ];
  return (
    <footer className="h-full w-full bg-[#000000] text-white flex flex-col md:flex-row gap-5 p-10 items-center justify-around">
        <div className="flex flex-col items-center h-full justify-center ">
            {navItems.map((nav,index)=>(
                <a key={index} href={nav.link} className="text-xl font-semibold capitalize  hover:opacity-80 ">{nav.name} </a>
            ))}
        </div>
        <div className=" w-[300px] text-gray-400" >
            <p>Aditya Estate will help you find your home fast, easy and
            comfortable.
            Our expert support are always available.</p>
        </div>
        <div className=" flex flex-col items-center gap-2">
            <h1 className=" text-lg font-semibold border-b-2">Team</h1>
            <p>Aditya Singh Sikarwar</p>
            <p>[bs151439@gmail.com]</p>
        </div>
        <form method="POST" action="mailto:bs151439@gmail.com" encType="multipart/form-data" className="flex 
        " >
            <textarea name="Message" id="" cols="30" rows="2" placeholder="Message.." className=" bg-slate-500 p-4 rounded-l-lg"  ></textarea>
            <button className="bg-slate-600 p-2 rounded-r-lg">Submit</button>
        </form>

      </footer>
  )
}

export default Footer
