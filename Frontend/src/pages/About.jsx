import Footer from "../component/Footer"

function About() {
  return (
    <section className=" w-full flex flex-col justify-center items-center ">
      <h1 className=" w-[60vw] h-[76vh] flex flex-col items-center text-center justify-center gap-5 text-xl font-semibold text-white ">
        <span> 
      Aditya Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</span>

      <span>Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.</span>

      <span>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</span>
      </h1>
      <Footer/>
      
    </section>
  )
}

export default About
