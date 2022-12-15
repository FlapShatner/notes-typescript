
import Card from "./Card"

const NotesList = () => {

    const notes = [
        {
        id: 1,
        title:'First',
        markdown:'Some markdown here',
        tags: []
    },
    {
        id: 2,
        title:'Second',
        markdown:'Some markdown here',
        tags: []
    },
    {
        id: 3,
        title:'Third',
        markdown:'Some markdown here',
        tags: []
    },
    {
        id: 4,
        title:'Fourth',
        markdown:'Some markdown here',
        tags: []
    },    
]

  return (
    <>
        <div className="pt-10 px-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map(note => (
                <div key={note.id}>
                    <Card note={note}/>
                </div>
            ))}
        </div>
    </>
  )
}

export default NotesList