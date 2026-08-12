import React from 'react';
import { useTranslation } from 'react-i18next';

const DecideButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <section className="px-5 pt-7 text-center">
      <div className="font-['ZCOOL_XiaoWei'] text-[clamp(1.8rem,6vw,2.8rem)] text-[#18120A] mb-1.5">
        {t('heroQuestion')}
      </div>
      <div className="text-sm text-[#9A8A78] mb-5">
        {t('heroSubtitle')}
      </div>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2.5 bg-[#D94F2B] text-white border-none rounded-full px-8 py-3.5 text-lg font-['ZCOOL_XiaoWei'] cursor-pointer shadow-lg shadow-[#D94F2B]/35 transition-all duration-150 tracking-wide hover:transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D94F2B]/45 active:transform active:translate-y-0"
      >
        <span className="text-xl animate-bounce">🎲</span> {t('decideButton')}
      </button>
    </section>
  );
};

export default DecideButton;
