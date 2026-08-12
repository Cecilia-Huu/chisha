import { useCallback, useMemo, useState } from 'react';

const STORAGE_KEY = 'campus-food-user-activity-v1';
const EMPTY_DATA = { favorites: [], decisions: [], events: [] };

const loadData = () => {
  if (typeof window === 'undefined') return EMPTY_DATA;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return {
      favorites: Array.isArray(saved?.favorites) ? saved.favorites : [],
      decisions: Array.isArray(saved?.decisions) ? saved.decisions : [],
      events: Array.isArray(saved?.events) ? saved.events : [],
    };
  } catch {
    return EMPTY_DATA;
  }
};

export const useUserActivity = () => {
  const [data, setData] = useState(loadData);

  const updateData = useCallback((updater) => {
    setData(previous => {
      const next = updater(previous);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const trackEvent = useCallback((type, payload = {}) => {
    updateData(previous => ({
      ...previous,
      events: [
        ...previous.events,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type, payload, at: new Date().toISOString() },
      ].slice(-500),
    }));
  }, [updateData]);

  const toggleFavorite = useCallback((restaurantId, source = 'unknown') => {
    let added = false;
    updateData(previous => {
      added = !previous.favorites.includes(restaurantId);
      const favorites = added
        ? [...previous.favorites, restaurantId]
        : previous.favorites.filter(id => id !== restaurantId);
      return {
        ...previous,
        favorites,
        events: [
          ...previous.events,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: added ? 'favorite_add' : 'favorite_remove',
            payload: { restaurantId, source },
            at: new Date().toISOString(),
          },
        ].slice(-500),
      };
    });
    return added;
  }, [updateData]);

  const recordDecision = useCallback((restaurant, source, context = {}) => {
    const decision = {
      id: `${Date.now()}-${restaurant.id}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      source,
      context,
      at: new Date().toISOString(),
    };
    updateData(previous => ({
      ...previous,
      decisions: [decision, ...previous.decisions].slice(0, 50),
      events: [
        ...previous.events,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          type: 'decision_accept',
          payload: { restaurantId: restaurant.id, source, ...context },
          at: decision.at,
        },
      ].slice(-500),
    }));
    return decision;
  }, [updateData]);

  const stats = useMemo(() => {
    const count = type => data.events.filter(event => event.type === type).length;
    const detailViews = count('detail_view');
    const decisions = data.decisions.length;
    return {
      visits: count('page_view'),
      filters: count('filter_select'),
      detailViews,
      recommendations: count('recommendation_generated'),
      decisions,
      favorites: data.favorites.length,
      conversionRate: detailViews ? Math.min(100, Math.round((decisions / detailViews) * 100)) : 0,
    };
  }, [data]);

  const exportData = useCallback(() => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      scope: 'single-device',
      ...data,
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campus-food-test-data-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [data]);

  return {
    ...data,
    stats,
    trackEvent,
    toggleFavorite,
    recordDecision,
    exportData,
  };
};
