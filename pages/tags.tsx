import { GetServerSideProps } from "next";
import Link from "next/link";
import { ChangeEvent } from "react";
import { useState } from "react";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import { Tag } from "./create";

type EditProps = {
  allTags: Tag[];
};

type FieldProps = {
  tag: Tag;
  setIsDone: () => void
  deleteTag: (tag: Tag) => void
};

function EditTags({ allTags }: EditProps) {
    const [localTags, setLocalTags] = useState(allTags)
    const [isDone, setIsDone] = useState(false)

    const deleteTag = async (tag:Tag) => {
        try {
            const uuid = tag.uuid
            await fetch(`api/content/tag/${uuid}`, {
                method: "DELETE",
                headers:{"Content-Type": "application/json"},                
            })
            
            setLocalTags(localTags.filter(tag => tag.uuid !== uuid))
        } catch (error){
            console.error(error)
        }
    }

  return (
    <div className="flex justify-center items-start pt-20 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white">
      <div className="relative w-full h-full max-w-sm md:h-auto">
        <div className="relative bg-white rounded-lg border shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <div className="flex flex-row justify-between items-center">
              <h3 className=" text-lg font-normal text-left text-gray-800 dark:text-grey-400">
                Edit Tags
              </h3>
              <Link href="..">
                <button
                  className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  {isDone? "Done": "Back"}
                </button>
              </Link>
            </div>
            <div className="mt-4 flex flex-col  gap-1">
              {localTags &&
                localTags.map((tag) => {
                  return <TagField key={tag.uuid} deleteTag={() => deleteTag(tag)} setIsDone={() => setIsDone(true)} tag={tag} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagField({ tag, setIsDone, deleteTag }: FieldProps) {
    const [label, setLabel] = useState(tag.label)
    const [isEdit, setIsEdit] = useState(false)
    

    const handleChange= (e:ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value)
        setIsEdit(true)
    }

    const saveChange = async () => {
        try {
            const body = {uuid: tag.uuid, label:label}
            await fetch(`/api/content/tag/${tag.uuid}`, {
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
        } catch (error) {
            console.error(error)
        }
        setIsEdit(false)
        setIsDone()
    }


  return (
    <div
      key={tag.uuid}
      className="border rounded-md flex flex-row justify-between "
    >
      <input
        type="text"
        className="pl-2 border-0 rounded-md"
        value={label}
        onChange={handleChange}
      />
      <div className="flex items-center">
        
        { isEdit && <button onClick={saveChange} type="button" className="h-full text-xs px-3 hover:bg-green-200">
          Save
        </button>}
        <button onClick={() => deleteTag(tag)} type="button" className="h-full text-lg px-3 hover:bg-red-200">
          &times;
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const allTags = await prisma.tag.findMany();

  return {
    props: { allTags: makeSerializable(allTags) },
  };
};

export default EditTags;
