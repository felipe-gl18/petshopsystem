import { FileArrowUp, XCircle } from "phosphor-react";

interface CatEditComponentProps {
  editCatComponentState: () => void;
}

export function CatComponentEditCat({
  editCatComponentState,
}: CatEditComponentProps) {
  return (
    <div className="w-full h-screen absolute bg-black bg-opacity-80 top-0 right-0 flex justify-center items-center py-6">
      <div className="lg:w-6/12 md:w-11/12 sm:w-11/12 w-11/12 lg:h-max md:h-5/6 sm:h-5/6 h-5/6 overflow-auto bg-main bg-opacity-20 rounded-2xl lg:pl-12 md:pl-12 sm:pl-6 pl-6">
        <div className="flex justify-end w-full">
          <XCircle
            size={42}
            onClick={editCatComponentState}
            className="text-button mr-2 mt-2"
          />
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col lg:items-center space-y-6 lg:space-x-9">
          <div className="lg:w-52 md:w-52 sm:w-44 w-44 lg:h-52 md:h-52 sm:h-44 h-44 bg-black rounded-xl"></div>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <p className="lg:text-3xl md:text-3xl sm:text-xl text-xl text-main font-black">
                Jerry
              </p>
              <p className="text-sm text-button font-extrabold">10290129</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg text-main">Felipe Gadelha Lino</p>
              <p className="text-sm text-button font-extrabold">11309429</p>
            </div>
            <p className="text-main">Registerd at may 10, 2022</p>
          </div>
        </div>
        <div className="space-y-8 py-9">
          <div>
            <div className="flex lg:space-x-32 md:space-x-32 sm:space-x-7 space-x-7">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Cat name</p>
                  <div className="w-44 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
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
                  <div className="w-48 h-9 flex border-2 border-button items-center pl-6 space-x-4 rounded-md">
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
                  <div className="w-32 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
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
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-main font-extrabold">Photo</p>
                  <FileArrowUp size={62} className="text-button" />
                </div>
                <div className="space-y-3">
                  <p className="text-main font-extrabold">Owner id</p>
                  <div className="lg:w-36 md:w-36 sm:w-24 w-20 h-9 flex border-2 border-button items-center px-6 space-x-4 rounded-md">
                    <input
                      className="outline-0 w-3/4 bg-transparent font-bold text-main placeholder:text-main"
                      type="text"
                      name=""
                      id=""
                      placeholder="eg: 10290182"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-9">
            <button className="flex items-center justify-center w-40 h-10 text-lg font-bold bg-button rounded-full">
              Edit cat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
