import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import CreatableSelect from "react-select/Creatable";
import Link from "next/link";

import {ChangeEvent, FormEvent, useState } from "react";


import { NoteData, Tag } from "../pages/create";
import { v4 as uuidV4 } from "uuid";


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);


type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  note?: NoteData
};

const NoteForm = ({ onSubmit, onAddTag, availableTags, note }: NoteFormProps) => {
  const existingTags = note?.tags ?? []
  const existingTitle = note?.title ?? null
  const existingMarkdown = note?.markdown ?? null  
  const [useEditor, setUseEditor] = useState(true)

  const [title, setTitle] = useState<string>(existingTitle)
  const [markdown, setMarkdown] = useState<string>(existingMarkdown)


  const [selectedTags, setSelectedTags] = useState<Tag[]>(existingTags);

  

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: title,
      markdown: markdown,
      tags: selectedTags,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=" lg:mx-20 mx-4  ">
        <div className="flex gap-2 md:gap-6  flex-row ">
          <div className="flex relative basis-1/2">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input

              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}

              value={title}
              required
              type="text"
              id="title"
              placeholder="Title"
              className="w-full rounded-md border-gray-300 pr-10 shadow-sm text-sm"
            />
          </div>

          <div className="flex basis-1/2">
            <CreatableSelect
            placeholder='Add Tags'
              onCreateOption={(label) => {
                const createdTag = { uuid: uuidV4(), label: label };
                onAddTag(createdTag);
                setSelectedTags((prev) => [...prev, createdTag]);
              }}
              defaultValue={existingTags.map((tag) => {
                return { label: tag.label, value: tag.uuid };
              })}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.uuid };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, uuid: tag.value };
                  })
                );
              }}
              isMulti
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                }),
                control: (base) => ({
                  ...base,
                  borderRadius: "0.375rem",
                }),
              }}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.uuid };
              })}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-end">
        <button className="text-black bg-gray-200 px-1" type="button"  onClick={() => setUseEditor(!useEditor)}>
          {useEditor?'Use Plain Text Editor': 'Use Markdown Editor'}
          </button>
          </div>
        {useEditor?

<div className="mt-2 h-full">
<MDEditor  
  previewOptions={{
    rehypePlugins: [[rehypeSanitize]],
  }}
  height={500} 
  value={markdown} 
  onChange={setMarkdown}
  highlightEnable={true} />
</div>
        :
         <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMarkdown(e.target.value)} /> }
        
 

        <div className="mt-2 flex flex-row gap-2 justify-end">
          <button
            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="submit"
          >
            Save
          </button>
          <Link href="..">
            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-400 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
