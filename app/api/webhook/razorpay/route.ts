import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    // Replace this line in your code:
    const signature = (await headers()).get("x-razorpay-signature") || (await headers()).get("X-Razorpay-Signature") as string;

    // 1. Signature Verify karna (Razorpay standard security)
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    // 2. Razorpay ka event check karna
    // Humne dashboard mein 'payment.captured' select kiya tha
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      
      // Ye metadata wahi hai jo humne route.ts mein 'notes' mein bheja tha
      const { courseId, userId } = payment.notes;

      if (!courseId || !userId) {
        return new NextResponse("Webhook Error: Missing metadata", { status: 400 });
      }

      // 3. Database mein purchase entry create karna
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        }
      });

      return new NextResponse("Purchase Created", { status: 200 });
    }

    // Dusre events ke liye success return karna taaki Razorpay baar-baar retry na kare
    return new NextResponse("Event ignored", { status: 200 });

  } catch (error: any) {
    console.error("[RAZORPAY_WEBHOOK_ERROR]", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }
}