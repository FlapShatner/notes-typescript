import dynamic from "next/dynamic";
import { useCallback, useEffect, Suspense } from "react";
import { Loader } from "./Loader";

const Editor = ({ markdown, setMarkdown, bg }) => {
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <Loader />,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemoQuill = useCallback(QuillNoSSRWrapper, []);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link"],
        ["clean"],
      ],
    },
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.ql-editor { background-color: var(--${bg}) !important; }`;
    document.body.appendChild(style);
  }, [bg]);

  const handleChange = (content, delta, source, editor) => {
    setMarkdown(editor.getContents());
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <MemoQuill
          theme="snow"
          modules={modules}
          defaultValue={markdown}
          onChange={handleChange}
        />
      </Suspense>
    </>
  );
};

export default Editor;
