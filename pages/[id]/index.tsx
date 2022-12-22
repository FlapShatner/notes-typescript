import { GetServerSideProps } from "next";
import { useState } from "react";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/util";
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {Note} from '../create'

type ReadProps = {
    note:Note
}

type ModalProps = {
    setShow: () => void
    noteId: string | string[]
}

function Read({note}:ReadProps) {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const {id} = router.query
  return (
    <div className="container max-w-screen-xl  mx-auto">
    <header aria-label="Page Header">
      <div className="mx-auto px-10 py-8 md:px-20 ">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
          <div className="text-left">
            <h1 className="text-3xl mt-4 md:mt-0 text-gray-900 sm:text-4xl font-medium">
              {note.title}
            </h1>
          </div>
          <div className=" flex gap-4  md:flex-row sm:items-center justify-end">
            <Link href="..">
              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Back
              </button>
            </Link>
            <Link href={`${id}/edit`}>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-indigo-400 px-5 py-3 text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Edit
            </button>
            </Link>            
            
            <button onClick={() => setShow(true)}
              className="inline-flex items-center justify-center rounded-lg border border-red-400 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Delete
            </button>
            
            
          </div>
        </div>
      </div>
    </header>
    <div className="py-10 px-4 mx-10 md:mx-20">
    <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{note.markdown}</ReactMarkdown>
    </div>

    {show && <DeleteModal noteId={id} setShow={() => setShow(false)}/>}
    
    </div>
  )
}



function DeleteModal ({setShow, noteId}:ModalProps) {

   async function handleDelete() {
        try {
            await fetch(`/api/content/post/${noteId}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            })
            await Router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center items-start pt-20 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-70">
    <div className="relative w-full h-full max-w-xs md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">                
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                
                <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-red-400">Delete?</h3>
                <button onClick={handleDelete} type="button" className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Delete
                </button>
                <button onClick={setShow} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
        </div>
    </div>
</div>
    )
}

export default Read

export const getServerSideProps :GetServerSideProps = async (ctx) => {
    const id = ctx.params.id
    const note = await prisma.note.findUnique({
        where: {
            id: Number(id)
        }
    })

    return {
        props: {
            note: makeSerializable(note)
        }
}
}