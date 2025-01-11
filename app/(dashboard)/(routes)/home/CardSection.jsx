'use client';
import 'font-awesome/css/font-awesome.min.css';


const CardSection = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center text-[#170F00] py-10">
            {/* Title and Subtitle */}
            <h2 className="text-[20px] sm:text-[22px] md:text-[36px] font-bold mb-4 font-poppins text-center">
                Accelerate Your Career <br /> in Data Analytics
            </h2>
            <p className="text-[14px] sm:text-[16px] font-regular max-w-[90%] sm:max-w-[700px] w-full mx-auto px-4 text-center font-poppins mb-10">
                Learn with Purpose, Grow with Confidence
            </p>

            {/* Card and Image Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center w-full px-6 sm:px-10">
                {/* Left Cards */}
                <div className="flex flex-col gap-6 sm:w-1/3 w-full items-center">
                    {/* Point 1 */}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[280px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform card shadow-neomorphic text-center">
                        <div className="flex items-center justify-center w-full text-4xl sm:text-5xl text-[#170F00] mt-4 mb-5">
                            &#128187; {/* Example icon: 💻 */}
                        </div>
                        <div>
                            <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Complete Curriculum</h3>
                            <p className="text-[14px] sm:text-[16px]">
                                Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                            </p>
                        </div>
                    </div>

                    {/* Point 2 */}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[280px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform card shadow-neomorphic text-center">
                        <div className="flex items-center justify-center w-full text-4xl sm:text-5xl text-[#170F00] mt-4 mb-5">
                            &#128187; {/* Example icon: 💻 */}
                        </div>
                        <div>
                            <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Hands-On Projects</h3>
                            <p className="text-[14px] sm:text-[16px]">From basics to real-world tasks, build your skills step-by-step.</p>
                        </div>
                    </div>
                </div>

                {/* Center Image */}
                <div className="sm:w-1/3 lg:w-1/2 xl:w-1/3 mt-6 sm:mt-0">
                    <img
                        src="https://via.placeholder.com/500" // Replace with actual image URL
                        alt="Student"
                        className="w-[700px] h-[400px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Cards */}
                <div className="flex flex-col gap-6 sm:w-1/3 w-full items-center">
                    {/* Point 3 */}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[280px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform card shadow-neomorphic text-center">
                        <div className="flex items-center justify-center w-full text-4xl sm:text-5xl text-[#170F00] mt-4 mb-5">
                            &#128187; {/* Example icon: 💻 */}
                        </div>
                        <div>
                            <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interactive Practice</h3>
                            <p className="text-[14px] sm:text-[16px]">Tackle real scenarios and practice with industry-focused exercises.</p>
                        </div>
                    </div>

                    {/* Point 4 */}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[280px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform card shadow-neomorphic text-center">
                        <div className="flex items-center justify-center w-full text-4xl sm:text-5xl text-[#170F00] mt-4 mb-5">
                            &#128187; {/* Example icon: 💻 */}
                        </div>
                        <div>
                            <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interview-Ready</h3>
                            <p className="text-[14px] sm:text-[16px]">Prepare with level-wise questions tailored for top companies.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="flex flex-col items-center space-y-6 mt-10">
                <button className="bg-[#FAA51D] text-white text-[14px] sm:text-[16px] font-bold px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default CardSection;
