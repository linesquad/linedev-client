import { heroIcons, heroLogo, Rings } from "../../lib/heroLogo";
import Notification from "../../lib/notification";
import { ScrollParallax, MouseParallax } from "react-just-parallax";
import { useState, useRef, useEffect } from "react";

function Hero() {
  const [mounted, setMounted] = useState(false);
  const parallaxRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className=" py-[200px] px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 w-full h-full top-30">
        <img
          src="/hero-background.jpg"
          alt="background"
          className="w-full h-full"
        />
      </div>
      <Rings />
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
          <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
            <div className="absolute -top-12 right-0 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
              <div
                className={`w-8 h-8 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img
                  src="/expressCircle.webp"
                  className="rounded-full"
                  alt="1"
                />
              </div>
            </div>

            <div className="absolute top-0 -left-50 w-0.25 h-1/2 origin-bottom ">
              <div
                className={`w-10 h-10 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img src="/Tailwind.svg" className="rounded-full" alt="2" />
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
              <div
                className={`hidden w-10 h-10 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full xl:block transit transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img src="/reactCircle.png" className="rounded-full " alt="3" />
              </div>
            </div>

            <div className="absolute bottom-1/2 right-1/3 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
              <div
                className={`w-10 h-10 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img src="/tsCircle.png" className="rounded-full" alt="4" />
              </div>
            </div>

            <div className="absolute -bottom-10 right-0 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
              <div
                className={`w-10 h-10 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img src="/nodeCircle.png" className="rounded-full" alt="4" />
              </div>
            </div>

            <div className="absolute top-40 left-20 w-0.25 h-1/2 ">
              <div
                className={`w-10 h-10 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <img
                  src="/tanstackCircle.png"
                  className="rounded-full"
                  alt="6"
                />
              </div>
            </div>
          </MouseParallax>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="whitespace-pre-wrap">
              Get the course with your level and join team and develop your self
            </span>
            <span className="whitespace-pre-wrap">
              as experienced developer, build special from nothing and enjoy
            </span>
          </div>
        </p>
        <button className="bg-white text-[#1A1A32] font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base cursor-pointer relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-105">
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#F0F0F8] via-[#E8E0F0] to-[#a29cb3] group-hover:w-full transition-all duration-700 ease-in-out transform origin-left"></span>
          <span className="relative z-10">Connect</span>
        </button>
      </div>

      <div className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-4xl mx-auto ">
        <div className="relative z-1 p-0.5 rounded-2xl bg-gradient-to-r from-[#E6D28D] to-[#EB8AE7]">
          <div className="relative bg-gradient-to-r from-[#E6D28D] to-[#EB8AE7] rounded-[1rem]">
            <ScrollParallax isAbsolutelyPositioned>
              <ul className=" hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-[#252132]/30 backdrop-blur-md rounded-2xl xl:flex">
                {heroIcons.map((icon, i) => (
                  <li className=" p-4" key={i}>
                    <img src={icon} alt={icon} width={25} height={25} />
                  </li>
                ))}
              </ul>
            </ScrollParallax>
            <ScrollParallax isAbsolutelyPositioned>
              <Notification
                title="Code Generation"
                className="hidden xl:flex text-white absolute top-[35%] -right-20 z-10"
              />
            </ScrollParallax>
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
              <div className="h-[1rem] sm:h-[1.4rem] w-full max-w-[92%] bg-[#1B1B2E] rounded-b-[0.9rem]" />
              <div className="h-[1rem] sm:h-[1.4rem] w-full max-w-[85%] from-[#593D61] to-[#593D61] bg-gradient-to-r rounded-b-[0.9rem]" />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm leading-16 tracking-wider uppercase my-16">
          Helping people creating beautiful web applications
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 text-white items-center gap-4 w-full">
          {heroLogo.map((logo) => (
            <div
              key={logo.id}
              className="flex justify-center items-center gap-2"
            >
              <img src={logo.image} alt={logo.name} />
              <p className="text-sm">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
