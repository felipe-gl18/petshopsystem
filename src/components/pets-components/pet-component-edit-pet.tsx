import { FileArrowUp, XCircle } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data: any) => {
    editPetComponentState();
    handleEditPets(
      newPetName || "undefined",
      newPetBreed || "undefined",
      newPetAge || "undefined",
      newPetOwnerId || 0
    );
  };

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
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex lg:space-x-32 md:space-x-32 sm:space-x-7 space-x-7">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Pet name</p>
                  <div className="w-44 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                    <input
                      {...register("petName", {
                        required: "This is required",
                        minLength: {
                          value: 3,
                          message: "Min length is 3",
                        },
                        maxLength: {
                          value: 10,
                          message: "Max length is 10",
                        },
                      })}
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      placeholder="eg: Jerry"
                      onChange={handleNewPetName}
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petName?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Breed</p>
                  <div className="w-48 h-9 flex border-0 bg-main bg-opacity-30 items-center pl-6 space-x-4 rounded-md">
                    <input
                      {...register("petBreed", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Min length is 4",
                        },
                        maxLength: {
                          value: 14,
                          message: "Max length is 14",
                        },
                      })}
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      placeholder="eg: Angorá"
                      onChange={handleNewPetBreed}
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petBreed?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Age</p>
                  <div className="w-32 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                    <input
                      {...register("petAge", {
                        required: "This is required",
                        minLength: {
                          value: 1,
                          message: "please, put a valid age",
                        },
                        maxLength: {
                          value: 3,
                          message: "please, put a valid age",
                        },
                      })}
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      placeholder="eg: 1.8"
                      onChange={handleNewPetAge}
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petAge?.message || "")}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Owner id</p>
                  <div className="lg:w-36 md:w-36 sm:w-24 w-20 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                    <input
                      {...register("petOwnerId", {
                        required: "This is required",
                        minLength: {
                          value: 5,
                          message: "Min length is 5",
                        },
                        maxLength: {
                          value: 16,
                          message: "Max length is 16",
                        },
                      })}
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      placeholder="eg: 10290182"
                      onChange={handleNewPetOwnerId}
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petOwnerId?.message || "")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end pr-9">
              <input
                type="submit"
                className="flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full"
                value="Edit cat"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
