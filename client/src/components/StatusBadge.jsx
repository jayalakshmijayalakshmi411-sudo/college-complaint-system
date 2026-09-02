export const StatusBadge = ({ status }) => {
  const statusStyles = {
    Submitted: 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    Assigned: 'bg-purple-100 text-purple-800',
    'In Progress': 'bg-cyan-100 text-cyan-800',
    Resolved: 'bg-green-100 text-green-800',
    Closed: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
