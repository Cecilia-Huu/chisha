
import { useRestaurants } from '../hooks/useRestaurants';
import { useUserActivity } from '../hooks/useUserActivity';
import WizardModal from '../components/WizardModal';
import NeedFilter from '../components/NeedFilter';
import Toast from '../components/Toast';
import React, { useEffect, useRef, useState } from 'react';
import DecideButton from '../components/DecideButton';
import TopBar from '../components/TopBar';
import { GraduationCap, Heart, HelpCircle, Plus, User } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { useTranslation } from 'react-i18next';
import RecommendForm from '../components/RecommendForm';
import UniversityMap from '../components/UniversityMap';
import BottomNav from '../components/BottomNav';
import { needIcons } from '../data/needOptions';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import ProfileDashboard from '../components/ProfileDashboard';
import PersonalCenter from '../components/PersonalCenter';
import { getRestaurantName } from '../lib/restaurantI18n';
import FullRanking from '../components/FullRanking';
import '../i18n';
const Index = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isStudentVerified, setIsStudentVerified] = useState(false);
  const [myRecommendations, setMyRecommendations] = useState([]);
  const [showStudentTooltip, setShowStudentTooltip] = useState(false);
  const [mapHighlightId, setMapHighlightId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [detailSource, setDetailSource] = useState('list');
  const [showProfileStats, setShowProfileStats] = useState(false);
  const [fullRankingSort, setFullRankingSort] = useState('popularity');
  const hasTrackedVisit = useRef(false);

  const {
    allRestaurants,
    restaurants,
    schoolRestaurants,
    currentSchool,
    setCurrentSchool,
    activeNeed,
    availableNeeds,
    setActiveNeed,
    resetFilter,
    recentNeeds
  } = useRestaurants();

  const {
    favorites,
    decisions,
    stats,
    trackEvent,
    toggleFavorite,
    recordDecision,
    exportData,
  } = useUserActivity();

  const selectedRestaurant = allRestaurants.find(restaurant => restaurant.id === selectedRestaurantId) || null;
  const favoriteRestaurants = allRestaurants.filter(restaurant => favorites.includes(restaurant.id));
  useEffect(() => {
    if (!hasTrackedVisit.current) {
      hasTrackedVisit.current = true;
      trackEvent('page_view', { path: window.location.hash || '/' });
    }
  }, [trackEvent]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  const handleSchoolChange = (school) => {
    setCurrentSchool(school);
    setActiveNeed('all');
    trackEvent('school_select', { school });
  };

  const handleDecideClick = () => {
    setIsWizardOpen(true);
    trackEvent('wizard_start', { school: currentSchool });
  };

  const handleRecommendClick = () => {
    setIsRecommendOpen(true);
  };

  const handleRecommendSubmit = (recommendation) => {
    console.log('New recommendation:', recommendation);
    setMyRecommendations(prev => [...prev, { ...recommendation, id: Date.now() }]);
    showToastMessage(t('recommend.success'));
  };

  const handleNeedChange = (need, options = {}) => {
    setActiveNeed(need);
    if (!options.silent) {
      if (need !== 'all') trackEvent('filter_select', { need, school: currentSchool });
      showToastMessage(need === 'all'
        ? t('messages.showingAll')
        : t('messages.filtered', { label: t(`needs.${need}`) }));
    }
  };

  const handleRestaurantClick = (id, source = 'list') => {
    const restaurant = allRestaurants.find(r => r.id === id);
    if (restaurant) {
      setSelectedRestaurantId(id);
      setDetailSource(source);
      trackEvent('detail_view', { restaurantId: id, source, need: activeNeed, school: currentSchool });
    }
  };

  const handleWizardResult = (result) => {
    setIsWizardOpen(false);
    handleRestaurantClick(result.id, 'wizard');
  };

  const handleRecommendationGenerated = (result, context) => {
    if (result.id !== null) {
      trackEvent('recommendation_generated', { restaurantId: result.id, ...context, school: currentSchool });
    }
  };

  const handleBottomTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'profile') setShowProfileStats(false);
    trackEvent('navigation_select', { tab });
  };

  const handleOpenFullRanking = (sort = 'popularity') => {
    setFullRankingSort(sort);
    handleBottomTabChange('ranking');
  };

  const handleStudentVerification = () => {
    setIsStudentVerified(true);
    trackEvent('student_verification_demo_complete', { school: currentSchool });
    showToastMessage(currentLanguage === 'zh' ? '学生认证成功（MVP 流程演示）' : 'Student verification completed (MVP demo)');
  };

  const handleToggleFavorite = (restaurantId, source) => {
    const added = !favorites.includes(restaurantId);
    toggleFavorite(restaurantId, source);
    showToastMessage(currentLanguage === 'zh' ? (added ? '已加入收藏' : '已取消收藏') : (added ? 'Added to favorites' : 'Removed from favorites'));
  };

  const handleDetailReroll = () => {
    if (!selectedRestaurant) return;
    const matchingPool = restaurants.length > 1 ? restaurants : schoolRestaurants;
    const pool = matchingPool.filter(restaurant => restaurant.id !== selectedRestaurant.id && restaurant.open);
    if (!pool.length) {
      showToastMessage(currentLanguage === 'zh' ? '当前条件下没有其他餐厅了' : 'No other restaurants match these filters');
      return;
    }
    const next = pool[Math.floor(Math.random() * pool.length)];
    trackEvent('detail_reroll', { fromRestaurantId: selectedRestaurant.id, toRestaurantId: next.id, source: detailSource });
    setSelectedRestaurantId(next.id);
    trackEvent('detail_view', { restaurantId: next.id, source: 'detail_reroll', need: activeNeed, school: currentSchool });
  };

  const handleAcceptDecision = () => {
    if (!selectedRestaurant) return;
    recordDecision(selectedRestaurant, detailSource, { need: activeNeed, school: currentSchool });
    setSelectedRestaurantId(null);
    showToastMessage(currentLanguage === 'zh' ? `决定好了：就吃${selectedRestaurant.name}！` : `Decision made: ${getRestaurantName(selectedRestaurant, currentLanguage)}!`);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const getListTitle = () => {
    if (activeNeed === 'all') return t('nearbyHot');
    return t('searchResults', { label: t(`needs.${activeNeed}`) });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <div className="h-[calc(100vh-104px)]">
            <UniversityMap
              restaurants={schoolRestaurants}
              onRestaurantClick={(id) => handleRestaurantClick(id, 'map')}
              activeNeed={activeNeed}
              currentSchool={currentSchool}
              highlightId={mapHighlightId}
              onResetFilter={resetFilter}
            />
          </div>
        );
      case 'ranking':
        return (
          <FullRanking
            restaurants={allRestaurants}
            initialSort={fullRankingSort}
            onRestaurantClick={(id) => handleRestaurantClick(id, 'full_ranking')}
          />
        );
      case 'profile':
        if (showProfileStats) {
          return (
            <ProfileDashboard
              stats={stats}
              favoriteRestaurants={favoriteRestaurants}
              decisions={decisions}
              allRestaurants={allRestaurants}
              onRestaurantClick={handleRestaurantClick}
              onToggleFavorite={handleToggleFavorite}
              onExportData={exportData}
              onBack={() => setShowProfileStats(false)}
            />
          );
        }
        return (
          <PersonalCenter
            currentSchool={currentSchool}
            isStudentVerified={isStudentVerified}
            showStudentTooltip={showStudentTooltip}
            onToggleStudentTooltip={() => setShowStudentTooltip(previous => !previous)}
            onVerifyStudent={handleStudentVerification}
            myRecommendations={myRecommendations}
            onRecommendClick={handleRecommendClick}
            favoriteRestaurants={favoriteRestaurants}
            onRestaurantClick={handleRestaurantClick}
            onToggleFavorite={handleToggleFavorite}
            decisions={decisions}
            allRestaurants={allRestaurants}
            stats={stats}
            onViewStats={() => setShowProfileStats(true)}
          />
        );
      case 'legacy-profile':
        return (
          <div className="p-5">
            <div className="bg-white rounded-xl p-6 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">用户</span>
                    {isStudentVerified && (
                      <div className="relative">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <GraduationCap size={12} />
                          已核验学生
                        </span>
                        <button 
                          onClick={() => setShowStudentTooltip(!showStudentTooltip)}
                          className="absolute -right-5 top-0 text-blue-500 hover:text-blue-700"
                        >
                          <HelpCircle size={12} />
                        </button>
                        {showStudentTooltip && (
                          <div className="absolute top-6 left-0 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 w-48">
                            完成学生认证后，您的评价将获得更高权重，帮助其他同学做出更好选择。
                            <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm">大学生美食探索者</div>
                </div>
              </div>
              
              {!isStudentVerified && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-blue-500 mt-0.5" size={20} />
                    <div>
                      <div className="font-medium text-blue-800 mb-1">完成学生认证</div>
                      <div className="text-sm text-blue-600 mb-2">
                        使用学号邮箱认证，获得🎓徽章，提升评价权重
                      </div>
                      <button
                        onClick={() => setIsStudentVerified(true)}
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        立即认证
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-xl">{myRecommendations.length}</div>
                  <div className="text-xs text-gray-600">推荐</div>
                </div>
                <div>
                  <div className="font-bold text-xl">0</div>
                  <div className="text-xs text-gray-600">收藏</div>
                </div>
                <div>
                  <div className="font-bold text-xl">0</div>
                  <div className="text-xs text-gray-600">评价</div>
                </div>
              </div>
            </div>
            
            {/* 我的推荐 */}
            <div className="bg-white rounded-xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Plus size={20} className="text-red-500" />
                  <h2 className="text-lg font-semibold">我的推荐</h2>
                </div>
                <button
                  onClick={handleRecommendClick}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  <Plus size={16} />
                  添加推荐
                </button>
              </div>
              
              {myRecommendations.length > 0 ? (
                <div className="space-y-3">
                  {myRecommendations.map((rec) => (
                    <div key={rec.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        {rec.image && (
                          <img 
                            src={rec.image} 
                            alt={rec.name} 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{rec.name}</h3>
                          {rec.description && (
                            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">
                                  {i < rec.rating ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            {rec.price && (
                              <span className="text-sm text-gray-600">¥{rec.price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Plus size={48} className="mx-auto mb-4 text-gray-300" />
                  <div className="text-lg font-semibold mb-2">暂无推荐</div>
                  <div className="text-sm mb-4">分享你发现的美食，帮助其他同学</div>
                  <button
                    onClick={handleRecommendClick}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    立即推荐
                  </button>
                </div>
              )}
            </div>
            
            {/* 收藏列表 */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-red-500" />
                <h2 className="text-lg font-semibold">我的收藏</h2>
              </div>
              
              <div className="text-center py-10 text-gray-500">
                <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                <div className="text-lg font-semibold mb-2">暂无收藏</div>
                <div className="text-sm">收藏喜欢的餐厅，方便下次找到</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <DecideButton onClick={handleDecideClick} />

            <div className="flex items-center gap-3 px-5 pt-5 text-gray-600 text-sm">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span>{currentLanguage === 'zh' ? '或者按需求找' : 'Or filter by needs'}</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* 最近使用的标签 */}
            {recentNeeds.length > 0 && activeNeed === 'all' && (
              <div className="px-5 pt-4">
                <div className="text-xs text-[#9A8A78] mb-2">{currentLanguage === 'zh' ? '最近使用' : 'Recently used'}</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {recentNeeds.map((need) => {
                    return (
                      <button
                        key={need}
                        onClick={() => handleNeedChange(need)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[rgba(24,18,10,0.10)] rounded-full text-sm whitespace-nowrap hover:border-[#D94F2B] hover:bg-[#FFF2EE] transition-colors"
                      >
                        <span>{needIcons[need]}</span>
                        <span>{t(`needs.${need}`)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <NeedFilter
              activeNeed={activeNeed}
              onNeedChange={handleNeedChange}
              availableNeeds={availableNeeds}
            />

            {/* 附近热门列表（与需求筛选联动） */}
            <div className="flex items-center justify-between gap-3 px-5 py-6 pb-3">
              <div className="font-['ZCOOL_XiaoWei'] text-lg">
                {getListTitle()}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {activeNeed !== 'all' && (
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline decoration-2 underline-offset-2"
                    onClick={resetFilter}
                  >
                    {t('resetFilter')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleOpenFullRanking('popularity')}
                  className="text-xs font-semibold text-[#D94F2B] whitespace-nowrap"
                >
                  {t('fullRanking.homeEntry', { count: allRestaurants.length })}
                </button>
              </div>
            </div>

            <div className="px-5">
              <div className="flex flex-col gap-2.5">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant, index) => (
                    <div key={restaurant.id} style={{ animationDelay: `${index * 0.05}s` }}>
                      <RestaurantCard
                        restaurant={restaurant}
                        onClick={handleRestaurantClick}
                        isFavorite={favorites.includes(restaurant.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    {t('messages.noRestaurants')}
                    <br />
                    <span className="text-sm">{t('messages.tryDifferent')}</span>
                  </div>
                )}
              </div>
            </div>

            <WizardModal
              isOpen={isWizardOpen}
              onClose={() => setIsWizardOpen(false)}
              onResult={handleWizardResult}
              onRecommendationGenerated={handleRecommendationGenerated}
              restaurants={schoolRestaurants}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-['Noto_Serif_SC'] text-[#18120A] overflow-x-hidden">
      <TopBar
        currentSchool={currentSchool}
        onSchoolChange={handleSchoolChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {renderContent()}

      <div className="h-20"></div>

      <RecommendForm
        isOpen={isRecommendOpen}
        onClose={() => setIsRecommendOpen(false)}
        onSubmit={handleRecommendSubmit}
      />

      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        activeNeed={activeNeed}
        isFavorite={selectedRestaurant ? favorites.includes(selectedRestaurant.id) : false}
        onClose={() => setSelectedRestaurantId(null)}
        onToggleFavorite={() => selectedRestaurant && handleToggleFavorite(selectedRestaurant.id, 'detail')}
        onDecide={handleAcceptDecision}
        onReroll={handleDetailReroll}
      />

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleBottomTabChange}
        onRecommendClick={handleRecommendClick}
      />
    </div>
  );
};

export default Index;
