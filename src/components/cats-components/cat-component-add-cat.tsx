import { FileArrowUp, XCircle } from "phosphor-react";

interface CatComponentAddCatProps {
  addCatComponentState: () => void;
}

export function CatComponentAddCat({
  addCatComponentState,
}: CatComponentAddCatProps) {
  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-4/5 md:h-4/5 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6 space-y-8 pb-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={addCatComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <div>
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:space-x-8 md:space-x-8 sm:space-y-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-main font-extrabold">Cat name</p>
                <div className="lg:w-80 md:w-80 sm:w-40 w-40 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                  <input
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id=""
                    placeholder="eg: Jerry"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Breed</p>
                <div className="lg:w-80 md:w-80 sm:w-48 w-48 h-9 flex border-2 border-button items-center pl-6 space-x-4 rounded-md">
                  <input
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id=""
                    placeholder="eg: Angorá"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-main font-extrabold">Age</p>
                <div className="lg:w-80 md:w-80 sm:w-32 w-32 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                  <input
                    className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                    type="text"
                    name=""
                    id=""
                    placeholder="eg: 1.8"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-main font-extrabold">Profile photo</p>
              <FileArrowUp size={62} className="text-button" />
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center w-40 h-9 text-lg font-bold bg-button rounded-full">
          Create cat
        </button>
      </div>
    </div>
  );
}
