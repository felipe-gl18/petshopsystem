import { useContext, useState } from "react";
import { ClientContext } from "../contexts/clients-context";
import { NavigationContext } from "../contexts/nav-context";
import { PetComponentAddPet } from "./pets-components/pet-component-add-pet";
import { PetComponentEditPet } from "./pets-components/pet-component-edit-pet";
import { PetComponentMain } from "./pets-components/pet-component-main";
import { ClientComponentAddClient } from "./clients-components/client-component-add-client";
import { ClientComponentEditClient } from "./clients-components/client-component-edit-client";
import { ClientComponentMain } from "./clients-components/client-component-main";
import { ClientComponentCardInfo } from "./clients-components/client-component-card-info";
import { NavComponent } from "./nav-component";

export function MainComponent() {
  const { isPetSectionSelected, isClientSectionSelected } =
    useContext(NavigationContext);

  const { handleEditClients } = useContext(ClientContext);

  const [editClientComponentSelected, setEditClientComponentSelected] =
    useState(false);

  const [addClientComponentSelected, setAddClientComponentSelected] =
    useState(false);

  const [cardInfoClientComponentState, setCardInfoClientComponentState] =
    useState(false);

  const [editPetComponentSelected, setEditPetComponentSelectted] =
    useState(false);

  const [addPetComponentSelcted, setAddPetComponentSelected] = useState(false);

  function EditClientComponentState(e: number | undefined) {
    setEditClientComponentSelected(!editClientComponentSelected);
  }

  function AddClientComponentState() {
    setAddClientComponentSelected(!addClientComponentSelected);
  }

  function CardInfoClientComponentState() {
    setCardInfoClientComponentState(!cardInfoClientComponentState);
  }

  function EditPetComponentState() {
    setEditPetComponentSelectted(!editPetComponentSelected);
  }

  function AddPetComponentState() {
    setAddPetComponentSelected(!addPetComponentSelcted);
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col lg:flex-row md:flex-col sm:flex-col items-center justify-center space-y-6 lg:space-x-12 md:space-x-12">
        <NavComponent />
        {isPetSectionSelected ? (
          <PetComponentMain
            editPetComponentState={EditPetComponentState}
            addPetComponentState={AddPetComponentState}
          />
        ) : (
          <ClientComponentMain
            editClientComponentState={EditClientComponentState}
            addClientComponentState={AddClientComponentState}
            cardInfoClientComponentState={CardInfoClientComponentState}
            addPetComponentState={AddPetComponentState}
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
      {cardInfoClientComponentState ? (
        <ClientComponentCardInfo
          cardInfoClientComponentState={CardInfoClientComponentState}
        />
      ) : null}
      {editPetComponentSelected ? (
        <PetComponentEditPet editPetComponentState={EditPetComponentState} />
      ) : null}
      {addPetComponentSelcted ? (
        <PetComponentAddPet addPetComponentState={AddPetComponentState} />
      ) : null}
    </div>
  );
}
