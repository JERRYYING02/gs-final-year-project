import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } } //destructure the params
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("unauthorized user", { status: 401 });
        }
        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });
        return NextResponse.json(course);
    } catch (error) {
        console.log("api/[courseId] error", error);
        return new NextResponse("internal server error", { status: 500 });
    }
}