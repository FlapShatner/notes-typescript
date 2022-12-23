import CreatableSelect from "react-select/Creatable";
import Link from "next/link";
import {FormEvent, useState } from "react";
import Markdown from "./Markdown";
import { NoteData, Tag } from "../pages/create";
import { v4 as uuidV4 } from "uuid";

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

  function handleMarkdownChange(e){
    setMarkdown(e.target.value)
  }
  function handleTitleChange(e){
    setTitle(e.target.value)
  }

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
              onChange={handleTitleChange}
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
        <Markdown markdown={markdown} onChange={handleMarkdownChange} />
        :
         <textarea
          onChange={handleMarkdownChange}
          value={markdown}
          rows={20}
          className="mt-2 w-full rounded-md border-gray-300 pr-10 shadow-sm"
          required
        /> }

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
