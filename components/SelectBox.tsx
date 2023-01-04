import Select from "react-select";
import { Tag } from "../pages/create";

type Props = {
  allTags:Tag[]
  setSelectedTags:(tag:Tag[])=> void
  selectedTags:Tag[]
}

const SelectBox = ({allTags, selectedTags ,setSelectedTags}:Props) => {
  

  return (
    <div className="flex basis-1/2">
      <Select
      placeholder='Filter by tags'
        isMulti
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
          }),
          control: (base) => ({
            ...base,
            borderRadius: "0.375rem",
            backgroundColor: "#fafaf9",
          }),
        }}
        value={selectedTags.map(tag => {return{label:tag.label, value:tag.uuid}})}
        onChange={tags => setSelectedTags(tags.map(tag => {
          return {label:tag.label, uuid:tag.value}
        }))}
        options={allTags.map(tag => {return {label:tag.label, value:tag.uuid}})}
      />
    </div>
  );
};

export default SelectBox;
