import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();
    if (title) query.set("title", title);
    if (location) query.set("location", location);

    navigate(`/jobs?${query.toString()}`);
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white transition-colors duration-300">
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Explore thousands of job opportunities from top companies — no sign
            up required!
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mt-8">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="City or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition transform duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
