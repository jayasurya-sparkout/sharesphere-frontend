"use client";

export default function ComingSoon() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white animate-fadeIn max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">
          Coming Soon!
        </h1>
        <p className="text-gray-600">
          We're working hard to launch ShareSphere. Stay tuned for updates!
        </p>

        {/* <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-600 transition cursor-pointer">
            Notify Me
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:scale-105 transition-transform cursor-pointer">
            Learn More
          </button>
        </div> */}

        {/* <p className="mt-6 text-gray-400 text-sm">
          Follow us on social media to stay updated.
        </p> */}
      </div>
    </div>
  );
}
