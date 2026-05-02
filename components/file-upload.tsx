"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            appearance={{
                container: "border-2 border-dashed border-slate-300 rounded-md p-4",
                uploadIcon: "text-slate-400 w-8 h-8",
                label: "text-slate-500 text-sm",
                allowedContent: "text-slate-400 text-xs",
                button: "bg-blue-500 text-white text-xs rounded px-4 py-2 mt-2 ut-uploading:bg-blue-300",
            }}
            onClientUploadComplete={(res) => {
                onChange(res?.[0]?.url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    );
}