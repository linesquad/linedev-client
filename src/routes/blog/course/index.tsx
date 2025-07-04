import CourseMain from "@/components/course/CourseMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/course/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CourseMain />
    </div>
  );
}
