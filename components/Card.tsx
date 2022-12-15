import Link from "next/link"

type Note ={
    id:number
    title:string
    markdown:string
    tags:string[]
}

type CardProps = {
    note: Note
}

const Card = ({note} : CardProps) => {
  return (
    
    <Link href='#'>  
    <div
  className="relative block rounded-xl border border-gray-200 p-8 shadow-md"  
>

  <div className="mt-4 text-gray-500 sm:pr-8">


    <h3 className="mt-4 text-xl font-bold text-gray-900">{note.title}</h3>

   
  </div>
  </div>
  </Link>


  )
}

export default Card