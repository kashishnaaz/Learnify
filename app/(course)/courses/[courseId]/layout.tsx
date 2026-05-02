import Script from "next/script";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async({
    children,
    params
}:{
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}) => {
    const { userId } = await auth();
    const resolvedParams = await params;

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findFirst({
        where: {
            id: resolvedParams.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id);

    return (
        <div className="h-full">
            {/* Logic Same Hai: Bas strategy 'afterInteractive' ki hai taaki console error na aaye */}
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive" 
            />
            
            <div className="h-[80px] md:pl-80 fixed top-0 w-full z-50">
               <CourseNavbar 
                 course={course}
                 progressCount={progressCount}
               />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar  
                   course={course}
                   progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout;