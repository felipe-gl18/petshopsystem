import { useContext, useState } from "react";
import { ClientContext } from "../contexts/clients-context";
import { NavigationContext } from "../contexts/nav-context";
import { CatComponentAddCat } from "./cats-components/cat-component-add-cat";
import { CatComponentEditCat } from "./cats-components/cat-component-edit-cat";
import { CatComponentMain } from "./cats-components/cat-component-main";
import { ClientComponentAddClient } from "./clients-components/client-component-add-client";
import { ClientComponentEditClient } from "./clients-components/client-component-edit-client";
import { ClientComponentMain } from "./clients-components/client-component-main";
import { NavComponent } from "./nav-component";

export function MainComponent() {
  const { isCatSectionSelected, isClientSectionSelected } =
    useContext(NavigationContext);

  const { handleEditClients } = useContext(ClientContext);

  const [editClientComponentSelected, setEditClientComponentSelected] =
    useState(false);

  const [addClientComponentSelected, setAddClientComponentSelected] =
    useState(false);

  const [editCatComponentSelected, setEditCatComponentSelectted] =
    useState(false);

  const [addCatComponentSelcted, setAddCatComponentSelected] = useState(false);

  function EditClientComponentState(e: number | undefined) {
    setEditClientComponentSelected(!editClientComponentSelected);
  }

  function AddClientComponentState() {
    setAddClientComponentSelected(!addClientComponentSelected);
  }

  function EditCatComponentState() {
    setEditCatComponentSelectted(!editCatComponentSelected);
  }

  function AddCatComponentState() {
    setAddCatComponentSelected(!addCatComponentSelcted);
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col lg:flex-row md:flex-col sm:flex-col items-center justify-center space-y-6 lg:space-x-12 md:space-x-12">
        <NavComponent />
        {isCatSectionSelected ? (
          <CatComponentMain
            editCatComponentState={EditCatComponentState}
            addCatComponentState={AddCatComponentState}
          />
        ) : (
          <ClientComponentMain
            editClientComponentState={EditClientComponentState}
            addClientComponentState={AddClientComponentState}
            addCatComponentState={AddCatComponentState}
          />
        )}
      </div>
      {editClientComponentSelected ? (
        <ClientComponentEditClient
          editClientComponentState={EditClientComponentState}
        />
      ) : null}
      {addClientComponentSelected ? (
        <ClientComponentAddClient
          addClientComponentState={AddClientComponentState}
        />
      ) : null}
      {editCatComponentSelected ? (
        <CatComponentEditCat editCatComponentState={EditCatComponentState} />
      ) : null}
      {addCatComponentSelcted ? (
        <CatComponentAddCat addCatComponentState={AddCatComponentState} />
      ) : null}
    </div>
  );
}
