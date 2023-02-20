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
import { CatProvider } from "./contexts/cat-context";

function App() {
  return (
    <NavigationProvider>
      <ClientProvider>
        <CatProvider>
          <MainComponent />
        </CatProvider>
      </ClientProvider>
    </NavigationProvider>
  );
}

export default App;
