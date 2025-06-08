import { createFileRoute, redirect } from "@tanstack/react-router";
import YourLogoData from "../../../components/seniordashboard/yourlogo/YourLogoData";
import CreateYourLogo from "../../../components/seniordashboard/yourlogo/CreateYourLogo";
import { useState } from "react";
import UpdateYourLogo from "../../../components/seniordashboard/yourlogo/UpdateYourLogo";

export const Route = createFileRoute(
  "/_authenticated/(dashboard)/seniorDashboard"
)({
  component: SeniorDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "senior") {
      throw redirect({ to: `/${role}Dashboard` });
    }
  },
});

function SeniorDashboard() { 
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="flex flex-col justify-center items-center gap-8 min-h-screen p-8 bg-[#0E0C15] text-white">
      <CreateYourLogo handleCloseModal={handleCloseModal} showModal={showModal} />
      <YourLogoData handleOpenModal={handleOpenModal} setShowUpdateModal={setShowUpdateModal} />
      {showUpdateModal && <UpdateYourLogo setShowUpdateModal={setShowUpdateModal}  id={showUpdateModal} />}
    </div>
  );
}
