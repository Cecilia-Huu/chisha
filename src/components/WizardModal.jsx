
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WizardModal = ({ isOpen, onClose, onResult, onRecommendationGenerated, restaurants = [] }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState('');
  const [foodType, setFoodType] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState(null);

  const budgetOptions = [
    { key: 'low', icon: '💸', label: t('budgetOptions.low'), sub: t('budgetOptions.lowSub') },
    { key: 'mid', icon: '💰', label: t('budgetOptions.mid'), sub: t('budgetOptions.midSub') },
    { key: 'high', icon: '💳', label: t('budgetOptions.high'), sub: t('budgetOptions.highSub') },
    { key: 'any', icon: '🤷', label: t('budgetOptions.any'), sub: t('budgetOptions.anySub') }
  ];

  const foodOptions = [
    { key: 'rice', icon: '🍚', label: t('foodOptions.rice') },
    { key: 'noodle', icon: '🍜', label: t('foodOptions.noodle') },
    { key: 'hotpot', icon: '🍲', label: t('foodOptions.hotpot') },
    { key: 'drinks', icon: '🧋', label: t('foodOptions.drinks') },
    { key: 'western', icon: '🥩', label: t('foodOptions.western') },
    { key: 'any', icon: '🎰', label: t('foodOptions.any') }
  ];

  const distanceOptions = [
    { key: 'close', icon: '🦶', label: t('distanceOptions.close'), sub: t('distanceOptions.closeSub') },
    { key: 'mid', icon: '🚶', label: t('distanceOptions.mid'), sub: t('distanceOptions.midSub') },
    { key: 'far', icon: '🚲', label: t('distanceOptions.far'), sub: t('distanceOptions.farSub') },
    { key: 'any', icon: '🤷', label: t('distanceOptions.any') }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      generateResult();
    }
  };

  const generateResult = (selectedDistance = distance) => {
    if (!restaurants || restaurants.length === 0) {
      const fallbackResult = {
        id: null,
        name: i18n.language === 'zh' ? '附近暂时没有餐厅' : 'No nearby restaurants yet',
        emoji: '🔍',
        meta: i18n.language === 'zh' ? '换个学校或稍后再试' : 'Try another campus',
        reasons: [
          i18n.language === 'zh' ? '• 当前学校暂无可推荐数据' : '• No restaurant data for this campus'
        ]
      };
      setResult(fallbackResult);
      setStep(4);
      return;
    }

    let filtered = [...restaurants];

    // 预算筛选
    if (budget && budget !== 'any') {
      filtered = filtered.filter(r => {
        if (budget === 'low') return r.price <= 20;
        if (budget === 'mid') return r.price > 20 && r.price <= 40;
        if (budget === 'high') return r.price > 40;
        return true;
      });
    }

    // 食物类型筛选
    if (foodType && foodType !== 'any') {
      filtered = filtered.filter(r => r.foodType === foodType);
    }

    // 距离筛选
    if (selectedDistance && selectedDistance !== 'any') {
      filtered = filtered.filter(r => {
        if (selectedDistance === 'close') return r.distM <= 300;
        if (selectedDistance === 'mid') return r.distM > 300 && r.distM <= 500;
        if (selectedDistance === 'far') return r.distM > 500;
        return true;
      });
    }

    const isExactMatch = filtered.length > 0;

    // 没有完全匹配时，选择满足条件最多的餐厅，而不是完全随机忽略条件。
    const pool = isExactMatch
      ? filtered
      : restaurants
          .map(restaurant => {
            let score = 0;
            if (budget === 'any' || !budget) score += 1;
            else if (budget === 'low' && restaurant.price <= 20) score += 1;
            else if (budget === 'mid' && restaurant.price > 20 && restaurant.price <= 40) score += 1;
            else if (budget === 'high' && restaurant.price > 40) score += 1;

            if (foodType === 'any' || !foodType || restaurant.foodType === foodType) score += 1;

            if (selectedDistance === 'any' || !selectedDistance) score += 1;
            else if (selectedDistance === 'close' && restaurant.distM <= 300) score += 1;
            else if (selectedDistance === 'mid' && restaurant.distM > 300 && restaurant.distM <= 500) score += 1;
            else if (selectedDistance === 'far' && restaurant.distM > 500) score += 1;

            return { restaurant, score };
          })
          .sort((a, b) => b.score - a.score || b.restaurant.rating - a.restaurant.rating)
          .filter((item, _, items) => item.score === items[0].score)
          .map(item => item.restaurant);
    
    // 随机选择一家
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];

    const newResult = {
      id: selected.id,
      name: selected.name,
      emoji: selected.emoji,
      meta: selected.meta,
      reasons: [
        ...(!isExactMatch ? [i18n.language === 'zh'
          ? '• ⚠️ 没有完全匹配，已推荐最接近条件的选择'
          : '• ⚠️ No exact match; showing the closest option'] : []),
        `• 📍 距离 ${selected.distM}m`,
        `• 💰 ¥${selected.price}/人`,
        `• ⭐ 评分 ${selected.rating}`
      ]
    };

    setResult(newResult);
    setStep(4);
    onRecommendationGenerated?.(newResult, { budget, foodType, distance: selectedDistance, exactMatch: isExactMatch });
  };

  const reset = () => {
    setStep(1);
    setBudget('');
    setFoodType('');
    setDistance('');
    setResult(null);
  };

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-400 bg-[rgba(24,18,10,0.55)] backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[520px] rounded-3xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#EDE7DC] border-none w-7.5 h-7.5 rounded-full text-sm cursor-pointer flex items-center justify-center"
        >
          <X size={16} />
        </button>

        <div className="flex gap-1.25 justify-center mb-5">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-md transition-all duration-200 ${
                i < step ? 'bg-[#D94F2B] w-4.5' : i === step ? 'bg-[#D94F2B]' : 'bg-[#EDE7DC]'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <div className="font-['ZCOOL_XiaoWei'] text-2xl mb-1.5">
              {t('wizard.budget')}
            </div>
            <div className="text-sm text-[#9A8A78] mb-5">
              {t('wizard.budgetHint')}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {budgetOptions.map(option => (
                <div
                  key={option.key}
                  onClick={() => { setBudget(option.key); setTimeout(handleNext, 300); }}
                  className={`border-2 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-150 ${
                    budget === option.key
                      ? 'border-[#D94F2B] bg-[#D94F2B] text-white'
                      : 'border-[rgba(24,18,10,0.10)] bg-[#F7F3EE] hover:border-[#D94F2B] hover:bg-[#FFF2EE]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.icon}</span>
                  <div className="text-sm font-semibold">{option.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{option.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="font-['ZCOOL_XiaoWei'] text-2xl mb-1.5">
              {t('wizard.food')}
            </div>
            <div className="text-sm text-[#9A8A78] mb-5">
              {t('wizard.foodHint')}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {foodOptions.map(option => (
                <div
                  key={option.key}
                  onClick={() => { setFoodType(option.key); setTimeout(handleNext, 300); }}
                  className={`border-2 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-150 ${
                    foodType === option.key
                      ? 'border-[#D94F2B] bg-[#D94F2B] text-white'
                      : 'border-[rgba(24,18,10,0.10)] bg-[#F7F3EE] hover:border-[#D94F2B] hover:bg-[#FFF2EE]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.icon}</span>
                  <div className="text-sm font-semibold">{option.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="font-['ZCOOL_XiaoWei'] text-2xl mb-1.5">
              {t('wizard.distance')}
            </div>
            <div className="text-sm text-[#9A8A78] mb-5">
              {t('wizard.distanceHint')}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {distanceOptions.map(option => (
                <div
                  key={option.key}
                  onClick={() => {
                    setDistance(option.key);
                    setTimeout(() => generateResult(option.key), 350);
                  }}
                  className={`border-2 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-150 ${
                    distance === option.key
                      ? 'border-[#D94F2B] bg-[#D94F2B] text-white'
                      : 'border-[rgba(24,18,10,0.10)] bg-[#F7F3EE] hover:border-[#D94F2B] hover:bg-[#FFF2EE]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.icon}</span>
                  <div className="text-sm font-semibold">{option.label}</div>
                  {option.sub && <div className="text-xs opacity-70 mt-0.5">{option.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="text-center pt-1">
            <div className="text-xs text-[#9A8A78] tracking-widest uppercase mb-3 font-['DM_Mono']">
              {t('wizard.result')}
            </div>
            <div className="bg-[#EDE7DC] rounded-2xl p-5 mb-4 text-left flex gap-3.5 items-center">
              <div className="text-4xl">{result.emoji}</div>
              <div>
                <div className="font-['ZCOOL_XiaoWei'] text-xl mb-1">{result.name}</div>
                <div className="text-xs text-[#9A8A78] font-['DM_Mono'] mb-2">{result.meta}</div>
                <ul className="text-xs text-[#18120A] leading-relaxed">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="list-none py-0.5">{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => result.id !== null && onResult(result)}
                disabled={result.id === null}
                className="flex-1 border-none rounded-xl p-3 text-sm font-['Noto_Serif_SC'] cursor-pointer transition-all duration-150 bg-[#D94F2B] text-white shadow-md shadow-[#D94F2B]/30 hover:transform hover:-translate-y-0.5"
              >
                {t('wizard.goSee')}
              </button>
              <button
                onClick={generateResult}
                className="flex-1 border-none rounded-xl p-3 text-sm font-['Noto_Serif_SC'] cursor-pointer transition-all duration-150 bg-[#EDE7DC] text-[#18120A] hover:bg-[rgba(24,18,10,0.10)]"
              >
                {t('wizard.reroll')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WizardModal;
