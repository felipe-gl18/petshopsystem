import { useState, createContext, useContext } from "react";
import {
  Cat,
  Users,
  MagnifyingGlass,
  Plus,
  Pen,
  ArrowCircleRight,
  ArrowCircleDown,
} from "phosphor-react";

import { NavComponent } from "./components/nav-component";
import { ClientComponentMain } from "./components/clients-components/client-component-main";
import { CatComponentMain } from "./components/cats-components/cat-component-main";
import { NavigationProvider } from "./contexts/nav-context";
import { MainComponent } from "./components/main-component";
import { ClientComponentAddClient } from "./components/clients-components/client-component-add-client";
import { CatComponentEditCat } from "./components/cats-components/cat-component-edit-cat";
import { ClientComponentEditClient } from "./components/clients-components/client-component-edit-client";

function App() {
  return (
    <NavigationProvider>
      <MainComponent />
    </NavigationProvider>
  );
}

export default App;
