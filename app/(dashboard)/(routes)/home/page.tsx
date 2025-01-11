'use client';

<<<<<<< HEAD
const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-cover bg-center text-white">
            {/* Title */}
            <h1 className="text-[32px] sm:text-[40px] sm:text-center sm:mt-[40rem] md:text-[48px] font-bold mb-4 text-[#170F00] font-poppins mt-[28rem]">
                Shaping Tomorrow’s Data Experts
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] w-full mx-auto px-4 text-center font-poppins">
                Welcome to <b>DataCliq</b>, your ultimate destination for mastering the art and science of data analysis. We’re on a mission to create a skilled workforce of <strong>data professionals</strong> through practical learning, real-world examples, and accessible resources.
            </p>

            {/* Button */}
            <div className="flex flex-col items-center space-y-6 mt-6 mb-20">
                <button
                    className="mt-20 bg-[#FAA51D] text-white text-[14px] sm:text-[16px] font-bold px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins"
                >
                    Learn More
                </button>
            </div>

            {/* Card Section */}
            <div className="flex flex-col items-center justify-center h-full bg-cover bg-center text-white">
                {/* Title and Subtitle */}
                <h2 className="text-[20px] sm:text-[22px] md:text-[36px] font-bold mb-4 text-[#170F00] font-poppins text-center sm:mt-[6rem] md:mt-[10rem]">
                    Accelerate Your Career in Data Analytics
                </h2>
                <p className="text-[14px] sm:text-[16px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] w-full mx-auto px-4 text-center font-poppins mb-10">
                    Learn with Purpose, Grow with Confidence
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center w-full px-6 sm:px-10 text-[#170F00]">
                    {/* Left Cards */}
                    <div className="flex flex-col sm:w-1/3 gap-6">
                        {/* Point 1 */}
                        <div className="p-6 border-2 border-[#170F00] rounded-lg w-[280px] h-[300px]">
                            <div className="flex items-center justify-center w-12 h-8 sm:w-14 sm:h-9 bg-[#170F00] text-white rounded-full mr-4">
                                1
                            </div>
                            <div>
                                <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Complete Curriculum</h3>
                                <p className="text-[14px] sm:text-[16px]">
                                    Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                                </p>
                            </div>
                        </div>

                        {/* Point 2 */}
                        <div className="p-6 border-2 border-[#170F00] rounded-lg w-[280px] h-[300px]">
                            <div className="flex items-center justify-center w-12 h-8 sm:w-14 sm:h-9 bg-[#170F00] text-white rounded-full mr-4">
                                2
                            </div>
                            <div>
                                <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Hands-On Projects</h3>
                                <p className="text-[14px] sm:text-[16px]">From basics to real-world tasks, build your skills step-by-step.</p>
                            </div>
                        </div>
                    </div>

                    {/* Image of Student */}
                    <div className="sm:w-1/3 my-6 sm:my-0 px-6">
                        <img
                            src="https://via.placeholder.com/400" // Replace with actual image URL
                            alt="Student"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Cards */}
                    <div className="flex flex-col sm:w-1/3 gap-6">
                        {/* Point 3 */}
                        <div className="p-6 border-2 border-[#170F00] rounded-lg w-[280px] h-[300px]">
                            <div className="flex items-center justify-center w-12 h-8 sm:w-14 sm:h-9 bg-[#170F00] text-white rounded-full mr-4">
                                3
                            </div>
                            <div>
                                <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interactive Practice</h3>
                                <p className="text-[14px] sm:text-[16px]">Tackle real scenarios and practice with industry-focused exercises.</p>
                            </div>
                        </div>

                        {/* Point 4 */}
                        <div className="p-6 border-2 border-[#170F00] rounded-lg w-[280px] h-[300px]">
                            <div className="flex items-center justify-center w-12 h-8 sm:w-14 sm:h-9 bg-[#170F00] text-white rounded-full mr-4">
                                4
                            </div>
                            <div>
                                <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interview-Ready</h3>
                                <p className="text-[14px] sm:text-[16px]">Prepare with level-wise questions tailored for top companies.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Button */}
                <div className="flex flex-col items-center space-y-6 mt-6 mb-20">
                    <button className="bg-[#FAA51D] text-white text-[14px] sm:text-[16px] font-bold px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                        Learn More
                    </button>
                </div>
            </div>
=======
import HeroSection from './HeroSection';
import CardSection from './CardSection';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center">
            {/* Hero Section */}
            <div className="w-full border border-red-500">
    <HeroSection />
</div>


            {/* Add Controlled Gap */}
            <div className="w-full py-10" /> {/* Adjust padding-y to manage spacing */}

            {/* Card Section */}
            <div className="w-full border border-blue-500">
    <CardSection />
</div>

>>>>>>> 8a34fa2 (Updated 11Jan)
        </div>
    );
};

export default HomePage;
