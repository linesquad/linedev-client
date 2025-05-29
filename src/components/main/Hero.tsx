function Hero() {
  return (
    <div className="mt-[70px] py-12 sm:py-16 md:py-20 lg:py-[100px] px-4 sm:px-6 lg:px-8 bg-[#0E0C15] relative">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-8 sm:mb-12 md:mb-16 lg:mb-[6rem]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
            <span className="whitespace-pre-wrap px-4">
              Explore the opportunities, Build
            </span>
            <span className="whitespace-pre-wrap px-4">
              and learn most valuable Stack
            </span>
            <span className="whitespace-pre-wrap inline-block relative">
              LineDevLTD
              <img
                src="/curve.png"
                alt="curve"
                className="absolute top-full left-0 w-full max-w-full h-auto"
                width={624}
                height={28}
              />
            </span>
          </div>
        </h1>
        <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-300 px-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="whitespace-pre-wrap">
              Get the course with your level and join team and develop your self
            </span>
            <span className="whitespace-pre-wrap">
              as experienced developer, build special from nothing and enjoy
            </span>
          </div>
        </p>
        <button className="bg-white text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
          Connect
        </button>
      </div>

      <div className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-4xl mx-auto">
        <div className="relative z-1 p-0.5 rounded-2xl bg-gradient-to-r from-[#E6D28D] to-[#EB8AE7]">
          <div className="relative bg-gradient-to-r from-[#E6D28D] to-[#EB8AE7] rounded-[1rem]">
            <div className="h-[1rem] sm:h-[1.4rem] bg-[#43435C] rounded-t-[0.9rem]" />
            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
              <div className="w-full h-full bg-[#0F0C15]">
                <img
                  src="/heroRobot.png"
                  alt="hero"
                  className="w-full object-cover transform scale-[1.7] translate-y-[8%] sm:scale-[1.4] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                />
              </div>
            </div>
            <div className="flex justify-center flex-col items-center mb-1">
              <div className="h-[1rem] sm:h-[1.4rem] w-full max-w-[90%] bg-[#1B1B2E] rounded-b-[0.9rem]" />
              <div className="h-[1rem] sm:h-[1.4rem] w-full max-w-[85%] from-[#593D61] to-[#593D61] bg-gradient-to-r rounded-b-[0.9rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
