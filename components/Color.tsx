
import { colors } from "../colors";

const Color = ({setSelected}) => {

  const handleClick = (e) => {
    setSelected(e.target.id) 
    

    document.getElementById(e.target.id).className = `w-5 h-5 bg-${e.target.id}-400 m-1 rounded-md outline outline-2 outline-offset-1 outline-blue-600`
    
    colors.map((color) => { 
        if (color !== e.target.id) {
            document.getElementById(color).className = `w-5 h-5 bg-${color}-400 m-1 rounded-md`
        }
    })
  } 


  return (
    <div                
      className="cursor-pointer flex flex-row items-center  border border-gray-400 bg-stone-50 mt-4 w-max pl-2 text-gray-500 rounded-lg relative ml-auto " 
    >
      <div className="border-r-2 border-r-gray-400 pr-1">Color</div>
          
       
          <div className="flex flex-row px-1">
            {colors.map((color) => (
                <div
                    onClick={handleClick}
                    key={color}
                    id={color}
                    className={`w-5 h-5 bg-${color}-400 m-1 rounded-md`}
                />
            ))
            }

            {/* <div className="w-5 h-5 bg-red-400 m-1 rounded-md outline outline-2 outline-offset-1 outline-stone-500" />
            <div className="w-5 h-5 bg-orange-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-yellow-400 m-1 rounded-md" /> 
            <div className="w-5 h-5 bg-lime-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-emerald-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-cyan-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-blue-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-indigo-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-violet-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-fuchsia-400 m-1 rounded-md" />
            <div className="w-5 h-5 bg-rose-400 m-1 rounded-md" />          
            <div className="w-5 h-5 bg-stone-400 m-1 rounded-md" />          
            </div> */}
                
    </div>
    </div>
  );
};

export default Color;
