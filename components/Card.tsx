import Link from "next/link"
import { Note} from "../pages/create"

export type CardProps = {
    note: Note
}

const Card = ({note} : CardProps) => {
    const {title, tags } = note

  return (    
    <Link href={`/${note.id}`}>  
      <div className={`relative block rounded-md border border-gray-200 pt-6 pb-2 px-6 shadow-md`} style={{backgroundColor:note.color}}>
        <div className="mt-2 text-gray-500 ">
          <h3 className="mt-2 text-xl font-bold text-gray-900">{title}</h3>   
            <div className="flex flex-wrap gap-2 mt-4 justify-end">
                {tags && tags.map((tag) => {
                  return (<span key={tag.uuid} className="whitespace-nowrap rounded-full  bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-500">
                    {tag.label}
                  </span>)
                })}      
            </div>   
        </div>
      </div>
    </Link>
  )
}

export default Card