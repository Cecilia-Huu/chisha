import React, { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap, TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRestaurants } from '../hooks/useRestaurants';
import { formatRestaurantMeta, getRestaurantName, getRestaurantTag } from '../lib/restaurantI18n';

const RankingPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurants } = useRestaurants();
  const [activeTab, setActiveTab] = useState('popularity');

  // 从URL参数或location state获取上下文维度
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dimFromUrl = params.get('dim');
    const dimFromState = location.state?.rankDim;
    
    if (dimFromUrl) {
      const tabMap = {
        'cheap': 'budget',
        'date': 'rating', 
        'night': 'popularity',
        'spicy': 'popularity',
        // 补充完整映射关系
        'near': 'popularity',
        'noqueue': 'popularity',
        'delivery': 'popularity',
        'afterExam': 'popularity',
        'afterSports': 'popularity',
        'sad': 'popularity',
        'stressed': 'popularity',
        'dormGroup': 'popularity',
        'birthday': 'rating',
        'study': 'popularity',
        'quick': 'popularity',
        'rainy': 'popularity',
        'lateNight': 'popularity'
      };
      setActiveTab(tabMap[dimFromUrl] || 'popularity');
    } else if (dimFromState) {
      const tabMap = {
        'cheap': 'budget',
        'date': 'rating',
        'night': 'popularity',
        'spicy': 'popularity',
        // 补充完整映射关系
        'near': 'popularity',
        'noqueue': 'popularity',
        'delivery': 'popularity',
        'afterExam': 'popularity',
        'afterSports': 'popularity',
        'sad': 'popularity',
        'stressed': 'popularity',
        'dormGroup': 'popularity',
        'birthday': 'rating',
        'study': 'popularity',
        'quick': 'popularity',
        'rainy': 'popularity',
        'lateNight': 'popularity'
      };
      setActiveTab(tabMap[dimFromState] || 'popularity');
    }
  }, [location]);

  // 榜单Tab选项
  const tabs = [
    { key: 'popularity', label: t('ranking.tabs.popularity') },
    { key: 'budget', label: t('ranking.tabs.budget') },
    { key: 'rating', label: t('ranking.tabs.rating') },
    { key: 'new', label: t('ranking.tabs.new') }
  ];

  // 获取趋势图标
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp size={12} className="text-green-500" />;
      case 'down': return <TrendingDown size={12} className="text-red-500" />;
      default: return <Minus size={12} className="text-gray-400" />;
    }
  };

  // 使用餐厅客观信息，不展示虚构趋势。
  const getTrendData = (restaurant, index) => {
    if (index === 0) return { type: 'stable', label: t('rankingDetail.highRating', { rating: restaurant.rating }) };
    if (index === 1) return { type: 'stable', label: t('rankingDetail.distance', { distance: restaurant.dist }) };
    return { type: 'stable', label: t('rankingDetail.average', { price: restaurant.price }) };
  };

  // 获取同学评论 - 使用ID作为key，支持i18n
  const getStudentComment = (restaurant) => {
    const comments = {
      0: { zh: "考完数分就是要来这碗面", en: "Perfect after math exam" },
      1: { zh: "宿舍夜谈必备", en: "Dorm night talk essential" },
      2: { zh: "聚餐首选，学生价很划算", en: "Group dining favorite, great student price" },
      3: { zh: "快出餐，上课不迟到", en: "Fast service, never late for class" },
      4: { zh: "下雨天外卖首选", en: "Rainy day delivery favorite" },
      5: { zh: "约会圣地，环境很棒", en: "Date spot, great atmosphere" },
      6: { zh: "复习必备，提神醒脑", en: "Study essential, keeps you awake" },
      7: { zh: "分量足，20元吃到撑", en: "Huge portions, full for ¥20" }
    };
    
    const comment = comments[restaurant.id];
    if (comment) {
      return comment[i18n.language] || comment.zh;
    }
    return i18n.language === 'zh' ? "同学们都说好" : "Students love it";
  };

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'text-[#F0A500]';
      case 1: return 'text-[#AAA]';
      case 2: return 'text-[#B87333]';
      default: return 'text-[#9A8A78]';
    }
  };

  const getRankBadge = (restaurant, index) => {
    // 使用trend_type字段决定徽章，而不是餐厅名称
    if (index === 0) return { text: t('rankingDetail.highlyRated'), class: 'bg-[#FFF3CD] text-[#856404]' };
    return null;
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

  // 根据当前维度筛选和排序餐厅
  const getFilteredRestaurants = () => {
    let filtered = [...restaurants];
    
    switch(activeTab) {
      case 'budget':
        filtered = filtered.filter(r => r.rating >= 4.0).sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        // 使用addedAt字段进行排序
        filtered = filtered.sort((a, b) => b.addedAt - a.addedAt);
        break;
      case 'popularity':
      default:
        filtered = filtered.sort((a, b) => b.rating - a.rating || a.dist - b.dist);
        break;
    }
    
    return filtered.slice(0, 20); // 取Top 20
  };

  const filteredRestaurants = getFilteredRestaurants();

  // 处理餐厅点击
  const handleRestaurantClick = (restaurantId) => {
    // 暂时用Toast提示，后续可以跳转到详情页
    console.log('Restaurant clicked:', restaurantId);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-['Noto_Serif_SC'] text-[#18120A]">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">{t('rankingDetail.back')}</span>
        </button>
        <div className="font-['ZCOOL_XiaoWei'] text-lg">
          {t('todayRanking')}
        </div>
        <div className="w-16"></div> {/* 占位保持居中 */}
      </div>

      {/* 维度Tab */}
      <div className="px-5 py-3 bg-white border-b border-gray-200">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-2 py-1.5 text-sm rounded-md transition-all ${
                activeTab === tab.key 
                  ? 'bg-[#18120A] text-[#F0A500]' 
                  : 'text-gray-600 hover:text-[#F0A500]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* 添加榜单说明 */}
        <div className="text-xs text-gray-500 text-center mt-2">
          🏆 {t('rankingDetail.explanation')}
        </div>
      </div>

      {/* 榜单列表 */}
      <div className="px-5 py-4">
        {filteredRestaurants.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredRestaurants.map((restaurant, index) => {
              const badge = getRankBadge(restaurant, index);
              const trend = getTrendData(restaurant, index);
              
              return (
                <div
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className={`font-['DM_Mono'] text-lg font-medium min-w-[24px] text-center ${getRankColor(index)}`}>
                    {index + 1}
                  </div>
                  <div className="text-2xl">{restaurant.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-semibold">{getRestaurantName(restaurant, i18n.language)}</span>
                      {restaurant.verified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <GraduationCap size={8} />
                          {t('common.verified')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#9A8A78] font-['DM_Mono'] mb-1">
                      {formatRestaurantMeta(restaurant, i18n.language)}
                    </div>
                    {/* 趋势信息 */}
                    <div className="flex items-center gap-1 text-xs mb-1">
                      {getTrendIcon(trend.type)}
                      <span className="text-gray-600">{trend.label}</span>
                    </div>
                    {/* 餐厅标签形成可解释的推荐理由。 */}
                    <div className="text-xs text-gray-600 italic border-l-2 border-[#F0A500] pl-2 bg-[#FFFEF9] py-1 rounded-r">
                      {t('rankingDetail.reason', { reason: restaurant.stags[0] ? getRestaurantTag(restaurant.stags[0], i18n.language) : t('rankingDetail.defaultReason') })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {badge && (
                      <div className={`text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap ${badge.class}`}>
                        {badge.text}
                      </div>
                    )}
                    <div className="flex items-center gap-0.5">
                      {renderStars(restaurant.rating)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // 空状态处理
          <div className="text-center py-10 text-gray-500">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-semibold text-lg mb-2">{t('rankingDetail.noData')}</div>
            <div className="text-sm">{t('rankingDetail.tryLater')}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
