import { useContext, useEffect, useState } from "react";
import {
  ArrowCircleDown,
  ArrowCircleRight,
  Pen,
  Trash,
  MagnifyingGlass,
} from "phosphor-react";
import { ClientContext } from "../../contexts/clients-context";
import { PetContext } from "../../contexts/pet-context";

interface SearchAndEditProps {
  editClientComponentState: (e?: number | undefined) => void;
  cardInfoClientComponentState: () => void;
  addPetComponentState: () => void;
}

export function ClientComponentData({
  editClientComponentState,
  cardInfoClientComponentState,
  addPetComponentState,
}: SearchAndEditProps) {
  const [userSectionSelected, setUserSectionSelected] = useState(false);
  const {
    clients,
    filterdClients,
    handleClientToBeUpdated,
    handlePetsBelongedComponentState,
    handleDeleteClients,
  } = useContext(ClientContext);
  const { handlePetToBeUpdated, handlePetTreatmentState } =
    useContext(PetContext);

  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 lg:gap-x-8 gap-y-12 md:gap-y-12 sm:gap-y-12 ml-6 max-[382px]:ml-4 lg:ml-14 md:ml-14 sm:ml-6 mt-16 max-[382px]:mt-9">
      {filterdClients?.length ? (
        <>
          {filterdClients.map((data: any) => {
            return (
              <>
                <div
                  key={data["clientId"]}
                  className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-9 sm:space-x-6"
                >
                  <div className="flex items-center justify-center w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-slate-200 hover:bg-opacity-60 transition duration-500 rounded-xl cursor-pointer">
                    <img
                      onClick={() => {
                        handleClientToBeUpdated(data?.clientId);
                        cardInfoClientComponentState();
                      }}
                      className="w-8/12 h-8/12"
                      src={data["clientProfilePhoto"]}
                      alt="client icon"
                    />
                  </div>
                  <div className="space-y-6 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div className="text-main font-black flex items-center lg:space-x-14 md:space-x-12 sm:space-x-6 max-[639px]:space-x-4">
                        <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl">
                          {data["clientName"]}
                        </p>
                        <div className="flex space-x-4">
                          <Pen
                            size={32}
                            onClick={() => {
                              editClientComponentState();
                              handleClientToBeUpdated(data?.clientId);
                            }}
                          />
                          <Trash
                            size={32}
                            onClick={() => {
                              handleClientToBeUpdated(data?.clientId);
                              handleDeleteClients(true);
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-main">{data["clientEmail"]}</p>
                      <p className="text-main">{data["clientPhonenumber"]}</p>
                      <p className="text-button text-sm font-bold">
                        {data["clientId"]}
                      </p>
                    </div>
                    <button
                      onClick={addPetComponentState}
                      className="w-28 text-xs bg-button font-bold rounded-full"
                    >
                      Add pet
                    </button>
                  </div>
                </div>
                {data["petsState"] ? (
                  <>
                    <div
                      onClick={() => {
                        handleClientToBeUpdated(data?.clientId);
                        handlePetsBelongedComponentState();
                      }}
                      className="flex items-center h-4 space-x-2"
                    >
                      <ArrowCircleDown size={32} className="text-button" />
                      <p className="text-sm text-main font-black opacity-50">
                        close pets section
                      </p>
                    </div>
                    <div className="grid min-[1400px]:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-y-6 grid-cols-1">
                      {data["pets"]?.map((petItem: any) => {
                        return (
                          <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col lg:space-x-6 md:space-x-6 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
                            <div className="flex items-center justify-center w-44 h-44 bg-slate-200 rounded-xl">
                              <img
                                className="w-8/12 h-8/12"
                                src={petItem["petProfilePhoto"]}
                                alt="pet icon"
                              />
                            </div>
                            <div className="flex flex-col justify-center space-y-6">
                              <div className="space-y-2">
                                <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl text-main font-black">
                                  {petItem["petName"]}
                                </p>
                                <p className="text-main">
                                  {petItem["petTreatmentState"]
                                    ? "Left at " + petItem["petLeftAt"]
                                    : petItem["petLeftAt"]}
                                </p>
                                <p className="text-white">
                                  {petItem["petTreatmentState"]
                                    ? "Leave at " + petItem["petLeaveAt"]
                                    : petItem["petLeaveAt"]}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  handlePetToBeUpdated(petItem["petId"]);
                                  handlePetTreatmentState();
                                }}
                                className="w-36 text-xs font-bold bg-button rounded-full"
                              >
                                {petItem["petTreatmentState"]
                                  ? "Check out"
                                  : "Check entry"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => {
                      handleClientToBeUpdated(data?.clientId);
                      handlePetsBelongedComponentState();
                    }}
                    className="flex items-center h-4 space-x-2"
                  >
                    <ArrowCircleRight size={32} className="text-button" />
                    <p className="text-sm text-main font-black opacity-50">
                      open pets sections
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </>
      ) : (
        <div className="h-96 flex flex-col justify-center items-center space-y-6 mr-6 max-[382px]:mr-4 lg:mr-14 md:mr-14 sm:mr-6">
          <MagnifyingGlass
            size={64}
            className="text-button animate-bounce"
            weight="bold"
          />
          <p className="text-3xl font-black text-main">Nothing found ...</p>
        </div>
      )}
    </div>
  );
}
