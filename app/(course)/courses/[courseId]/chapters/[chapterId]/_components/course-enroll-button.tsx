"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    // SDK ko manually load karne ka function
    const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const onClick = async () => {
        try {
            setIsLoading(true);

            // 1. Check karein ki Razorpay load hua hai ya nahi, agar nahi toh load karein
            if (!(window as any).Razorpay) {
                const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!res) {
                    toast.error("Razorpay SDK failed to load. Check your internet.");
                    return;
                }
            }

            // 2. Backend se Order ID mangwayein
            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            // 3. Razorpay Options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: response.data.amount,
                currency: response.data.currency,
                name: "LMS Platform",
                description: "Purchase Course",
                order_id: response.data.id,
                handler: async function (response: any) {
                    toast.success("Payment successful!");
                    window.location.reload();
                },
                theme: {
                    color: "#0369a1",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button 
            size="sm" 
            className="w-full md:w-auto"
            onClick={onClick}
            disabled={isLoading}
        >
            Enroll for {formatPrice(price)}
        </Button>
    );
}