
import {useSession } from "next-auth/react";
import Link from "next/link";
import NoteForm from "../components/NoteForm";
import Router from "next/router";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import Button from "../components/buttons/Button";
import { useRouter } from "next/router";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  color: string;
  tags: Tag[];
};

export type Tag = {
  uuid: string;
  label: string;
};


function Create({ tags }) {
  const { data: session } = useSession();
  const user = session?.user?.id
  const router = useRouter();
  
  async function onCreateNote({ title, markdown, tags, color }: NoteData) {
    if(!user){
      router.push('/auth/signin')
   
  } else{
    try {
      const body = { title: title, markdown: markdown, color:color, tags: tags, id: user };
      await fetch("/api/content/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
  }

  const back = () => {
    localStorage.removeItem("tempNote");
    Router.push("/")
  }

  async function addTag({ label, uuid }: Tag) {
    try {
      const body = { label: label, uuid: uuid };
      await fetch("api/content/tag", {
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
      <div className=" max-w-screen-xl py-8 lg:px-0 mx-4 lg:mx-20">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
              New Note
            </h1>
          </div>
          <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
            <div onClick={back}>
              <Button >Back</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto">
        <NoteForm
          onAddTag={addTag}
          availableTags={tags}
          onSubmit={onCreateNote}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await prisma.tag.findMany();

  return {
    props: { tags: makeSerializable(tags) },
  };
};

export default Create;
