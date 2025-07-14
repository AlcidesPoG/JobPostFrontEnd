import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageJobCard = ({ job, handleEdit, handleDelete }) => {
  return (
    <div
      key={job.postId}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
    >
      <div>
        <h3 className="text-lg font-bold mb-2">{job.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Status:</strong> {job.status}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Type:</strong> {job.type}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          <strong>Posted On:</strong>{" "}
          {new Date(job.createdAt).toLocaleDateString("en-US")}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          <strong>Views:</strong> {job.status}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
          <strong>Description:</strong>{" "}
          {job.description.split(" ").length >= 50
            ? job.description.split(" ").slice(0, 50).join(" ") + "..."
            : job.description}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
          <strong>Requirements:</strong>{" "}
          {job.requirements.split(" ").length >= 50
            ? job.requirements.split(" ").slice(0, 50).join(" ") + "..."
            : job.requirements}
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleEdit(job.postId)}
          className="text-sm bg-blue-600 py-2 px-4 rounded-xl text-white hover:underline"
        >
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </button>
        <button
          onClick={() => handleDelete(job.postId)}
          className="text-sm bg-red-600 py-2 px-4 rounded-xl text-white hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};

export default ManageJobCard;
