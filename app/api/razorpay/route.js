import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDb();

    let body = await req.formData();
    body = Object.fromEntries(body);

    // Find payment by razorpay order id
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ success: false, message: "Order Id not found" });
    }

    // Get user-specific secret if exists, otherwise fallback to env secret
    const user = await User.findOne({ username: payment.to_user });
    const secret = user?.razorpaysecret || process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ success: false, message: "No Razorpay secret available" });
    }

    // Verify payment signature
    const isValid = validatePaymentVerification(
      { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
      body.razorpay_signature,
      secret
    );

    if (isValid) {
      // Update payment as done
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`,
      });
    } else {
      return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
  } catch (err) {
    console.error("Razorpay verification error:", err);
    return NextResponse.json({ success: false, message: "Server Error", error: err.message });
  }
};
