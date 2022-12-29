import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

const Editor = () => {
    return (
        <CKEditor
            editor={ BalloonEditor }
            data="<p>Hello from CKEditor 5!</p>"
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            }
}
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } } 
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            }
}
        />
    );
};

export default Editor;

