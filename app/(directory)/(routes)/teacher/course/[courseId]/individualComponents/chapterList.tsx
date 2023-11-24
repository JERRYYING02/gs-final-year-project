"use client";

import { useState, useEffect } from "react";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
    items: Chapter[];
    onArrangement: (
        updateData: {
            id: string;
            position: number;
        }[]
    ) => void;

    /* on reorder is a function arrange chapter position and API will
       update position of chapters in database.
    */
    onEditing: (id: string) => void;
    //assign void ensure action is executed
}

export const ChaptersList = ({
    items,
    onArrangement,
    onEditing,
}: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    /* 
        isMounted is a state that is used to fix hydration issues
        (what rendered on the server-side and what was rendered on the client-side doesn't match) 
        use client still running on the server side
        
        so to prevent we do not show anything mounted if as initial state is false(server side do not render this whole code)
        but only when hit client side then set true
        
        this issue come from drag and drop which is not managable by server-side rendering
	 */
    useEffect(() => {
        setIsMounted(true);
    }, []);

    //reset effect when items change
    useEffect(() => {
        setChapters(items);
    }, [items]);

    /*
		This function only updates the item positions on the client side.if the onArrangement function is disabled, 
        these changes will not be sent the API.new positions of chapyer will not be stored in the database until bulk update is called.
	*/
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [arrangedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, arrangedItems);

        const startIndex = Math.min(
            result.source.index,
            result.destination.index
        );

        const endIndex = Math.max(
            result.source.index,
            result.destination.index
        );

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id),
        }));

        onArrangement(bulkUpdateData);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            chapter.isPublished &&
                                                "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                chapter.isPublished &&
                                                    "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-5 w-5" />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFreeAccess && (
                                                <Badge>Free</Badge>
                                            )}
                                            <Badge
                                                className={cn(
                                                    "bg-slate-500",
                                                    chapter.isPublished &&
                                                        "bg-sky-700"
                                                )}
                                            >
                                                {chapter.isPublished
                                                    ? "Published"
                                                    : "Draft"}
                                            </Badge>
                                            <Pencil
                                                onClick={() =>
                                                    onEditing(chapter.id)
                                                }
                                                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};