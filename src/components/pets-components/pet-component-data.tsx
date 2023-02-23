import { MagnifyingGlass, Pen, Trash } from "phosphor-react";
import { useContext } from "react";
import { PetContext } from "../../contexts/pet-context";

interface PetMainProps {
  editPetComponentState: () => void;
}

export function PetComponentData({ editPetComponentState }: PetMainProps) {
  const {
    filteredPets,
    handlePetToBeUpdated,
    handlePetTreatmentState,
    handleDeletePets,
  } = useContext(PetContext);

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 min-[490px]:grid-cols-1 min-[320px]:grid-cols-1 grid-cols-2 lg:gap-x-8 gap-y-12 md:gap-y-12 sm:gap-y-12 ml-14 max-[382px]:ml-4 lg:ml-14 md:ml-14 sm:ml-6 mt-16 max-[382px]:mt-9">
      {filteredPets?.length ? (
        <>
          {filteredPets?.map((data: any) => {
            return (
              <>
                <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-12 sm:space-x-12">
                  <div className="flex items-center justify-center w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-slate-200 rounded-xl">
                    <img
                      className="w-7/12 h-7/12"
                      src={data["petProfilePhoto"]}
                      alt="pet icon"
                    />
                  </div>
                  <div className="space-y-6 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div className="text-main text-3xl lg:text-xl md:text-3xl sm:text-3xl font-black flex items-center space-x-20">
                        <p>{data["petName"]}</p>
                        <div className="flex space-x-4">
                          <Pen
                            size={32}
                            onClick={() => {
                              editPetComponentState();
                              handlePetToBeUpdated(data?.petId);
                            }}
                          />
                          <Trash
                            size={32}
                            onClick={() => {
                              handleDeletePets(true);
                              handlePetToBeUpdated(data?.petId);
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-main">{data["petOwnerName"]}</p>
                      <p className="text-main lg:flex md:flex sm:flex">
                        {data["petTreatmentState"]
                          ? "Left at" +
                            " " +
                            String(new Date(data["petLeftAt"]).getHours()) +
                            "h" +
                            " " +
                            "and" +
                            " " +
                            String(new Date(data["petLeftAt"]).getMinutes()) +
                            "min"
                          : data["petLeftAt"]}
                      </p>
                      <p className="text-white lg:flex md:flex sm:flex">
                        {data["petTreatmentState"]
                          ? "Leave at" +
                            " " +
                            String(new Date(data["petLeaveAt"]).getHours()) +
                            "h" +
                            " " +
                            "and" +
                            " " +
                            String(new Date(data["petLeaveAt"]).getMinutes()) +
                            "min"
                          : data["petLeaveAt"]}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handlePetToBeUpdated(data.petId);
                        handlePetTreatmentState();
                      }}
                      className="w-36 text-xs bg-button font-bold rounded-full"
                    >
                      {data["petTreatmentState"] ? "Check out" : "Check entry"}
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <div className="absolute w-9/12 h-96 flex flex-col justify-center items-center space-y-6 mr-14">
          <MagnifyingGlass
            size={64}
            className="text-button animate-bounce"
            weight="bold"
          />
          <p className="text-3xl font-black text-main">Nothing founded ...</p>
        </div>
      )}
    </div>
  );
}
