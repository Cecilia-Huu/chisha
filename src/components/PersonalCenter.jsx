import React from 'react';
import {
  BarChart3,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  HelpCircle,
  MapPin,
  Plus,
  Target,
  User,
} from 'lucide-react';

const PersonalCenter = ({
  currentSchool,
  isStudentVerified,
  showStudentTooltip,
  onToggleStudentTooltip,
  onVerifyStudent,
  myRecommendations,
  onRecommendClick,
  favoriteRestaurants,
  onRestaurantClick,
  onToggleFavorite,
  decisions,
  allRestaurants,
  stats,
  onViewStats,
}) => {
  const restaurantById = new Map(allRestaurants.map(restaurant => [restaurant.id, restaurant]));
  const formatTime = value => new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(value));

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-5 space-y-4">
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-black/5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F1ECE5] rounded-full flex items-center justify-center flex-shrink-0">
            <User size={31} className="text-[#776B5D]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-['ZCOOL_XiaoWei'] text-xl">校园美食探索者</h1>
              {isStudentVerified && (
                <div className="relative inline-flex items-center">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <GraduationCap size={12} /> 已认证学生
                  </span>
                  <button
                    type="button"
                    aria-label="查看学生认证说明"
                    onClick={onToggleStudentTooltip}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <HelpCircle size={14} />
                  </button>
                  {showStudentTooltip && (
                    <div className="absolute top-8 left-0 z-20 w-56 rounded-lg bg-[#18120A] p-3 text-xs leading-5 text-white shadow-xl">
                      学生认证用于建立校园推荐与信息核验的可信度。当前 MVP 为流程演示，正式版将接入校园邮箱认证。
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#776B5D] mt-1">
              <MapPin size={14} className="text-[#D94F2B]" />
              {currentSchool === '全部' ? '五角场高校生活圈' : currentSchool}
            </div>
          </div>
        </div>

        {!isStudentVerified && (
          <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="text-blue-600" size={19} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900">完成学生认证</div>
                <p className="text-sm text-blue-700 mt-1 leading-5">获得学生徽章，让餐厅推荐和信息核验更可信。</p>
                <p className="text-[11px] text-blue-500 mt-1">MVP 阶段为流程演示，正式版计划接入校园邮箱。</p>
                <button
                  type="button"
                  onClick={onVerifyStudent}
                  className="mt-3 bg-blue-600 text-white text-sm px-3.5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  立即认证
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mt-5 text-center border-t border-black/5 pt-5">
          <div>
            <div className="font-bold text-xl">{myRecommendations.length}</div>
            <div className="text-xs text-[#776B5D] mt-1">推荐</div>
          </div>
          <div className="border-x border-black/5">
            <div className="font-bold text-xl">{favoriteRestaurants.length}</div>
            <div className="text-xs text-[#776B5D] mt-1">收藏</div>
          </div>
          <div>
            <div className="font-bold text-xl">{decisions.length}</div>
            <div className="text-xs text-[#776B5D] mt-1">决定</div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Plus size={19} className="text-[#D94F2B]" /> 我的推荐
          </h2>
          <button type="button" onClick={onRecommendClick} className="text-sm text-[#D94F2B] flex items-center gap-1">
            <Plus size={15} /> 添加推荐
          </button>
        </div>

        {myRecommendations.length ? (
          <div className="space-y-2">
            {myRecommendations.map(recommendation => (
              <div key={recommendation.id} className="rounded-xl border border-black/5 p-3 flex items-start gap-3">
                <div className="w-11 h-11 bg-[#F7F3EE] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🍽️</div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{recommendation.name}</div>
                  {recommendation.description && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{recommendation.description}</div>}
                  <div className="text-xs text-[#F0A500] mt-1">{'★'.repeat(Number(recommendation.rating) || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-7 text-gray-400">
            <Plus size={38} className="mx-auto mb-3 text-gray-300" />
            <div className="font-medium text-gray-600">还没有推荐</div>
            <div className="text-sm mt-1">分享你发现的美食，帮助其他同学。</div>
            <button type="button" onClick={onRecommendClick} className="mt-4 bg-[#D94F2B] text-white px-4 py-2 rounded-lg text-sm">
              立即推荐
            </button>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Heart size={19} className="text-red-500" /> 我的收藏
          <span className="text-xs text-gray-400">{favoriteRestaurants.length}</span>
        </h2>
        {favoriteRestaurants.length ? (
          <div className="space-y-2">
            {favoriteRestaurants.map(restaurant => (
              <div key={restaurant.id} className="flex items-center gap-3 border border-black/5 rounded-xl p-3">
                <button type="button" onClick={() => onRestaurantClick(restaurant.id, 'profile_favorite')} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: restaurant.bgColor }}>{restaurant.emoji}</div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{restaurant.name}</div>
                    <div className="text-xs text-gray-500 mt-1">⭐{restaurant.rating} · ¥{restaurant.price}/人 · {restaurant.dist}m</div>
                  </div>
                </button>
                <button type="button" aria-label={`取消收藏${restaurant.name}`} onClick={() => onToggleFavorite(restaurant.id, 'profile')} className="text-red-500 p-2">
                  <Heart size={18} className="fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-7 text-gray-400 text-sm">
            <Heart size={38} className="mx-auto mb-3 text-gray-300" />
            还没有收藏，打开餐厅详情即可收藏。
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl p-5 border border-black/5">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Clock3 size={19} className="text-[#3A6EA8]" /> 最近决定
        </h2>
        {decisions.length ? (
          <div className="space-y-3">
            {decisions.slice(0, 5).map(decision => {
              const restaurant = restaurantById.get(decision.restaurantId);
              if (!restaurant) return null;
              return (
                <button key={decision.id} type="button" onClick={() => onRestaurantClick(restaurant.id, 'decision_history')} className="w-full flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3EE] flex items-center justify-center text-xl">{restaurant.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{restaurant.name}</div>
                    <div className="text-xs text-gray-500">来自{decision.source === 'wizard' ? '三步推荐' : decision.source === 'map' ? '地图' : '餐厅详情'}</div>
                  </div>
                  <div className="text-[11px] text-gray-400">{formatTime(decision.at)}</div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">选定“就吃这家”后，决定会保存在这里。</div>
        )}
      </section>

      <button
        type="button"
        onClick={onViewStats}
        className="w-full bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-3 text-left hover:border-[#F0A500] transition-colors"
      >
        <div className="w-10 h-10 bg-[#FFF5D9] rounded-xl flex items-center justify-center">
          <BarChart3 size={19} className="text-[#D58A00]" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">我的使用记录</div>
          <div className="text-xs text-gray-500 mt-0.5">{stats.detailViews} 次查看详情 · {stats.decisions} 次完成决定</div>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pb-2">
        <Target size={12} /> 使用数据仅保存在当前设备
      </div>
    </div>
  );
};

export default PersonalCenter;
