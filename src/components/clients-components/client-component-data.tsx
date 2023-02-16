import { useContext, useEffect, useState } from "react";
import { ArrowCircleDown, ArrowCircleRight, Pen, Trash } from "phosphor-react";
import { ClientContext } from "../../contexts/clients-context";
import { CatContext } from "../../contexts/cat-context";

interface SearchAndEditProps {
  editClientComponentState: (e?: number | undefined) => void;
  addCatComponentState: () => void;
}

export function ClientComponentData({
  editClientComponentState,
  addCatComponentState,
}: SearchAndEditProps) {
  const [userSectionSelected, setUserSectionSelected] = useState(false);
  const {
    clients,
    filterdClients,
    handleClientToBeUpdated,
    handleCatsBelongedComponentState,
    handleDeleteClients,
  } = useContext(ClientContext);
  const { handleCatToBeUpdated, handleCatTreatmentState } =
    useContext(CatContext);

  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 lg:gap-x-8 gap-y-12 md:gap-y-12 sm:gap-y-12 ml-6 max-[382px]:ml-4 lg:ml-14 md:ml-14 sm:ml-6 mt-16 max-[382px]:mt-9">
      <>
        {filterdClients.map((data: any) => {
          return (
            <>
              <div
                key={data["clientId"]}
                className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-9 sm:space-x-6"
              >
                <div className="flex items-center justify-center w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-slate-200 rounded-xl">
                  <img
                    className="w-8/12 h-8/12"
                    src={data["clientProfilePhoto"]}
                    alt="pet icon"
                  />
                </div>
                <div className="space-y-6 flex flex-col justify-center">
                  <div className="space-y-2">
                    <div className="text-main font-black flex items-center lg:space-x-14 md:space-x-12 sm:space-x-6 max-[639px]:space-x-4">
                      <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl">
                        {data["clientName"]}
                      </p>
                      <div className="flex space-x-4">
                        <Pen
                          size={32}
                          onClick={() => {
                            editClientComponentState();
                            handleClientToBeUpdated(data?.clientId);
                          }}
                        />
                        <Trash
                          size={32}
                          onClick={() => {
                            handleClientToBeUpdated(data?.clientId);
                            handleDeleteClients();
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-main">{data["clientEmail"]}</p>
                    <p className="text-main">{data["clientPhonenumber"]}</p>
                    <p className="text-button text-sm font-bold">
                      {data["clientId"]}
                    </p>
                  </div>
                  <button
                    onClick={addCatComponentState}
                    className="w-28 text-xs bg-button font-bold rounded-full"
                  >
                    Add cat
                  </button>
                </div>
              </div>
              {data["catsState"] ? (
                <>
                  <div
                    onClick={() => {
                      handleClientToBeUpdated(data?.clientId);
                      handleCatsBelongedComponentState();
                    }}
                    className="flex items-center h-4 space-x-2"
                  >
                    <ArrowCircleDown size={32} className="text-button" />
                    <p className="text-sm text-main font-black opacity-50">
                      close cats section
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-y-6 grid-cols-1">
                    {data["cats"]?.map((catItem: any) => {
                      return (
                        <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-6 md:space-x-6 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
                          <div className="flex items-center justify-center w-44 h-44 bg-slate-200 rounded-xl">
                            <img
                              className="w-8/12 h-8/12"
                              src={catItem["catProfilePhoto"]}
                              alt="pet icon"
                            />
                          </div>
                          <div className="flex flex-col justify-center space-y-6">
                            <div className="space-y-2">
                              <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl text-main font-black">
                                {catItem["catName"]}
                              </p>
                              <p className="text-main">
                                Left at{" "}
                                {String(catItem["catLeftAt"].getHours())}h and{" "}
                                {String(catItem["catLeftAt"].getMinutes())} min
                              </p>
                              <p className="text-white">
                                Leave at{" "}
                                {String(
                                  new Date(catItem["catLeaveAt"]).getHours()
                                )}{" "}
                                h and{" "}
                                {String(
                                  new Date(catItem["catLeaveAt"]).getMinutes()
                                )}{" "}
                                min
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                handleCatToBeUpdated(catItem["catId"]);
                                handleCatTreatmentState();
                              }}
                              className="w-36 text-xs font-bold bg-button rounded-full"
                            >
                              {catItem["catTreatmentState"]
                                ? "Treatment executed"
                                : "Start treatment"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    handleClientToBeUpdated(data?.clientId);
                    handleCatsBelongedComponentState();
                  }}
                  className="flex items-center h-4 space-x-2"
                >
                  <ArrowCircleRight size={32} className="text-button" />
                  <p className="text-sm text-main font-black opacity-50">
                    open cats sections
                  </p>
                </div>
              )}
            </>
          );
        })}
      </>
    </div>
  );
}
