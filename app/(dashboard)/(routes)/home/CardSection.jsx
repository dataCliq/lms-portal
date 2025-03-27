'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDownload, faTrophy, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CardSection = () => {
    return (
        <div className="w-full bg-[#F5FEFC] text-[#2E3440] py-10 min-h-[600px]">
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 xl:px-20">
                {/* Title and Subline */}
                <h2 className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-bold mb-2 font-poppins text-center leading-tight max-w-[90%] text-[#28282B]">
                    Why Choose DataCliq <br /> for Your Data Journey?
                </h2>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-center font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto font-poppins mb-8 text-[#104650]">
                    Unlock Your Data Potential with Confidence
                </p>

                {/* Card Container */}
                <div className="flex flex-wrap justify-center w-full gap-6 px-4 sm:px-6 lg:px-10">
                    {/* Card 1: Free Beginner Courses */}
                    <div className="w-full sm:w-[380px] bg-[#D9EBFF] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-2xl flex flex-col items-start text-left transform transition-transform duration-300 hover:scale-105">
                        {/* Icon in Place of Data Visualization */}
                        <div className="w-full h-[150px] bg-[#E6F5F7] rounded-lg mb-4 flex items-center justify-center">
                        <img
                                src='/dashboard.svg'
                                className="rounded-md"
                            />
                        </div>
                        <h1 className="font-bold text-xl text-[#28282B] mb-2">Free Beginner Courses</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mb-4">
                            Start with our free courses on Power BI, Excel, Python, Tableau, SQL, and PostgreSQL. Learn at your own pace with weekly lessons.
                        </p>
                        <a href="#" className="text-[#00A3B5] font-medium flex items-center gap-2 text-base">
                            Start for Free <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                        </a>
                    </div>

                    {/* Card 2: Free Cheat Sheets */}
                    <div className="w-full sm:w-[380px] bg-[#DAFAF3] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-2xl flex flex-col items-start text-left transform transition-transform duration-300 hover:scale-105">
                        {/* Icon in Place of Data Visualization */}
                        <div className="w-full h-[150px] bg-[#E6F5F7] rounded-lg mb-4 flex items-center justify-center">
                            <img
                                src='/Cheatsheets.png'
                                className="rounded-md"
                            />
                        </div>
                        <h1 className="font-bold text-xl text-[#28282B] mb-2">Free Cheat Sheets</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mb-4">
                            Access downloadable cheat sheets for quick reference on formulas, functions, and best practices in data analysis.
                        </p>
                        <a href="#" className="text-[#00A3B5] font-medium flex items-center gap-2 text-base">
                            Download Now <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                        </a>
                    </div>

                    {/* Card 3: Proven Mentorship */}
                    <div className="w-full sm:w-[380px] bg-[#F5F5F6] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-2xl flex flex-col items-start text-left transform transition-transform duration-300 hover:scale-105">
                        {/* Icon in Place of Data Visualization */}
                        <div className="w-full h-[150px] bg-[#E6F5F7] rounded-lg mb-4 flex items-center justify-center">
                        <img
                                src='/mentor.svg'
                                className="rounded-md"
                            />
                        </div>
                        <h1 className="font-bold text-xl text-[#28282B] mb-2">Proven Mentorship</h1>
                        <p className="text-sm text-[#4C566A] leading-6 mb-4">
                            Join a community backed by our successful 1-month Power BI mentorship program, trusted by 100+ learners.
                        </p>
                        <a href="#" className="text-[#00A3B5] font-medium flex items-center gap-2 text-base">
                            See Testimonials <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;
