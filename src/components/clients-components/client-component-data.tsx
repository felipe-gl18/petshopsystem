import { useState } from "react";
import { ArrowCircleDown, ArrowCircleRight, Pen } from "phosphor-react";

interface SearchAndEditProps {
  editClientComponentState: () => void;
  addCatComponentState: () => void;
}

export function ClientComponentData({
  editClientComponentState,
  addCatComponentState,
}: SearchAndEditProps) {
  const [userSectionSelected, setUserSectionSelected] = useState(false);
  const [catsBelongedToClientState, setCatsBelongedToClientState] =
    useState(false);

  function handleCatsBelongedToClientsState() {
    setCatsBelongedToClientState(!catsBelongedToClientState);
  }

  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 lg:gap-x-8 gap-y-12 md:gap-y-12 sm:gap-y-12 ml-6 max-[382px]:ml-4 lg:ml-14 md:ml-14 sm:ml-6 mt-16 max-[382px]:mt-9">
      <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-9 sm:space-x-6">
        <div className="w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-black rounded-xl"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="text-main font-black flex items-center lg:space-x-20 md:space-x-12 sm:space-x-6 max-[639px]:space-x-4">
              <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl">
                Felipe Gadelha Lino
              </p>
              <Pen size={32} onClick={editClientComponentState} />
            </div>
            <p className="text-main">felipegadelja2004@gmail.com</p>
            <p className="text-main">(88) 992048450</p>
          </div>
          <button
            onClick={addCatComponentState}
            className="w-28 text-xs bg-button font-bold rounded-full"
          >
            Add cat
          </button>
        </div>
      </div>
      {catsBelongedToClientState ? (
        <>
          <div className="flex items-center h-4 space-x-2">
            <ArrowCircleDown
              size={32}
              className="text-button"
              onClick={handleCatsBelongedToClientsState}
            />
            <p className="text-sm text-main font-black opacity-50">
              close cats section
            </p>
          </div>
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-12 md:space-x-12 lg:space-y-0 md:space-y-0 sm:space-y-12 space-y-12 justify-center">
            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-6 md:space-x-6 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
              <div className="w-44 h-44 bg-gray-700 rounded-xl"></div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl text-main font-black">
                    Muzzan
                  </p>
                  <p className="text-main">Left at 17h e 30 min</p>
                  <p className="text-white">Leave at 20h</p>
                </div>
                <button className="w-36 text-xs font-bold bg-button rounded-full">
                  start treatment
                </button>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-6 md:space-x-6 lg:space-y-0 md:space-y-0 sm:space-y-6 space-y-6">
              <div className="w-44 h-44 bg-gray-700 rounded-xl"></div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <p className="lg:text-2xl md:text-xl sm:text-xl max-[639px]:text-xl text-main font-black">
                    Jerry
                  </p>
                  <p className="text-main">Left at 17h e 30 min</p>
                  <p className="text-white">Leave at 20h</p>
                </div>
                <button className="w-36 text-xs font-bold bg-button rounded-full">
                  start treatment
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center h-4 space-x-2">
          <ArrowCircleRight
            size={32}
            className="text-button"
            onClick={handleCatsBelongedToClientsState}
          />
          <p className="text-sm text-main font-black opacity-50">
            open cats section
          </p>
        </div>
      )}
    </div>
  );
}
