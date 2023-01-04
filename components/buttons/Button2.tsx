

const Button = ({children}) => {
    return  (
      
      <button
    className={`inline-block border border-inherit rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none active:scale-100`}>
      {children} 
      </button>
      
  )
  }
  
  export default Button
  
  