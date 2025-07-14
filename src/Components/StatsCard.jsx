const StatsCard = ({ name, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default StatsCard;
