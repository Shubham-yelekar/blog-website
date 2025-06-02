import { Editor } from "@tinymce/tinymce-react";
import { Controller, type Control } from "react-hook-form";

interface RTEProps {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: string;
}

const RTE = ({ name, control, label, defaultValue = "" }: RTEProps) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
