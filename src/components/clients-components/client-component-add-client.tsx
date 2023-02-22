import { FileArrowUp, XCircle } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ClientContext } from "../../contexts/clients-context";
import InputMask from "react-input-mask";

interface ClientComponentAddClientProps {
  addClientComponentState: () => void;
}

export function ClientComponentAddClient({
  addClientComponentState,
}: ClientComponentAddClientProps) {
  const {
    clients,
    handleClients,
    handleClientName,
    handleClientEmail,
    handleClientPhonenumber,
    handleClientProfilePhoto,
  } = useContext(ClientContext);

  function handleName(event: FormEvent<HTMLInputElement>) {
    handleClientName(event.currentTarget.value);
  }

  function handleEmail(event: FormEvent<HTMLInputElement>) {
    handleClientEmail(event.currentTarget.value);
  }

  function handlePhonenumber(event: FormEvent<HTMLInputElement>) {
    handleClientPhonenumber(event.currentTarget.value);
  }

  function creatingClientAction() {
    handleClients();
    addClientComponentState();
  }

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-4/5 md:h-4/5 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6 space-y-8 pb-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={addClientComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <form>
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-8 md:space-x-8 sm:space-y-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-main font-extrabold">Usename</p>
                <div className="lg:w-80 md:w-80 sm:w-40 w-40 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                  <input
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id="clientName"
                    placeholder="eg: Felipe Gadelha Lino"
                    onChange={handleName}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Email</p>
                <div className="lg:w-80 md:w-80 sm:w-48 w-48 h-9 flex border-2 border-button items-center pl-6 space-x-4 rounded-md">
                  <input
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id=""
                    placeholder="eg: felipegadelha@gmail.com"
                    onChange={handleEmail}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Phonenumber</p>
                <div className="lg:w-80 md:w-80 sm:w-32 w-32 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                  <InputMask
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id=""
                    placeholder="eg: (88) 992048450"
                    onChange={handlePhonenumber}
                    mask={"(99) 99999-9999"}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <button
          onClick={creatingClientAction}
          type="submit"
          className="flex items-center justify-center w-40 h-9 text-lg font-bold bg-button rounded-full"
        >
          Create client
        </button>
      </div>
    </div>
  );
}
