import Link from "next/link"
import { useMemo } from "react"
import NoteForm from "../components/NoteForm"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Router from "next/router"
import { GetServerSideProps } from "next"
import prisma from "../lib/prisma"
import { makeSerializable } from "../lib/util"


export type Note ={
  id: number  
} & NoteData

export type NoteData = {
  title: string
  markdown:string
  tags: Tag[]
}

export type RawNote = {
  id:number  
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown:string
  tags:Tag[]
  newTags:TagLabel[]
}

export type TagLabel = {
  label:string
}

export type Tag = {
  id:number
  label:string
}

function Create({tags}) {
  // const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  // const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  // const notesWithTags = useMemo(() => {
  //   return notes.map(note => {
  //     return {...note, tags: tags.filter(tag => note.tagsIds.includes(tag.id))}
  //   })
  // },[notes, tags])

  // function onCreateNote({tags, ...data}: NoteData) {
  //   setNotes(prev => {
  //     return [...prev, { ...data, id: uuidV4(), tagsIds:tags.map(tag => tag.id)}]
  //   })
  // }

  async function onCreateNote({title, markdown, tags}: NoteData){
    
    try{
      const body = {title:title, markdown: markdown, tags: tags}
      await fetch('/api/content/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  
  
  

  async function addTag({label}:TagLabel){
    // setTags(prev => [...prev, tag])
  
    try{
      const body = {label:label}
      await fetch('api/content/tag', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
    } catch (error){
      console.error(error)
    }
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

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await prisma.tag.findMany()

  return {
    props: {tags: makeSerializable(tags)}
  }
}



export default Create

