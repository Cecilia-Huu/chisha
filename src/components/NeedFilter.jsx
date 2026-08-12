import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { needCategories } from '../data/needOptions';

const NeedFilter = ({ activeNeed, onNeedChange, availableNeeds }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('functional');
  const [pageOffsets, setPageOffsets] = useState({
    functional: 0,
    mood: 0,
    social: 0,
  });

  // 处理标签点击
  const handleNeedClick = (needKey) => {
    onNeedChange(needKey);
  };

  // 处理Tab切换
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 切换Tab时清除当前选中的标签
    onNeedChange('all', { silent: true });
  };

  // “换一换”按顺序展示下一组需求标签。
  const handleShuffle = () => {
    onNeedChange('all', { silent: true });
    setPageOffsets(prev => ({
      ...prev,
      [activeTab]: (prev[activeTab] + 7) % Math.max(currentNeeds.length, 1),
    }));
  };

  const currentNeeds = needCategories[activeTab]
    .filter(need => !availableNeeds || availableNeeds.includes(need.key))
    .map(need => ({ ...need, label: t(`needs.${need.key}`) }));

  const visibleCount = Math.min(7, currentNeeds.length);
  const visibleNeeds = Array.from({ length: visibleCount }, (_, index) => (
    currentNeeds[(pageOffsets[activeTab] + index) % currentNeeds.length]
  ));

  // 获取当前Tab的颜色主题
  const getTabTheme = () => {
    switch (activeTab) {
      case 'functional': return {
        activeBg: 'bg-[#D94F2B]',
        activeText: 'text-white',
        inactiveText: 'text-[#D94F2B]',
        borderColor: 'border-[#D94F2B]',
        activeCardBg: 'bg-[#FFF2EE]',
        activeCardBorder: 'border-[#D94F2B]'
      };
      case 'mood': return {
        activeBg: 'bg-[#7B5EA7]',
        activeText: 'text-white',
        inactiveText: 'text-[#7B5EA7]',
        borderColor: 'border-[#7B5EA7]',
        activeCardBg: 'bg-[#F5F0FF]',
        activeCardBorder: 'border-[#7B5EA7]'
      };
      case 'social': return {
        activeBg: 'bg-[#3A6EA8]',
        activeText: 'text-white',
        inactiveText: 'text-[#3A6EA8]',
        borderColor: 'border-[#3A6EA8]',
        activeCardBg: 'bg-[#EEF4FF]',
        activeCardBorder: 'border-[#3A6EA8]'
      };
      default: return {
        activeBg: 'bg-[#D94F2B]',
        activeText: 'text-white',
        inactiveText: 'text-[#D94F2B]',
        borderColor: 'border-[#D94F2B]',
        activeCardBg: 'bg-[#FFF2EE]',
        activeCardBorder: 'border-[#D94F2B]'
      };
    }
  };

  const theme = getTabTheme();
  return (
    <div className="px-5 pt-4">
      {/* Tab导航 */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => handleTabChange('functional')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'functional' 
              ? `${theme.activeBg} ${theme.activeText}` 
              : `${theme.inactiveText} hover:bg-gray-200`
          }`}
        >
          📌 {t('needs.functional') || 'Functional'}
        </button>
        <button
          onClick={() => handleTabChange('mood')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'mood' 
              ? `${theme.activeBg} ${theme.activeText}` 
              : `${theme.inactiveText} hover:bg-gray-200`
          }`}
        >
          😌 {t('needs.mood') || 'Mood'}
        </button>
        <button
          onClick={() => handleTabChange('social')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === 'social' 
              ? `${theme.activeBg} ${theme.activeText}` 
              : `${theme.inactiveText} hover:bg-gray-200`
          }`}
        >
          👥 {t('needs.social') || 'Social'}
        </button>
      </div>

      {/* 标签网格 */}
      <div className="grid grid-cols-4 gap-2">
        {visibleNeeds.map(need => (
          <div
            key={need.key}
            onClick={() => handleNeedClick(need.key)}
            className={`flex flex-col items-center gap-1 p-2.5 bg-white border-2 rounded-xl cursor-pointer transition-all duration-150 ${
              activeNeed === need.key && need.key !== 'all'
                ? `${theme.activeCardBorder} ${theme.activeCardBg} transform -translate-y-0.5 shadow-md`
                : 'border-[rgba(24,18,10,0.10)] hover:border-[#D94F2B] hover:bg-[#FFF2EE]'
            }`}
          >
            <span className="text-2xl">{need.icon}</span>
            <span className="text-xs text-[#18120A] font-semibold whitespace-nowrap">
              {need.label}
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={handleShuffle}
          aria-label={t('needs.shuffle')}
          disabled={currentNeeds.length <= visibleCount}
          className="flex flex-col items-center gap-1 p-2.5 bg-white border-2 border-[rgba(24,18,10,0.10)] rounded-xl cursor-pointer transition-all duration-150 hover:border-[#D94F2B] hover:bg-[#FFF2EE] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="text-2xl" aria-hidden="true">🔄</span>
          <span className="text-xs text-[#18120A] font-semibold whitespace-nowrap">
            {t('needs.shuffle')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NeedFilter;
