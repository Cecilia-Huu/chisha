const schoolNames = {
  '同济大学': 'Tongji University',
  '复旦大学': 'Fudan University',
  '上海财经大学': 'SHUFE',
  '上海财经': 'SHUFE',
  '全部': 'Wujiaochang',
};

export const isChinese = language => language?.startsWith('zh');

export const getRestaurantName = (restaurant, language) => (
  isChinese(language) ? restaurant.name : (restaurant.nameEn || restaurant.name)
);

export const getRestaurantTag = (tag, language) => (
  isChinese(language) ? tag.t : (tag.en || tag.t)
);

export const getSchoolName = (school, language) => (
  isChinese(language) ? (school === '全部' ? '五角场' : school) : (schoolNames[school] || school)
);

export const formatRestaurantMeta = (restaurant, language) => (
  `⭐${restaurant.rating} · ¥${restaurant.price}/${isChinese(language) ? '人' : 'person'} · ${restaurant.dist}m`
);
