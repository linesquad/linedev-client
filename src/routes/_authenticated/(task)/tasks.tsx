import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useUser } from "../../../hooks/useUser";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/(task)/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoading && (!user.user || !user.user.name)) {
      navigate({ to: "/signin" });
    }
  }, [user.user, user.isLoading, navigate]);

  if (user.isLoading) {
    return <div className="text-center py-12 text-white">Loading...</div>;
  }

  if (!user.user || !user.user.name) {
    return null;
  }

  console.log(user.user.name);
  console.log(user.user);

  return (
    <div className="grid grid-cols-1 gap-4  min-h-screen pt-30 pb-30 px-4 sm:px-6 lg:px-8 bg-[#0E0C15]">
      <div className="h-full w-full text-[#091E42]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

            <div className="space-y-4">
              {/* Task list will go here */}
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">
                  No tasks yet. Create your first task!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New Task
              </button>
            </div>

            <div className="space-y-4">
              {/* Task list will go here */}
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">
                  No tasks yet. Create your first task!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
