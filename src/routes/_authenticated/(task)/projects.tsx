import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useUser } from "../../../hooks/useUser";
import { useProjects } from "../../../hooks/useTasks";
import ProjectCard from "../../../components/tasks/ProjectCard";

export const Route = createFileRoute("/_authenticated/(task)/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const user = useUser();
  const navigate = useNavigate();
  const {
    projects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useProjects();

  if (!user.isLoading && (!user.user || !user.user.name)) {
    navigate({ to: "/signin" });
  }

  if (user.isLoading) {
    return <div className="text-center py-12 text-white">Loading...</div>;
  }

  if (!user.user || !user.user.name) {
    return null;
  }

  // console.log(user.user.name);
  // console.log(user.user);

  if (isLoadingProjects) {
    return (
      <div className="text-center py-12 text-white">Projects Loading...</div>
    );
  }
  if (errorProjects) {
    return <div className="text-center py-12 text-white">Projects Error</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4  min-h-screen pt-30 pb-30 px-4 sm:px-6 lg:px-8 bg-[#0E0C15]">
      <div className="h-full w-full text-[#ffffff]">
        <div className="min-h-[128px] bg-cover bg-center bg-[url('/hero-background.jpg')] rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-col  mb-6">
              <h2 className="text-xl font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <h2 className="text-2xl font-bold">
                {`Hello, ${user.user.name || "User"}`}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full">
        <h1 className="text-2xl  text-white">My Projects</h1>
        <div className="   bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
          <div className="p-6">
            <div className="flex justify-end items-center mb-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-none cursor-pointer">
                Add New Project
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {projects && projects.length > 0
                ? projects.map(
                    (project: {
                      _id: string;
                      title: string;
                      description: string;
                    }) => <ProjectCard key={project._id} project={project} />
                  )
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
