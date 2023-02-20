import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CatContext } from "./cat-context";

import clientImage from "/src/assets/user.png";

interface ClientData {
  clients?: Array<{
    clientName: string;
    clientEmail: string;
    clientPhonenumber: string;
    clientId: number | undefined;
    catsState: boolean;
    cats?: Array<{
      catName: string;
      catBreed: string;
      catAge: number;
      catOwnerId: number;
      catOwnerName: string;
      catLeftAt: Date;
      catLeaveAt: number;
      catId: number;
      catTreatmentState: boolean;
      catProfilePhoto: string;
    }>;
    clientProfilePhoto: string;
  }>;
  filterdClients?: any;
  handleClientName: (value: string) => void;
  handleClientEmail: (value: string) => void;
  handleClientPhonenumber: (value: string) => void;
  handleClientId: (value: number) => void;
  handleEditClients: (
    newClientName: string,
    newClientEmail: string,
    newClientPhonenumber: string,
    newClientProfilePhoto: string
  ) => void;
  clientToBeUpdated?: number;
  handleClientToBeUpdated: (value: number | undefined) => void;
  handleClients: () => void;
  handleCatsBelongedToClient: (value: any) => void;
  handleCatsBelongedComponentState: () => void;
  handleClientProfilePhoto: (value: string) => void;
  handleSearchedClients: (value: string) => void;
  handleDeleteClients: (value?: boolean) => void;
}
interface ClientProps {
  children: ReactNode;
}

export const ClientContext = createContext<ClientData>({
  handleClientName(value) {},
  handleClientEmail(value) {},
  handleClientPhonenumber(value) {},
  handleClientId(value) {},
  handleEditClients(value?) {},
  handleClientToBeUpdated(value?) {},
  handleClients() {},
  handleCatsBelongedToClient(value) {},
  handleCatsBelongedComponentState() {},
  handleClientProfilePhoto(value) {},
  handleSearchedClients(value) {},
  handleDeleteClients(value) {},
});

export function ClientProvider({ children }: ClientProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhonenumber, setClientPhonenumber] = useState("");
  const [clientProfilePhoto, setClientProfilePhoto] = useState(clientImage);
  const [searchedClients, setSearchedClients] = useState("");
  const [filterdClients, setFilteredClients] = useState<any>();
  const [clientId, setClientId] = useState(0);
  const [deleteClientAction, setDeleteClientAction] = useState<
    boolean | undefined
  >(false);
  const [catsBelongedComponentState, setCatsBelongedComponentState] =
    useState<boolean>(false);
  const [cats, setCats] = useState<
    Array<{
      catName: string;
      catBreed: string;
      catAge: number;
      catOwnerId: number;
      catOwnerName: string;
      catLeftAt: Date;
      catLeaveAt: number;
      catId: number;
      catTreatmentState: boolean;
      catProfilePhoto: string;
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
      clientPhonenumber: string;
      clientId: number;
      catsState: boolean;
      cats?: Array<{
        catName: string;
        catBreed: string;
        catAge: number;
        catOwnerId: number;
        catOwnerName: string;
        catLeftAt: Date;
        catLeaveAt: number;
        catId: number;
        catTreatmentState: boolean;
        catProfilePhoto: string;
      }>;
      clientProfilePhoto: string;
    }>
  >(() => {
    if (localStorage.getItem("clients") === null) {
      const seila: any = [];
      localStorage.setItem("clients", JSON.stringify(seila));
      return seila;
    } else {
      let clientsLocal = JSON.parse(localStorage.getItem("clients") || "[{}]");
      return clientsLocal;
    }
  });

  function handleClientName(value: string) {
    setClientName(value);
  }

  function handleClientEmail(value: string) {
    setClientEmail(value);
  }

  function handleClientPhonenumber(value: string) {
    setClientPhonenumber(value);
  }

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

  function handleClients() {
    setClients([
      ...clients,
      {
        clientName,
        clientEmail,
        clientPhonenumber,
        catsState: false,
        clientProfilePhoto,
        clientId: Math.round(Math.random() * 1e9),
      },
    ]);
  }

  function handleEditClients(
    newClientName: string,
    newClientEmail: string,
    newClientPhonenumber: string,
    newClientProfilePhoto: string
  ) {
    setClients(
      clients.map((clientItem) => {
        if (clientItem["clientId"] === clientToBeUpdated) {
          return {
            ...clientItem,
            clientName: newClientName || "undefined",
            clientEmail: newClientEmail || "undefined",
            clientPhonenumber: newClientPhonenumber || "undefined",
            clientProfilePhoto: newClientProfilePhoto || "undefined",
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

  function handleCatsBelongedToClient(value: any) {
    setClients(value);
  }

  function handleCatsBelongedComponentState() {
    setCatsBelongedComponentState(!catsBelongedComponentState);
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
            catsState: catsBelongedComponentState,
          };
        }
        return clientItem;
      })
    );
  }, [catsBelongedComponentState]);

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
        handleClientName,
        handleClientEmail,
        handleClientPhonenumber,
        handleClientId,
        handleEditClients,
        handleClientToBeUpdated,
        clientToBeUpdated,
        handleCatsBelongedToClient,
        handleCatsBelongedComponentState,
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
