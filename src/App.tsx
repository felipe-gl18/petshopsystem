import { useState, createContext, useContext, useEffect } from "react";
import {
  Cat,
  Users,
  MagnifyingGlass,
  Plus,
  Pen,
  ArrowCircleRight,
  ArrowCircleDown,
} from "phosphor-react";

import { NavigationProvider } from "./contexts/nav-context";
import { MainComponent } from "./components/main-component";
import { ClientProvider } from "./contexts/clients-context";
import { PetProvider } from "./contexts/pet-context";

function App() {
  return (
    <NavigationProvider>
      <ClientProvider>
        <PetProvider>
          <MainComponent />
        </PetProvider>
      </ClientProvider>
    </NavigationProvider>
  );
}

export default App;
