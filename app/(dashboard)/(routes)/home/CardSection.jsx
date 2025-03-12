'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faLaptop, faRankingStar, faUsers, faRocket } from "@fortawesome/free-solid-svg-icons";

const CardSection = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center text-[#2E3440] py-10 px-4 sm:px-6 lg:px-10 xl:px-20">
            {/* Title and Subtitle */}
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold mb-4 font-poppins text-center leading-tight max-w-[90%] text-[#28282B]">
                Accelerate Your Career <br /> in Data Analytics
            </h2>
            <p className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-center font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto font-poppins mb-10 text-[#104650] ">
                Learn with Purpose, Grow with Confidence
            </p>

            {/* Card & Image Container */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center w-full gap-8 px-4 sm:px-6 lg:px-10">
                {/* Left Cards */}
                <div className="flex flex-col gap-6 w-full sm:w-1/3 items-center ">
                    {/** Point 1 **/}
                    <div className="sm:w-[300px] h-[260px] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 relative overflow-hidden rounded-2xl flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#2E3440]">
                            <FontAwesomeIcon icon={faChartBar} className="text-5xl text-[#00A3B5] mb-4 bg-[#16CD90]/10 p-3 rounded-2xl" />
                        </div>
                        <h1 className="font-bold text-xl">Complete Curriculum</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mt-2">
                            Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                        </p>
                    </div>

                    {/** Point 2 **/}
                    <div className="sm:w-[300px] h-[260px] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 relative overflow-hidden rounded-2xl flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#2E3440]">
                            <FontAwesomeIcon icon={faFolderOpen} className="text-5xl text-[#00A3B5] mb-4 bg-[#16CD90]/10 p-3 rounded-2xl"  />
                        </div>
                        <h1 className="font-bold text-xl">Hands-On Projects</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mt-2">
                            From basics to real-world tasks, build your skills step-by-step.
                        </p>
                    </div>
                </div>

                {/* Center Image */}
                <div className="w-full sm:w-1/3 lg:w-1/2 xl:w-1/3 flex justify-center">
                    <img
                        src='/card-section-image.jpg'
                        alt="Student"
                        className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[900px] h-[400px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Cards */}
                <div className="flex flex-col gap-6 w-full sm:w-1/3 items-center">
                    {/** Point 3 **/}
                    <div className="sm:w-[300px] h-[260px] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 relative overflow-hidden rounded-2xl flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#2E3440]">
                            <FontAwesomeIcon icon={faLaptop} className="text-5xl text-[#00A3B5] mb-4 bg-[#16CD90]/10 p-3 rounded-2xl" />
                        </div>
                        <h1 className="font-bold text-xl">Interactive Practice</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mt-2">
                            Tackle real scenarios and practice with industry-focused exercises.
                        </p>
                    </div>

                    {/** Point 4 **/}
                    <div className="sm:w-[300px] h-[260px] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 relative overflow-hidden rounded-2xl flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#2E3440]">
                            <FontAwesomeIcon icon={faRankingStar} className="text-5xl text-[#00A3B5] mb-4 bg-[#16CD90]/10 p-3 rounded-2xl"  />
                        </div>
                        <h1 className="font-bold text-xl">Interview-Ready</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mt-2">
                            Prepare with level-wise questions tailored for top companies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;