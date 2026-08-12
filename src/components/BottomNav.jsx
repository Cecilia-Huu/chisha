import React from 'react';
import { Home, Map, Flame, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: t('nav.home'), 
      active: activeTab === 'home' 
    },
    { 
      id: 'map', 
      icon: Map, 
      label: t('nav.map'), 
      active: activeTab === 'map' 
    },
    { 
      id: 'ranking', 
      icon: Flame, 
      label: t('nav.ranking'), 
      active: activeTab === 'ranking' 
    },
    { 
      id: 'profile', 
      icon: User, 
      label: t('nav.profile'), 
      active: activeTab === 'profile' 
    }
  ];

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              item.active 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
