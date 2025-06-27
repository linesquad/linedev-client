function ProjectCard({ project }: { project: { _id: string; title: string; description: string } }) {
  return (
    <div
      key={project._id}
      className="w-60 bg-white rounded-xl shadow border border-gray-200 p-4 mb-6 cursor-pointer"
    >
      <div className="flex flex-col items-center">
        <div className="w-full h-20 bg-gray-100 flex items-center justify-center rounded-md mb-4">
          <img src="/lineMainLogo.png" alt="Line Logo" className="w-20 h-20" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500">
            {project.description || "No description"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard
