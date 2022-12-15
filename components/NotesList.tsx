import Card from "./Card"



const NotesList = () => {
    

    const notes = [
        {
        id: 'one',
        title:'First',
        markdown:'Some markdown here',
        tagIds: [1]
    },
    {
        id: 'two',
        title:'Second',
        markdown:'Some markdown here',
        tagIds: [1,2]
    },
    {
        id: 'three',
        title:'Third',
        markdown:'Some markdown here',
        tagIds: [1,2,3]
    },
    {
        id: 'four',
        title:'Fourth',
        markdown:'Some markdown here',
        tagIds: [1,2,3,4]
    },    
]

const tags = [
    {
        id:'one',
        value:'tag1'
    },
    {
        id:'two',
        value:'tag2'
    },
    {
        id:'three',
        value:'tag3'
    },
    {
        id:'four',
        value:'tag4'
    },
]



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