import Link from "next/link";
import { ChangeEvent, useState, useRef } from "react";
import { Tag } from "../pages/create";


type HeaderProps = {
  allTags: Tag[];  
};

type ModalProps = {
  setShowModal: () => void
} & HeaderProps

type TagFieldProps = {
  tag: Tag;
};

function Header({ allTags }: HeaderProps) {
const [showModal, setShowModal] = useState(false)

  return (
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-20">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
              Notes
            </h1>
          </div>
          <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
            <Link href="/create">
              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create
              </button>
            </Link>
            <button
            onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center rounded-lg border border-indigo-400 px-5 py-3 text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Edit Tags
            </button>
          </div>
        </div>
      </div>
      {showModal && <TagsModal setShowModal={() => setShowModal(false)} allTags={allTags} />}
      
      
    </header>
  );
}

function TagsModal({ allTags, setShowModal }: ModalProps) {
  async function handleDelete() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-start pt-20 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-70">
      <div className="relative w-full h-full max-w-sm md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
          onClick={setShowModal}
            type="button"
            className="absolute top-1 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <span className="sr-only">Close modal</span>
            <span className="text-gray-900 leading-none text-2xl">&times;</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-left text-gray-800 dark:text-grey-400">
              Edit Tags
            </h3>
            <div className="flex flex-col gap-1">
              {allTags &&
                allTags.map((tag) => {
                  return <TagField key={tag.uuid} tag={tag} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagField({ tag }: TagFieldProps) {
  const [label, setLabel] = useState(tag.label);
  const [isChanged, setIsChanged] = useState(false)

  const handleChange=(e)=>{
    setLabel(e.target.value);
    setIsChanged(true)
  }

  async function handleSave() {
      try {
        const body = {uuid: tag.uuid, label: label}
        await fetch(`/api/content/tag/${tag.uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        })
      } catch (error) {
        console.error(error)
      }
    }
  
   

  

  return (
    <div key={tag.uuid} className="border flex flex-row justify-between ">
      <input
        onChange={handleChange}
        type="text"
        className="pl-2 border-0"
        value={label}        
      />
      <div className="flex items-center">
        {isChanged && <button onClick={handleSave} className="text-xs h-full px-1 hover:bg-green-200" type="button">Save</button>}
      
      <button type="button" className="h-full text-lg px-3 hover:bg-red-200">&times;</button>
      </div>
    </div>
  );
}

export default Header;
