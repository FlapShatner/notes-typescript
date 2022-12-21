import { Note, Tag } from "../pages/create";
import Header from "../components/Header";
import View from "../components/View";
import NotesList from "../components/NotesList";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";

type Props = {
  notes: Note[];
};

export default function Home({ notes }: Props) {
  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        <Header />
        <View />
        <NotesList notes={notes} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({ include: { tags: true } });

  console.log(notes);

  return {
    props: { notes: makeSerializable(notes) },
  };
};
