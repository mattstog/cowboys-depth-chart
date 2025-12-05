import { getUniqueStatusLabels } from '../utils/positions';

export const StatusKey = () => {
  const statusLabels = getUniqueStatusLabels();
  
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mt-8">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <span className="font-semibold text-gray-700 text-sm">Status Key:</span>
        {statusLabels.map((info) => (
          <div key={info.code} className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.color}`}>
              {info.label}
            </span>
            <span className="text-sm text-gray-600">{info.fullLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
