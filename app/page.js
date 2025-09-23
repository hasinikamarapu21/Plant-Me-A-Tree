import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <div className="pb-10">
        <h1 className="flex flex-col sm:flex-row justify-center gap-1.5 items-center text-2xl sm:text-3xl font-bold pt-12 text-center">
          Plant Me A Tree
          <span>
            <img className="pb-0.5 animate-bounce" width={60} height={60}
              src="tree.png" alt="Tree Icon" />
          </span>
        </h1>

        <p className="text-center text-sm sm:text-base w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 pb-4 mx-auto">
          Join us in making the world greener, one tree at a time.
          Together, we can plant a forest of hope for future generations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 items-center">
          <Link href="/login">
            <button type="button"
              className="text-white bg-gradient-to-br from-green-400 
             to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
             focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg 
             text-sm px-6 py-2.5 text-center cursor-pointer">
              Get Started
            </button>
          </Link>

          <Link href="/about">
            <button type="button"
              className="text-white bg-gradient-to-br from-green-400 
             to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg 
               text-sm px-6 py-2.5 text-center cursor-pointer">
              About Us
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-slate-800 w-full h-0.5"></div>
      <div className="flex flex-col gap-6 md:flex-row justify-center md:justify-around items-center text-2xl font-bold pb-7 pt-10 text-center">
        Your Fans can buy a tree for you!
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-center justify-center md:justify-around px-6 sm:px-10 pb-10">
        <div className="item space-y-2 flex flex-col items-center justify-center text-center">
          <img className="bg-slate-400 rounded-full p-2" width={80} src="/man.gif"
            alt="Support" />
          <p className="font-bold">Support Creators</p>
          <p className="text-sm">Fans can show love by gifting trees.</p>
        </div>

        <div className="item space-y-2 flex flex-col items-center justify-center text-center">
          <img className="bg-slate-400 rounded-full p-2" width={80}
            src="/coin.gif" alt="Contribute" />
          <p className="font-bold">Make an Impact</p>
          <p className="text-sm">Each tree helps the environment grow.</p>
        </div>

        <div className="item space-y-2 flex flex-col items-center justify-center text-center">
          <img className="bg-slate-400 rounded-full p-2" width={80}
            src="/group.gif" alt="Collaborate" />
          <p className="font-bold">Join Together</p>
          <p className="text-sm">Fans unite for a greener tomorrow.</p>
        </div>
      </div>

      <div className="bg-slate-800 w-full h-0.5"></div>
      <div className="flex flex-col justify-center gap-1.5 items-center pb-7 pt-10 px-4">
        <div className="text-xl sm:text-2xl font-bold pb-4 text-center">
          Learn more about us
        </div>

        <div className="w-full max-w-[600px] h-[200px] sm:h-[300px]">
          <video autoPlay loop muted playsInline
            className="w-full h-full object-cover rounded-lg">
            <source src="/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  )
}

export default Page
