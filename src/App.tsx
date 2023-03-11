import { NavigationProvider } from "./contexts/nav-context";
import { MainComponent } from "./components/main-component";
import { ClientProvider } from "./contexts/clients-context";
import { PetProvider } from "./contexts/pet-context";
import useDrivePicker from "react-google-drive-picker";

function App() {
  const [openPicker, data] = useDrivePicker();
  let dataUrl;

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
