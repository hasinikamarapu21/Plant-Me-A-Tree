"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()

  // Use server-only env vars
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      name: paymentform.name,
      message: paymentform.message,
      to_user: to_username,
    },
  }

  const x = await instance.orders.create(options)

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  })

  return x
}

export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username }).lean();
    if (!u) return null;
    u._id = u._id.toString();
    return u;
}


export const fetchpayments = async (username) => {
    await connectDb();
    let payments = await Payment.find({ to_user: username, done: true })
                                .sort({ amount: -1 })
                                .limit(10)
                                .lean(); // convert to plain objects
    payments = payments.map(p => ({ ...p, _id: p._id.toString() }));
    return payments;
}


export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({ email: ndata.email }, { $set: ndata })
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }
    else{
        await User.updateOne({ email: ndata.email }, { $set: ndata })
    }


}