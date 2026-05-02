import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { userId } = await auth();
  const resolvedParams = await params;


  const course = await db.course.findFirst({
    where: {
      id: resolvedParams.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course ) {
    return redirect("/");
  }

  return redirect(
    `/courses/${course.id}/chapters/${course.chapters[0].id}`
  );
};

export default CourseIdPage;