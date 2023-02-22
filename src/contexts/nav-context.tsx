import { createContext, ReactNode, useState } from "react";

interface NavData {
  isPetSectionSelected: boolean;
  isClientSectionSelected: boolean;
  petSectionSelection?: () => void;
  clientSectionSelection?: () => void;
}

interface NavProps {
  children: ReactNode;
}

export const NavigationContext = createContext<NavData>({
  isPetSectionSelected: true,
  isClientSectionSelected: false,
});

export function NavigationProvider({ children }: NavProps) {
  const [isPetSectionSelected, setIsPetSelectionSelected] = useState(true);
  const [isClientSectionSelected, setIsClientSectionSelected] = useState(false);

  function petSectionSelection() {
    setIsClientSectionSelected(false);
    setIsPetSelectionSelected(true);
  }

  function clientSectionSelection() {
    setIsPetSelectionSelected(false);
    setIsClientSectionSelected(true);
  }

  return (
    <NavigationContext.Provider
      value={{
        isPetSectionSelected,
        isClientSectionSelected,
        petSectionSelection,
        clientSectionSelection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
