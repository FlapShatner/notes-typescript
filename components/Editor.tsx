import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { Loader } from "./Loader";

const Editor = ({ markdown, setMarkdown, bg }) => {
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <Loader />,
  });

  const MemoQuill = useCallback(QuillNoSSRWrapper, []);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {    
      const style = document.createElement("style");
      style.innerHTML = `.ql-editor { background-color: ${bg} !important; }`;
      document.body.appendChild(style);
  }, [bg])

  const handleChange = (content, delta, source, editor) => {
    setMarkdown(editor.getContents());
  };

  return (
    <>
      <MemoQuill
        theme="snow"
        modules={modules}
        defaultValue={markdown}
        onChange={handleChange}
      />
    </>
  );
};

export default Editor;
