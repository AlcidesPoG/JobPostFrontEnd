import { useForm } from "react-hook-form";
import Navbar from "../Components/Navbar";
import useJobStore from "../Store/JobStore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const UpdateJob = () => {
  const { updateJob, error, loading, successful, searchedJob, fetchJobById } =
    useJobStore((state) => state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { jobId } = useParams();

  const navigate = useNavigate();

  if (jobId === undefined || jobId === 0) {
    Swal.fire({
      title: "Error!",
      text: "Job ID is required to edit a job",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/dashboard");
    });
  }

  useEffect(() => {
    const cargarDatos = async () => {
      await fetchJobById(jobId);
    };

    cargarDatos();
  }, [jobId, fetchJobById]);

  useEffect(() => {
    if (searchedJob) {
      reset({ ...searchedJob });
    }
  }, [searchedJob, reset]);

  const onSubmit = async (data) => {
    await updateJob(jobId, data);
    if (successful) {
      Swal.fire({
        title: "Success!",
        text: "Job updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/manage");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: error || "There was an error posting the job",
        icon: "error",
        confirmButtonText: "Try Again later",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.7)] text-gray-800 dark:text-white transition-colors duration-300 px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[rgba(20,20,20,0.8)] border border-white/10 p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Job</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <input
              name="title"
              placeholder="Job Title"
              {...register("title", { required: "Title is required" })}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Title.message}
              </p>
            )}
            <input
              name="location"
              placeholder="location"
              {...register("location")}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="type"
              {...register("type")}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
            </select>
            <textarea
              name="description"
              placeholder="Job Description"
              rows="4"
              {...register("description")}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <textarea
              name="requirements"
              placeholder="requirements"
              rows="4"
              {...register("requirements")}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              name="salary"
              placeholder="Salary Range"
              {...register("salary")}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="applyUrl"
              placeholder="Application URL or Email"
              {...register("applyUrl", {
                required: "Application URL or Email is required",
              })}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition transform duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Job
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default UpdateJob;
