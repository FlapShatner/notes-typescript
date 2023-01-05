import { Note, Tag } from "../pages/create";
import { useState } from "react";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import SearchInput from "../components/SearchInput";
import SelectBox from "../components/SelectBox";

import { useMemo } from "react";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";



type Props = {  
  notes: Note[];
  allTags: Tag[];
};

export default function Home({ notes, allTags }: Props) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState("");
  

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        (query === "" ||
          note.title.toLowerCase().includes(query.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.uuid === tag.uuid)
          ))
      );
    });
  }, [query, selectedTags, notes]);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl ">
        <Header />
        <div className="lg:mx-20 mx-4 gap-2 md:gap-6 flex flex-row">
          <SearchInput
            query={query}
            setQuery={(query: string) => setQuery(query)}
          />
          <SelectBox
            setSelectedTags={(tags: Tag[]) => setSelectedTags(tags)}
            selectedTags={selectedTags}
            allTags={allTags}
          />
        </div>
       
        <NotesList notes={filteredNotes} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const user = session?.user?.id;
if(!user) return {props: {notes: [], allTags: []}}
  const currentUser = await prisma.user?.findUnique({
    where: {
      id: user,
    },
    include: {
      notes: {
        include: {
          tags: true,
        },
      },
    },
  });

  const allTags = await prisma.tag.findMany();


  return {
    props: {
      notes: makeSerializable(currentUser.notes),
      allTags: makeSerializable(allTags),
    },
  };
  
};
