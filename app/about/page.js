import React from "react";
import Image from "next/image";

const About = () => {
    return (
        <div className="container mx-auto px-6 md:px-12 py-12">
            <h1 className="flex flex-col sm:flex-row justify-center gap-1.5 items-center text-3xl font-bold">
                About Plant Me A Tree
                <span>
                    <Image src="/tree.png" width={70} height={70} alt="Tree Icon"
                        className="pb-0.5 animate-bounce" />
                </span>
            </h1>

            <p className="text-lg mt-6 text-center max-w-3xl mx-auto leading-relaxed">
                Plant Me A Tree is a community-driven initiative dedicated to promoting
                sustainability and environmental awareness. Our mission is simple —
                empower individuals to make a difference by planting trees and
                contributing towards a greener, healthier planet.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                <div className="flex flex-col items-center text-center">
                    <Image src="/group.gif" width={88} height={88} alt="Community Collaboration"
                        className="rounded-full bg-slate-200 p-2" />
                    <h3 className="text-xl font-semibold mt-2">Community Collaboration</h3>
                    <p className="text-sm mt-1">
                        Join hands with like-minded individuals to plant trees together.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image src="/coin.gif" width={88} height={88} alt="Plant a Tree"
                        className="rounded-full bg-slate-200 p-2" />
                    <h3 className="text-xl font-semibold mt-2">Plant a Tree</h3>
                    <p className="text-sm mt-1">
                        Contribute to real-world reforestation with every tree planted.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image src="/man.gif" width={88} height={88} alt="Support & Impact"
                        className="rounded-full bg-slate-200 p-2" />
                    <h3 className="text-xl font-semibold mt-2">Support & Impact</h3>
                    <p className="text-sm mt-1">
                        Your support creates a positive environmental impact for the planet.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - Plant Me A Tree",
};
