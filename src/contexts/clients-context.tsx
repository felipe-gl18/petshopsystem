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
  handleDeleteClients: () => void;
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
  handleDeleteClients() {},
});

export function ClientProvider({ children }: ClientProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhonenumber, setClientPhonenumber] = useState("");
  const [clientProfilePhoto, setClientProfilePhoto] = useState(clientImage);
  const [searchedClients, setSearchedClients] = useState("");
  const [filterdClients, setFilteredClients] = useState<any>();
  const [clientId, setClientId] = useState(0);
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
  >([]);

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

  function handleDeleteClients() {
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

  useEffect(() => {
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
    setFilteredClients(
      clients.filter((clientItem) => {
        return Object.values(clientItem)
          .join("")
          .toLowerCase()
          .includes(searchedClients.toLowerCase());
      })
    );
    console.log(filterdClients);
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
