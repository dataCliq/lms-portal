"use client";

import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      period: "Per member, per yearly",
      features: ["AI advisor for a day", "2 auto tracking", "7 day transaction clearing", "24/7 Customer support"],
      buttonText: "Start for free",
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    {
      name: "PREMIUM",
      price: "$150",
      period: "Per member, per yearly",
      features: ["AI advisor for a day", "2 auto tracking", "7 day transaction clearing", "24/7 Customer support"],
      buttonText: "Purchase",
      bgColor: "bg-white",
      textColor: "text-gray-900",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white">
      <div className="text-center">
        <p className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-1 rounded-lg mx-auto">Our Pricing Plans</p>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">Our pricing is simple with no hidden fees</h2>
        <p className="text-gray-600 mt-2">7 Days free trial. No credit card required.</p>
      </div>
      <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
        {plans.map((plan, index) => (
          <div key={index} className={`w-[600px] p-6 rounded-2xl shadow-lg ${plan.bgColor} flex flex-col justify-between ${index === 1 ? "text-gray-900 bg-opacity-10" : ""} h-auto min-h-[300px]`}>
            <div className="flex">
              <div className="w-1/2 pr-4">
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-3 py-1 ${plan.bgColor === "bg-blue-600" ? "bg-blue-600 border-2 border-white" : "bg-white border-2 border-gray-300"} rounded-full text-sm ${plan.bgColor === "bg-blue-600" ? "text-white" : "text-black"}`}>{plan.name}</span>
                </div>
                <h3 className={`text-5xl font-bold mb-4 ${index === 1 ? "text-black" : "text-white"}`}>{plan.price}</h3>
                <p className={`text-sm mb-6 ${plan.textColor}`}>{plan.period}</p>
              </div>
              <div className="w-px bg-gray-300 mx-2"></div> {/* Shifted left with mx-2 */}
              <div className="w-[350px] pl-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center py-1"> {/* Added py-1 for spacing */}
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.textColor}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className={`w-full py-3 ${plan.bgColor === "bg-white" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} rounded-xl hover:opacity-90 transition-opacity`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;