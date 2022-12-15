import Select from 'react-select'

const SelectBox = () => {

  const options = [
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'},
    {value: 'three', label: 'Three'},
    {value: 'four', label: 'Four'},
  ]




  return (
    <div className='flex basis-1/2'>
    <Select isMulti styles={{
      container: (base) => ({
        ...base,
        width: '100%'
      }),
      control: (base) => ({
        ...base,
        borderRadius: '0.375rem'
      })
    }} options={options}/>
    </div>
  )
}

export default SelectBox