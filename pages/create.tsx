import Link from "next/link"
import { useMemo } from "react"
import NoteForm from "../components/NoteForm"
import { useLocalStorage } from "../hooks/useLocalStorage"
import {v4 as uuidV4 } from "uuid"

export type Note ={
  id:string   
} & NoteData

export type NoteData = {
  title: string
  markdown:string
  tags: Tag[]
}

export type RawNote = {
  id:string  
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown:string
  tagsIds: string[]
}

export type Tag = {
  id:string
  label:string
}

function Create() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagsIds.includes(tag.id))}
    })
  },[notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prev => {
      return [...prev, { ...data, id: uuidV4(), tagsIds:tags.map(tag => tag.id)}]
    })
  }

  function addTag(tag:Tag){
    setTags(prev => [...prev, tag])
  }

  return (
    <div className="container max-w-screen-xl mx-auto">
     <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-20">
     <div className="flex items-center justify-between">
      <div className="text-left">
        <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
          New Note
        </h1>
      </div>
      <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
        <Link href='..'>
      <button
          className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
          Back 
        </button>
        </Link>               
      </div>
    </div>
    
     </div>
     <div className="mx-auto">
        <NoteForm onAddTag={addTag} availableTags={tags} onSubmit={onCreateNote} />
    </div>
    </div>
  )
}

export default Create