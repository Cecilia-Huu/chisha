import { useState, useMemo } from 'react';

const mockRestaurants = [
  {
    id: 0,
    name: "老孙家兰州拉面",
    emoji: "🍜",
    bgColor: "linear-gradient(135deg,#FF6B35,#F7C59F)",
    rating: 4.9,
    price: 18,
    dist: 280,
    meta: "⭐4.9 · ¥18/人 · 280m",
    stags: [
      { t: "💰 20元吃饱", c: "green" },
      { t: "🔥 排队王", c: "red" },
      { t: "学生9折", c: "amber" }
    ],
    open: true,
    school: "同济大学",
    needs: ['cheap', 'near', 'noqueue', 'bigPortion', 'studentDeal', 'openNow', 'warmMeal', 'afterExam', 'tired', 'comfort', 'dormGroup', 'quick', 'soloMeal', 'twoPeople'],
    foodType: 'noodle',
    distM: 280,
    verified: true,
    lastVerified: 12,
    addedAt: 1710000000000,
    daily_views: 245
  },
  {
    id: 1,
    name: "夜宵烤串王",
    emoji: "🍖",
    bgColor: "linear-gradient(135deg,#8B2635,#F4A261)",
    rating: 4.6,
    price: 32,
    dist: 420,
    meta: "⭐4.6 · ¥32/人 · 420m",
    stags: [
      { t: "🌙 夜宵圣地", c: "purple" },
      { t: "🌶️ 巨辣可选", c: "red" },
      { t: "聚餐必选", c: "" }
    ],
    open: true,
    school: "复旦大学",
    needs: ['night', 'spicy', 'bigPortion', 'openNow', 'warmMeal', 'afterSports', 'lateNight', 'celebrate', 'wantSpicyMood', 'dormGroup', 'birthday', 'out', 'clubDinner', 'largeGroup'],
    foodType: 'hotpot',
    distM: 420,
    verified: false,
    lastVerified: 5,
    addedAt: 1710100000000,
    daily_views: 189
  },
  {
    id: 2,
    name: "蜀味轩自助火锅",
    emoji: "🍲",
    bgColor: "linear-gradient(135deg,#C84B31,#ECDBBA)",
    rating: 4.8,
    price: 39,
    dist: 190,
    meta: "⭐4.8 · ¥39/人 · 190m",
    stags: [
      { t: "🔥 排队王", c: "red" },
      { t: "🌶️ 巨辣", c: "red" },
      { t: "学生套餐¥28", c: "green" }
    ],
    open: true,
    school: "上海财经大学",
    needs: ['spicy', 'near', 'bigPortion', 'studentDeal', 'openNow', 'warmMeal', 'afterExam', 'treat', 'comfort', 'wantSpicyMood', 'birthday', 'dormGroup', 'graduation', 'out', 'clubDinner', 'largeGroup', 'takeParents'],
    foodType: 'hotpot',
    distM: 190,
    verified: true,
    lastVerified: 8,
    addedAt: 1710200000000,
    daily_views: 210
  },
  {
    id: 3,
    name: "面条先生",
    emoji: "🍝",
    bgColor: "linear-gradient(135deg,#E9C46A,#F4A261)",
    rating: 4.5,
    price: 14,
    dist: 120,
    meta: "⭐4.5 · ¥14/人 · 120m",
    stags: [
      { t: "💰 20元吃饱", c: "green" },
      { t: "⚡ 不用排队", c: "amber" },
      { t: "快出餐", c: "" }
    ],
    open: true,
    school: "复旦大学",
    needs: ['cheap', 'near', 'noqueue', 'healthy', 'openNow', 'study', 'tired', 'quick', 'soloMeal', 'twoPeople', 'groupStudy'],
    foodType: 'noodle',
    distM: 120,
    verified: false,
    lastVerified: 3,
    addedAt: 1710300000000,
    daily_views: 156
  },
  {
    id: 4,
    name: "米线小馆",
    emoji: "🥘",
    bgColor: "linear-gradient(135deg,#2A9D8F,#E9C46A)",
    rating: 4.4,
    price: 20,
    dist: 350,
    meta: "⭐4.4 · ¥20/人 · 350m",
    stags: [
      { t: "💰 20元吃饱", c: "green" },
      { t: "📦 外卖超快", c: "amber" }
    ],
    open: false,
    school: "同济大学",
    needs: ['cheap', 'delivery', 'healthy', 'rainy', 'comfort', 'quick', 'lazy', 'soloMeal', 'takeoutTogether'],
    foodType: 'noodle',
    distM: 350,
    verified: false,
    lastVerified: 1,
    addedAt: 1710400000000,
    daily_views: 98
  },
  {
    id: 5,
    name: "西山牛排屋",
    emoji: "🥩",
    bgColor: "linear-gradient(135deg,#264653,#2A9D8F)",
    rating: 4.7,
    price: 62,
    dist: 500,
    meta: "⭐4.7 · ¥62/人 · 500m",
    stags: [
      { t: "🌸 约会首选", c: "purple" },
      { t: "精致", c: "" },
      { t: "可预订", c: "amber" }
    ],
    open: true,
    school: "复旦大学",
    needs: ['date', 'openNow', 'afterExam', 'treat', 'celebrate', 'birthday', 'graduation', 'dateScene', 'out', 'twoPeople', 'takeParents'],
    foodType: 'western',
    distM: 500,
    verified: true,
    lastVerified: 15,
    addedAt: 1710500000000,
    daily_views: 134
  },
  {
    id: 6,
    name: "珍珠奶茶铺",
    emoji: "🧋",
    bgColor: "linear-gradient(135deg,#F4ACB7,#FFCAD4)",
    rating: 4.8,
    price: 16,
    dist: 80,
    meta: "⭐4.8 · ¥16/人 · 80m",
    stags: [
      { t: "🥤 奶茶天堂", c: "purple" },
      { t: "学生8折", c: "green" },
      { t: "📦 可外卖", c: "amber" }
    ],
    open: true,
    school: "同济大学",
    needs: ['near', 'delivery', 'cheap', 'vegetarian', 'studentDeal', 'openNow', 'sad', 'study', 'rainy', 'tired', 'homesick', 'needEnergy', 'wantSweet', 'lazy', 'dateScene', 'groupStudy', 'takeoutTogether', 'twoPeople'],
    foodType: 'drinks',
    distM: 80,
    verified: true,
    lastVerified: 20,
    addedAt: 1710600000000,
    daily_views: 278
  },
  {
    id: 7,
    name: "阿婆炒饭",
    emoji: "🍳",
    bgColor: "linear-gradient(135deg,#606C38,#DDA15E)",
    rating: 4.3,
    price: 12,
    dist: 60,
    meta: "⭐4.3 · ¥12/人 · 60m",
    stags: [
      { t: "💰 20元吃饱", c: "green" },
      { t: "⚡ 不用排队", c: "amber" },
      { t: "分量超大", c: "" }
    ],
    open: true,
    school: "上海财经大学",
    needs: ['cheap', 'near', 'noqueue', 'bigPortion', 'openNow', 'afterSports', 'tired', 'quick', 'lazy', 'soloMeal', 'twoPeople'],
    foodType: 'rice',
    distM: 60,
    verified: false,
    lastVerified: 7,
    addedAt: 1710700000000,
    daily_views: 167
  },
  {
    id: 8,
    name: "轻食研究所",
    emoji: "🥗",
    bgColor: "linear-gradient(135deg,#81B29A,#F2CC8F)",
    rating: 4.7,
    price: 26,
    dist: 160,
    meta: "⭐4.7 · ¥26/人 · 160m",
    stags: [
      { t: "🥗 轻食低负担", c: "green" },
      { t: "🥬 素食可选", c: "green" },
      { t: "📦 可外卖", c: "amber" }
    ],
    open: true,
    school: "同济大学",
    needs: ['near', 'delivery', 'healthy', 'vegetarian', 'openNow', 'study', 'tired', 'quick', 'soloMeal', 'twoPeople', 'groupStudy', 'takeoutTogether'],
    foodType: 'rice',
    distM: 160,
    verified: true,
    lastVerified: 9,
    addedAt: 1710800000000,
    daily_views: 142
  },
  {
    id: 9,
    name: "湘味小炒",
    emoji: "🌶️",
    bgColor: "linear-gradient(135deg,#C44536,#F6BD60)",
    rating: 4.6,
    price: 29,
    dist: 230,
    meta: "⭐4.6 · ¥29/人 · 230m",
    stags: [
      { t: "🌶️ 辣度可选", c: "red" },
      { t: "🍚 分量很足", c: "green" },
      { t: "👥 聚餐友好", c: "amber" }
    ],
    open: true,
    school: "上海财经大学",
    needs: ['cheap', 'spicy', 'bigPortion', 'studentDeal', 'openNow', 'homesick', 'celebrate', 'comfort', 'wantSpicyMood', 'dormGroup', 'birthday', 'clubDinner', 'largeGroup', 'takeoutTogether', 'takeParents'],
    foodType: 'rice',
    distM: 230,
    verified: false,
    lastVerified: 6,
    addedAt: 1710900000000,
    daily_views: 176
  },
  {
    id: 10,
    name: "校园早餐铺",
    emoji: "🥟",
    bgColor: "linear-gradient(135deg,#F4D35E,#EE964B)",
    rating: 4.5,
    price: 9,
    dist: 90,
    meta: "⭐4.5 · ¥9/人 · 90m",
    stags: [
      { t: "🥟 早餐现做", c: "amber" },
      { t: "⚡ 3分钟出餐", c: "green" },
      { t: "💰 10元吃饱", c: "green" }
    ],
    open: true,
    school: "复旦大学",
    needs: ['cheap', 'near', 'noqueue', 'breakfast', 'healthy', 'studentDeal', 'openNow', 'tired', 'comfort', 'needEnergy', 'quick', 'soloMeal', 'groupStudy'],
    foodType: 'rice',
    distM: 90,
    verified: true,
    lastVerified: 18,
    addedAt: 1711000000000,
    daily_views: 201
  }
];

