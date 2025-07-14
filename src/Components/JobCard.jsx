import {
  faBriefcase,
  faLocationDot,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobCard = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">{job.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {job.companyName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faLocationDot} /> {job.location} •{" "}
            <FontAwesomeIcon icon={faBriefcase} /> {job.type}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Posted: {new Date(job.createdAt).toLocaleDateString("en-US")}
          </p>
        </div>
        <span className="text-sm font-medium text-blue-600">
          <FontAwesomeIcon icon={faSackDollar} className="text-xl" />{" "}
          {job.salary ? job.salary : "Salary Not specified"}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mt-2">
        {job.description.split(" ").length >= 20
          ? job.description.split(" ").slice(0, 20).join(" ") + "..."
          : job.description}
      </p>
    </div>
  );
};

export default JobCard;
