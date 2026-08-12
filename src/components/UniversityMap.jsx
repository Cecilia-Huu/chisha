
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Star, GraduationCap, Flame, Filter, Locate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getRestaurantName, getRestaurantTag, getSchoolName } from '../lib/restaurantI18n';

const UniversityMap = ({ restaurants, onRestaurantClick, activeNeed, currentSchool, highlightId, onResetFilter }) => {
  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showRanking, setShowRanking] = useState(false);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 }); // 默认显示用户位置

  // 五角场高校生活圈示意数据
  const universityArea = {
    center: { lat: 31.2989, lng: 121.5015 },
    universities: [
      { name: '同济大学', position: { x: 29, y: 62 } },
      { name: '复旦大学', position: { x: 61, y: 31 } },
      { name: '上海财经', position: { x: 77, y: 55 } }
    ]
  };

  // 根据餐厅类型获取图标
  const getRestaurantIcon = (restaurant) => {
    if (restaurant.name.includes('拉面') || restaurant.name.includes('面条') || restaurant.name.includes('米线')) return '🍜';
    if (restaurant.name.includes('火锅') || restaurant.name.includes('烤串')) return '🍲';
    if (restaurant.name.includes('牛排') || restaurant.name.includes('西餐')) return '🥩';
    if (restaurant.name.includes('奶茶') || restaurant.name.includes('甜品')) return '🧋';
    if (restaurant.name.includes('炒饭')) return '🍳';
    return '🍽️';
  };

  // 根据评分获取颜色标记
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 筛选餐厅
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (restaurant.dist == null) return false;
    if (activeNeed === 'all') return true;
    return restaurant.needs.includes(activeNeed);
  });

  const markerPositions = [
    { x: 20, y: 27 }, { x: 74, y: 24 }, { x: 24, y: 44 }, { x: 78, y: 43 },
    { x: 17, y: 62 }, { x: 83, y: 64 }, { x: 35, y: 72 }, { x: 65, y: 73 },
    { x: 39, y: 21 }, { x: 59, y: 49 }, { x: 49, y: 66 }
  ];

  // 处理餐厅点击
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // 关闭详情卡片
  const closeDetailCard = () => {
    setSelectedRestaurant(null);
  };

  // 处理"去看看"点击
  const handleGoSee = () => {
    if (selectedRestaurant) {
      onRestaurantClick(selectedRestaurant.id);
      closeDetailCard();
    }
  };

  // 处理"想去"点击
  const handleWantToGo = () => {
    console.log('想去:', selectedRestaurant.name);
    closeDetailCard();
  };

  // 切换榜单显示
  const toggleRanking = () => {
    setShowRanking(!showRanking);
  };

  // 获取步行时间
  const getWalkingTime = (distance) => {
    const time = Math.ceil(distance / 80);
    return time;
  };

  // 处理定位按钮点击
  const handleLocateClick = () => {
    // 模拟定位到用户当前位置
    setUserLocation({ x: 50, y: 50 });
  };

  useEffect(() => {
    if (highlightId !== null && highlightId !== undefined) {
      const restaurant = restaurants.find(r => r.id === highlightId);
      if (restaurant) {
        setSelectedRestaurant(restaurant);
      }
    }
  }, [highlightId, restaurants]);

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* 地图背景 */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(71, 85, 105, .12) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 85, 105, .12) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      </div>

      {/* 距离圈层可视化 - 以用户位置或地图中心为中心 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[min(86vw,22rem)] aspect-square rounded-full border-[3px] border-violet-500 border-dotted bg-violet-100/20 shadow-[0_0_0_1px_rgba(139,92,246,0.08)]">
          <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">1000m</span>
          <div className="absolute left-1/2 top-1/2 w-[68%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-amber-500 border-dashed bg-amber-100/25">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-[#18120A] shadow">500m</span>
            <div className="absolute left-1/2 top-1/2 w-[42%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-emerald-600 border-solid bg-emerald-100/45">
              <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">200m</span>
            </div>
          </div>
        </div>
      </div>

      {/* 大学标记 */}
      {universityArea.universities.map((uni, index) => (
        <div
          key={index}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${uni.position.x}%`,
            top: `${uni.position.y}%`
          }}
        >
          <div className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg whitespace-nowrap ${currentSchool === uni.name || (currentSchool === '上海财经大学' && uni.name === '上海财经') ? 'bg-[#18120A] text-[#F0A500] ring-2 ring-[#F0A500]' : 'bg-blue-700 text-white'}`}>
            🏫 {getSchoolName(uni.name, i18n.language)}
          </div>
        </div>
      ))}

      {/* 用户位置标记 - 小人图标 */}
      {userLocation && (
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${userLocation.x}%`,
            top: `${userLocation.y}%`
          }}
        >
          <div className="relative">
            {/* 小人图标 */}
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">👤</span>
            </div>
            {/* 脉冲动画 */}
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
          </div>
        </div>
      )}

      {/* 餐厅标记 - 显示名称和图标 */}
      {filteredRestaurants.map((restaurant, index) => {
        const position = markerPositions[index % markerPositions.length];
        return (
          <div
            key={restaurant.id}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <div className="relative flex flex-col items-center">
              {/* 餐厅标记 - 评分颜色实心圆点 */}
              <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center relative z-10 ${getRatingColor(restaurant.rating)}`}>
                <span className="text-white text-sm">{restaurant.rating}</span>
              </div>
              
              {/* 餐厅名称和图标 */}
              <div className="mt-1 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap flex items-center gap-1">
                <span>{getRestaurantIcon(restaurant)}</span>
                <span className="font-medium">{getRestaurantName(restaurant, i18n.language)}</span>
              </div>
              
              {/* 榜单高亮效果 */}
              {showRanking && index < 3 && (
                <div className="absolute -inset-2 rounded-full bg-orange-400 animate-pulse opacity-50"></div>
              )}
            </div>
          </div>
        );
      })}

      {/* 地图控件 - 悬浮简洁控件 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={toggleRanking}
          className={`p-2 rounded-lg shadow-lg transition-all ${showRanking ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:shadow-xl'}`}
        >
          <Flame size={20} />
        </button>
        <button 
          onClick={handleLocateClick}
          className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Locate size={20} className="text-gray-600" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Navigation size={20} className="text-gray-600" />
        </button>
      </div>

      {/* 榜单按钮 */}
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleRanking}
          className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all ${showRanking ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 hover:bg-orange-100'}`}
        >
          <Flame size={16} />
          <span className="text-sm font-semibold">🔥 {t('map.ranking')}</span>
        </button>
      </div>

      {/* 当前视野餐厅数量 */}
      <div className="absolute bottom-32 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
        <div className="text-sm font-semibold">{t('map.currentArea')}</div>
        <div className="text-xs text-gray-600">{t('map.restaurantCount', { count: filteredRestaurants.length })}</div>
      </div>

      {/* 图例 - 底部卡片 */}
      <div className="absolute bottom-4 left-3 right-3 bg-white/95 p-3 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">≥4.5{t('map.score')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">4.0-4.5{t('map.score')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">&lt;4.0{t('map.score')}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-gray-100 pt-2 sm:border-0 sm:pt-0">
            <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border-2 border-emerald-600 border-solid bg-emerald-100"></div>
            <span className="text-xs">200m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-dashed bg-amber-100"></div>
            <span className="text-xs">500m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-dotted bg-violet-100"></div>
            <span className="text-xs">1000m</span>
          </div>
          </div>
        </div>
      </div>

      {/* 餐厅详情卡片 */}
      {selectedRestaurant && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-xl shadow-xl p-4 z-30">
          <div className="flex items-start gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ background: selectedRestaurant.bgColor }}
            >
              {getRestaurantIcon(selectedRestaurant)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{getRestaurantName(selectedRestaurant, i18n.language)}</h3>
                {selectedRestaurant.verified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <GraduationCap size={10} />
                    {t('common.verified')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${getRatingColor(selectedRestaurant.rating)}`}>
                  {selectedRestaurant.rating}
                </div>
                <span>¥{selectedRestaurant.price}/{t('common.perPerson')}</span>
                <span>·</span>
                <span>{selectedRestaurant.dist}m</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedRestaurant.stags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                  >
                    {getRestaurantTag(tag, i18n.language)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              {t('map.walkAbout', { time: getWalkingTime(selectedRestaurant.dist) })}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleWantToGo}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                🐾 {t('map.wantToGo')}
              </button>
              <button
                onClick={handleGoSee}
                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                {t('map.viewDetails')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 筛选状态指示器 */}
      {activeNeed !== 'all' && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
          <Filter size={14} className="text-red-500" />
          <span className="text-sm font-medium">
            {t(`needs.${activeNeed}`)}
          </span>
        </div>
      )}

      {/* 无结果提示 */}
      {filteredRestaurants.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-xs">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-semibold text-lg mb-2">{t('map.noMatch')}</div>
            <div className="text-sm text-gray-600 mb-4">{t('map.tryFilters')}</div>
            <button
              onClick={onResetFilter}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              {t('map.reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityMap;
