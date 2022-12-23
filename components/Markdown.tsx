import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChangeEvent } from "react";


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

type MarkdownProps = {
    onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void
    markdown:string
}

function Markdown({onChange, markdown}) {
  
  return (
    <div className="mt-2 h-full">
      <MDEditor  
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        height={500} 
        value={markdown} 
        onChange={onChange}
        highlightEnable={true} />
    </div>
  );
}

export default Markdown;