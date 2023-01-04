const ButtonDelete = ({children, onClick}) => {

    return (      
      <button
      onClick={onClick}
  className={`inline-block rounded-md border border-red-600 px-5 py-3 text-sm font-medium text-red-600 transition hover:scale-105 hover:shadow-xl focus:outline-none active:scale-100`}
  >
    {children}
  </button>
    )
  }
  
  export default ButtonDelete