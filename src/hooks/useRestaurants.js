import { useState, useMemo } from 'react';

const mockRestaurants = [
  {
    id: 0,
    name: "老孙家兰州拉面",
    nameEn: "Lao Sun Lanzhou Beef Noodles",
    emoji: "🍜",
    bgColor: "linear-gradient(135deg,#FF6B35,#F7C59F)",
    rating: 4.9,
    price: 18,
    dist: 280,
    meta: "⭐4.9 · ¥18/人 · 280m",
    stags: [
      { t: "💰 20元吃饱", en: "💰 Full meal under ¥20", c: "green" },
      { t: "🔥 排队王", en: "🔥 Always popular", c: "red" },
      { t: "学生9折", en: "10% student discount", c: "amber" }
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
    nameEn: "Late-Night Skewer House",
    emoji: "🍖",
    bgColor: "linear-gradient(135deg,#8B2635,#F4A261)",
    rating: 4.6,
    price: 32,
    dist: 420,
    meta: "⭐4.6 · ¥32/人 · 420m",
    stags: [
      { t: "🌙 夜宵圣地", en: "🌙 Late-night favorite", c: "purple" },
      { t: "🌶️ 巨辣可选", en: "🌶️ Extra spicy available", c: "red" },
      { t: "聚餐必选", en: "Great for groups", c: "" }
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
    nameEn: "Shuweixuan Hot Pot Buffet",
    emoji: "🍲",
    bgColor: "linear-gradient(135deg,#C84B31,#ECDBBA)",
    rating: 4.8,
    price: 39,
    dist: 190,
    meta: "⭐4.8 · ¥39/人 · 190m",
    stags: [
      { t: "🔥 排队王", en: "🔥 Always popular", c: "red" },
      { t: "🌶️ 巨辣", en: "🌶️ Extra spicy", c: "red" },
      { t: "学生套餐¥28", en: "Student set ¥28", c: "green" }
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
    nameEn: "Mr. Noodles",
    emoji: "🍝",
    bgColor: "linear-gradient(135deg,#E9C46A,#F4A261)",
    rating: 4.5,
    price: 14,
    dist: 120,
    meta: "⭐4.5 · ¥14/人 · 120m",
    stags: [
      { t: "💰 20元吃饱", en: "💰 Full meal under ¥20", c: "green" },
      { t: "⚡ 不用排队", en: "⚡ Usually no queue", c: "amber" },
      { t: "快出餐", en: "Fast service", c: "" }
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
    nameEn: "Rice Noodle Kitchen",
    emoji: "🥘",
    bgColor: "linear-gradient(135deg,#2A9D8F,#E9C46A)",
    rating: 4.4,
    price: 20,
    dist: 350,
    meta: "⭐4.4 · ¥20/人 · 350m",
    stags: [
      { t: "💰 20元吃饱", en: "💰 Full meal under ¥20", c: "green" },
      { t: "📦 外卖超快", en: "📦 Fast delivery", c: "amber" }
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
    nameEn: "Xishan Steakhouse",
    emoji: "🥩",
    bgColor: "linear-gradient(135deg,#264653,#2A9D8F)",
    rating: 4.7,
    price: 62,
    dist: 500,
    meta: "⭐4.7 · ¥62/人 · 500m",
    stags: [
      { t: "🌸 约会首选", en: "🌸 Great for dates", c: "purple" },
      { t: "精致", en: "Refined setting", c: "" },
      { t: "可预订", en: "Reservations available", c: "amber" }
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
    nameEn: "Pearl Milk Tea",
    emoji: "🧋",
    bgColor: "linear-gradient(135deg,#F4ACB7,#FFCAD4)",
    rating: 4.8,
    price: 16,
    dist: 80,
    meta: "⭐4.8 · ¥16/人 · 80m",
    stags: [
      { t: "🥤 奶茶天堂", en: "🥤 Milk tea favorite", c: "purple" },
      { t: "学生8折", en: "20% student discount", c: "green" },
      { t: "📦 可外卖", en: "📦 Delivery available", c: "amber" }
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
    nameEn: "Granny's Fried Rice",
    emoji: "🍳",
    bgColor: "linear-gradient(135deg,#606C38,#DDA15E)",
    rating: 4.3,
    price: 12,
    dist: 60,
    meta: "⭐4.3 · ¥12/人 · 60m",
    stags: [
      { t: "💰 20元吃饱", en: "💰 Full meal under ¥20", c: "green" },
      { t: "⚡ 不用排队", en: "⚡ Usually no queue", c: "amber" },
      { t: "分量超大", en: "Large portions", c: "" }
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
    nameEn: "Light Food Lab",
    emoji: "🥗",
    bgColor: "linear-gradient(135deg,#81B29A,#F2CC8F)",
    rating: 4.7,
    price: 26,
    dist: 160,
    meta: "⭐4.7 · ¥26/人 · 160m",
    stags: [
      { t: "🥗 轻食低负担", en: "🥗 Light and balanced", c: "green" },
      { t: "🥬 素食可选", en: "🥬 Vegetarian options", c: "green" },
      { t: "📦 可外卖", en: "📦 Delivery available", c: "amber" }
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
    nameEn: "Hunan Stir-Fry",
    emoji: "🌶️",
    bgColor: "linear-gradient(135deg,#C44536,#F6BD60)",
    rating: 4.6,
    price: 29,
    dist: 230,
    meta: "⭐4.6 · ¥29/人 · 230m",
    stags: [
      { t: "🌶️ 辣度可选", en: "🌶️ Adjustable spice", c: "red" },
      { t: "🍚 分量很足", en: "🍚 Generous portions", c: "green" },
      { t: "👥 聚餐友好", en: "👥 Group-friendly", c: "amber" }
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
    nameEn: "Breakfast Corner",
    emoji: "🥟",
    bgColor: "linear-gradient(135deg,#F4D35E,#EE964B)",
    rating: 4.5,
    price: 9,
    dist: 90,
    meta: "⭐4.5 · ¥9/人 · 90m",
    stags: [
      { t: "🥟 早餐现做", en: "🥟 Fresh breakfast", c: "amber" },
      { t: "⚡ 3分钟出餐", en: "⚡ Ready in 3 minutes", c: "green" },
      { t: "💰 10元吃饱", en: "💰 Full meal under ¥10", c: "green" }
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

// 公开商场目录与五角场餐饮榜单中可确认存在的门店。
// 评分、营业状态和精确距离在用户或线下核验前保持为空，避免把采集信息伪装成实测数据。
const collectedRestaurantSpecs = [
  { name: '大树餐厅', nameEn: 'Dashu Restaurant', emoji: '🌳', area: '合生汇', foodType: 'rice', needs: ['date', 'treat', 'birthday', 'dateScene', 'twoPeople', 'takeParents'], tags: [['🌸 氛围餐厅', '🌸 Atmosphere dining', 'purple'], ['📍 合生汇', '📍 Hopson One', 'amber']] },
  { name: '芸山季·云南野生菌火锅', nameEn: 'Yunshanji Yunnan Mushroom Hot Pot', emoji: '🍄', area: '合生汇', foodType: 'hotpot', needs: ['healthy', 'warmMeal', 'treat', 'comfort', 'dormGroup', 'takeParents'], tags: [['🍄 云南菌菇', '🍄 Yunnan mushrooms', 'green'], ['👥 适合聚餐', '👥 Group-friendly', 'amber']] },
  { name: '蛙来哒', nameEn: 'Wa Lai Da', emoji: '🐸', area: '合生汇', price: 85, foodType: 'rice', needs: ['spicy', 'bigPortion', 'dormGroup', 'birthday', 'clubDinner', 'largeGroup'], tags: [['🌶️ 香辣牛蛙', '🌶️ Spicy bullfrog', 'red'], ['💰 参考人均¥85', '💰 Est. ¥85/person', 'green']] },
  { name: '烤匠麻辣烤鱼', nameEn: 'Kaojiang Spicy Grilled Fish', emoji: '🐟', area: '合生汇', foodType: 'hotpot', needs: ['spicy', 'night', 'bigPortion', 'wantSpicyMood', 'dormGroup', 'largeGroup'], tags: [['🌶️ 麻辣烤鱼', '🌶️ Spicy grilled fish', 'red'], ['🌙 深夜选择', '🌙 Late-night option', 'purple']] },
  { name: '上隐水产海鲜自助', nameEn: 'Shangyin Seafood Buffet', emoji: '🦀', area: '合生汇', foodType: 'hotpot', needs: ['bigPortion', 'treat', 'celebrate', 'birthday', 'graduation', 'largeGroup'], tags: [['🦀 海鲜自助', '🦀 Seafood buffet', 'purple'], ['🎉 适合庆祝', '🎉 Celebration pick', 'amber']] },
  { name: '安三胖韩国烤肉', nameEn: 'An San Pang Korean BBQ', emoji: '🥩', area: '合生汇', foodType: 'hotpot', needs: ['bigPortion', 'afterSports', 'dormGroup', 'birthday', 'clubDinner'], tags: [['🥩 韩式烤肉', '🥩 Korean BBQ', 'red'], ['👥 聚餐选择', '👥 Group dining', 'amber']] },
  { name: '鲜得来排骨年糕', nameEn: 'Xiandelai Pork Chop Rice Cakes', emoji: '🍖', area: '合生汇', foodType: 'rice', needs: ['cheap', 'quick', 'soloMeal', 'twoPeople', 'homesick'], tags: [['🍖 上海老味道', '🍖 Shanghai classic', 'amber'], ['⚡ 小吃快餐', '⚡ Quick bite', 'green']] },
  { name: '松鹤楼面馆', nameEn: 'Songhelou Noodle House', emoji: '🍜', area: '合生汇', foodType: 'noodle', needs: ['warmMeal', 'comfort', 'soloMeal', 'twoPeople', 'takeParents'], tags: [['🍜 苏式汤面', '🍜 Suzhou-style noodles', 'green'], ['👨‍👩‍👧 适合家人', '👨‍👩‍👧 Family-friendly', 'amber']] },
  { name: '茉莉奶白', nameEn: 'Molly Tea', emoji: '🧋', area: '合生汇', foodType: 'drinks', needs: ['wantSweet', 'study', 'dateScene', 'twoPeople', 'takeoutTogether'], tags: [['🧋 茶饮', '🧋 Tea drinks', 'purple'], ['📍 合生汇', '📍 Hopson One', 'amber']] },
  { name: 'CRAZYONES西班牙海鲜饭', nameEn: 'CRAZYONES Spanish Paella', emoji: '🥘', area: '合生汇', foodType: 'western', needs: ['date', 'treat', 'celebrate', 'birthday', 'dateScene', 'twoPeople'], tags: [['🥘 西班牙海鲜饭', '🥘 Spanish paella', 'purple'], ['🌸 约会聚餐', '🌸 Dates & gatherings', 'amber']] },
  { name: '海底捞火锅', nameEn: 'Haidilao Hot Pot', emoji: '🍲', area: '五角场', price: 135, foodType: 'hotpot', needs: ['warmMeal', 'treat', 'birthday', 'dormGroup', 'lateNight', 'largeGroup'], tags: [['🍲 火锅', '🍲 Hot pot', 'red'], ['💰 参考人均¥120–150', '💰 Est. ¥120–150/person', 'green']] },
  { name: '帕蓝·暹罗料理', nameEn: 'Palan Siam Thai Cuisine', emoji: '🍛', area: '大学路', price: 70, foodType: 'rice', needs: ['spicy', 'date', 'treat', 'dateScene', 'twoPeople', 'takeParents'], tags: [['🍛 泰式料理', '🍛 Thai cuisine', 'amber'], ['💰 参考人均¥60–80', '💰 Est. ¥60–80/person', 'green']] },
  { name: '九香吧岛', nameEn: 'Jiuxiang Badao Sichuan Cuisine', emoji: '🌶️', area: '国济路', price: 40, foodType: 'rice', needs: ['cheap', 'spicy', 'bigPortion', 'dormGroup', 'clubDinner'], tags: [['🌶️ 川味干锅', '🌶️ Sichuan dry pot', 'red'], ['💰 参考人均¥40', '💰 Est. ¥40/person', 'green']] },
  { name: '西贝莜面村', nameEn: 'Xibei Northwest Cuisine', emoji: '🥟', area: '五角场万达', price: 83, foodType: 'rice', needs: ['warmMeal', 'bigPortion', 'dormGroup', 'takeParents', 'largeGroup'], tags: [['🥟 西北菜', '🥟 Northwest Chinese', 'amber'], ['💰 参考人均¥83', '💰 Est. ¥83/person', 'green']] },
  { name: '麦当劳', nameEn: "McDonald's", emoji: '🍔', area: '五角场万达', foodType: 'western', needs: ['cheap', 'quick', 'noqueue', 'soloMeal', 'groupStudy', 'lateNight'], tags: [['🍔 快餐', '🍔 Fast food', 'amber'], ['📍 五角场万达', '📍 Wujiaochang Wanda', 'purple']] },
];

const collectedRestaurants = collectedRestaurantSpecs.map((restaurant, index) => ({
  id: 11 + index,
  ...restaurant,
  bgColor: 'linear-gradient(135deg,#F4E3C1,#E8B86D)',
  rating: null,
  dist: null,
  meta: null,
  stags: restaurant.tags.map(([t, en, c]) => ({ t, en, c })),
  open: null,
  school: '五角场商圈',
  distM: null,
  verified: false,
  dataStatus: 'collected',
  addedAt: 1720000000000 + index,
  daily_views: 0,
}));

const allRestaurantData = [...mockRestaurants, ...collectedRestaurants];

export const useRestaurants = () => {
  const [currentSchool, setCurrentSchool] = useState('同济大学');
  const [activeNeed, setActiveNeed] = useState('all');
  const [recentNeeds, setRecentNeeds] = useState([]);

  const schoolRestaurants = useMemo(() => (
    currentSchool === '全部'
      ? allRestaurantData
      : allRestaurantData.filter(r => r.school === currentSchool)
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
    allRestaurants: allRestaurantData,
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
