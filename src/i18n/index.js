import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      // TopBar
      appName: '吃啥',
      highlight: '吃啥',
      
      // Hero Section
      heroQuestion: '今天吃什么？',
      heroSubtitle: '帮你三步搞定，不纠结',
      decideButton: '帮我决定',
      
      // School Filters
      schools: {
        all: '全部学校',
        tongji: '同济大学',
        fudan: '复旦大学',
        shufe: '上海财经'
      },
      
      // Need Filters
      needs: {
        cheap: '便宜管饱',
        near: '超近的',
        noqueue: '不想排队',
        spicy: '要辣的',
        night: '宵夜',
        delivery: '要外卖',
        date: '约会',
        all: '全部',
        shuffle: '换一换',
        healthy: '想吃健康点',
        bigPortion: '分量要大',
        breakfast: '早餐来点',
        vegetarian: '今天吃素',
        studentDeal: '学生优惠',
        openNow: '现在营业',
        warmMeal: '想吃热乎的',
        functional: '功能需求',
        mood: '心情场景',
        social: '社交时间',
        afterExam: '考完试了',
        afterSports: '刚打完球',
        sad: '心情不好',
        treat: '想犒劳自己',
        study: '边吃边学',
        rainy: '下雨不出门',
        lateNight: '12点了还饿',
        tired: '累到不想选',
        homesick: '想念家乡味',
        celebrate: '今天值得庆祝',
        comfort: '想吃点热乎的',
        needEnergy: '需要补充能量',
        wantSweet: '想来点甜的',
        wantSpicyMood: '想用辣解压',
        dormGroup: '宿舍4人组',
        birthday: '朋友生日',
        quick: '只有20分钟',
        lazy: '懒，不想动',
        graduation: '毕业聚餐',
        dateScene: '约会首选',
        out: '好久没出门',
        soloMeal: '一个人也好好吃',
        clubDinner: '社团聚餐',
        groupStudy: '小组作业搭子',
        takeoutTogether: '一起点外卖',
        twoPeople: '两个人吃',
        largeGroup: '一大群人',
        takeParents: '带爸妈吃'
      },
      
      // Sections
      todayRanking: '🔥 校园推荐榜',
      viewFullRanking: '查看完整榜单',
      nearbyHot: '附近热门',
      searchResults: '搜索：{{label}}',
      resetFilter: '重置筛选',
      
      // Ranking
      ranking: {
        titles: {
          popularity: '🔥 当前推荐榜',
          budget: '💰 省钱榜',
          night: '🌙 深夜营业榜',
          spicy: '🌶️ 辣味挑战榜',
          date: '🌸 约会首选榜'
        },
        tabs: {
          popularity: '人气',
          budget: '省钱',
          rating: '口碑',
          new: '新发现'
        },
        badges: {
          top: '今日爆单',
          rising: '↑ 上升',
          group: '聚餐首选'
        }
      },
      
      // Wizard
      wizard: {
        budget: '今天预算？',
        budgetHint: '选一个，马上帮你筛',
        food: '想吃什么？',
        foodHint: '选一个，或者直接随便',
        distance: '走多远？',
        distanceHint: '懒得走的话就选300m以内',
        result: '🍽️ 我帮你选好了',
        goSee: '去看看 →',
        reroll: '🎲 换一个'
      },
      
      // Budget Options
      budgetOptions: {
        low: '10–20元',
        lowSub: '省省党必看',
        mid: '20–40元',
        midSub: '正常吃一顿',
        high: '40元以上',
        highSub: '今天奖励自己',
        any: '随便',
        anySub: '不在乎钱'
      },
      
      // Food Options
      foodOptions: {
        rice: '米饭',
        noodle: '面 / 粉',
        hotpot: '火锅 / 烧烤',
        drinks: '甜品 / 奶茶',
        western: '西餐',
        any: '随便'
      },
      
      // Distance Options
      distanceOptions: {
        close: '300m以内',
        closeSub: '出门就到',
        mid: '500m以内',
        midSub: '走走也行',
        far: '更远也可以',
        farSub: '值得就行',
        any: '无所谓'
      },
      
      // Bottom Nav
      nav: {
        home: '首页',
        map: '地图',
        ranking: '榜单',
        favorites: '收藏',
        profile: '我的'
      },
      
      // Messages
      messages: {
        noRestaurants: '暂无符合条件的餐厅',
        tryDifferent: '换个条件试试？',
        recommended: '推荐：{{name}}',
        filtered: '已筛选：{{label}}',
        showingAll: '已显示全部餐厅'
      },
      
      // Recommendation - Updated for new flow
      recommend: {
        title: '我要推荐',
        modeSelect: '选择推荐方式',
        back: '返回',
        next: '下一步',
        submit: '提交推荐',
        success: '推荐提交成功！',
        cancel: '取消',
        
        // Mode selection
        modes: {
          quick: {
            title: '一键推荐',
            desc: '选餐厅、选理由，15秒完成',
            time: '⚡ 约15秒'
          },
          detailed: {
            title: '写详细点评',
            desc: '评分、文字、照片，全面分享',
            time: '📝 约3分钟'
          }
        },
        
        // Quick mode
        quick: {
          step1: '选择餐厅',
          step2: '选择推荐理由',
          selectRestaurant: '选择餐厅',
          selectReasons: '选择推荐理由（可多选）',
          reasons: {
            cheap: '超级实惠',
            taste: '排队也值',
            fast: '出餐很快',
            atmosphere: '环境很棒',
            service: '服务贴心',
            portion: '分量很足',
            clean: '干净卫生',
            convenient: '位置方便',
            unique: '口味独特',
            group: '适合聚餐'
          }
        },
        
        // Detailed mode
        detailed: {
          subtitle: '详细分享你的用餐体验',
          restaurantName: '餐厅名称',
          selectRestaurant: '选择餐厅',
          rating: '评分',
          description: '详细点评',
          descriptionPlaceholder: '分享你的用餐体验，帮助其他同学做出选择...',
          price: '人均消费',
          pricePlaceholder: '如：¥25',
          uploadImage: '上传照片',
          clickToUpload: '点击上传'
        }
      }
    }
  },
  en: {
    translation: {
      // TopBar
      appName: '吃啥',
      highlight: 'Food',
      
      // Hero Section
      heroQuestion: 'What to eat today?',
      heroSubtitle: 'Three steps to decide, no more confusion',
      decideButton: 'Help me decide',
      
      // School Filters
      schools: {
        all: 'All campuses',
        tongji: 'Tongji University',
        fudan: 'Fudan University',
        shufe: 'SHUFE'
      },
      
      // Need Filters - 添加完整的英文翻译
      needs: {
        cheap: 'Budget',
        near: 'Nearby',
        noqueue: 'No Queue',
        spicy: 'Spicy',
        night: 'Night',
        delivery: 'Delivery',
        date: 'Date',
        all: 'All',
        shuffle: 'Shuffle',
        healthy: 'Healthy',
        bigPortion: 'Big Portion',
        breakfast: 'Breakfast',
        vegetarian: 'Vegetarian',
        studentDeal: 'Student Deal',
        openNow: 'Open Now',
        warmMeal: 'Something Hot',
        functional: 'Functional',
        mood: 'Mood',
        social: 'Social',
        afterExam: 'After Exam',
        afterSports: 'After Sports',
        sad: 'Feeling Sad',
        treat: 'Treat Yourself',
        study: 'Study Time',
        rainy: 'Rainy Day',
        lateNight: 'Late Night',
        tired: 'Too Tired to Choose',
        homesick: 'Homesick Comfort',
        celebrate: 'Celebrate Today',
        comfort: 'Something Warm',
        needEnergy: 'Energy Boost',
        wantSweet: 'Something Sweet',
        wantSpicyMood: 'Spicy Release',
        dormGroup: 'Dorm Group',
        birthday: 'Birthday',
        quick: 'Quick Meal',
        lazy: 'Feeling Lazy',
        graduation: 'Graduation',
        dateScene: 'Date Night',
        out: 'Going Out',
        soloMeal: 'Solo Meal',
        clubDinner: 'Club Dinner',
        groupStudy: 'Group Study',
        takeoutTogether: 'Order Together',
        twoPeople: 'For Two',
        largeGroup: 'Large Group',
        takeParents: 'With Parents'
      },
      
      // Sections
      todayRanking: '🔥 Campus Picks',
      viewFullRanking: 'View Full Ranking',
      nearbyHot: 'Nearby Hot',
      searchResults: 'Search: {{label}}',
      resetFilter: 'Reset Filter',
      
      // Ranking
      ranking: {
        titles: {
          popularity: '🔥 Current Picks',
          budget: '💰 Budget',
          night: '🌙 Night',
          spicy: '🌶️ Spicy',
          date: '🌸 Date'
        },
        tabs: {
          popularity: 'Popular',
          budget: 'Budget',
          rating: 'Rating',
          new: 'New'
        },
        badges: {
          top: 'Hot Today',
          rising: '↑ Rising',
          group: 'Group Pick'
        }
      },
      
      // Wizard
      wizard: {
        budget: 'Today\'s budget?',
        budgetHint: 'Pick one, we\'ll filter for you',
        food: 'What do you want to eat?',
        foodHint: 'Pick one, or just random',
        distance: 'How far to walk?',
        distanceHint: 'Choose 300m if you\'re lazy',
        result: '🍽️ I\'ve chosen for you',
        goSee: 'Go check →',
        reroll: '🎲 Change one'
      },
      
      // Budget Options
      budgetOptions: {
        low: '$10-20',
        lowSub: 'Budget saver',
        mid: '$20-40',
        midSub: 'Normal meal',
        high: '$40+',
        highSub: 'Treat yourself',
        any: 'Whatever',
        anySub: 'Don\'t care'
      },
      
      // Food Options
      foodOptions: {
        rice: 'Rice',
        noodle: 'Noodles',
        hotpot: 'Hotpot/BBQ',
        drinks: 'Drinks',
        western: 'Western',
        any: 'Whatever'
      },
      
      // Distance Options
      distanceOptions: {
        close: 'Within 300m',
        closeSub: 'Right outside',
        mid: 'Within 500m',
        midSub: 'A short walk',
        far: 'Further is ok',
        farSub: 'Worth it',
        any: 'Don\'t care'
      },
      
      // Bottom Nav
      nav: {
        home: 'Home',
        map: 'Map',
        ranking: 'Ranking',
        favorites: 'Favorites',
        profile: 'Profile'
      },
      
      // Messages
      messages: {
        noRestaurants: 'No restaurants found',
        tryDifferent: 'Try different filters?',
        recommended: 'Recommended: {{name}}',
        filtered: 'Filtered: {{label}}',
        showingAll: 'Showing all restaurants'
      },
      
      // Recommendation - Updated for new flow
      recommend: {
        title: 'Recommend',
        modeSelect: 'Choose recommendation type',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        success: 'Recommendation submitted!',
        cancel: 'Cancel',
        
        // Mode selection
        modes: {
          quick: {
            title: 'Quick Recommend',
            desc: 'Select restaurant and reasons, done in 15 seconds',
            time: '⚡ ~15 seconds'
          },
          detailed: {
            title: 'Write Review',
            desc: 'Rating, text, photos - share everything',
            time: '📝 ~3 minutes'
          }
        },
        
        // Quick mode
        quick: {
          step1: 'Select Restaurant',
          step2: 'Select Reasons',
          selectRestaurant: 'Select Restaurant',
          selectReasons: 'Select Reasons (Multiple choice)',
          reasons: {
            cheap: 'Great value',
            taste: 'Worth the wait',
            fast: 'Fast service',
            atmosphere: 'Great atmosphere',
            service: 'Good service',
            portion: 'Large portions',
            clean: 'Clean & hygienic',
            convenient: 'Convenient location',
            unique: 'Unique taste',
            group: 'Good for groups'
          }
        },
        
        // Detailed mode
        detailed: {
          subtitle: 'Share your detailed dining experience',
          restaurantName: 'Restaurant Name',
          selectRestaurant: 'Select Restaurant',
          rating: 'Rating',
          description: 'Detailed Review',
          descriptionPlaceholder: 'Share your dining experience to help other students...',
          price: 'Price per person',
          pricePlaceholder: 'e.g. ¥25',
          uploadImage: 'Upload Photos',
          clickToUpload: 'Click to upload'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
