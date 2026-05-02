import Razorpay from 'razorpay';

// Singleton pattern use kar rahe hain taaki har baar naya instance na bane
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});