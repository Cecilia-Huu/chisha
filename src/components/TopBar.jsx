import React from 'react';
import { ChevronDown, Globe, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopBar = ({ currentSchool, onSchoolChange, currentLanguage, onLanguageChange }) => {
  const { t } = useTranslation();
  
  const schools = [
    { key: '全部', label: t('schools.all') },
    { key: '同济大学', label: t('schools.tongji') },
    { key: '复旦大学', label: t('schools.fudan') },
    { key: '上海财经大学', label: t('schools.shufe') }
  ];

  return (
    <header className="bg-[#18120A] sticky top-0 z-200 px-3 py-2.5 sm:px-5">
      <div className="flex items-center justify-between gap-2">
        <div className="shrink-0 font-['ZCOOL_XiaoWei'] text-white text-lg sm:text-xl tracking-wide whitespace-nowrap">
          吃啥
        </div>

        <div className="flex items-center gap-1.5 min-w-0">
          <div className="relative min-w-0">
            <MapPin size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#F0A500] pointer-events-none" />
            <select
              aria-label={currentLanguage === 'zh' ? '选择学校' : 'Select campus'}
              value={currentSchool}
              onChange={(event) => onSchoolChange(event.target.value)}
              className="appearance-none w-[132px] sm:w-[172px] rounded-full border border-white/20 bg-[#302820] py-1.5 pl-8 pr-7 text-xs text-white outline-none transition-colors hover:bg-[#3A3026] focus:border-[#F0A500]"
            >
              {schools.map((school) => (
                <option key={school.key} value={school.key} className="bg-[#18120A] text-white">
                  {school.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
          </div>

          <button
            type="button"
            aria-label={currentLanguage === 'zh' ? '切换为英文' : 'Switch to Chinese'}
            onClick={() => onLanguageChange(currentLanguage === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1 px-2 py-1.5 bg-white/10 text-white/80 rounded-full text-xs hover:bg-white/20 transition-colors"
          >
            <Globe size={12} />
            {currentLanguage === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
