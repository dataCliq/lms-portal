'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faLaptop, faRankingStar } from "@fortawesome/free-solid-svg-icons";

const CardSection = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center text-[#170F00] py-10 px-4 sm:px-6 lg:px-10 xl:px-20">
            {/* Title and Subtitle */}
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold mb-4 font-poppins text-center leading-tight max-w-[90%] text-[#804000]">
                Accelerate Your Career <br /> in Data Analytics
            </h2>
            <p className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-center font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto font-poppins mb-10 text-[#170f00ec] ">
                Learn with Purpose, Grow with Confidence
            </p>

            {/* Card & Image Container */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center w-full gap-8 px-4 sm:px-6 lg:px-10">
                {/* Left Cards */}
                <div className="flex flex-col gap-6 w-full sm:w-1/3 items-center ">
                    {/** Point 1 **/}
                    <div
                        className="service-card w-[300px] shadow-xl cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-start gap-3 transition-all duration-300 group hover:bg-gradient-to-r from-[#C48200] via-[#A65D00] to-[#924901]"
                    >
                        <svg
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-5xl h-12 w-12 stroke-gray-800 group-hover:stroke-black-400"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect ry="2" rx="2" height="14" width="20" y="3" x="2"></rect>
                            <line y2="21" x2="16" y1="21" x1="8"></line>
                            <line y2="21" x2="12" y1="17" x1="12"></line>
                        </svg>

                        <p className="font-bold text-2xl group-hover:text-black text-black/80">
                            WEBSITE SEO
                        </p>
                        <p className="text-black-400 text-sm">
                            Website ravida surna eveti semen the conse tusio anivite dianne one nivam
                            acestion vue artin dictum.
                        </p>
                        <p
  className="text-5xl font-bold self-end"
  style={{
    WebkitTextStroke: "1px gray",
    WebkitTextFillColor: "transparent",
  }}
>
                            09
                        </p>
                    </div>




                    {/* <div className="p-6 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2 bg-[]">
                            <FontAwesomeIcon icon={faChartBar} className="text-5xl text-[#ffbd30] mb-6 bg-[#ffd88459] p-3 rounded-2xl" />

                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2 text-[#170f00fa]">Complete Curriculum</h3>
                        <p className="text-[14px] sm:text-[16px] text-[#170f00ec]">
                            Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                        </p>
                    </div> */}

                    {/** Point 2 **/}
                    <div className="p-6 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            <FontAwesomeIcon icon={faFolderOpen} className="text-5xl text-[#ffbd30] mb-6 bg-[#ffd88459] p-3 rounded-2xl" />
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2 text-[#170f00fa]">Hands-On Projects</h3>
                        <p className="text-[14px] sm:text-[16px]">From basics to real-world tasks, build your skills step-by-step.</p>
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
                    <div className="p-6 border-1 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2 ">
                            <FontAwesomeIcon icon={faLaptop} className="text-5xl text-[#ffbd30] mb-6 bg-[#ffd88459] p-3 rounded-2xl" />
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2 text-[#170f00fa]">Interactive Practice</h3>
                        <p className="text-[14px] sm:text-[16px] text-[#170f00fa]">Tackle real scenarios and practice with industry-focused exercises.</p>
                    </div>

                    {/** Point 4 **/}
                    <div className="p-6 border-2 rounded-lg w-full sm:w-[300px] h-[260px] flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:transform shadow-lg text-center">
                        <div className="flex items-center justify-center text-4xl sm:text-5xl text-[#170F00] mt-2">
                            <FontAwesomeIcon icon={faRankingStar} className="text-5xl text-[#ffbd30] mb-6 bg-[#ffd88459] p-3 rounded-2xl" />
                        </div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold mb-2 text-[#170f00fa]">Interview-Ready</h3>
                        <p className="text-[14px] sm:text-[16px] text-[#170f00fa]">Prepare with level-wise questions tailored for top companies.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CardSection;