"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments, fetchuser } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            const u = await fetchuser(username)
            setcurrentUser(u)
            const dbpayments = await fetchpayments(username)
            setPayments(dbpayments)
        }
        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [searchParams, router, username])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount, e) => {
        e.preventDefault();

        if (typeof window === "undefined" || !window.Razorpay) {
            alert("Razorpay SDK not loaded. Please try again.");
            return;
        }

        const order = await initiate(amount, username, paymentform)

        const options = {
            key: process.env.NEXT_PUBLIC_KEY_ID,
            amount,
            currency: "INR",
            name: "Plant Me A Tree",
            description: "Support a cause",
            image: "https://example.com/your_logo",
            order_id: order.id,
            prefill: {
                name: paymentform.name,
                email: "gaurav.kumar@example.com",
                contact: "+919876543210"
            },
            notes: { address: "Razorpay Corporate Office" },
            theme: { color: "#3399cc" },
            handler: async function (response) {
                const formData = new FormData()
                formData.append("razorpay_payment_id", response.razorpay_payment_id)
                formData.append("razorpay_order_id", response.razorpay_order_id)
                formData.append("razorpay_signature", response.razorpay_signature)

                const res = await fetch("/api/razorpay", { method: "POST", body: formData })
                const data = await res.json()

                if (data.success) {
                    window.location.href = data.redirectUrl
                } else {
                    alert(data.message)
                }
            }
        }

        new window.Razorpay(options).open()
    }

    return (
        <>
            <ToastContainer transition={Bounce} />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

                
      <div className='pb-10'>
        <div className='pb-10 cover relative'>
          <img src={currentUser.coverpic} alt="Cover" className='w-full h-[350px] object-cover' />
          <img src={currentUser.profilepic} alt="Profile" className='rounded-full absolute bottom-0 md:left-[46%] left-[38%] w-[100px] h-[100px] object-cover' />
        </div>

                {/* User info */}
                <div className='flex flex-col justify-center items-center gap-1.5 pt-3'>
                    <h2 className='text-lg sm:text-xl md:text-2xl'>@ {username}</h2>
                    <div className='text-sm sm:text-base text-slate-400'>Support {username} by planting a tree!</div>
                    <div className='text-sm sm:text-base text-slate-400'>
                        {payments.length} Payments . ₹{payments.reduce((a, b) => a + Number(b.amount || 0), 0)} raised
                    </div>
                </div>

                {/* Payments section */}
                <div className='payment flex flex-col md:flex-row justify-center gap-6 m-4 md:m-6'>
                    {/* Top supporters */}
                    <div className='supports flex flex-col w-full md:w-1/2 text-sm rounded-lg bg-slate-900 p-5'>
                        <h2 className='text-xl sm:text-2xl font-bold my-5'> Top 10 Supporters</h2>
                        <ul className='mx-2 sm:mx-5 text-base sm:text-lg'>
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => (
                                <li key={i} className='my-3 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avatar" />
                                    <span className='text-sm sm:text-base'>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &quot;{p.message}&quot;
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Make payment */}
                    <div className='makepayment flex flex-col w-full md:w-1/2 rounded-lg bg-slate-900 text-sm p-5'>
                        <h2 className='font-bold text-lg sm:text-xl text-center'>Make a Payment</h2>
                        <div className='p-3 sm:p-5'>
                            <form className='flex flex-col gap-3 sm:gap-4'>
                                <input onChange={handleChange} value={paymentform.name}
                                    name='name' type="text" placeholder='Enter your name'
                                    className='p-2 sm:p-3 rounded-lg bg-slate-800 text-white text-sm sm:text-base' />
                                <input onChange={handleChange} value={paymentform.message}
                                    name='message' type='text' placeholder='Enter your message'
                                    className='p-2 sm:p-3 rounded-lg bg-slate-800 text-white text-sm sm:text-base' />
                                <input onChange={handleChange} value={paymentform.amount} name='amount'
                                    type="number" placeholder='Enter amount' className='p-2 sm:p-3 rounded-lg bg-slate-800 text-white text-sm sm:text-base' />
                                <button onClick={(e) => pay(Number(paymentform.amount) * 100, e)}
                                    type='button' className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm sm:text-base px-3 py-2 sm:py-2.5 disabled:opacity-50"
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3 || paymentform.amount?.length < 1}>
                                    Pay Now
                                </button>

                                <div className='flex flex-wrap gap-2 sm:gap-3 justify-center'>
                                    <button onClick={(e) => pay(3000, e)} type='button' className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm sm:text-base px-3 py-2 sm:py-2.5">
                                        Pay ₹30
                                    </button>
                                    <button onClick={(e) => pay(5000, e)} type='button' className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm sm:text-base px-3 py-2 sm:py-2.5">
                                        Pay ₹50
                                    </button>
                                    <button onClick={(e) => pay(8000, e)} type='button' className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm sm:text-base px-3 py-2 sm:py-2.5">
                                        Pay ₹80
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
