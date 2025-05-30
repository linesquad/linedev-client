import { courses } from "../../lib/courses";

function Courses() {
  return (
    <div className="text-white p-8 mt-16 relative overflow-hidden">
      <div className="relative z-10">
        <div className="absolute inset-0 w-full h-full top-30">
          <div className="absolute top-20 right-50 aspect-square bg-radial-gradient bg-[#171435] rounded-full w-[300px] h-[300px] blur-2xl"></div>
          <div className="absolute bottom-20 left-50 aspect-square bg-radial-gradient bg-[#171435] rounded-full w-[300px] h-[300px] blur-2xl"></div>
        </div>
        <h1 className="text-5xl text-center mb-16 bg-gradient-to-r text-white bg-clip-text">
          Grab your desired one
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="backdrop-blur-sm p-8 rounded-lg border border-[#AC6AFF] flex flex-col justify-between h-80 transition-all duration-300 hover:border-transparent cursor-pointer relative group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-lg">
                <img src="hoverCourse.png" alt="hoverCourse" className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl mb-4 bg-gradient-to-r text-white bg-clip-text">{course.title}</h2>
                <p className="text-gray-300">{course.description}</p>
              </div>
              <div className="flex items-center mt-6 relative z-10">
                <div className={`${course.iconBg} p-3 rounded-lg bg-opacity-80 backdrop-blur-sm`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {course.icon}
                  </svg>
                </div>
                <span className="ml-auto text-white">Explore more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
