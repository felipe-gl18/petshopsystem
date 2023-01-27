import { createContext, ReactNode, useState } from "react";

interface NavData {
  isCatSectionSelected: boolean;
  isClientSectionSelected: boolean;
  catSectionSelection?: ()=> void;
  clientSectionSelection?: ()=> void;
}

interface NavProps {
  children: ReactNode;
}

export const NavigationContext = createContext<NavData>({
  isCatSectionSelected: true,
  isClientSectionSelected: false,
});

export function NavigationProvider({ children }: NavProps) {
  const [isCatSectionSelected, setIsCatSelectionSelected] = useState(true);
  const [isClientSectionSelected, setIsClientSectionSelected] = useState(false);

  function catSectionSelection() {
    setIsClientSectionSelected(false);
    setIsCatSelectionSelected(true);
  }

  function clientSectionSelection() {
    setIsCatSelectionSelected(false);
    setIsClientSectionSelected(true)
  }

  return (
    <NavigationContext.Provider
      value={{
        isCatSectionSelected,
        isClientSectionSelected,
        catSectionSelection,
        clientSectionSelection
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
