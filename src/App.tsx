import { NavigationProvider } from "./contexts/nav-context";
import { MainComponent } from "./components/main-component";
import { ClientProvider } from "./contexts/clients-context";
import { PetProvider } from "./contexts/pet-context";
import { MainProvider } from "./contexts/main-context";

function App() {
  return (
    <MainProvider>
      <NavigationProvider>
        <ClientProvider>
          <PetProvider>
            <MainComponent />
          </PetProvider>
        </ClientProvider>
      </NavigationProvider>
    </MainProvider>
  );
}

export default App;
