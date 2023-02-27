import { Cat, FileArrowUp, Key, XCircle } from "phosphor-react";
import { FormEvent, useContext } from "react";
import { PetContext } from "../../contexts/pet-context";
import { useForm } from "react-hook-form";

interface PetComponentAddPetProps {
  addPetComponentState: () => void;
}

export function PetComponentAddPet({
  addPetComponentState,
}: PetComponentAddPetProps) {
  const { handlePets } = useContext(PetContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data: any) => {
    addPetComponentState();
    handlePets(
      data.petName,
      data.petBreed,
      data.petAge,
      data.petOwnerId,
      data.petGender
    );
  };

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-4/12 md:w-9/12 sm:w-9/12 w-11/12 lg:h-4/5 md:h-4/5 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6 space-y-8 pb-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={addPetComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-12">
            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-8 md:space-x-8 sm:space-y-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Pet name</p>
                  <div className="lg:w-80 md:w-80 sm:w-64 w-52 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                    <Cat size={20} />
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
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petName?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Breed</p>
                  <div className="lg:w-80 md:w-80 sm:w-60 w-52 h-9 flex border-0 bg-main bg-opacity-30 items-center pl-6 space-x-4 rounded-md">
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
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petBreed?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Age</p>
                  <div className="lg:w-80 md:w-80 sm:w-32 w-48 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
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
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petAge?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Owner Id</p>
                  <div className="lg:w-80 md:w-80 sm:w-52 w-48 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                    <Key size={20} />
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
                      placeholder="eg: 19283298"
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petOwnerId?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Gender</p>
                  <div className="lg:w-80 md:w-80 sm:w-60 w-52 h-9 flex border-0 bg-main bg-opacity-30 items-center pl-6 space-x-4 rounded-md">
                    <select
                      {...register("petGender", {
                        required: "This is required",
                      })}
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      placeholder="eg: Angorá"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.petGender?.message || "")}
                  </p>
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Create client"
              className="flex items-center justify-center w-40 h-9 text-lg font-bold bg-button rounded-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
