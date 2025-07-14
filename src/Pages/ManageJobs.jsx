import { useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import StatsCard from "../Components/StatsCard.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useJobStore from "../Store/JobStore.js";
import ManageJobCard from "../Components/ManageJobCard.jsx";

const Dashboard = () => {
  const { jobs, deleteJob, fetchJobForManage } = useJobStore((state) => state);

  const navigate = useNavigate();

  const handleEdit = (jobId) => {
    navigate(`/update-job/${jobId}`);
  };

  const handleDelete = (jobId) => {
    Swal.fire({
      title: "Are you sure you want to delete this job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(jobId);
        fetchJobForManage();
      }
    });
  };

  useEffect(() => {
    fetchJobForManage();
  }, [fetchJobForManage]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.9)] text-gray-800 dark:text-white transition-colors duration-300 px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Manage Jobs</h1>
        <a
          href="/new-job"
          className="mb-8 px-5 py-2  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          + New Job
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid cols-3 gap-6 mt-5 mb-10">
          <StatsCard name={"Total Jobs"} value={jobs.length} />
          <StatsCard
            name={"Active Jobs"}
            value={jobs.filter((x) => x.status == "Active").length}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <ManageJobCard
              key={job.postId}
              job={job}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
