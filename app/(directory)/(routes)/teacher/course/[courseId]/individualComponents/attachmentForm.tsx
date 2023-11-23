"use client";

import { useState } from "react";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FileUpload } from "@/components/fileUpload";
import { Course , Attachment} from "@prisma/client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm = ({
    initialData,
    courseId,
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingAttachmentId, setDeletingAttachmentId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            /* 
                different from other components,attachments is 
                handle by individual made route as attachments is stored in 
                its own model table database
            */
            await axios.post(`/api/course/${courseId}/attachments`, values);
            toast.success("Course is updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const onDeleteAttachment = async (id: string) => {
        try {
            setDeletingAttachmentId(id);
            await axios.delete(`/api/course/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setDeletingAttachmentId(null);
        }
    };

    return (
        <div className="mt-5 border rounded-md bg-gray-100 p-4">
            <div className="font-medium flex items-center justify-between">
                Course attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-gray-500 italic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {deletingAttachmentId === attachment.id && (
                                        <div className="ml-auto">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {deletingAttachmentId !== attachment.id && (
                                        <button
                                            onClick={() =>
                                                onDeleteAttachment(attachment.id)
                                            }
                                            className="ml-auto hover:opacity-75 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your students might need to complete the
                        course.
                    </div>
                </div>
            )}
        </div>
    );
};