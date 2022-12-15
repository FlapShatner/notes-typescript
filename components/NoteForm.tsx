import CreatableSelect from 'react-select/Creatable'
import Link from 'next/link'
import { useRef, FormEvent, useState } from 'react'
import { NoteData, Tag } from '../pages/create'
import {v4 as uuidV4} from "uuid"


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag:Tag) => void
    availableTags: Tag[]
}

const NoteForm = ({onSubmit, onAddTag, availableTags}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }

  

  return (
    <>
      <form onSubmit={handleSubmit} className=' lg:mx-20 mx-4  '>
        <div className='flex gap-2 md:gap-6  flex-row '>
          <div className='flex relative basis-1/2'>
            <label htmlFor='title' className='sr-only'>             
              Title
            </label>
            <input ref={titleRef} required type='text' id='title' placeholder='Title' className='w-full rounded-md border-gray-300 pr-10 shadow-sm text-sm' />
          </div>

          <div className='flex basis-1/2'>
            <CreatableSelect
              onCreateOption={label => {
                const newTag = {id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag])
              }}
                value={selectedTags.map(tag => {
                    return {label:tag.label, value:tag.id}
                })}
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                        return { label:tag.label, id:tag.value}
                    }))
                }}
              isMulti
              styles={{
                container: (base) => ({
                  ...base,
                  width: '100%',
                }),
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                }),
              }}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id}
              })}
            />
          </div>
        </div>
        <textarea ref={markdownRef} rows={15} className='mt-10 w-full rounded-md border-gray-300 pr-10 shadow-sm' required />

        <div className='mt-2 flex flex-row gap-2 justify-end'>
          <button
            className='block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring'
            type='submit'>
            Save
          </button>
          <Link href='..'>
          <button
            className='inline-flex items-center justify-center rounded-lg border border-gray-400 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring font-medium text-sm'
            type='button'>
            Cancel
          </button>
          </Link>
        </div>
      </form>
    </>
  )
}

export default NoteForm
