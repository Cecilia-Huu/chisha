import React, { useState, useMemo } from 'react';
import { GraduationCap, TrendingUp, TrendingDown, Minus, Star, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RankingStrip = ({ restaurants, onRestaurantClick, onViewFullRanking, activeNeed, viewCounts = {} }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('popularity');
  
  // 获取当前场景对应的榜单标题
  const getRankingTitle = () => {
    if (activeNeed === 'cheap') return t('ranking.titles.budget');
    if (activeNeed === 'night') return t('ranking.titles.night');
    if (activeNeed === 'spicy') return t('ranking.titles.spicy');
    if (activeNeed === 'date') return t('ranking.titles.date');
    return t('ranking.titles.popularity');
  };

  // 根据当前Tab和需求维度筛选并排序餐厅
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];
    
    // 先按需求维度过滤
    if (activeNeed !== 'all') {
      filtered = filtered.filter(r => r.needs.includes(activeNeed));
    }
    
    // 再按当前Tab排序
    switch (activeTab) {
      case 'budget':
        // 省钱榜：优先筛选高评分，再按价格从低到高排序
        filtered = filtered.filter(r => r.rating >= 4.0).sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        // 口碑榜：按评分从高到低排序
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        // 新发现榜：按上架时间从新到旧排序
        filtered = filtered.sort((a, b) => b.addedAt - a.addedAt);
        break;
      case 'popularity':
      default:
        // 人气榜：优先使用当前设备真实详情浏览量，再按评分排序。
        filtered = filtered.sort((a, b) => {
          const viewDiff = (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0);
          if (viewDiff) return viewDiff;
          return b.rating - a.rating || a.dist - b.dist;
        });
        break;
    }
    
    return filtered.slice(0, 3);
  }, [restaurants, activeNeed, activeTab, viewCounts]);

  // 获取趋势图标
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp size={12} className="text-green-500" />;
      case 'down': return <TrendingDown size={12} className="text-red-500" />;
      default: return <Minus size={12} className="text-gray-400" />;
    }
  };

  // 榜单说明优先展示当前设备真实浏览量，否则展示餐厅客观信息。
  const getTrendData = (restaurant, index) => {
    const count = viewCounts[restaurant.id] || 0;
    if (count) return { type: 'up', label: `本设备查看 ${count} 次` };
    if (index === 0) return { type: 'stable', label: `${restaurant.rating}分高口碑` };
    if (index === 1) return { type: 'stable', label: `距你 ${restaurant.dist}m` };
    return { type: 'stable', label: `人均 ¥${restaurant.price}` };
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
    if ((viewCounts[restaurant.id] || 0) > 0) return { text: '本机常看', class: 'bg-[#E8F5E9] text-[#2E7D32]' };
    if (index === 0) return { text: '高分推荐', class: 'bg-[#FFF3CD] text-[#856404]' };
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

  // 榜单Tab选项
  const tabs = [
    { key: 'popularity', label: t('ranking.tabs.popularity') },
    { key: 'budget', label: t('ranking.tabs.budget') },
    { key: 'rating', label: t('ranking.tabs.rating') },
    { key: 'new', label: t('ranking.tabs.new') }
  ];

  // 处理查看完整榜单点击
  const handleViewFullRanking = () => {
    onViewFullRanking?.(activeTab);
  };

  return (
    <div className="px-5 mb-1">
      {/* 榜单标题、Tab和查看完整榜单入口放在同一行 */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-['ZCOOL_XiaoWei'] text-lg">
          🔥 {getRankingTitle()}
        </div>
        
        {/* 横滑Tab */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                activeTab === tab.key 
                  ? 'bg-[#18120A] text-[#F0A500]' 
                  : 'text-gray-600 hover:text-[#F0A500]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* 查看完整榜单入口 */}
        <button 
          onClick={handleViewFullRanking}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <span>{t('viewFullRanking')}</span>
          <ChevronRight size={14} />
        </button>
      </div>
      
      {/* 榜单条目 */}
      <div className="flex flex-col gap-2">
        {filteredRestaurants.map((restaurant, index) => {
          const badge = getRankBadge(restaurant, index);
          const trend = getTrendData(restaurant, index);
          
          return (
            <div
              key={restaurant.id}
              onClick={() => onRestaurantClick(restaurant.id)}
              className="flex items-center gap-3 bg-white rounded-xl p-2.5 border-2 border-[rgba(24,18,10,0.10)] cursor-pointer transition-all duration-150 hover:border-[#F0A500] hover:shadow-md hover:shadow-[#F0A500]/15"
            >
              <div className={`font-['DM_Mono'] text-lg font-medium min-w-[22px] text-center ${getRankColor(index)}`}>
                {index + 1}
              </div>
              <div className="text-2xl">{restaurant.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-sm font-semibold">{restaurant.name}</span>
                  {restaurant.verified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <GraduationCap size={8} />
                      已核验
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#9A8A78] font-['DM_Mono'] mb-1">
                  {restaurant.meta}
                </div>
                {/* 趋势信息 */}
                <div className="flex items-center gap-1 text-xs mb-1">
                  {getTrendIcon(trend.type)}
                  <span className="text-gray-600">{trend.label}</span>
                </div>
                {/* 使用餐厅已有标签作为推荐理由，避免展示虚构评论。 */}
                <div className="text-xs text-gray-600 italic border-l-2 border-[#F0A500] pl-2 bg-[#FFFEF9] py-1 rounded-r">
                  推荐理由：{restaurant.stags[0]?.t || '综合表现不错'}
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
    </div>
  );
};

export default RankingStrip;
