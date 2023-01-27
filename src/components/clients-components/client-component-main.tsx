import { ClientComponentData } from "./client-component-data";
import { ClientComponentSearchAndAddClient } from "./client.component-search-and-add-client";

interface ClientMainProps {
  editClientComponentState: () => void;
  addClientComponentState: () => void;
  addCatComponentState: () => void;
}

export function ClientComponentMain({
  editClientComponentState,
  addClientComponentState,
  addCatComponentState,
}: ClientMainProps) {
  return (
    <div className="lg:w-10/12 md:w-10/12 sm:w-11/12 w-11/12 h-5/6 py-16 overflow-auto bg-main bg-opacity-10 rounded-2xl flex flex-col">
      <ClientComponentSearchAndAddClient
        addClientComponentState={addClientComponentState}
      />
      <ClientComponentData
        editClientComponentState={editClientComponentState}
        addCatComponentState={addCatComponentState}
      />
    </div>
  );
}
