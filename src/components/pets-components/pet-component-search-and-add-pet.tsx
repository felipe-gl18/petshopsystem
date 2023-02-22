import { MagnifyingGlass, Plus } from "phosphor-react";
import { FormEvent, useContext } from "react";
import { PetContext } from "../../contexts/pet-context";

interface PetComponentSearchAndAddPetProps {
  addPetComponentState: () => void;
}

export function PetComponentSearchAndAddPet({
  addPetComponentState,
}: PetComponentSearchAndAddPetProps) {
  const { handleSearchedPets } = useContext(PetContext);
  return (
    <div className="w-full flex max-[382px]:flex-col max-[382px]:space-y-5 justify-between px-4 lg:px-16 md:px-6 sm:px-4">
      <div className="w-64 max-[382px]:w-full h-12 flex border border-white items-center px-6 space-x-4 rounded-md">
        <input
          className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
          type="text"
          name=""
          id=""
          placeholder="Search pet's name"
          onChange={(e: FormEvent<HTMLInputElement>) => {
            handleSearchedPets(e.currentTarget.value);
          }}
        />
        <MagnifyingGlass size={32} color="#A69586" />
      </div>
      <button
        onClick={addPetComponentState}
        className="bg-button-second max-[382px]:w-14 text-main font-bold border-0 w-42 h-12 flex items-center justify-center lg:space-x-3 md:space-x-4 sm:space-x-4 space-x-0 rounded-md"
      >
        <p className="lg:flex md:flex sm:flex hidden">Add pet</p>
        <Plus size={22} />
      </button>
    </div>
  );
}
