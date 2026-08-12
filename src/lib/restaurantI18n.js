const schoolNames = {
  '同济大学': 'Tongji University',
  '复旦大学': 'Fudan University',
  '上海财经大学': 'SHUFE',
  '上海财经': 'SHUFE',
  '五角场商圈': 'Wujiaochang area',
  '全部': 'Wujiaochang',
};

const areaNames = {
  '合生汇': 'Hopson One',
  '五角场': 'Wujiaochang',
  '大学路': 'University Road',
  '国济路': 'Guoji Road',
  '五角场万达': 'Wujiaochang Wanda',
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

export const getAreaName = (area, language) => (
  isChinese(language) ? area : (areaNames[area] || area)
);

export const formatRestaurantMeta = (restaurant, language, includePlace = true) => {
  const zh = isChinese(language);
  const rating = restaurant.rating ? `⭐${restaurant.rating}` : (zh ? '待评分' : 'Not rated');
  const price = restaurant.price ? `¥${restaurant.price}/${zh ? '人' : 'person'}` : (zh ? '价格待核验' : 'Price pending');
  const place = restaurant.dist ? `${restaurant.dist}m` : (restaurant.area ? getAreaName(restaurant.area, language) : getSchoolName(restaurant.school, language));
  return includePlace ? `${rating} · ${price} · ${place}` : `${rating} · ${price}`;
};
