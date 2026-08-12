export const sortRestaurants = (restaurants, sortBy = 'popularity') => (
  [...restaurants].sort((a, b) => {
    if (sortBy === 'budget') {
      if (a.price == null) return 1;
      if (b.price == null) return -1;
      return a.price - b.price || (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'rating') {
      if (a.rating == null) return 1;
      if (b.rating == null) return -1;
      return b.rating - a.rating || (a.price || Infinity) - (b.price || Infinity);
    }
    if (sortBy === 'new') return b.addedAt - a.addedAt;
    if (a.verified !== b.verified) return Number(b.verified) - Number(a.verified);
    return (b.rating || 0) - (a.rating || 0) || (a.dist || Infinity) - (b.dist || Infinity);
  })
);
