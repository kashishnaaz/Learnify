
import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findFirst({
      where: {
        id: (await params).courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: (await params).chapterId,
        courseId: (await params).courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: (await params).chapterId,
        },
      });
   
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    // Delete the chapter
    const deletedChapter = await db.chapter.delete({
      where: {
        id: (await params).chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: (await params).courseId,
        isPublished: true,
      },
    });

    if(!publishedChaptersInCourse.length){
      await db.course.update({
        where: {
          id: (await params).courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return  NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}    

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resolvedParams = await params; // ✅ ek baar await karo

    const ownCourse = await db.course.findFirst({
      where: {
        id: resolvedParams.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: resolvedParams.chapterId,
      },
      data: { ...values },
    });

    // ✅ return pehle nahi — Mux code pehle chalega
    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: resolvedParams.chapterId,
        },
      });

      if (existingMuxData) {
        // ✅ v14 mein assetId string pass karo
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await mux.video.assets.create({
          inputs: [{ url: values.videoUrl }],
           playback_policy: ["public"], // ✅ ARRAY
        });

      await db.muxData.create({
        data: {
          chapterId: resolvedParams.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id || "",
        },
      });
    }

    return NextResponse.json(chapter); // ✅ Ab yahan return karo

  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}