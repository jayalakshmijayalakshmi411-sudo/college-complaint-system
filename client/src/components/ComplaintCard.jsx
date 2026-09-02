import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { ChevronRight } from 'lucide-react';

export const ComplaintCard = ({ complaint, isAdmin = false }) => {
  const route = isAdmin ? `/admin/complaints/${complaint._id}` : `/complaints/${complaint._id}`;

  return (
    <Link to={route}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{complaint.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{complaint.description}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {complaint.category}
          </span>
          <StatusBadge status={complaint.status} />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
          {complaint.priority && <PriorityBadge priority={complaint.priority} />}
        </div>

        {complaint.aiSummary && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-600">
            <p className="font-semibold text-gray-700 mb-1">AI Summary:</p>
            <p>{complaint.aiSummary}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ComplaintCard;
