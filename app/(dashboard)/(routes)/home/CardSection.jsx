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
                        class="bg-white w-[300px] rounded-[30px] flex flex-col justify-center shadow-lg hover:shadow-lg min-h-[280px] dark:bg-gray-800 dark:text-white items-start relative group"
                    >
                        <div class="m-5">
                            <div
                                class="w-12 h-12 flex items-center justify-center absolute inset-x-0 top-0 ml-6 mt-6"
                            >
                            </div>

                            <div className="mt-4 text-left w-full mb-3">
                                <h2 className="text-2xl roboto-mono-500 text-gray-800 dark:text-white">
                                Complete Curriculum
                                </h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Master <b>MySQL</b>, <b>PostgreSQL</b>, <b>Tableau</b>, <b>Power BI</b>, <b>Python</b>—all in one place.
                                </p>
                            </div>
                            <a href="#">
                                <div
                                    className="bg-gray-300 dark:bg-gray-700 w-10 h-10 rounded-full absolute bottom-0 left-0 m-4 flex justify-center items-center hover:ring-4 ring-gray-200 dark:ring-gray-400 hover:transition duration-700 ease-in-out"
                                >
                                    
                                </div>
                            </a>
                        </div>
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