'use client'

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-cover bg-center text-white">
            {/* Title */}
            <h1 className="text-[32px] sm:text-[40px] sm:mt-[10rem] md:text-[48px] font-bold text-[#170F00] font-poppins">
                Shaping Tomorrow’s Data Experts
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] w-full mx-auto px-4 text-center font-poppins">
                Welcome to <b>DataCliq</b>, your ultimate destination for mastering the art and science of data analysis. We’re on a mission to create a skilled workforce of <strong>data professionals</strong> through practical learning, real-world examples, and accessible resources.
            </p>

            {/* Button */}
            <div className="mt-28 mb-6">
                <button className="bg-[#FAA51D] text-white text-[14px] sm:text-[16px] font-bold px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default HeroSection;