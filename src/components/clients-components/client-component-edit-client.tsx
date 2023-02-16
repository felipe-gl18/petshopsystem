import { FileArrowUp, XCircle } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ClientContext } from "../../contexts/clients-context";

interface ClientEditComponentProps {
  editClientComponentState: (e?: number | undefined) => void;
}

export function ClientComponentEditClient({
  editClientComponentState,
}: ClientEditComponentProps) {
  const { handleEditClients, clientToBeUpdated, clients } =
    useContext(ClientContext);
  const [newClientName, setNewClientName] = useState<string>();
  const [newClientEmail, setNewClientEmail] = useState<string>();
  const [newClientPhonenumber, setNewClientPhonenumber] = useState<string>();
  const [newClientProfilePhoto, setNewClientProfilePhoto] = useState<string>();
  const [clientSelected, setclientSelected] = useState<any>();

  function handleNewClientName(event: FormEvent<HTMLInputElement>) {
    setNewClientName(event?.currentTarget?.value);
    console.log(clientSelected);
  }

  function handleNewClientEmail(event: FormEvent<HTMLInputElement>) {
    setNewClientEmail(event?.currentTarget?.value);
  }

  function handleNewClientPhonenumber(event: FormEvent<HTMLInputElement>) {
    setNewClientPhonenumber(event?.currentTarget?.value);
  }

  function handleNewClientProfilePhoto(event: FormEvent<HTMLInputElement>) {
    setNewClientProfilePhoto(newClientProfilePhoto);
  }

  useEffect(() => {
    setclientSelected(
      clients?.filter(
        (clientItem) => clientItem["clientId"] === clientToBeUpdated
      )
    );
  }, []);

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-max md:h-5/6 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={() => editClientComponentState()}
            className="text-button mr-2 mt-2"
          />
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col lg:items-center space-y-6 lg:space-x-9">
          {clientSelected?.map((clientItem: any) => {
            return (
              <>
                <div className="flex items-center justify-center lg:w-52 md:w-52 sm:w-44 w-44 lg:h-52 md:h-52 sm:h-44 h-44 bg-slate-200 rounded-xl">
                  <img
                    className="w-10/12 h-10/12"
                    src={clientItem["clientProfilePhoto"]}
                    alt="pet icon"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <p className="lg:text-3xl md:text-3xl sm:text-xl text-lg text-main font-black">
                      {clientItem["clientName"]}
                    </p>
                    <p className="text-sm text-button font-extrabold">
                      {clientItem["clientId"]}
                    </p>
                  </div>
                  <p className="text-sm text-main">
                    {clientItem["clientEmail"]}
                  </p>
                  <p className="text-main">{clientItem["clientPhonenumber"]}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className="space-y-8 py-9">
          <div>
            <div className="flex lg:flex-roww md:flex-row sm:flex-col flex-col lg:space-x-32 md:space-x-32 space-x-0 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">New name</p>
                  <div className="lg:w-72 md:w-72 sm:w-44 w-44 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: Junior Aguiar Silva"
                      onChange={handleNewClientName}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Email</p>
                  <div className="lg:w-80 md:w-80 sm:w-52 w-52 h-9 flex border-2 border-button items-center pl-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: ghostfrost121@gmail.com"
                      onChange={handleNewClientEmail}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Phone number</p>
                  <div className="lg:w-60 md:w-60 sm:w-48 w-48 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: (88) 992048450"
                      onChange={handleNewClientPhonenumber}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-main font-extrabold">Profile photo</p>
                  <FileArrowUp size={62} className="text-button" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-9">
            <button
              onClick={() => {
                handleEditClients(
                  newClientName || "undefined",
                  newClientEmail || "undefined",
                  newClientPhonenumber || "undefined",
                  newClientProfilePhoto || "/src/assets/user.png"
                );
                editClientComponentState();
              }}
              className="flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full"
            >
              Edit client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
