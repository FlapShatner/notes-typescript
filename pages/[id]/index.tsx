import { GetServerSideProps } from "next";
import { useState, useMemo, useEffect } from "react";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/util";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Note } from "../create";
import Button from "../../components/buttons/Button";
import ButtonOutline from "../../components/buttons/ButtonOutline";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import { Loader } from "../../components/Loader";
import dynamic from "next/dynamic";

type ReadProps = {
  note: Note;
};

type ModalProps = {
  setShow: () => void;
  noteId: string | string[];
};

function Read({ note }: ReadProps) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const bg = note?.color;
  let tags = [];
  if (note?.tags !== null) {
    tags = note?.tags;
  }

  const QuillNoSSRWrapper = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <Loader />,
      }),
    []
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.ql-editor { background-color: ${bg} !important; }`;
    document.body.appendChild(style);
  }, [bg]);

  const modules = {
    toolbar: false,
  };

  return (
    <div className="container max-w-screen-xl  mx-auto">
      <header aria-label="Page Header">
        <div className="mx-auto px-10 py-8 md:px-20 ">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <h1 className="text-3xl mt-6 md:mt-0 text-gray-900 sm:text-4xl font-medium">
                {note?.title}
              </h1>
              <div className="flex flex-row gap-2 mt-2">
                {tags?.map((tag) => {
                  return (
                    <span
                      key={tag.uuid}
                      className="whitespace-nowrap rounded-full  bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-500"
                    >
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className=" flex gap-4  md:flex-row sm:items-center justify-end">
              <Link href="/">
                <Button>Back</Button>
              </Link>
              <Link href={`${id}/edit`}>
                <ButtonOutline>Edit</ButtonOutline>
              </Link>

              <ButtonDelete onClick={() => setShow(true)}>Delete</ButtonDelete>
            </div>
          </div>
        </div>
      </header>
      <div className="py-0 sm:py-10 px-4 mx-10 md:mx-20">
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            modules={modules}
            readOnly={true}
            value={note?.markdown ? JSON.parse(note?.markdown) : ""}
          />
        )}
      </div>

      {show && <DeleteModal noteId={id} setShow={() => setShow(false)} />}
    </div>
  );
}

function DeleteModal({ setShow, noteId }: ModalProps) {
  async function handleDelete() {
    try {
      await fetch(`/api/content/post/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-start pt-20 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-70">
      <div className="relative w-full h-full max-w-xs md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-red-400">
              Delete?
            </h3>
            <button
              onClick={handleDelete}
              type="button"
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Delete
            </button>
            <button
              onClick={setShow}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params.id;

  const note = await prisma.note.findUnique({
    where: {
      id: id as string,
    },
    include: {
      tags: true,
    },
  });

  return {
    props: {
      note: makeSerializable(note),
    },
  };
};
