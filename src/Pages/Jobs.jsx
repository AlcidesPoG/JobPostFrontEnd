import { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import JobDetailCard from "../Components/JobDetailCard";
import useJobStore from "../Store/JobStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import useIsMobile from "../Hook/UseIsMobile";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTitle = searchParams.get("title");
  const initialLocation = searchParams.get("location");
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState(initialLocation);
  const { jobs, fetchJobs, loading } = useJobStore();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ title, location });
    setSelectedJob(null);
  };

  useEffect(() => {
    if (title !== "") {
      fetchJobs(initialTitle, initialLocation);
    }
  }, [initialTitle, initialLocation, fetchJobs]);

  const handleCardClick = (job) => {
    if (isMobile) {
      navigate(`/ViewJob/${job.postId}`);
    } else {
      setSelectedJob(job);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Explore Job Opportunities
          </h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="col-span-2 space-y-4">
              {loading ? (
                <Loading />
              ) : jobs === null ? (
                <p className="text-center text-gray-500 py-6">
                  No jobs available yet.
                </p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-500 py-6">
                  No jobs available yet.
                </p>
              ) : (
                jobs.map((job) => (
                  <JobCard
                    key={job.postId}
                    job={job}
                    onClick={() => handleCardClick(job)}
                  />
                ))
              )}
            </div>
            <div className="hidden lg:block col-span-2">
              <JobDetailCard job={selectedJob} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Jobs;
