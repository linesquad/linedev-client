const notificationImages = [
  "/linedev.jpeg",
  "/linedev.jpeg",
  "/linedev.jpeg",
];

const Notification = ({ className, title }: { className: string, title: string }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-[#252132]/30 backdrop-blur-md rounded-2xl gap-5 z-10`}
    >
      <img
        src={notificationImages[0]}
        width={65}
        height={25}
        alt="image"
        className=" rounded-xl"
      />
      <div className=" flex-1">
        <h6 className=" mb-1 font-semibold text-base">{title}</h6>
        <div className=" flex items-center justify-between">
          <ul className=" flex -m-0.5">
            {notificationImages.map((item, i) => (
              <li
                key={i}
                className=" flex h-5 gap-1 rounded-full overflow-hidden"
              >
                <img
                  src={item}
                  className="w-full"
                  alt={item}
                  width={12}
                  height={12}
                />
              </li>
            ))}
          </ul>
          <div className=" body-2 text-n-13">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
