import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> } // Promise add kiya
) {
    try {
        const user = await currentUser();
        const { courseId } = await params;
        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: (await params).courseId,
                isPublished: true,
            }
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: (await params).courseId
                }
            }
        });

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        }

        // 1. Razorpay Customer handle karna
        let razorpayCustomer = await db.razorpayCustomer.findUnique({
            where: { userId: user.id },
        });

        if (!razorpayCustomer) {
            const customer = await razorpay.customers.create({
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName || "User",
            });

            razorpayCustomer = await db.razorpayCustomer.create({
                data: {
                    userId: user.id,
                    razorpayCustomerId: customer.id,
                }
            });
        }

        // 2. Razorpay Order create karna (Stripe Sessions ki jagah)
        const order = await razorpay.orders.create({
            amount: Math.round(course.price! * 100), // Paise mein (INR)
            currency: "INR",
            receipt: course.id,
            notes: {
                courseId: course.id,
                userId: user.id,
            }
        });

        // 3. Order ID return karna (URL nahi, kyunki Razorpay popup frontend se khulta hai)
        return NextResponse.json({ 
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.error("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}