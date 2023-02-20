import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ClientContext } from "./clients-context";

import cat from "/src/assets/dog-track.png";

interface CatData {
  cats?: Array<{
    catName: string;
    catBreed: string;
    catAge: string;
    catOwnerId: number;
    catOwnerName: Array<string | undefined> | undefined;
    catLeftAt: Date;
    catLeaveAt: number;
    catId: number;
    catTreatmentState: boolean;
    catProfilePhoto: string;
  }>;
  filteredCats?: any;
  handleCats: () => void;
  handleCatName: (value: string) => void;
  handleCatBreed: (value: string) => void;
  handleCatAge: (value: string) => void;
  handleCatOwnerId: (value: number) => void;
  handleCatLeftAt: (value: Date) => void;
  handleCatLeaveAt: (value: number) => void;
  handleCatId: (value: number) => void;
  handleEditCats: (
    newCatName: string,
    newCatBreed: string,
    newCatAge: string,
    newCatOwnerId: number,
    newCatProfilePhoto: string
  ) => void;
  handleCatToBeUpdated: (value: number | undefined) => void;
  catToBeUpdated?: number;
  handleCatOwnerName: (value: string) => void;
  handleCatTreatmentState: () => void;
  handleSearchedCats: (value: string) => void;
  handleDeleteCats: (value: boolean) => void;
}

interface CatProps {
  children: ReactNode;
}

export const CatContext = createContext<CatData>({
  handleCatName(value) {},
  handleCatBreed(value) {},
  handleCatAge(value) {},
  handleCatOwnerId(value) {},
  handleCatLeftAt(value) {},
  handleCatLeaveAt(value) {},
  handleCatId(value) {},
  handleCats() {},
  handleEditCats(value?) {},
  handleCatToBeUpdated(value) {},
  handleCatOwnerName(value) {},
  handleCatTreatmentState() {},
  handleSearchedCats(value) {},
  handleDeleteCats(value) {},
});

