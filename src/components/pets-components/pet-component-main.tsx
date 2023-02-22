import { PetComponentData } from "./pet-component-data";
import { PetComponentSearchAndAddPet } from "./pet-component-search-and-add-pet";

interface PetMainProps {
  editPetComponentState: () => void;
  addPetComponentState: () => void;
}

export function PetComponentMain({
  editPetComponentState,
  addPetComponentState,
}: PetMainProps) {
  return (
    <div className="lg:w-10/12 md:w-10/12 sm:w-11/12 w-11/12 h-5/6 py-16 overflow-auto bg-main bg-opacity-10 rounded-2xl flex flex-col">
      <PetComponentSearchAndAddPet
        addPetComponentState={addPetComponentState}
      />
      <PetComponentData editPetComponentState={editPetComponentState} />
    </div>
  );
}
