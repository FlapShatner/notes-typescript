import SearchInput from "./SearchInput";
import SelectBox from "./SelectBox";

function View() {
  return (
    <>
      <div className="lg:mx-20 mx-4 gap-2 md:gap-6 flex flex-row">
        <SearchInput />
        <SelectBox />
      </div>
    </>
  );
}

export default View;
