import {
  EnvelopeSimple,
  FileArrowUp,
  House,
  Phone,
  User,
  XCircle,
} from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ClientContext } from "../../contexts/clients-context";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

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
    handleClientAddress,
  } = useContext(ClientContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data: any) => {
    addClientComponentState();
    handleClients();
  };

  const [clientSubmitInputState, setClientSubmitInputState] =
    useState<boolean>(false);

  function handleName(event: FormEvent<HTMLInputElement>) {
    handleClientName(event.currentTarget.value);
  }

  function handleEmail(event: FormEvent<HTMLInputElement>) {
    handleClientEmail(event.currentTarget.value);
  }

  function handlePhonenumber(event: FormEvent<HTMLInputElement>) {
    handleClientPhonenumber(event.currentTarget.value);
  }

  function handleAddress(event: FormEvent<HTMLInputElement>) {
    handleClientAddress(event.currentTarget.value);
  }

  function creatingClientAction(event: FormEvent<HTMLFormElement>) {
    handleClients();
    addClientComponentState();
  }

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center">
      <div className="lg:w-4/12 md:w-9/12 sm:w-9/12 w-11/12 lg:h-4/5 md:h-4/5 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6 space-y-8 pb-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={addClientComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <form
          name="addClientForm"
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-12"
        >
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-8 md:space-x-8 sm:space-y-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-main font-extrabold">Usename</p>
                <div className="lg:w-80 md:w-80 sm:w-64 w-52 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                  <User size={20} />
                  <input
                    {...register("clientName", {
                      required: "This is required",
                      minLength: {
                        value: 10,
                        message: "Min length is 10",
                      },
                      maxLength: {
                        value: 40,
                        message: "Max length is 40",
                      },
                    })}
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    placeholder="eg: Felipe Gadelha Lino"
                    onChange={handleName}
                  />
                </div>
                <p className="text-button text-sm">
                  {String(errors.clientName?.message || "")}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Email</p>
                <div className="lg:w-80 md:w-80 sm:w-72 w-60 h-9 flex border-0 bg-main bg-opacity-30 items-center pl-6 space-x-4 rounded-md">
                  <EnvelopeSimple size={20} />
                  <input
                    {...register("clientEmail", {
                      required: "This is required",
                      minLength: {
                        value: 10,
                        message: "Min length is 10",
                      },
                      maxLength: {
                        value: 40,
                        message: "Max length is 40",
                      },
                    })}
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    placeholder="eg: felipegadelha@gmail.com"
                    onChange={handleEmail}
                  />
                </div>
                <p className="text-button text-sm">
                  {String(errors.clientEmail?.message || "")}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Address</p>
                <div className="lg:w-80 md:w-80 sm:w-64 w-52 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                  <House size={20} />
                  <input
                    {...register("clientAddress", {
                      required: "This is required",
                      minLength: {
                        value: 10,
                        message: "Min length is 10",
                      },
                      maxLength: {
                        value: 40,
                        message: "Max length is 40",
                      },
                    })}
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    placeholder="Rua Mariinha Paiva, Bairro Sinhá Sabóia, n°362"
                    onChange={handleAddress}
                  />
                </div>
                <p className="text-button text-sm">
                  {String(errors.clientAddress?.message || "")}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Phonenumber</p>
                <div className="lg:w-80 md:w-80 sm:w-60 w-56 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
                  <Phone size={20} />
                  <InputMask
                    {...register("clientPhoneNumber", {
                      required: "This is required",
                      minLength: {
                        value: 15,
                        message: "Min length is 15",
                      },
                    })}
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    placeholder="eg: (88) 992048450"
                    onChange={handlePhonenumber}
                    mask={"(99) 99999-9999"}
                  />
                </div>
                <p className="text-button text-sm">
                  {String(errors.clientPhoneNumber?.message || "")}
                </p>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Create client"
            className={`flex items-center justify-center w-40 h-9 text-lg font-bold bg-button ${
              clientSubmitInputState ? `bg-opacity-40 cursor-not-allowed` : null
            } rounded-full`}
            disabled={clientSubmitInputState}
          />
        </form>
      </div>
    </div>
  );
}
