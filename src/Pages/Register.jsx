import { useForm } from "react-hook-form";
import useCompanyStore from "../Store/CompanyStore";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { companyRegister, error, loading, isLoggedIn, clearCompany } =
    useCompanyStore((state) => state);

  useEffect(() => {
    clearCompany();
  }, [clearCompany]);

  const onSubmit = async (data) => {
    await companyRegister(data);
    if (isLoggedIn) {
      setInterval(() => {
        toast.success("Company registered successfully");
      }, 1000);
      navigate("/manage");
    } else {
      setInterval(() => {
        toast.error(
          "There was an error registering the company, please try again later: " +
            error
        );
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 pb-2">
      <a
        href="/"
        className="text-3xl font-bold text-gray-800 dark:text-white mb-10 hover:underline"
      >
        DreamJobs
      </a>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="Name"
              {...register("Name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="Email"
              placeholder="you@example.com"
              {...register("Email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="Password"
              placeholder="••••••••"
              {...register("Password", { required: "Password is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
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
              {...register("Country", { required: "Country is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Country"
            />
            {errors.Country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Country.message}
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
              {...register("State", { required: "State is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State"
            />
            {errors.State && (
              <p className="text-red-500 text-sm mt-1">
                {errors.State.message}
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
              {...register("City", { required: "City is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City"
            />
            {errors.City && (
              <p className="text-red-500 text-sm mt-1">{errors.City.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="Address"
              {...register("Address", { required: "Address is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address"
            />
            {errors.Address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Page URL
            </label>
            <input
              type="text"
              name="PageURL"
              {...register("PageURL")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PageURL"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              type="textarea"
              name="Description"
              {...register("Description")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark::text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {...register("PhotoFile")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
};

export default Register;
