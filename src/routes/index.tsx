import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/main/Hero";
import Courses from "../components/main/Courses";
import MainWrapper from "../components/MainWrapper";
import BorderWrapper from "../components/BorderWrapper";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[#0E0C15]">
      <BorderWrapper>
        <MainWrapper>
          <Hero />
          <Courses />
        </MainWrapper>
      </BorderWrapper>
    </div>
  );
}
