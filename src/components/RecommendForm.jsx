import React, { useState, useMemo } from 'react';
import { Star, X, Plus, Camera, MapPin, Check, ArrowRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RecommendForm = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState(null); // 'quick' or 'detailed'
  const [step, setStep] = useState(1); // 1: 选择餐厅, 2: 选择理由 (快速模式)
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键词
  const [formData, setFormData] = useState({
    restaurant: null,
    reasons: [],
    rating: 5,
    description: '',
    price: '',
    category: '',
    school: '',
    image: null
  });

  // 模拟餐厅数据
  const mockRestaurants = [
    { id: 1, name: '老孙家兰州拉面', emoji: '🍜' },
    { id: 2, name: '夜宵烤串王', emoji: '🍖' },
    { id: 3, name: '蜀味轩自助火锅', emoji: '🍲' },
    { id: 4, name: '面条先生', emoji: '🍝' },
    { id: 5, name: '米线小馆', emoji: '🥘' },
    { id: 6, name: '西山牛排屋', emoji: '🥩' },
    { id: 7, name: '珍珠奶茶铺', emoji: '🧋' },
    { id: 8, name: '阿婆炒饭', emoji: '🍳' }
  ];

  // 推荐理由选项 - 修复国际化问题
  const reasonOptions = [
    { id: 'cheap', icon: '💰', label: t('recommend.quick.reasons.cheap') },
    { id: 'taste', icon: '🔥', label: t('recommend.quick.reasons.taste') },
    { id: 'fast', icon: '⚡', label: t('recommend.quick.reasons.fast') },
    { id: 'atmosphere', icon: '🌸', label: t('recommend.quick.reasons.atmosphere') },
    { id: 'service', icon: '👍', label: t('recommend.quick.reasons.service') },
    { id: 'portion', icon: '🍽️', label: t('recommend.quick.reasons.portion') },
    { id: 'clean', icon: '✨', label: t('recommend.quick.reasons.clean') },
    { id: 'convenient', icon: '📍', label: t('recommend.quick.reasons.convenient') },
    { id: 'unique', icon: '🎯', label: t('recommend.quick.reasons.unique') },
    { id: 'group', icon: '👥', label: t('recommend.quick.reasons.group') }
  ];

  // 根据搜索词过滤餐厅
  const filteredRestaurants = useMemo(() => {
    if (!searchTerm) return mockRestaurants;
    return mockRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'quick') {
      if (formData.restaurant && formData.reasons.length > 0) {
        onSubmit({
          ...formData,
          type: 'quick'
        });
        resetForm();
        onClose();
      }
    } else {
      if (formData.restaurant && formData.description.trim()) {
        onSubmit({
          ...formData,
          type: 'detailed'
        });
        resetForm();
        onClose();
      }
    }
  };

  const resetForm = () => {
    setMode(null);
    setStep(1);
    setSearchTerm('');
    setFormData({
      restaurant: null,
      reasons: [],
      rating: 5,
      description: '',
      price: '',
      category: '',
      school: '',
      image: null
    });
  };

  const handleRestaurantSelect = (restaurant) => {
    setFormData(prev => ({ ...prev, restaurant }));
  };

  const handleReasonToggle = (reasonId) => {
    setFormData(prev => {
      const reasons = prev.reasons.includes(reasonId)
        ? prev.reasons.filter(id => id !== reasonId)
        : [...prev.reasons, reasonId];
      return { ...prev, reasons };
    });
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t('recommend.title')}
            </h2>
            {mode === 'quick' && (
              <p className="text-sm text-gray-600 mt-1">
                {step === 1 ? t('recommend.quick.step1') : t('recommend.quick.step2')}
              </p>
            )}
            {mode === 'detailed' && (
              <p className="text-sm text-gray-600 mt-1">
                {t('recommend.detailed.subtitle')}
              </p>
            )}
            {!mode && (
              <p className="text-sm text-gray-600 mt-1">
                {t('recommend.modeSelect')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 模式选择 */}
        {!mode && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setMode('quick')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all"
            >
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900">{t('recommend.modes.quick.title')}</div>
              <div className="text-xs text-gray-500 mt-1">{t('recommend.modes.quick.desc')}</div>
              <div className="text-xs text-red-500 mt-2 font-medium">{t('recommend.modes.quick.time')}</div>
            </button>
            <button
              onClick={() => setMode('detailed')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold text-gray-900">{t('recommend.modes.detailed.title')}</div>
              <div className="text-xs text-gray-500 mt-1">{t('recommend.modes.detailed.desc')}</div>
              <div className="text-xs text-blue-500 mt-2 font-medium">{t('recommend.modes.detailed.time')}</div>
            </button>
          </div>
        )}

        {/* 快速推荐模式 */}
        {mode === 'quick' && (
          <div className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('recommend.quick.selectRestaurant')}
                  </label>
                  
                  {/* 搜索框 */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="搜索餐厅名称..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {filteredRestaurants.map(restaurant => (
                      <button
                        key={restaurant.id}
                        onClick={() => handleRestaurantSelect(restaurant)}
                        className={`flex items-center gap-2 p-2 border rounded-lg transition-all ${
                          formData.restaurant?.id === restaurant.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <span className="text-xl">{restaurant.emoji}</span>
                        <span className="text-sm truncate">{restaurant.name}</span>
                        {formData.restaurant?.id === restaurant.id && (
                          <Check size={16} className="text-red-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {filteredRestaurants.length === 0 && searchTerm && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      未找到匹配的餐厅
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setMode(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('recommend.back')}
                  </button>
                  <button
                    type="button"
                    onClick={() => formData.restaurant && setStep(2)}
                    disabled={!formData.restaurant}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      formData.restaurant
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {t('recommend.next')}
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('recommend.quick.selectReasons')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {reasonOptions.map(reason => (
                      <button
                        key={reason.id}
                        onClick={() => handleReasonToggle(reason.id)}
                        className={`flex items-center gap-2 p-2 border rounded-lg transition-all ${
                          formData.reasons.includes(reason.id)
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <span>{reason.icon}</span>
                        <span className="text-sm">{reason.label}</span>
                        {formData.reasons.includes(reason.id) && (
                          <Check size={16} className="text-red-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('recommend.back')}
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={formData.reasons.length === 0}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      formData.reasons.length > 0
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {t('recommend.submit')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* 详细点评模式 */}
        {mode === 'detailed' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('recommend.detailed.restaurantName')} *
              </label>
              <select
                value={formData.restaurant?.id || ''}
                onChange={(e) => {
                  const selected = mockRestaurants.find(r => r.id === parseInt(e.target.value));
                  handleRestaurantSelect(selected);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">{t('recommend.detailed.selectRestaurant')}</option>
                {mockRestaurants.map(restaurant => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.emoji} {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('recommend.detailed.rating')}
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={24}
                      className={star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('recommend.detailed.description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                placeholder={t('recommend.detailed.descriptionPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('recommend.detailed.price')}
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('recommend.detailed.pricePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('recommend.detailed.uploadImage')}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="h-full object-cover rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">{t('recommend.detailed.clickToUpload')}</span>
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setMode(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('recommend.back')}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {t('recommend.submit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecommendForm;
