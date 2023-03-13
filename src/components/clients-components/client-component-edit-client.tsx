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
import { MainContext } from "../../contexts/main-context";

interface ClientEditComponentProps {
  editClientComponentState: (e?: number | undefined) => void;
}

export function ClientComponentEditClient({
  editClientComponentState,
}: ClientEditComponentProps) {
  const { handleOpenPicker } = useContext(MainContext);
  const { handleEditClients, clientToBeUpdated, clients } =
    useContext(ClientContext);
  const [clientSelected, setclientSelected] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data: any) => {
    editClientComponentState();
    handleEditClients(
      data.clientName,
      data.clientEmail,
      data.clientAddress,
      data.clientPhoneNumber
    );
  };

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
                    className={
                      clientItem["clientProfilePhoto"] == "/src/assets/user.png"
                        ? "w-7/12 h-7/12"
                        : "w-full h-full rounded-xl"
                    }
                    src={clientItem["clientProfilePhoto"]}
                    alt="client icon"
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
                  <p className="text-sm text-main">
                    {clientItem["clientAddress"]}
                  </p>
                  <p className="text-main">{clientItem["clientPhoneNumber"]}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className="space-y-8 py-9">
          <form name="editClientForm" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex lg:flex-roww md:flex-row sm:flex-col flex-col lg:space-x-10 md:space-x-8 space-x-0 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">New name</p>
                  <div className="lg:w-72 md:w-72 sm:w-56 w-56 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
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
                      placeholder="eg: Junior Aguiar Silva"
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.clientName?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Email</p>
                  <div className="lg:w-80 md:w-80 sm:w-60 w-64 h-9 flex border-0 bg-main bg-opacity-30 items-center pl-6 space-x-4 rounded-md">
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
                      placeholder="eg: ghostfrost121@gmail.com"
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.clientEmail?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Phone number</p>
                  <div className="lg:w-60 md:w-60 sm:w-60 w-60 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
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
                      mask={"(99) 99999-9999"}
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.clientPhoneNumber?.message || "")}
                  </p>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">New address</p>
                  <div className="lg:w-72 md:w-72 sm:w-56 w-56 h-9 flex border-0 bg-main bg-opacity-30 items-center px-6 space-x-4 rounded-md">
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
                      placeholder="eg: Bairo X, rua x, n°xx"
                    />
                  </div>
                  <p className="text-button text-sm">
                    {String(errors.clientAddress?.message || "")}
                  </p>
                </div>
                <div className="space-y-3">
                  <div
                    onClick={handleOpenPicker}
                    className="flex items-center justify-center w-48 h-9 text-sm font-bold bg-main rounded-full mt-12 cursor-pointer"
                  >
                    Upload photo's client
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pr-9 pt-8 max-[400px]:pt-14">
              <input
                type="submit"
                className={`flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full`}
                value="Edit Client"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
