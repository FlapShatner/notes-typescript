import Select from "react-select";

const SelectBox = ({allTags}) => {
  

  return (
    <div className="flex basis-1/2">
      <Select
        isMulti
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
          }),
          control: (base) => ({
            ...base,
            borderRadius: "0.375rem",
          }),
        }}
        options={allTags}
      />
    </div>
  );
};

export default SelectBox;
