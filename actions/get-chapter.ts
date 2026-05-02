import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // 1. Purchase status check karein
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

    // 2. Course aur Chapter ek sath fetch karein
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    // Same logic: Agar dono nahi milte toh null return karein
    if (!chapter || !course) {
      return {
        chapter: null,
        course: null,
        muxData: null,
        attachments: [],
        nextChapter: null,
        userProgress: null,
        purchase: null,
      };
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // Logic: Agar purchased hai toh attachments dikhayein
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId
        }
      });
    }

    // Logic: Agar free hai ya purchased hai toh video data dikhayein
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        }
      });
    }

    // Next chapter fetch karein
    nextChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
        isPublished: true,
        position: {
          gt: chapter?.position,
        }
      },
      orderBy: {
        position: "asc",
      }
    });

    // User progress fetch karein
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };

  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};