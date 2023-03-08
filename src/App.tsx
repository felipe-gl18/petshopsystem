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
