import Link from "next/link"


type Tag = {
    id:string
    value:string
}

type Note ={
    id:string
    title:string
    markdown:string    
}

type CardProps = {
    note: Note
    tags:Tag[] | null
}

const Card = ({note, tags} : CardProps) => {
    const {title, } = note


  return (
    
    <Link href='#'>  
    <div className="relative block rounded-md border border-gray-200 pt-6 pb-2 px-6 shadow-md">

  <div className="mt-2 text-gray-500 ">
    <h3 className="mt-2 text-xl font-bold text-gray-900">{title}</h3>
    <div className="flex flex-wrap gap-2 mt-4 justify-end">

       
       {/* <span key={tag.id} className="whitespace-nowrap rounded-full  bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-500">
        {tag.value}
      </span> */}
            
       
    </div>   
  </div>
  </div>
  </Link>


  )
}

export default Card