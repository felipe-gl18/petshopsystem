import { FileArrowUp, XCircle } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { PetContext } from "../../contexts/pet-context";

interface PetEditComponentProps {
  editPetComponentState: () => void;
}

export function PetComponentEditPet({
  editPetComponentState,
}: PetEditComponentProps) {
  const { handleEditPets, pets, petToBeUpdated } = useContext(PetContext);
  const [newPetName, setNewPetName] = useState<string>();
  const [newPetBreed, setNewPetBreed] = useState<string>();
  const [newPetAge, setNewPetAge] = useState<string>();
  const [newPetOwnerId, setNewPetOwnerId] = useState<number>();
  const [petSelected, setPetSelected] = useState<any>();

  function handleNewPetName(event: FormEvent<HTMLInputElement>) {
    setNewPetName(event?.currentTarget?.value);
  }

  function handleNewPetBreed(event: FormEvent<HTMLInputElement>) {
    setNewPetBreed(event?.currentTarget?.value);
  }

  function handleNewPetAge(event: FormEvent<HTMLInputElement>) {
    setNewPetAge(event?.currentTarget?.value);
  }

  function handleNewPetOwnerId(event: FormEvent<HTMLInputElement>) {
    setNewPetOwnerId(Number(event?.currentTarget?.value));
  }

  useEffect(() => {
    setPetSelected(
      pets?.filter((petItem) => petItem["petId"] === petToBeUpdated)
    );
  }, []);

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-max md:h-5/6 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={editPetComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col lg:items-center space-y-6 lg:space-x-9">
          {petSelected?.map((petItem: any) => {
            return (
              <>
                <div className="flex items-center justify-center lg:w-52 md:w-52 sm:w-44 w-44 lg:h-52 md:h-52 sm:h-44 h-44 bg-slate-200 rounded-xl">
                  <img
                    className="w-8/12 h-8/12"
                    src={petItem["petProfilePhoto"]}
                    alt="pet icon"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <p className="lg:text-3xl md:text-3xl sm:text-xl text-xl text-main font-black">
                      {petItem["petName"]}
                    </p>
                    <p className="text-sm text-button font-extrabold">
                      {petItem["petId"]}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg text-main">
                      {petItem["petOwnerName"]}
                    </p>
                    <p className="text-sm text-button font-extrabold">
                      {petItem["petOwnerId"]}
                    </p>
                  </div>
                  <div>
                    <p className="text-main lg:flex md:flex sm:flex">
                      {petItem["petTreatmentState"]
                        ? "Left at" +
                          " " +
                          String(new Date(petItem["petLeftAt"]).getHours()) +
                          "h" +
                          " " +
                          "and" +
                          " " +
                          String(new Date(petItem["petLeftAt"]).getMinutes()) +
                          "min"
                        : petItem["petLeftAt"]}
                    </p>
                    <p className="text-white lg:flex md:flex sm:flex">
                      {petItem["petTreatmentState"]
                        ? "Leave at" +
                          " " +
                          String(new Date(petItem["petLeaveAt"]).getHours()) +
                          "h" +
                          " " +
                          "and" +
                          " " +
                          String(new Date(petItem["petLeaveAt"]).getMinutes()) +
                          "min"
                        : petItem["petLeaveAt"]}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="space-y-8 py-9">
          <div>
            <div className="flex lg:space-x-32 md:space-x-32 sm:space-x-7 space-x-7">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Pet name</p>
                  <div className="w-44 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: Jerry"
                      onChange={handleNewPetName}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Breed</p>
                  <div className="w-48 h-9 flex border-2 border-button items-center pl-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: Angorá"
                      onChange={handleNewPetBreed}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Age</p>
                  <div className="w-32 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: 1.8"
                      onChange={handleNewPetAge}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Owner id</p>
                  <div className="lg:w-36 md:w-36 sm:w-24 w-20 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: 10290182"
                      onChange={handleNewPetOwnerId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-9">
            <button
              onClick={() => {
                handleEditPets(
                  newPetName || "err",
                  newPetBreed || "err",
                  newPetAge || "err",
                  newPetOwnerId || 0
                );
                editPetComponentState();
              }}
              className="flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full"
            >
              Edit pet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
