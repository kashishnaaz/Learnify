"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-2 bg-white">
      <div className="flex gap-2 mb-2 border-b pb-2 flex-wrap">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded font-bold text-sm ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >B</button>

        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded italic text-sm ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >I</button>

        <button type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded underline text-sm ${editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >U</button>

        <button type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >• List</button>

        <button type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >1. List</button>

        <button type="button"
          onClick={() => {
            const url = prompt("URL daalo:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >🔗 Link</button>
      </div>

      <EditorContent editor={editor} className="min-h-[150px] p-2" />
    </div>
  );
};