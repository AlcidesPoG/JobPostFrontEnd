import {
  faBriefcase,
  faLocationDot,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobDetailCard = ({ job }) => {
  if (!job) {
    return (
      <div className="text-gray-500 dark:text-gray-400 p-6">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="sticky top-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow p-6 space-y-4">
      <a
        href={`/company/${job.companyId}`}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={job.companyImgUrl || "/company-default.svg"}
          alt="Company Logo"
          className="w-10 h-10 rounded-lg object-cover border-1 border-black dark:border-white"
        />
        <span className="text-gray-800 dark:text-white font-medium">
          {job.companyName}
        </span>
      </a>
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faLocationDot} /> {job.location} •{" "}
        <FontAwesomeIcon icon={faBriefcase} /> {job.type}{" "}
      </div>
      <div className="text-blue-600 dark:text-blue-400 font-semibold">
        Salary: <FontAwesomeIcon icon={faSackDollar} /> {job.salary}
      </div>

      <hr className="border-gray-200 dark:border-white/10" />

      <div>
        <h3 className="text-lg font-semibold mb-1">Description</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {job.description}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Requirements</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {job.requirements}
        </p>
      </div>

      {job && job.applyUrl && (
        <a
          href={
            job.applyUrl.includes("@")
              ? `mailto:${job.applyUrl}`
              : job.applyUrl.startsWith("http://") ||
                job.applyUrl.startsWith("https://")
              ? job.applyUrl
              : `https://${job.applyUrl}`
          }
          target={job.applyUrl.includes("@") ? "_self" : "_blank"}
          rel={job.applyUrl.includes("@") ? undefined : "noopener noreferrer"}
          className="inline-block mt-4 px-5 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          {job.applyUrl.includes("@") ? "Apply via Email" : "Apply Here"}
        </a>
      )}
    </div>
  );
};

export default JobDetailCard;
