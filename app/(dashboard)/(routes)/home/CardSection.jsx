'use client';
import 'font-awesome/css/font-awesome.min.css';

const CardSection = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center text-[#170F00] py-10 px-4 sm:px-6 lg:px-10 xl:px-20">
            {/* Title and Subtitle */}
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold mb-4 font-poppins text-center leading-tight max-w-[90%]">
                Accelerate Your Career <br /> in Data Analytics
            </h2>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto font-poppins mb-10">
                Learn with Purpose, Grow with Confidence
            </p>

            {/* Card & Image Container */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center w-full gap-8 px-4 sm:px-6 lg:px-10">
                {/* Left Cards */}
                <div className="flex flex-col gap-6 w-full sm:w-1/3 items-center">
                    {/** Point 1 **/}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            💻
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Complete Curriculum</h3>
                        <p className="text-[14px] sm:text-[16px]">
                            Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                        </p>
                    </div>

                    {/** Point 2 **/}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            📊
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Hands-On Projects</h3>
                        <p className="text-[14px] sm:text-[16px]">From basics to real-world tasks, build your skills step-by-step.</p>
                    </div>
                </div>

                {/* Center Image */}
                <div className="w-full sm:w-1/3 lg:w-1/2 xl:w-1/3 flex justify-center">
                    <img
                        src="https://via.placeholder.com/500"
                        alt="Student"
                        className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Cards */}
                <div className="flex flex-col gap-6 w-full sm:w-1/3 items-center">
                    {/** Point 3 **/}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            🔥
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interactive Practice</h3>
                        <p className="text-[14px] sm:text-[16px]">Tackle real scenarios and practice with industry-focused exercises.</p>
                    </div>

                    {/** Point 4 **/}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            🎯
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2">Interview-Ready</h3>
                        <p className="text-[14px] sm:text-[16px]">Prepare with level-wise questions tailored for top companies.</p>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="mt-10">
                <button className="bg-[#FAA51D] text-white text-[14px] sm:text-[16px] font-bold px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default CardSection;