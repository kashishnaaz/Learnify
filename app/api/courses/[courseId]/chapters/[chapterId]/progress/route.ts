import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    // Context ko second argument ke taur par handle karein
    context: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { isCompleted } = await req.json();
        
        // Next.js 15 Fix: Params ko yahan await karein
        const { courseId, chapterId } = await context.params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId,
                isCompleted,
            }
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}