import { useEffect, useState } from "react";
import useJobStore from "../Store/JobStore";
import useCompanyStore from "../Store/CompanyStore";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import JobDetailCard from "../Components/JobDetailCard";
import JobCard from "../Components/JobCard";
import useIsMobile from "../Hook/UseIsMobile";

const CompanyProfile = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const isMobile = useIsMobile();

  const {
    company,
    loading: companyLoading,
    successful: companySuccesful,
    error: companyError,
    fetchCompanyProfile,
  } = useCompanyStore((state) => state);
  const {
    jobs,
    loading: jobLoading,
    successful: jobSuccessful,
    error: jobError,
    fetchJobForCompany,
    clearJobs,
  } = useJobStore((state) => state);

  const handleCardClick = (job) => {
    if (isMobile) {
      navigate(`/ViewJob/${job.postId}`);
    } else {
      setSelectedJob(job);
    }
  };

  useEffect(() => {
    clearJobs();
    if (companyId) {
      fetchJobForCompany(companyId);
      fetchCompanyProfile(companyId);
    }
  }, [companyId, fetchJobForCompany, fetchCompanyProfile]);

  if (companyLoading || jobLoading) {
    return (
      <>
        {" "}
        <Navbar />
        <Loading />
      </>
    );
  } else if (
    !company ||
    companyId === 0 ||
    !companySuccesful ||
    company == undefined
  ) {
    return (
      <>
        <Navbar />
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
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white px-6 py-12 transition-colors duration-300">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={company.photo || "/company-default.svg"}
              alt="Company Logo"
              className="w-20 h-20 rounded-xl object-cover bg-white border border-gray-300 dark:border-gray-700"
            />
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {company.city}, {company.state}, {company.country}
              </p>
            </div>
          </div>

          {company.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {company.description}
            </p>
          )}

          <div className="space-y-2">
            {company.pageUrl && (
              <p className="text-sm">
                <strong>Website:</strong>{" "}
                <a
                  href={company.pageUrl}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.pageUrl}
                </a>
              </p>
            )}
            <p className="text-sm">
              <strong>Email:</strong> {company.email}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {company.address}, {company.city},{" "}
              {company.state}, {company.country}
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Posted Jobs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="col-span-2 space-y-4">
              {jobLoading ? (
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
        </section>
      </main>
    </>
  );
};

export default CompanyProfile;
