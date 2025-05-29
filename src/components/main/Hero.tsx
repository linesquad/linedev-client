function Hero() {
  return (
    <div className=" mt-[70px] py-[100px] px-4 sm:px-6 lg:px-8 bg-[#0E0C15]">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
        <h1 className="text-5xl font-bold mb-6 text-white flex flex-col items-center justify-center">
          <span className="whitespace-nowrap">
            Explore the opportunities, Build
          </span>
          <span className="whitespace-nowrap">
            and learn most valuable Stack
          </span>

          <span className="whitespace-nowrap inline-block relative">
            LineDevLTD
            <img
              src="/curve.png"
              alt="curve"
              className=" absolute top-full left-0 w-full  "
              width={624}
              height={28}
            />
          </span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto mb-6 text-gray-300 lg:mb-8 flex flex-col items-center justify-center">
          <span className="whitespace-nowrap">
            Get the course with your level and join team and develop your self
          </span>
          <span className="whitespace-nowrap">
            as experienced developer, build special from nothing and enjoy
          </span>
        </p>
        <button className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors">
          Connect
        </button>
      </div>
      <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
        <div className="relative z-1 p-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="relative bg-[#0E0C15] rounded-[1rem]">
            <div className="h-[1.4rem] bg-[#1A1A1A] rounded-[0.9rem]" />
            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
              <div className="w-full h-full bg-[#1A1A1A]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
