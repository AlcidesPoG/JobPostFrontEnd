import { useForm } from "react-hook-form";
import useCompanyStore from "../Store/CompanyStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { isLoggedIn, login, error, loading, clearCompany } = useCompanyStore(
    (state) => state
  );

  useEffect(() => {
    clearCompany();
  }, [clearCompany]);

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    if (isLoggedIn) {
      navigate("/manage");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <a
        href="/"
        className="text-3xl font-bold text-gray-800 dark:text-white mb-10 hover:underline"
      >
        DreamJobs
      </a>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              required
              {...register("email", { required: "The email is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              required
              {...register("password", {
                required: "The password is required",
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login button */}
          <div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
