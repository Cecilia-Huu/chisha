import React, { useMemo, useState } from 'react';
import { CheckCircle, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatRestaurantMeta, getAreaName, getRestaurantName, getRestaurantTag, getSchoolName } from '../lib/restaurantI18n';

const sortKeys = ['popularity', 'budget', 'rating', 'new'];

const FullRanking = ({ restaurants, initialSort = 'popularity', onRestaurantClick }) => {
  const { t, i18n } = useTranslation();
  const [sortBy, setSortBy] = useState(sortKeys.includes(initialSort) ? initialSort : 'popularity');
  const [area, setArea] = useState('all');

  const areas = useMemo(() => [...new Set(restaurants.map(restaurant => restaurant.school))], [restaurants]);
  const rankedRestaurants = useMemo(() => {
    const filtered = area === 'all' ? [...restaurants] : restaurants.filter(restaurant => restaurant.school === area);
    return filtered.sort((a, b) => {
      if (sortBy === 'budget') {
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price || (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'rating') {
        if (a.rating == null) return 1;
        if (b.rating == null) return -1;
        return b.rating - a.rating || a.price - b.price;
      }
      if (sortBy === 'new') return b.addedAt - a.addedAt;
      if (a.verified !== b.verified) return Number(b.verified) - Number(a.verified);
      return (b.rating || 0) - (a.rating || 0) || (a.dist || Infinity) - (b.dist || Infinity);
    });
  }, [area, restaurants, sortBy]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 sm:px-5 space-y-4">
      <section className="rounded-2xl bg-[#18120A] text-white p-5 overflow-hidden relative">
        <div className="absolute -right-7 -top-8 text-8xl opacity-10">🍽️</div>
        <div className="relative">
          <div className="text-xs text-[#F0A500] mb-1">{t('fullRanking.total', { count: restaurants.length })}</div>
          <h1 className="font-['ZCOOL_XiaoWei'] text-2xl">{t('fullRanking.title')}</h1>
          <p className="text-sm text-white/65 mt-2">{t('fullRanking.subtitle')}</p>
        </div>
      </section>

      <div className="sticky top-[64px] z-20 bg-[#F7F3EE]/95 backdrop-blur py-1 space-y-3">
        <div className="grid grid-cols-4 bg-white rounded-xl p-1 border border-black/5">
          {sortKeys.map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className={`rounded-lg py-2 text-sm transition-colors ${sortBy === key ? 'bg-[#18120A] text-[#F0A500] font-semibold' : 'text-[#6F6253]'}`}
            >
              {t(`fullRanking.sorts.${key}`)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button type="button" onClick={() => setArea('all')} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${area === 'all' ? 'bg-[#D94F2B] border-[#D94F2B] text-white' : 'bg-white border-black/10'}`}>{t('fullRanking.allAreas')}</button>
          {areas.map(item => (
            <button key={item} type="button" onClick={() => setArea(item)} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${area === item ? 'bg-[#D94F2B] border-[#D94F2B] text-white' : 'bg-white border-black/10'}`}>{getSchoolName(item, i18n.language)}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#FFF8E8] border border-[#F5D98A] px-3.5 py-3 text-xs leading-5 text-[#6A531C] flex gap-2">
        <Clock3 size={15} className="flex-shrink-0 mt-0.5" />
        <span>{t('fullRanking.pendingNote')}</span>
      </div>

      <div className="space-y-2.5">
        {rankedRestaurants.map((restaurant, index) => (
          <button
            key={restaurant.id}
            type="button"
            onClick={() => onRestaurantClick(restaurant.id)}
            className="w-full text-left bg-white rounded-2xl border border-black/5 p-3.5 flex items-center gap-3 hover:border-[#F0A500] hover:shadow-sm transition-all"
          >
            <div className={`font-['DM_Mono'] text-lg font-bold w-7 text-center ${index < 3 ? 'text-[#D58A00]' : 'text-[#9A8A78]'}`}>{index + 1}</div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: restaurant.bgColor }}>{restaurant.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold truncate">{getRestaurantName(restaurant, i18n.language)}</span>
                {restaurant.verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[10px]"><CheckCircle size={10} />{t('fullRanking.verified')}</span>
                ) : (
                  <span className="rounded-full bg-gray-100 text-gray-500 px-1.5 py-0.5 text-[10px]">{t('fullRanking.pending')}</span>
                )}
              </div>
              <div className="text-xs text-[#8B7D6C] mt-1">{formatRestaurantMeta(restaurant, i18n.language, false)}</div>
              <div className="flex items-center gap-1 mt-1.5 min-w-0">
                <MapPin size={11} className="text-[#D94F2B] flex-shrink-0" />
                <span className="text-[11px] text-[#6F6253] truncate">{restaurant.area ? getAreaName(restaurant.area, i18n.language) : getSchoolName(restaurant.school, i18n.language)}</span>
                {restaurant.stags[0] && <span className="text-[11px] text-[#6F6253] truncate">· {getRestaurantTag(restaurant.stags[0], i18n.language)}</span>}
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
          </button>
        ))}
        {!rankedRestaurants.length && <div className="text-center text-gray-400 py-12">{t('fullRanking.noResults')}</div>}
      </div>
    </div>
  );
};

export default FullRanking;
