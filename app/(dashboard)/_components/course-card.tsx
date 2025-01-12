// _components/Card.tsx
'use client';
import Image from 'next/image';

interface CardProps {
  title: string;
//   imageSrc: string;
  lessonsCount: number;
  onStartNow: () => void;
}

const Card: React.FC<CardProps> = ({ title, lessonsCount, onStartNow }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-48">
        {/* <Image
        //   src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        /> */}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        
        {/* Folder icon and number of lessons */}
        <div className="flex items-center mt-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0h12v10H4V5z"
              clipRule="evenodd"
            />
          </svg>
          <span>{lessonsCount} Lessons</span>
        </div>

        {/* Button */}
        <button
          onClick={onStartNow}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Card;
