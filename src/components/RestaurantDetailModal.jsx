import React from 'react';
import { CheckCircle, Clock3, Heart, MapPin, RefreshCw, Star, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RestaurantDetailModal = ({
  restaurant,
  activeNeed,
  isFavorite,
  onClose,
  onToggleFavorite,
  onDecide,
  onReroll,
}) => {
  const { t, i18n } = useTranslation();
  if (!restaurant) return null;

  const zh = i18n.language === 'zh';
  const walkingMinutes = Math.max(1, Math.ceil(restaurant.dist / 80));
  const sceneReason = activeNeed !== 'all' && restaurant.needs.includes(activeNeed)
    ? `${zh ? '符合你的场景' : 'Matches your need'}：${t(`needs.${activeNeed}`)}`
    : (zh ? '综合评分、距离和学生反馈推荐' : 'Recommended by rating, distance and student feedback');

  return (
    <div className="fixed inset-0 z-[500] bg-[rgba(24,18,10,0.58)] backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${restaurant.name}${zh ? '详情' : ' details'}`}
        className="relative bg-white w-full sm:max-w-[520px] rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl"
      >
        <button
          type="button"
          aria-label={zh ? '关闭详情' : 'Close details'}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
        >
          <X size={18} />
        </button>

        <div className="h-32 flex items-center justify-center text-6xl" style={{ background: restaurant.bgColor }}>
          {restaurant.emoji}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-['ZCOOL_XiaoWei'] text-2xl">{restaurant.name}</h2>
                {restaurant.verified && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                    <CheckCircle size={12} /> {zh ? '学生核验' : 'Verified'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm mt-2 text-[#6F6253]">
                <Star size={15} className="fill-[#F0A500] text-[#F0A500]" />
                <strong className="text-[#18120A]">{restaurant.rating}</strong>
                <span>· ¥{restaurant.price}/{zh ? '人' : 'person'}</span>
                <span>· {restaurant.school}</span>
              </div>
            </div>
            <button
              type="button"
              aria-label={isFavorite ? (zh ? '取消收藏' : 'Remove favorite') : (zh ? '收藏餐厅' : 'Favorite restaurant')}
              onClick={onToggleFavorite}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-[#F7F3EE] text-[#776B5D]'}`}
            >
              <Heart size={21} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <MapPin size={17} className="mx-auto text-[#D94F2B]" />
              <div className="font-semibold text-sm mt-1">{restaurant.dist}m</div>
              <div className="text-[11px] text-[#8B7D6C]">{zh ? '距离' : 'Distance'}</div>
            </div>
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <Clock3 size={17} className="mx-auto text-[#D94F2B]" />
              <div className="font-semibold text-sm mt-1">{walkingMinutes}{zh ? '分钟' : ' min'}</div>
              <div className="text-[11px] text-[#8B7D6C]">{zh ? '步行' : 'Walk'}</div>
            </div>
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <span className="text-base">{restaurant.open ? '🟢' : '⚪️'}</span>
              <div className="font-semibold text-sm mt-1">{restaurant.open ? (zh ? '营业中' : 'Open') : (zh ? '暂未营业' : 'Closed')}</div>
              <div className="text-[11px] text-[#8B7D6C]">{zh ? '状态' : 'Status'}</div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold mb-2">{zh ? '为什么推荐' : 'Why this place'}</h3>
            <div className="bg-[#FFF8E8] border border-[#F5D98A] rounded-xl p-3 text-sm text-[#5D4A1F]">
              ✨ {sceneReason}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {restaurant.stags.map((tag, index) => (
                <span key={index} className="text-xs px-2.5 py-1 rounded-full bg-[#F2EEE8] text-[#51473B]">
                  {tag.t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={onReroll}
              className="rounded-xl py-3 border-2 border-[#D94F2B] text-[#D94F2B] font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw size={17} /> {zh ? '再换一家' : 'Another one'}
            </button>
            <button
              type="button"
              onClick={onDecide}
              disabled={!restaurant.open}
              className="rounded-xl py-3 bg-[#D94F2B] text-white font-semibold shadow-md shadow-[#D94F2B]/20 disabled:bg-gray-300 disabled:shadow-none"
            >
              {restaurant.open ? (zh ? '就吃这家' : 'Choose this one') : (zh ? '暂未营业' : 'Currently closed')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetailModal;