export function CatProvider({ children }: CatProps) {
  const { clients, handleCatsBelongedToClient } = useContext(ClientContext);
  const [catName, setCatName] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [catAge, setCatAge] = useState("");
  const [catOwnerId, setCatOwnerId] = useState(0);
  const [catId, setCatId] = useState(0);
  const [catLeftAt, setCatLeftAt] = useState<Date>();
  const [catLeaveAt, setCatLeaveAt] = useState(Date.now());
  const [catToBeUpdated, setCatToBeUpdated] = useState<number | undefined>(0);
  const [catOwnerName, setCatOwnerName] = useState("");
  const [catTreatmentState, setCatTreatmentState] = useState(false);
  const [catProfilePhoto, setCatProfilePhoto] = useState(cat);
  const [searchedCats, setSearchedCats] = useState("");
  const [filteredCats, setFilteredCats] = useState<any>();
  const [deleteCatAction, setDeleteCatAction] = useState<boolean | undefined>(
    false
  );
  const [cats, setCats] = useState<
    Array<{
      catName: string;
      catBreed: string;
      catAge: string;
      catOwnerId: number;
      catOwnerName: Array<string | undefined> | undefined;
      catId: number;
      catLeftAt: Date;
      catLeaveAt: number;
      catTreatmentState: boolean;
      catProfilePhoto: string;
    }>
  >(() => {
    if (localStorage.getItem("cats") === null) {
      const seila: any = [];
      localStorage.setItem("cats", JSON.stringify(seila));
      return seila;
    } else {
      let catsLocal = JSON.parse(localStorage.getItem("cats") || "[{}]");
      return catsLocal;
    }
  });

  function handleCatName(value: string) {
    setCatName(value);
  }
  function handleCatBreed(value: string) {
    setCatBreed(value);
  }
  function handleCatAge(value: string) {
    setCatAge(value);
  }
  function handleCatOwnerId(value: number) {
    setCatOwnerId(value);
  }
  function handleCatId(value: number) {
    setCatId(value);
  }
  function handleCatLeftAt(value: Date) {
    setCatLeftAt(value);
  }

  function handleCatLeaveAt(value: number) {
    setCatLeaveAt(value);
  }

  function handleCatToBeUpdated(value: number | undefined) {
    setCatToBeUpdated(value);
  }

  function handleCatOwnerName(value: string) {
    setCatOwnerName(value);
  }

  function handleCatProfilePhoto(value: string) {
    setCatProfilePhoto(catProfilePhoto);
  }

  function handleSearchedCats(value: string) {
    setSearchedCats(value);
  }

  function handleCats() {
    let catOwner = clients?.map((clientItem) => {
      if (clientItem?.clientId === catOwnerId) {
        return clientItem?.clientName;
      }
    });
    setCats([
      ...cats,
      {
        catName,
        catBreed,
        catAge,
        catOwnerId,
        catOwnerName: catOwner,
        catTreatmentState: false,
        catLeftAt: new Date(),
        catLeaveAt: new Date().setHours(new Date().getHours() + 1),
        catId: Math.round(Math.random() * 1e9),
        catProfilePhoto,
      },
    ]);
    setCatName("");
    setCatBreed("");
    setCatAge("");
    setCatOwnerId(0);
    setCatOwnerName("");
  }

  function handleEditCats(
    newCatName: string,
    newCatBreed: string,
    newCatAge: string,
    newCatOwnerId: number,
    newCatProfilePhoto: string
  ) {
    setCats(
      cats.map((item) => {
        if (item.catId === catToBeUpdated) {
          return {
            ...item,
            catName: newCatName,
            catBreed: newCatBreed,
            catAge: newCatAge,
            catOwnerId: newCatOwnerId,
            catProfilePhoto: newCatProfilePhoto,
          };
        }
        return item;
      })
    );
  }

  function handleDeleteCats(value?: boolean) {
    setDeleteCatAction(value);
    setCats(cats.filter((catItem) => catItem["catId"] !== catToBeUpdated));
  }

  function handleCatTreatmentState() {
    setCatTreatmentState(!catTreatmentState);
  }

  function saveLocalCats() {
    localStorage.setItem("cats", JSON.stringify(cats));
  }

  useEffect(() => {
    let clientsWithCats = clients?.map((clientItem) => {
      let catsBelonged = cats.filter(
        (catItem) => catItem.catOwnerId === clientItem.clientId
      );
      return {
        ...clientItem,
        cats: catsBelonged,
      };
    });

    saveLocalCats();
    handleCatsBelongedToClient(clientsWithCats);
    setFilteredCats(cats);
  }, [cats]);

  useEffect(() => {
    setCats(
      cats.map((catItem) => {
        if (catItem.catId === catToBeUpdated) {
          return {
            ...catItem,
            catTreatmentState: catTreatmentState,
          };
        }
        return catItem;
      })
    );
  }, [catTreatmentState]);

  useEffect(() => {
    deleteCatAction ? handleDeleteCats() : null;
  }, [catToBeUpdated]);

  useEffect(() => {
    setFilteredCats(
      cats.filter((catItem) => {
        return Object.values(catItem)
          .join("")
          .toLowerCase()
          .includes(searchedCats.toLowerCase());
      })
    );
  }, [searchedCats]);

  return (
    <CatContext.Provider
      value={{
        cats,
        handleCats,
        handleCatName,
        handleCatBreed,
        handleCatAge,
        handleCatOwnerId,
        handleCatLeftAt,
        handleCatLeaveAt,
        handleCatId,
        handleEditCats,
        handleCatToBeUpdated,
        handleCatTreatmentState,
        catToBeUpdated,
        handleCatOwnerName,
        handleSearchedCats,
        filteredCats,
        handleDeleteCats,
      }}
    >
      {children}
    </CatContext.Provider>
  );
}
