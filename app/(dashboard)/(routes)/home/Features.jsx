// components/Features.jsx
import React from "react";

const Features = () => {
    return (
        <div className="w-full py-16">
            <div className="w-full">
                {/* Inspire Section */}
                <div className="relative min-h-[500px]">
                    {/* Blob Background - Positioned to overlap */}
                    <img
                        src="/blob1.svg"
                        alt=""
                        className="absolute -top-1/2 -left-1/4 transform w-[80%] h-auto max-w-none "
                    />

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex items-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row items-center justify-between">
                                {/* Left: Text and Button */}
                                <div className="lg:w-[600px] mb-8 lg:mb-0">
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold text-blue-600">✕</span>
                                        <h3 className="text-2xl font-semibold text-gray-800 ml-2">Inspire</h3>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                        Introducing the premier cash management solution, reimagined for startups.
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        Unveiling the first-class cash management experience crafted with startups in mind.*
                                    </p>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                        Get started
                                    </button>
                                </div>

                                {/* Right: Dashboard Image - Taller */}
                                <div className="lg:w-1/2 relative">
                                    <div className="bg-[#38343F] transform rounded-xl p-10 relative pr-0  overflow-hidden left-40">
                                        <img
                                            src="/Cheatsheets.png"
                                            alt="Inspire Dashboard"
                                            className="w-full h-[450px] object-cover rounded-tl-xl rounded-bl-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proline Section */}
                <div className="relative min-h-[600px]">
                    {/* Blob Background - Fully Visible on Right */}
                    <img
                        src="/blob2.svg"
                        alt=""
                        className="absolute bottom-0 -right-1/4 w-[70%] h-auto "
                    />

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex items-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row items-center justify-between">
                                {/* Left: Dashboard Image */}
                                <div className="lg:w-1/2 mb-8 lg:mb-0">
                                    <div className="bg-white rounded-lg shadow-lg p-4">
                                        <img
                                            src="/Cheatsheets.png"
                                            alt="Proline Dashboard"
                                            className="w-full h-[400px] object-cover rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Right: Text and Button */}
                                <div className="lg:w-1/2 lg:pl-12">
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold text-blue-600">✕</span>
                                        <h3 className="text-2xl font-semibold text-gray-800 ml-2">Proline</h3>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                        Experience Seamless Communication with Crystal-Clear Video Quality
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        AirLive provides an immersive visual experience with crystal-clear video quality, ensuring seamless communication for all your needs.
                                    </p>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;