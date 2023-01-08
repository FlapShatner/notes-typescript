import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import Button from "./buttons/Button"
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { NoteData, Tag } from "../pages/create";
import { v4 as uuidV4 } from "uuid";
import ButtonOutline from "./buttons/ButtonOutline";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Editor from "./Editor";
import Color from "./Color";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  note?: NoteData;
};

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  note,
}: NoteFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [noteTemp, setNoteTemp] = useLocalStorage("tempNote", {
    title: "",
    markdown: "",
    tags: [],
    color: "",
  });

  


  const delta = note
    ? JSON.parse(note?.markdown)
    : noteTemp.markdown
    ? JSON.parse(noteTemp.markdown)
    : null;

  let existingTags = note?.tags ?? noteTemp.tags ?? [];
  let existingTitle = note?.title ?? noteTemp.title ?? "";
  let existingMarkdown = note?.markdown ?? noteTemp.markdown ?? "";
  let existingColor = note?.color ?? noteTemp.color ?? "indigo";

  const [title, setTitle] = useState<string>(existingTitle);
  const [markdown, setMarkdown] = useState<string>(existingMarkdown);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(existingTags);

  const [selected, setSelected] = useState<string>(existingColor);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!session) {
      setNoteTemp({
        title: title,
        markdown: JSON.stringify(markdown),
        color: selected,
        tags: selectedTags,
      });
      router.push("/auth/signin");
    }

    


    localStorage.removeItem("tempNote");

    onSubmit({
      title: title,
      markdown: JSON.stringify(markdown),
      tags: selectedTags,
      color: selected,
    });
  }

  const handleCancel = () => {
    localStorage.removeItem("tempNote");
    router.push("/");
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
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
              placeholder="Add Tags"
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
        <Color setSelected={setSelected} />
        
        <div className="mt-4 h-full">
          { typeof window !== 'undefined' &&
            <Editor bg={selected} markdown={delta} setMarkdown={setMarkdown} />
}
        </div>
        <div className="mt-4 flex flex-row gap-2 justify-end">
          <div onClick={handleSubmit}>
          <Button >Save</Button>
          </div>
          <div onClick={handleCancel}>
            <ButtonOutline >Cancel</ButtonOutline>
            </div>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
