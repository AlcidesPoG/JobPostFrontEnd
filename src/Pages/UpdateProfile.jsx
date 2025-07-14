import { useForm } from "react-hook-form";
import useCompanyStore from "../Store/CompanyStore";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const {
    user,
    company,
    error,
    loading,
    successful,
    fetchCompanyForUpdate,
    updateProfile,
  } = useCompanyStore((state) => state);

  useEffect(() => {
    fetchCompanyForUpdate();
  }, [fetchCompanyForUpdate]);

  useEffect(() => {
    if (company) {
      reset({ ...company });
    }
  }, [company, reset]);

  const onSubmit = async (data) => {
    await updateProfile(data, user.companyId);
    if (successful) {
      Swal.fire({
        title: "Success!",
        text: "Job updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/company/${user.companyId}`);
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[rgba(20,20,20,0.7)] text-gray-800 dark:text-white transition-colors duration-300 px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[rgba(20,20,20,0.8)] border border-white/10 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Update Profile
          </h2>

          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="Name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="Email"
                placeholder="you@example.com"
                disabled={true}
                {...register("email", { required: "Email is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <input
                type="text"
                name="Country"
                {...register("country", { required: "Country is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                type="text"
                name="State"
                {...register("state", { required: "State is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                name="City"
                {...register("city", { required: "City is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                name="Address"
                {...register("address", { required: "Address is required" })}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Page URL
              </label>
              <input
                type="text"
                name="pageUrl"
                {...register("pageUrl")}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Page link"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                type="textarea"
                name="Description"
                {...register("description")}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Give a short description of your company"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload your logo
              </label>
              <input
                type="file"
                name="PhotoFile"
                {...register("photoFile")}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[rgba(20,20,20,0.6)] border border-gray-300 dark:border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Have an account?{" "}
            <a
              href="/login "
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateProfile;