export const useRestaurants = () => {
  const [currentSchool, setCurrentSchool] = useState('同济大学');
  const [activeNeed, setActiveNeed] = useState('all');
  const [recentNeeds, setRecentNeeds] = useState([]);

  const schoolRestaurants = useMemo(() => (
    currentSchool === '全部'
      ? mockRestaurants
      : mockRestaurants.filter(r => r.school === currentSchool)
  ), [currentSchool]);

  const filteredRestaurants = useMemo(() => {
    let filtered = schoolRestaurants;

    // 需求筛选
    if (activeNeed !== 'all') {
      filtered = filtered.filter(r => r.needs.includes(activeNeed));
    }

    return filtered;
  }, [schoolRestaurants, activeNeed]);

  const availableNeeds = useMemo(() => {
    return [...new Set(schoolRestaurants.flatMap(r => r.needs))];
  }, [schoolRestaurants]);

  const resetFilter = () => {
    setActiveNeed('all');
  };

  const updateRecentNeeds = (need) => {
    if (need === 'all') return;
    
    setRecentNeeds(prev => {
      const filtered = prev.filter(n => n !== need);
      return [need, ...filtered].slice(0, 3);
    });
  };

  return {
    allRestaurants: mockRestaurants,
    restaurants: filteredRestaurants,
    schoolRestaurants,
    currentSchool,
    setCurrentSchool,
    activeNeed,
    availableNeeds,
    setActiveNeed: (need) => {
      setActiveNeed(need);
      updateRecentNeeds(need);
    },
    resetFilter,
    recentNeeds,
    setRecentNeeds // 添加 setRecentNeeds 函数
  };
};
