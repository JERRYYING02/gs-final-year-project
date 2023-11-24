import { Editor } from '@tinymce/tinymce-react';

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

export const EditorMCE = ({ onChange, value }: EditorProps) => {
    return (
        <div className="bg-white">
            <Editor
                apiKey='reld3jnr3bel2ypkmzu3hgmc4t8aw7it8l6j4bi3xi7mt18k'
                initialValue={value}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help' 
                }}
                onEditorChange={onChange}
            />
        </div>
    );
};