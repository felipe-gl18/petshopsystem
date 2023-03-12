import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PetContext } from "./pet-context";

import clientImage from "/src/assets/user.png";

interface ClientData {
  clients?: Array<{
    clientName: string;
    clientEmail: string;
    clientPhoneNumber: string;
    clientId: number | undefined;
    clientAddress: string;
    petsState: boolean;
    pets?: Array<{
      petName: string;
      petBreed: string;
      petAge: number;
      petOwnerId: number;
      petOwnerName: string;
      petLeftAt: Date | string;
      petLeaveAt: number | string;
      petId: number;
      petTreatmentState: boolean;
      petProfilePhoto: string;
    }>;
    clientProfilePhoto: string;
  }>;
  filterdClients?: any;
  handleClientId: (value: number) => void;
  handleEditClients: (
    newClientName: string,
    newClientEmail: string,
    newClientPhonenumber: string,
    newClientAddress: string
  ) => void;
  clientToBeUpdated?: number;
  handleClientToBeUpdated: (value: number | undefined) => void;
  handleClients: (
    clientName: string,
    clientEmail: string,
    clientPhoneNumber: string,
    clientAddress: string
  ) => void;
  handlePetsBelongedToClient: (value: any) => void;
  handlePetsBelongedComponentState: () => void;
  handleClientProfilePhoto: (value: string) => void;
  handleSearchedClients: (value: string) => void;
  handleDeleteClients: (value?: boolean) => void;
}
interface ClientProps {
  children: ReactNode;
}

export const ClientContext = createContext<ClientData>({
  handleClientId(value) {},
  handleEditClients(value?) {},
  handleClientToBeUpdated(value?) {},
  handleClients() {},
  handlePetsBelongedToClient(value) {},
  handlePetsBelongedComponentState() {},
  handleClientProfilePhoto(value) {},
  handleSearchedClients(value) {},
  handleDeleteClients(value) {},
});

export function ClientProvider({ children }: ClientProps) {
  const [clientProfilePhoto, setClientProfilePhoto] = useState(clientImage);
  const [searchedClients, setSearchedClients] = useState("");
  const [filterdClients, setFilteredClients] = useState<any>();
  const [clientId, setClientId] = useState(0);
  const [deleteClientAction, setDeleteClientAction] = useState<
    boolean | undefined
  >(false);
  const [petsBelongedComponentState, setPetsBelongedComponentState] =
    useState<boolean>(false);
  const [pets, setPets] = useState<
    Array<{
      petName: string;
      petBreed: string;
      petAge: number;
      petOwnerId: number;
      petOwnerName: string;
      petLeftAt: Date | string;
      petLeaveAt: number | string;
      petId: number;
      petTreatmentState: boolean;
      petProfilePhoto: string;
    }>
  >([]);
  const [clientToBeUpdated, setClientToBeUpdated] = useState<
    number | undefined
  >(0);
  const [test, setTest] = useState<any>();
  const [clients, setClients] = useState<
    Array<{
      clientName: string;
      clientEmail: string;
      clientPhoneNumber: string;
      clientId: number;
      clientAddress: string;
      petsState: boolean;
      pets?: Array<{
        petName: string;
        petBreed: string;
        petAge: number;
        petOwnerId: number;
        petOwnerName: string;
        petLeftAt: Date | string;
        petLeaveAt: number | string;
        petId: number;
        petTreatmentState: boolean;
        petProfilePhoto: string;
      }>;
      clientProfilePhoto: string;
    }>
  >(() => {
    if (localStorage.getItem("clients") === null) {
      const seila: any = [];
      localStorage.setItem("clients", JSON.stringify(seila));
      return seila;
    } else {
      let clientsLocal = JSON.parse(localStorage.getItem("clients")!);
      return clientsLocal;
    }
  });

  function handleClientId(value: number) {
    setClientId(value);
  }

  function handleClientToBeUpdated(value: number | undefined) {
    setClientToBeUpdated(value);
  }

  function handleClientProfilePhoto(value: string) {
    setClientProfilePhoto(value);
  }

  function handleSearchedClients(value: string) {
    setSearchedClients(value);
  }

  function handleClients(
    clientName: string,
    clientEmail: string,
    clientPhoneNumber: string,
    clientAddress: string
  ) {
    setClients([
      ...clients,
      {
        clientName,
        clientEmail,
        clientPhoneNumber,
        clientAddress,
        petsState: false,
        clientProfilePhoto,
        clientId: Math.round(Math.random() * 1e9),
      },
    ]);
  }

  function handleEditClients(
    newClientName: string,
    newClientEmail: string,
    newClientPhoneNumber: string,
    newClientAddress: string
  ) {
    setClients(
      clients.map((clientItem) => {
        if (clientItem["clientId"] === clientToBeUpdated) {
          return {
            ...clientItem,
            clientName: newClientName || "undefined",
            clientEmail: newClientEmail || "undefined",
            clientPhoneNumber: newClientPhoneNumber || "undefined",
            clientAddress: newClientAddress || "undefined",
          };
        }
        return clientItem;
      })
    );
  }

  function handleDeleteClients(value?: boolean) {
    setDeleteClientAction(value);
    setClients(
      clients.filter(
        (clientItem) => clientItem["clientId"] !== clientToBeUpdated
      )
    );
  }

  function handlePetsBelongedToClient(value: any) {
    setClients(value);
  }

  function handlePetsBelongedComponentState() {
    setPetsBelongedComponentState(!petsBelongedComponentState);
  }

  function saveLocalClients() {
    localStorage.setItem("clients", JSON.stringify(clients));
  }

  useEffect(() => {
    saveLocalClients();
    setFilteredClients(clients);
  }, [clients]);

  useEffect(() => {
    setClients(
      clients.map((clientItem) => {
        if (clientItem["clientId"] === clientToBeUpdated) {
          return {
            ...clientItem,
            petsState: petsBelongedComponentState,
          };
        }
        return clientItem;
      })
    );
  }, [petsBelongedComponentState]);

  useEffect(() => {
    deleteClientAction ? handleDeleteClients() : null;
  }, [clientToBeUpdated]);

  useEffect(() => {
    setFilteredClients(
      clients.filter((clientItem) => {
        return Object.values(clientItem)
          .join("")
          .toLowerCase()
          .includes(searchedClients.toLowerCase());
      })
    );
  }, [searchedClients]);

  return (
    <ClientContext.Provider
      value={{
        clients,
        handleClients,
        handleClientId,
        handleEditClients,
        handleClientToBeUpdated,
        clientToBeUpdated,
        handlePetsBelongedToClient,
        handlePetsBelongedComponentState,
        handleClientProfilePhoto,
        handleSearchedClients,
        filterdClients,
        handleDeleteClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
