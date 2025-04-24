"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

const testimonials = [
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur intelis ege conseqi ex id tortor molestie, Nullam sit amet magna sits.",
    additionalText: "additional text can be added here",
    date: "Dec 16, 2022",
    name: "Customer Name",
    company: "Company name",
    avatarColor: "bg-green-300",
  },
  {
    rating: 4,
    text: "Lorem ipsum dolor sit amet consectetur intelis ege conseqi ex id tortor molestie, Nullam sit amet magna sits.",
    additionalText: "additional text can be added here",
    date: "Dec 16, 2022",
    name: "Customer Name",
    company: "Company name",
    avatarColor: "bg-blue-300",
  },
  {
    rating: 3,
    text: "Lorem ipsum dolor sit amet consectetur intelis ege conseqi ex id tortor molestie, Nullam sit amet magna sits.",
    additionalText: "additional text can be added here",
    date: "Dec 16, 2022",
    name: "Customer Name",
    company: "Company name",
    avatarColor: "bg-red-300",
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur intelis ege conseqi ex id tortor molestie, Nullam sit amet magna sits.",
    additionalText: "additional text can be added here",
    date: "Dec 16, 2022",
    name: "Customer Name",
    company: "Company name",
    avatarColor: "bg-yellow-300",
  },
]

const Testimonials = () => {
  return (
    <section className=" flex flex-col items-center py-16 bg-white">
      <div className="text-center">
        {/* <p className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-1 rounded-lg">CAPTION HERE</p> */}
        <h2 className="text-4xl font-bold text-gray-900 mt-2">Testimonials</h2>
      </div>

      {/* Container with full width and no padding to prevent gaps */}
      <div className="w-full max-w-7xl mt-10">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="3"
          spaceBetween={15}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 50,
            disableOnInteraction: false,
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="h-full p-6 w-[500px] text-left bg-white transition">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                {/* <p className="text-gray-500 text-sm mb-4">{testimonial.additionalText}</p> */}

                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 ${testimonial.avatarColor} rounded-full flex items-center justify-center mr-3`}
                  >
                    <span className="text-white text-lg">👤</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{testimonial.name}</p>
                    <p className="text-gray-400 text-xs">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add custom styles for Swiper */}
      <style jsx global>{`
        .testimonial-swiper {
          width: 100%;
          height: auto;
          overflow: hidden !important;
          padding: 10px;
        }
        
        .swiper-slide {
          height: auto;
          display: flex;
        }
        
        /* Hide scrollbar */
        .swiper-container {
          overflow: hidden !important;
        }
        
        /* Remove any margin/padding that might cause gaps */
        .swiper-wrapper {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
