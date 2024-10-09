  import React from 'react';
  import { useParams } from 'react-router-dom';

  const VideoCollection = () => {
    const { position } = useParams(); // To get the job position from the URL

    // Example candidates and video placeholders
    const candidates = [
      { name: 'Abdulkadir Kattaş' },
      { name: 'Yıldız Azizi' },
      { name: 'Ahat Demirezen' },
      { name: 'Murat Efe Çetin' },
      { name: 'Taha Zeytun' },,
    ];

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">{position} Video Collection</h1>
        <div className="grid grid-cols-3 gap-4">
          {candidates.map((candidate, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-md">
              <div className="w-full h-40 bg-gray-400 flex items-center justify-center rounded-md">
                {/* Placeholder for the video */}
                <span className="text-4xl text-white">▶</span>
              </div>
              <p className="mt-2 text-center text-gray-700">{candidate.name}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 text-white p-2 rounded">Save</button>
      </div>
    );
  };

  export default VideoCollection;
