import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/util";
import Link from 'next/link'
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {Note} from '../create'

type ReadProps = {
    note:Note
}

function Read({note}:ReadProps) {
    const router = useRouter()
    const {id} = router.query
  return (
    <div className="container mx-auto">
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-20">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
              {note.title}
            </h1>
          </div>
          <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
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
            <Link href='#'>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-red-400 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Delete
            </button>
            </Link>
            
          </div>
        </div>
      </div>
    </header>
    <div className="py-10 px-4 lg:px-20">
    <ReactMarkdown  remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{note.markdown}</ReactMarkdown>
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