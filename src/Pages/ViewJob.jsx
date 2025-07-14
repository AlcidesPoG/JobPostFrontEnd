import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useJobStore from "../Store/JobStore";
import JobDetailCard from "../Components/JobDetailCard";
import Loading from "../Components/Loading";

const ViewJob = () => {
  const { jobId } = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const { searchedJob, fetchJobById, loading } = useJobStore();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (title) query.set("title", title);
    if (location) query.set("location", location);

    navigate(`/jobs?${query.toString()}`);
  };

  useEffect(() => {
    fetchJobById(jobId);
  }, [jobId, fetchJobById]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 mb-6"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or remote"
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
          <div className="flex items-center justify-center">
            {loading ? (
              <Loading />
            ) : searchedJob === null ? (
              <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white">
                <h1 className="text-2xl font-bold">Company not found</h1>
                <button
                  type="submit"
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition transform duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Go back Home
                </button>
              </div>
            ) : (
              <JobDetailCard job={searchedJob} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewJob;
