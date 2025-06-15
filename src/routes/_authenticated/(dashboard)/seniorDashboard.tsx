import { createFileRoute, redirect } from "@tanstack/react-router";
import PricingData from "../../../components/seniordashboard/pricing/PricingData";
import YourLogoData from "../../../components/seniordashboard/yourlogo/YourLogoData";
import CreateYourLogo from "../../../components/seniordashboard/yourlogo/CreateYourLogo";
import { useState } from "react";
import UpdateYourLogo from "../../../components/seniordashboard/yourlogo/UpdateYourLogo";
import MainWrapper from "../../../components/MainWrapper";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#0E0C15] pt-20">
    <MainWrapper>
      <div className=" py-10 text-white ">
        <div className="container mx-auto px-4">

          <div className="flex flex-col gap-10">
            <CreateYourLogo
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
            {showUpdateModal && selectedId && (
              <UpdateYourLogo
                setShowUpdateModal={setShowUpdateModal}
                id={selectedId}
              />
            )}

            <YourLogoData
              handleOpenModal={handleOpenModal}
              setShowUpdateModal={setShowUpdateModal}
              setSelectedId={setSelectedId}
            />
            <PricingData />
          </div>
        </div>
      </div>
    </MainWrapper>
    </div>
  );
}
