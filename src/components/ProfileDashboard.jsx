import React from 'react';
import { ArrowLeft, BarChart3, Clock3, Download, Heart, MousePointerClick, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatRestaurantMeta, getRestaurantName } from '../lib/restaurantI18n';

const ProfileDashboard = ({
  stats,
  favoriteRestaurants,
  decisions,
  allRestaurants,
  onRestaurantClick,
  onToggleFavorite,
  onExportData,
  onBack,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const restaurantById = new Map(allRestaurants.map(restaurant => [restaurant.id, restaurant]));
  const formatTime = value => new Intl.DateTimeFormat(language.startsWith('zh') ? 'zh-CN' : 'en-US', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(value));

  const funnel = [
    { label: t('profile.visits'), value: stats.visits, icon: BarChart3, color: 'bg-[#18120A]' },
    { label: t('profile.detailViews'), value: stats.detailViews, icon: MousePointerClick, color: 'bg-[#F0A500]' },
    { label: t('profile.completedDecisions'), value: stats.decisions, icon: Target, color: 'bg-[#D94F2B]' },
  ];
  const maxFunnel = Math.max(...funnel.map(item => item.value), 1);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-5 space-y-4">
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6F6253] hover:text-[#18120A]">
        <ArrowLeft size={17} /> {t('profile.back')}
      </button>
      <section className="bg-[#18120A] text-white rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-white/60 mb-1">{t('profile.deviceData')}</div>
            <h1 className="font-['ZCOOL_XiaoWei'] text-2xl">{t('profile.decisionRecord')}</h1>
            <p className="text-xs text-white/60 mt-2">{t('profile.dataExplanation')}</p>
          </div>
          <button
            type="button"
            onClick={onExportData}
            className="flex-shrink-0 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 text-xs flex items-center gap-1"
          >
            <Download size={14} /> {t('profile.export')}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 text-center">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold">{stats.decisions}</div>
            <div className="text-[11px] text-white/65 mt-1">{t('profile.completedDecisions')}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <div className="text-[11px] text-white/65 mt-1">{t('profile.favoriteRestaurants')}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <div className="text-[11px] text-white/65 mt-1">{t('profile.detailConversion')}</div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2"><BarChart3 size={18} className="text-[#D94F2B]" /> {t('profile.funnel')}</h2>
          <span className="text-[11px] text-[#8B7D6C]">{t('profile.deviceTotal')}</span>
        </div>
        <div className="space-y-3">
          {funnel.map(item => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-2"><item.icon size={14} /> {item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <div className="h-2.5 bg-[#EFEAE3] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.max(item.value ? 8 : 0, (item.value / maxFunnel) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="bg-[#F7F3EE] rounded-lg p-2.5">{t('profile.useFilters')} <strong className="float-right">{stats.filters}</strong></div>
          <div className="bg-[#F7F3EE] rounded-lg p-2.5">{t('profile.generateRecommendations')} <strong className="float-right">{stats.recommendations}</strong></div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><Heart size={18} className="text-red-500" /> {t('profile.myFavorites')} <span className="text-xs text-gray-400">{favoriteRestaurants.length}</span></h2>
        {favoriteRestaurants.length ? (
          <div className="space-y-2">
            {favoriteRestaurants.map(restaurant => (
              <div key={restaurant.id} className="flex items-center gap-3 border border-black/5 rounded-xl p-3">
                <button type="button" onClick={() => onRestaurantClick(restaurant.id, 'profile_favorite')} className="flex items-center gap-3 flex-1 text-left min-w-0">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: restaurant.bgColor }}>{restaurant.emoji}</div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{getRestaurantName(restaurant, language)}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatRestaurantMeta(restaurant, language)}</div>
                  </div>
                </button>
                <button type="button" aria-label={t('common.removeFavorite', { name: getRestaurantName(restaurant, language) })} onClick={() => onToggleFavorite(restaurant.id, 'profile')} className="text-red-500 p-2">
                  <Heart size={18} className="fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-7 text-gray-400 text-sm">{t('profile.noFavorites')}</div>
        )}
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><Clock3 size={18} className="text-[#3A6EA8]" /> {t('profile.recentDecisions')}</h2>
        {decisions.length ? (
          <div className="space-y-3">
            {decisions.slice(0, 8).map(decision => {
              const restaurant = restaurantById.get(decision.restaurantId);
              if (!restaurant) return null;
              return (
                <button key={decision.id} type="button" onClick={() => onRestaurantClick(restaurant.id, 'decision_history')} className="w-full flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3EE] flex items-center justify-center text-xl">{restaurant.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{getRestaurantName(restaurant, language)}</div>
                    <div className="text-xs text-gray-500">{t('profile.source', { source: t(decision.source === 'wizard' ? 'profile.sourceWizard' : decision.source === 'map' ? 'profile.sourceMap' : 'profile.sourceDetail') })}</div>
                  </div>
                  <div className="text-[11px] text-gray-400">{formatTime(decision.at)}</div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-7 text-gray-400 text-sm">{t('profile.noDecisions')}</div>
        )}
      </section>
    </div>
  );
};

export default ProfileDashboard;
