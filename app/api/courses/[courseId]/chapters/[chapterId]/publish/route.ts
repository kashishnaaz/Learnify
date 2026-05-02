import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(
    req:Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
){
    try{
        const{ userId }=await auth();

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

        const muxData = await db.muxData.findFirst({
            where: {
                chapterId: (await params).chapterId,
            },
        });

        if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: (await params).chapterId,
                courseId: (await params).courseId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedChapter);
    }catch(error){
        console.log("[CHAPTER_PUBLISH]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}