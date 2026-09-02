export const PriorityBadge = ({ priority }) => {
  if (!priority) return <span className="text-gray-500 text-sm">Not set</span>;

  const priorityStyles = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyles[priority] || 'bg-gray-100 text-gray-800'}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
