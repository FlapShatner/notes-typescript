import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const Editor = ({markdown, setMarkdown}) => {

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
        ssr: false,
        loading: () => <p>Loading ...</p>,
        })
    
      const MemoQuill = useCallback(QuillNoSSRWrapper,[]);
    
        const modules = {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image"],
            ["clean"],
          ]
        }

        

      

     const handleChange = (content, delta, source, editor) => {
        setMarkdown(editor.getContents());        
     }  

     if (typeof window === "undefined") {
        return <p>Loading...</p>
     }

     
      
    return (
       <>
        <MemoQuill 
        theme="snow"
        modules={modules}
        defaultValue={markdown}
        onChange={handleChange}
        />
       </>
    )
};

export default Editor;

