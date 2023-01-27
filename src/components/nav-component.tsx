import { useContext, useState } from "react";
import { Cat, Users } from "phosphor-react";
import { NavigationContext } from "../contexts/nav-context";

export function NavComponent() {
  const {
    isCatSectionSelected,
    isClientSectionSelected,
    catSectionSelection,
    clientSectionSelection,
  } = useContext(NavigationContext);

  const [catSectionSelected, setCatSectionSelected] = useState(false);
  const [userSectionSelected, setUserSectionSelected] = useState(false);

  function handleCatSectionState() {
    setCatSectionSelected(!catSectionSelected);
    setUserSectionSelected(false);
  }

  function handleUserSectionState() {
    setUserSectionSelected(!userSectionSelected);
    setCatSectionSelected(false);
  }
  return (
    <div className="w-44 lg:w-20 md:w-44 sm:w-44 h-16 lg:h-52 md:h-16 sm:h-16 bg-white rounded-full shadow-lg flex lg:flex-col md:flex-row lg:space-y-12 space-x-7 lg:space-x-0 md:space-x-7 sm:space-x-7 items-center justify-center">
      <Cat
        size={32}
        color={isCatSectionSelected ? "#A6592D" : "black"}
        onClick={catSectionSelection}
      />
      <Users
        size={32}
        color={isClientSectionSelected ? "#A6592D" : "black"}
        onClick={clientSectionSelection}
      />
    </div>
  );
}
