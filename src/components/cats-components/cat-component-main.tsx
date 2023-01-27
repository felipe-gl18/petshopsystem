import { CatComponentData } from "./cat-component-data";
import { CatComponentSearchAndAddCat } from "./cat-component.search-and-add-cat";

interface CatMainProps {
  editCatComponentState: () => void;
  addCatComponentState: () => void;
}

export function CatComponentMain({
  editCatComponentState,
  addCatComponentState,
}: CatMainProps) {
  return (
    <div className="lg:w-10/12 md:w-10/12 sm:w-11/12 w-11/12 h-5/6 py-16 overflow-auto bg-main bg-opacity-10 rounded-2xl flex flex-col">
      <CatComponentSearchAndAddCat
        addCatComponentState={addCatComponentState}
      />
      <CatComponentData editCatComponentState={editCatComponentState} />
    </div>
  );
}
