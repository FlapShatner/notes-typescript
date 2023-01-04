const ButtonOutline = ({children}) => {

    return (
      
      <button
  className={`inline-block rounded-md border border-indigo-600 px-5 py-3 text-sm font-medium text-indigo-600 transition hover:scale-105 hover:shadow-xl focus:outline-none active:scale-100`}
  >
    {children}
  </button>
    )
  }
  
  export default ButtonOutline