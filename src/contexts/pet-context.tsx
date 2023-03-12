import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ClientContext } from "./clients-context";

import pet from "/src/assets/dog-track.png";

interface petData {
  pets?: Array<{
    petName: string;
    petBreed: string;
    petAge: string;
    petOwnerId: number;
    petOwnerName: Array<string | undefined> | undefined;
    petLeftAt: string;
    petLeaveAt: number | string;
    petId: number;
    petTreatmentState: boolean;
    petProfilePhoto: string;
    petGender: string;
  }>;
  filteredPets?: any;
  handlePets: (
    petName: string,
    petBreed: string,
    petAge: string,
    petOwnerId: number,
    petGender: string
  ) => void;
  handleEditPets: (
    newPetName: string,
    newPetBreed: string,
    newPetAge: string,
    newPetGender: string,
    newPetOwnerId: number
  ) => void;
  handlePetToBeUpdated: (value: number | undefined) => void;
  petToBeUpdated?: number;
  handlePetTreatmentState: () => void;
  handleSearchedPets: (value: string) => void;
  handleDeletePets: (value: boolean) => void;
}

interface PetProps {
  children: ReactNode;
}

export const PetContext = createContext<petData>({
  handlePets() {},
  handleEditPets(value?) {},
  handlePetToBeUpdated(value) {},
  handlePetTreatmentState() {},
  handleSearchedPets(value) {},
  handleDeletePets(value) {},
});

export function PetProvider({ children }: PetProps) {
  const { clients, handlePetsBelongedToClient } = useContext(ClientContext);
  const [petToBeUpdated, setPetToBeUpdated] = useState<number | undefined>(0);
  const [petTreatmentState, setPetTreatmentState] = useState(false);
  const [petIcon, setPetIcon] = useState(pet);
  const [searchedPets, setSearchedPets] = useState("");
  const [filteredPets, setFilteredPets] = useState<any>();
  const [deletePetAction, setDeletePetAction] = useState<boolean | undefined>();
  const [pets, setPets] = useState<
    Array<{
      petName: string;
      petBreed: string;
      petAge: string;
      petOwnerId: number;
      petOwnerName: Array<string | undefined> | undefined;
      petId: number;
      petLeftAt: string;
      petLeaveAt: number | string;
      petTreatmentState: boolean;
      petProfilePhoto: string;
      petGender: string;
    }>
  >(() => {
    if (localStorage.getItem("pets") === null) {
      const seila: any = [];
      localStorage.setItem("pets", JSON.stringify(seila));
      return seila;
    } else {
      let petsLocal = JSON.parse(localStorage.getItem("pets")!);
      return petsLocal;
    }
  });

  function handlePetToBeUpdated(value: number | undefined) {
    setPetToBeUpdated(value);
  }

  function handleSearchedPets(value: string) {
    setSearchedPets(value);
  }

  function handlePets(
    petName: string,
    petBreed: string,
    petAge: string,
    petOwnerId: number,
    petGender: string
  ) {
    let petOwner = clients?.map((clientItem) => {
      if (clientItem?.clientId == petOwnerId) {
        return clientItem?.clientName;
      }
    });

    console.log(petOwner?.length);

    setPets([
      ...pets,
      {
        petName,
        petBreed,
        petGender,
        petAge,
        petOwnerId,
        petOwnerName: petOwner?.length != 0 ? petOwner : ["unknown"],
        petTreatmentState: false,
        petLeftAt: "entry not checked",
        petLeaveAt: "entry not checked",
        petId: Math.round(Math.random() * 1e9),
        petProfilePhoto: petIcon,
      },
    ]);
  }

  function handleEditPets(
    newPetName: string,
    newPetBreed: string,
    newPetAge: string,
    newPetGender: string,
    newPetOwnerId: number
  ) {
    setPets(
      pets.map((item) => {
        if (item.petId == petToBeUpdated) {
          return {
            ...item,
            petName: newPetName,
            petBreed: newPetBreed,
            petAge: newPetAge,
            petOwnerId: newPetOwnerId,
            petGender: newPetGender,
          };
        }
        return item;
      })
    );
  }

  function handleDeletePets(value?: boolean) {
    setDeletePetAction(value);
    setPets(pets.filter((petItem) => petItem["petId"] != petToBeUpdated));
  }

  function handlePetTreatmentState() {
    setPetTreatmentState(true);
  }

  function saveLocalPets() {
    localStorage.setItem("pets", JSON.stringify(pets));
  }

  useEffect(() => {
    let clientsWithPets = clients?.map((clientItem) => {
      let petsBelonged = pets.filter(
        (petItem) => petItem.petOwnerId == clientItem.clientId
      );
      return {
        ...clientItem,
        pets: petsBelonged,
      };
    });

    saveLocalPets();
    handlePetsBelongedToClient(clientsWithPets);
    setFilteredPets(pets);
    setPetToBeUpdated(0);
  }, [pets]);

  useEffect(() => {
    deletePetAction ? handleDeletePets() : null;
    petTreatmentState
      ? (setPets(
          pets.map((petItem: any) => {
            if (petItem["petId"] == petToBeUpdated) {
              return {
                ...petItem,
                petTreatmentState: !petItem["petTreatmentState"],
                petLeftAt: petItem["petTreatmentState"]
                  ? `entry not checked`
                  : `${String(new Date().getHours())}h and ${String(
                      new Date().getMinutes()
                    )}min`,
                petLeaveAt: petItem["petTreatmentState"]
                  ? `entry not checked`
                  : `${String(
                      new Date(
                        new Date().setHours(new Date().getHours() + 1)
                      ).getHours()
                    )}h and ${String(new Date().getMinutes())}min`,
              };
            }
            return petItem;
          })
        ),
        setPetTreatmentState(false))
      : null;
  }, [petToBeUpdated]);

  useEffect(() => {
    setFilteredPets(
      pets.filter((petItem) => {
        return Object.values(petItem)
          .join("")
          .toLowerCase()
          .includes(searchedPets.toLowerCase());
      })
    );
  }, [searchedPets]);

  return (
    <PetContext.Provider
      value={{
        pets,
        handlePets,
        handleEditPets,
        handlePetToBeUpdated,
        handlePetTreatmentState,
        petToBeUpdated,
        handleSearchedPets,
        filteredPets,
        handleDeletePets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
