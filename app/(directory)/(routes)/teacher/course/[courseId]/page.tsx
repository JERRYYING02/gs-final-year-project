import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Layers  } from "lucide-react";
import { IconHelper } from "@/components/iconHelpers";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

  const { userId } = auth();
  if (!userId) {
      return redirect("/");
  }

  const course = await db.course.findUnique({
      where: {
          id: params.courseId,
      },
  });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ];

    const everyFields = requiredFields.length;
    const submittedFields = requiredFields.filter(Boolean).length;

    const submissionIndicator = `(${submittedFields} out of ${everyFields})`;

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl">Manage course</h1>
                    <h3 className=" text-gray-500">
                        Please submit all sections {submissionIndicator}
                    </h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div>
                    <div className="flex items-center gap-x-3">
                        <IconHelper icon={Layers} />
                        <h2 className="text-xl font-semibold">Edit your course</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseIdPage;