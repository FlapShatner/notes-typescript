import Link from "next/link";
import NoteForm from "../../components/NoteForm";
import Router from "next/router";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/util";
import Button from "../../components/buttons/Button";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  color:string;
  tags: Tag[];  
};

type EditProps ={
  note: Note
  tags: Tag[]
}

export type Tag = {
  uuid: string;
  label: string;
};

function Edit({ tags, note } : EditProps) {
  const noteTags = note.tags
  async function onEditNote( { title, markdown, tags, color }: NoteData) {
   
    try {
      const body = { title: title, markdown: markdown, color:color, tags: tags };
      await fetch(`/api/content/post/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(`/${note.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTag({ label, uuid }: Tag) {
    try {
      const body = { label: label, uuid: uuid };
      await fetch("/api/content/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-20">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
              {note.title}
            </h1>
            
          </div>
          <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
            <Link href="..">
              <Button>Back?</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <NoteForm
          onAddTag={addTag}
          availableTags={tags}
          onSubmit={onEditNote}
          note={note}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.params.id
    const tags = await prisma.tag.findMany()
    const note = await prisma.note.findUnique({
        where: {
            id: id as string
        },
        include: {
          tags: true
        }
    })

    return {
        props: {
            note: makeSerializable(note),
            tags: makeSerializable(tags)
        }
}
};

export default Edit;
