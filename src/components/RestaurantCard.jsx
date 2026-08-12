import React, { useState } from 'react';
import { CheckCircle, HelpCircle, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getRestaurantName, getRestaurantTag } from '../lib/restaurantI18n';

const RestaurantCard = ({ restaurant, onClick, isFavorite, onToggleFavorite }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationTooltip, setShowVerificationTooltip] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(restaurant.id, 'restaurant_card');
  };

  const handleVerifyClick = (e) => {
    e.stopPropagation();
    setIsVerified(!isVerified);
  };

  const handleVerificationHelp = (e) => {
    e.stopPropagation();
    setShowVerificationTooltip(!showVerificationTooltip);
  };

  const getTagColor = (color) => {
    switch(color) {
      case 'red': return 'bg-[#FFECE6] text-[#C13015]';
      case 'amber': return 'bg-[#FFF3CD] text-[#7A5A00]';
      case 'green': return 'bg-[#E6F4ED] text-[#235C3E]';
      case 'purple': return 'bg-[#F0EAFF] text-[#5B3EA6]';
      default: return 'bg-[#EDE7DC] text-[#18120A]';
    }
  };

  // 根据评分获取星级显示
  const renderStars = (rating) => {
    let starCount = 3;
    let starColor = 'text-amber-600'; // 铜色
    let starSize = 12;

    if (rating >= 4.5) {
      starCount = 5;
      starColor = 'text-yellow-400'; // 金色
      starSize = 16;
    } else if (rating >= 4.0) {
      starCount = 4;
      starColor = 'text-gray-400'; // 银色
      starSize = 14;
    }

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <Star 
          key={i} 
          size={starSize} 
          className={`${starColor} fill-current`} 
        />
      );
    }
    return stars;
  };

  return (
    <div
      onClick={() => onClick(restaurant.id)}
      className="flex gap-3 bg-white rounded-xl border-2 border-[rgba(24,18,10,0.10)] p-3 cursor-pointer transition-all duration-180 hover:border-[rgba(217,79,43,0.3)] hover:shadow-lg hover:shadow-[rgba(24,18,10,0.10)] hover:transform hover:translate-x-0.5"
    >
      <div 
        className="w-18 h-18 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl"
        style={{ background: restaurant.bgColor }}
      >
        {restaurant.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1">
            <span className="text-base font-bold leading-tight">{getRestaurantName(restaurant, language)}</span>
            {restaurant.verified && (
              <div className="relative">
                <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <CheckCircle size={10} />
                  {t('common.verified')}
                </span>
                <button 
                  onClick={handleVerificationHelp}
                  className="absolute -right-5 top-0 text-blue-500 hover:text-blue-700"
                >
                  <HelpCircle size={12} />
                </button>
                {showVerificationTooltip && (
                  <div className="absolute top-6 left-0 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 w-48">
                    {t('common.verifiedHelp')}
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleFavoriteClick}
            className="bg-none border-none text-base cursor-pointer flex-shrink-0 transition-transform duration-150 hover:scale-125"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="text-xs text-[#9A8A78] font-['DM_Mono'] mb-1.5 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {renderStars(restaurant.rating)}
            <span className="ml-1 text-[#18120A] font-semibold">{restaurant.rating}</span>
          </div>
          <span>·</span>
          <span>¥{restaurant.price}/{t('common.perPerson')}</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full border border-blue-300 bg-transparent"></div>
            <span>{restaurant.dist}m</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.25 mb-1.5">
          {restaurant.stags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-0.5 rounded-lg whitespace-nowrap ${getTagColor(tag.c)}`}
            >
              {getRestaurantTag(tag, language)}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleVerifyClick}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
              isVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <HelpCircle size={12} />
            {isVerified ? t('common.openConfirmed') : t('common.stillOpen')}
          </button>
          <span className="text-xs text-gray-400">{t('common.communityUpdated')}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
