import { Pen } from "phosphor-react";

interface CatMainProps {
  editCatComponentState: () => void;
}

export function CatComponentData({ editCatComponentState }: CatMainProps) {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 min-[490px]:grid-cols-2 min-[320px]:grid-cols-1 grid-cols-2 lg:gap-x-8 gap-y-12 md:gap-y-12 sm:gap-y-12 ml-6 max-[382px]:ml-4 lg:ml-14 md:ml-14 sm:ml-6 mt-16 max-[382px]:mt-9">
      <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-12 sm:space-x-12">
        <div className="w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-black rounded-xl"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="text-main text-3xl lg:text-xl md:text-3xl sm:text-3xl font-black flex items-center space-x-20">
              <p>Jerry</p>
              <Pen size={32} onClick={editCatComponentState} />
            </div>
            <p className="text-main">Felipe Gadelha Lino</p>
            <p className="text-main lg:flex md:flex sm:flex hidden">
              Left at 17h and 30 min
            </p>
            <p className="text-white lg:flex md:flex sm:flex hidden">
              Leave at 20h and 10 min
            </p>
          </div>
          <button className="w-36 text-xs bg-button font-bold rounded-full">
            Start treatment
          </button>
        </div>
      </div>
      <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-12 sm:space-x-12">
        <div className="w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-black rounded-xl"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="text-main text-3xl lg:text-xl md:text-3xl sm:text-3xl font-black flex items-center space-x-20">
              <p>Jerry</p>
              <Pen size={32} onClick={editCatComponentState} />
            </div>
            <p className="text-main">Felipe Gadelha Lino</p>
            <p className="text-main lg:flex md:flex sm:flex hidden">
              Left at 17h and 30 min
            </p>
            <p className="text-white lg:flex md:flex sm:flex hidden">
              Leave at 20h and 10 min
            </p>
          </div>
          <button className="w-36 text-xs bg-button font-bold rounded-full">
            Start treatment
          </button>
        </div>
      </div>
      <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:space-y-0 md:space-y-0 sm:space-y-0 space-y-4 lg:space-x-6 md:space-x-12 sm:space-x-12">
        <div className="w-48 lg:w-44 md:w-56 sm:w-56 h-48 lg:h-44 md:h-56 sm:h-56 bg-black rounded-xl"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="text-main text-3xl lg:text-xl md:text-3xl sm:text-3xl font-black flex items-center space-x-20">
              <p>Jerry</p>
              <Pen size={32} onClick={editCatComponentState} />
            </div>
            <p className="text-main">Felipe Gadelha Lino</p>
            <p className="text-main lg:flex md:flex sm:flex hidden">
              Left at 17h and 30 min
            </p>
            <p className="text-white lg:flex md:flex sm:flex hidden">
              Leave at 20h and 10 min
            </p>
          </div>
          <button className="w-36 text-xs bg-button font-bold rounded-full">
            Start treatment
          </button>
        </div>
      </div>
    </div>
  );
}
