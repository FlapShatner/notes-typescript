import Card from "./Card"


import { Note, Tag} from '../pages/create'

type Props = {
    notes: Note[]
    tags:Tag[]
}


const NotesList: React.FC<Props> = ({notes, tags}) => {
    

if(!notes){
    return <h3>loading...</h3>
}

  return (
    <>
        <div className="pt-10 px-4 lg:px-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map(note => (
                <div key={note.id}>
                    <Card tags={tags} note={note}/>
                </div>
            ))}
        </div>
    </>
  )
}

export default NotesList