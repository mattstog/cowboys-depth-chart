interface TabNavigationProps {
  activeTab: 'list' | 'formation';
  onTabChange: (tab: 'list' | 'formation') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-1 mb-6 inline-flex">
      <button
        onClick={() => onTabChange('list')}
        className={`px-6 py-2 rounded-md font-bold transition-colors uppercase ${
          activeTab === 'list'
            ? 'bg-cowboys-navy text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '0.05em' }}
      >
        List View
      </button>
      <button
        onClick={() => onTabChange('formation')}
        className={`px-6 py-2 rounded-md font-bold transition-colors uppercase ${
          activeTab === 'formation'
            ? 'bg-cowboys-navy text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '0.05em' }}
      >
        Formation View
      </button>
    </div>
  );
};
