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
    petLeftAt: Date | string;
    petLeaveAt: number | string;
    petId: number;
    petTreatmentState: boolean;
    petProfilePhoto: string;
  }>;
  filteredPets?: any;
  handlePets: () => void;
  handlePetName: (value: string) => void;
  handlePetBreed: (value: string) => void;
  handlePetAge: (value: string) => void;
  handlePetOwnerId: (value: number) => void;
  handlePetLeftAt: (value: Date) => void;
  handlePetLeaveAt: (value: number) => void;
  handlePetId: (value: number) => void;
  handleEditPets: (
    newPetName: string,
    newPetBreed: string,
    newPetAge: string,
    newPetOwnerId: number,
    newPetProfilePhoto: string
  ) => void;
  handlePetToBeUpdated: (value: number | undefined) => void;
  petToBeUpdated?: number;
  handlePetOwnerName: (value: string) => void;
  handlePetTreatmentState: () => void;
  handleSearchedPets: (value: string) => void;
  handleDeletePets: (value: boolean) => void;
}

interface PetProps {
  children: ReactNode;
}

export const PetContext = createContext<petData>({
  handlePetName(value) {},
  handlePetBreed(value) {},
  handlePetAge(value) {},
  handlePetOwnerId(value) {},
  handlePetLeftAt(value) {},
  handlePetLeaveAt(value) {},
  handlePetId(value) {},
  handlePets() {},
  handleEditPets(value?) {},
  handlePetToBeUpdated(value) {},
  handlePetOwnerName(value) {},
  handlePetTreatmentState() {},
  handleSearchedPets(value) {},
  handleDeletePets(value) {},
});

export function PetProvider({ children }: PetProps) {
  const { clients, handlePetsBelongedToClient } = useContext(ClientContext);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petOwnerId, setPetOwnerId] = useState(0);
  const [petId, setPetId] = useState(0);
  const [petLeftAt, setPetLeftAt] = useState<Date | string>();
  const [petLeaveAt, setPetLeaveAt] = useState(Date.now());
  const [petToBeUpdated, setPetToBeUpdated] = useState<number | undefined>(0);
  const [petOwnerName, setPetOwnerName] = useState("");
  const [petTreatmentState, setPetTreatmentState] = useState(false);
  const [petProfilePhoto, setPetProfilePhoto] = useState(pet);
  const [searchedPets, setSearchedPets] = useState("");
  const [filteredPets, setFilteredPets] = useState<any>();
  const [deletePetAction, setDeletePetAction] = useState<boolean | undefined>(
    false
  );
  const [pets, setPets] = useState<
    Array<{
      petName: string;
      petBreed: string;
      petAge: string;
      petOwnerId: number;
      petOwnerName: Array<string | undefined> | undefined;
      petId: number;
      petLeftAt: Date | string;
      petLeaveAt: number | string;
      petTreatmentState: boolean;
      petProfilePhoto: string;
    }>
  >(() => {
    if (localStorage.getItem("pets") === null) {
      const seila: any = [];
      localStorage.setItem("pets", JSON.stringify(seila));
      return seila;
    } else {
      let petsLocal = JSON.parse(localStorage.getItem("pets") || "[{}]");
      return petsLocal;
    }
  });

  function handlePetName(value: string) {
    setPetName(value);
  }
  function handlePetBreed(value: string) {
    setPetBreed(value);
  }
  function handlePetAge(value: string) {
    setPetAge(value);
  }
  function handlePetOwnerId(value: number) {
    setPetOwnerId(value);
  }
  function handlePetId(value: number) {
    setPetId(value);
  }
  function handlePetLeftAt(value: Date) {
    setPetLeftAt(value);
  }

  function handlePetLeaveAt(value: number) {
    setPetLeaveAt(value);
  }

  function handlePetToBeUpdated(value: number | undefined) {
    setPetToBeUpdated(value);
  }

  function handlePetOwnerName(value: string) {
    setPetOwnerName(value);
  }

  function handlePetProfilePhoto(value: string) {
    setPetProfilePhoto(petProfilePhoto);
  }

  function handleSearchedPets(value: string) {
    setSearchedPets(value);
  }

  function handlePets() {
    let petOwner = clients?.map((clientItem) => {
      if (clientItem?.clientId === petOwnerId) {
        return clientItem?.clientName;
      }
    });
    setPets([
      ...pets,
      {
        petName,
        petBreed,
        petAge,
        petOwnerId,
        petOwnerName: petOwner,
        petTreatmentState: false,
        petLeftAt: petTreatmentState ? new Date() : "entry not checked",
        petLeaveAt: petTreatmentState
          ? new Date().setHours(new Date().getHours() + 1)
          : "entry not checked",
        petId: Math.round(Math.random() * 1e9),
        petProfilePhoto,
      },
    ]);
    setPetName("");
    setPetBreed("");
    setPetAge("");
    setPetOwnerId(0);
    setPetOwnerName("");
  }

  function handleEditPets(
    newPetName: string,
    newPetBreed: string,
    newPetAge: string,
    newPetOwnerId: number,
    newPetProfilePhoto: string
  ) {
    setPets(
      pets.map((item) => {
        if (item.petId === petToBeUpdated) {
          return {
            ...item,
            petName: newPetName,
            petBreed: newPetBreed,
            petAge: newPetAge,
            petOwnerId: newPetOwnerId,
            petProfilePhoto: newPetProfilePhoto,
          };
        }
        return item;
      })
    );
  }

  function handleDeletePets(value?: boolean) {
    setDeletePetAction(value);
    setPets(pets.filter((petItem) => petItem["petId"] !== petToBeUpdated));
  }

  function handlePetTreatmentState() {
    setPetTreatmentState(!petTreatmentState);
  }

  function saveLocalPets() {
    localStorage.setItem("pets", JSON.stringify(pets));
  }

  useEffect(() => {
    let clientsWithPets = clients?.map((clientItem) => {
      let petsBelonged = pets.filter(
        (petItem) => petItem.petOwnerId === clientItem.clientId
      );
      return {
        ...clientItem,
        pets: petsBelonged,
      };
    });

    saveLocalPets();
    handlePetsBelongedToClient(clientsWithPets);
    setFilteredPets(pets);
  }, [pets]);

  useEffect(() => {
    setPets(
      pets.map((petItem) => {
        if (petItem.petId === petToBeUpdated) {
          return {
            ...petItem,
            petTreatmentState: petTreatmentState,
            petLeftAt: petTreatmentState ? new Date() : "entry not checked",
            petLeaveAt: petTreatmentState
              ? new Date().setHours(new Date().getHours() + 1)
              : "entry not checked",
          };
        }
        return petItem;
      })
    );
  }, [petTreatmentState]);

  useEffect(() => {
    deletePetAction ? handleDeletePets() : null;
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
        handlePetName,
        handlePetBreed,
        handlePetAge,
        handlePetOwnerId,
        handlePetLeftAt,
        handlePetLeaveAt,
        handlePetId,
        handleEditPets,
        handlePetToBeUpdated,
        handlePetTreatmentState,
        petToBeUpdated,
        handlePetOwnerName,
        handleSearchedPets,
        filteredPets,
        handleDeletePets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
