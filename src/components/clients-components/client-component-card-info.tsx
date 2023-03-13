import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../contexts/clients-context";
import petIcon from "/src/assets/dog-track.png";
import userIcon from "/src/assets/user.png";

interface ClientCardInfoComponentProps {
  cardInfoClientComponentState: () => void;
}

export function ClientComponentCardInfo({
  cardInfoClientComponentState,
}: ClientCardInfoComponentProps) {
  const { handleEditClients, clientToBeUpdated, clients } =
    useContext(ClientContext);
  const [clientSelected, setclientSelected] = useState<any>();

  useEffect(() => {
    setclientSelected(
      clients?.filter(
        (clientItem) => clientItem["clientId"] === clientToBeUpdated
      )
    );
  }, []);

  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-3xl md:h-5/6 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl">
        <div className="h-full flex lg:flex-row md:flex-col sm:flex-col flex-col lg:items-center space-y-6 lg:space-x-9">
          {clientSelected?.map((clientItem: any) => {
            return (
              <div className="w-full h-full flex flex-col justify-between px-6">
                <div className="flex space-x-6 max-[470px]:flex-col max-[470px]:space-x-0 max-[470px]:space-y-6 mt-6">
                  <div className="flex items-center justify-center lg:w-52 md:w-52 sm:w-52 w-52 lg:h-52 md:h-52 sm:h-52 h-52 bg-slate-200 rounded-xl">
                    <img
                      className={
                        clientItem["clientProfilePhoto"] == userIcon
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
                    <p className="text-main">{clientItem["clientEmail"]}</p>
                    <p className="text-main">
                      {clientItem["clientPhoneNumber"]}
                    </p>
                    <p className="text-main">{clientItem["clientAddress"]}</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-y-6 grid-cols-2 py-12 max-[490px]:grid-cols-1">
                  {clientItem["pets"]?.map((petItem: any) => {
                    return (
                      <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-6 md:space-x-6 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
                        <div className="flex items-center justify-center w-44 h-44 bg-slate-200 rounded-xl">
                          <img
                            className={
                              petItem["petProfilePhoto"] == petIcon
                                ? "w-7/12 h-7/12"
                                : "w-full h-full rounded-xl"
                            }
                            src={petItem["petProfilePhoto"]}
                            alt="pet icon"
                          />
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                          <div className="space-y-2">
                            <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl text-main font-black">
                              {petItem["petName"]}
                            </p>
                            <p className="text-main">
                              {petItem["petTreatmentState"]
                                ? "Left at " + petItem["petLeftAt"]
                                : petItem["petLeftAt"]}
                            </p>
                            <p className="text-white">
                              {petItem["petTreatmentState"]
                                ? "Leave at " + petItem["petLeaveAt"]
                                : petItem["petLeaveAt"]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex justify-end pr-6 max-[415px]:pr-1">
                  <button
                    onClick={() => {
                      cardInfoClientComponentState();
                    }}
                    className="flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full mb-6"
                  >
                    Close card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
