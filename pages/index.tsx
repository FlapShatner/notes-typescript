import { Note, Tag } from "../pages/create";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import SearchInput from "../components/SearchInput";
import SelectBox from "../components/SelectBox";

type Props = {
  notes: Note[];
  allTags: Tag[]
};

export default function Home({ notes, allTags }: Props) {
  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        <Header allTags={allTags}/>
        <div className="lg:mx-20 mx-4 gap-2 md:gap-6 flex flex-row">
        <SearchInput />
        <SelectBox allTags={allTags}/>
      </div>
        <NotesList notes={notes} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({ include: { tags: true } });
  const allTags = await prisma.tag.findMany();

 

  return {
    props: { notes: makeSerializable(notes), allTags: makeSerializable(allTags) },
  };
};
