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
      todayRanking: '🔥 五角场推荐榜',
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

      common: {
        verified: '已核验',
        verifiedHelp: '已核验表示该餐厅信息已由学生确认，营业状态和价格等信息较为准确。',
        openConfirmed: '已确认营业',
        stillOpen: '这家还在吗？',
        communityUpdated: '信息可由同学更新',
        perPerson: '人',
        removeFavorite: '取消收藏{{name}}'
      },

      profile: {
        title: '我的主页',
        verifiedStudent: '已认证学生',
        verificationLabel: '查看学生认证说明',
        verificationHelp: '学生认证用于建立区域推荐与信息核验的可信度。当前 MVP 为流程演示，正式版将接入校园邮箱认证。',
        currentArea: '当前区域：{{area}}',
        verifyTitle: '完成学生认证',
        verifyDesc: '获得学生徽章，让餐厅推荐和信息核验更可信。',
        verifyNotice: 'MVP 阶段为流程演示，正式版计划接入校园邮箱。',
        verifyNow: '立即认证',
        recommendations: '推荐',
        favorites: '收藏',
        decisions: '决定',
        myRecommendations: '我的推荐',
        addRecommendation: '添加推荐',
        noRecommendations: '还没有推荐',
        shareFood: '分享你发现的美食，帮助其他人做出选择。',
        recommendNow: '立即推荐',
        myFavorites: '我的收藏',
        noFavorites: '还没有收藏，打开餐厅详情即可收藏。',
        recentDecisions: '最近决定',
        source: '来自{{source}}',
        sourceWizard: '三步推荐',
        sourceMap: '地图',
        sourceDetail: '餐厅详情',
        noDecisions: '选定“就吃这家”后，决定会保存在这里。',
        usageRecord: '我的使用记录',
        usageSummary: '{{details}} 次查看详情 · {{decisions}} 次完成决定',
        localOnly: '使用数据仅保存在当前设备',
        back: '返回个人中心',
        deviceData: '本设备真实使用数据',
        decisionRecord: '我的饮食决策记录',
        dataExplanation: '数据来自你在当前设备上的实际点击，不包含演示浏览量。',
        export: '导出',
        completedDecisions: '完成决定',
        favoriteRestaurants: '收藏餐厅',
        detailConversion: '详情转化',
        funnel: '决策漏斗',
        deviceTotal: '当前设备累计',
        visits: '访问页面',
        detailViews: '查看详情',
        useFilters: '使用筛选',
        generateRecommendations: '生成推荐'
      },

      rankingDetail: {
        back: '返回',
        explanation: '当前收录 · 按评分与距离排序',
        deviceViews: '本设备查看 {{count}} 次',
        highRating: '{{rating}}分高口碑',
        distance: '距你 {{distance}}m',
        average: '人均 ¥{{price}}',
        frequent: '本机常看',
        highlyRated: '高分推荐',
        reason: '推荐理由：{{reason}}',
        defaultReason: '综合表现不错',
        noData: '暂无榜单数据',
        tryLater: '请稍后再试'
      },

      fullRanking: {
        title: '五角场完整榜单',
        homeEntry: '完整榜单 · {{count}}家 →',
        subtitle: '覆盖同济、复旦、财大与五角场商圈',
        total: '共收录 {{count}} 家',
        allAreas: '全部区域',
        verified: '已核验',
        pending: '待核验',
        pendingNote: '新收录门店仅展示可确认的信息，评分、营业状态与精确距离等待用户核验。',
        noResults: '这个区域还没有收录餐厅',
        sorts: { popularity: '综合', budget: '省钱', rating: '口碑', new: '新收录' }
      },

      map: {
        ranking: '榜单',
        currentArea: '当前区域',
        restaurantCount: '{{count}} 家餐厅',
        score: '分',
        walkAbout: '步行约 {{time}}分钟',
        wantToGo: '想去',
        viewDetails: '去看看',
        noMatch: '附近暂无匹配餐厅',
        tryFilters: '试试其他筛选条件',
        reset: '重置筛选'
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
          searchPlaceholder: '搜索餐厅名称...',
          noSearchResults: '未找到匹配的餐厅',
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
      todayRanking: '🔥 Wujiaochang Picks',
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
        low: '¥10–20',
        lowSub: 'Budget saver',
        mid: '¥20–40',
        midSub: 'Normal meal',
        high: '¥40+',
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

      common: {
        verified: 'Verified',
        verifiedHelp: 'Verified information has been confirmed by local students, including opening status and price details.',
        openConfirmed: 'Confirmed open',
        stillOpen: 'Still open?',
        communityUpdated: 'Community-updated info',
        perPerson: 'person',
        removeFavorite: 'Remove {{name}} from favorites'
      },

      profile: {
        title: 'My Profile',
        verifiedStudent: 'Verified Student',
        verificationLabel: 'About student verification',
        verificationHelp: 'Student verification improves the trustworthiness of local recommendations and restaurant information. This MVP demonstrates the flow; a future version may use university email verification.',
        currentArea: 'Current area: {{area}}',
        verifyTitle: 'Complete Student Verification',
        verifyDesc: 'Get a student badge and help make recommendations and restaurant information more reliable.',
        verifyNotice: 'This is an MVP demo. University email verification is planned for a future version.',
        verifyNow: 'Verify Now',
        recommendations: 'Recommendations',
        favorites: 'Favorites',
        decisions: 'Decisions',
        myRecommendations: 'My Recommendations',
        addRecommendation: 'Add',
        noRecommendations: 'No recommendations yet',
        shareFood: 'Share a great find and help others decide.',
        recommendNow: 'Recommend Now',
        myFavorites: 'My Favorites',
        noFavorites: 'No favorites yet. Open a restaurant to save it.',
        recentDecisions: 'Recent Decisions',
        source: 'From {{source}}',
        sourceWizard: '3-step picker',
        sourceMap: 'Map',
        sourceDetail: 'Restaurant details',
        noDecisions: 'Choose “Eat here” and your decision will appear here.',
        usageRecord: 'My Activity',
        usageSummary: '{{details}} detail views · {{decisions}} decisions',
        localOnly: 'Activity data is stored only on this device',
        back: 'Back to Profile',
        deviceData: 'Real activity on this device',
        decisionRecord: 'My Dining Decisions',
        dataExplanation: 'Based on your real actions on this device; demo view counts are excluded.',
        export: 'Export',
        completedDecisions: 'Decisions',
        favoriteRestaurants: 'Favorites',
        detailConversion: 'Detail conversion',
        funnel: 'Decision Funnel',
        deviceTotal: 'This device',
        visits: 'Page visits',
        detailViews: 'Detail views',
        useFilters: 'Filters used',
        generateRecommendations: 'Recommendations generated'
      },

      rankingDetail: {
        back: 'Back',
        explanation: 'Current listings · sorted by rating and distance',
        deviceViews: 'Viewed {{count}} times here',
        highRating: 'Highly rated at {{rating}}',
        distance: '{{distance}}m away',
        average: '¥{{price}} per person',
        frequent: 'Frequently viewed',
        highlyRated: 'Top rated',
        reason: 'Why it fits: {{reason}}',
        defaultReason: 'Strong overall choice',
        noData: 'No ranking data yet',
        tryLater: 'Please try again later'
      },

      fullRanking: {
        title: 'Complete Wujiaochang Ranking',
        homeEntry: 'Full ranking · {{count}} →',
        subtitle: 'Tongji, Fudan, SHUFE and the wider Wujiaochang area',
        total: '{{count}} places listed',
        allAreas: 'All areas',
        verified: 'Verified',
        pending: 'Pending verification',
        pendingNote: 'New listings show only confirmed public information. Ratings, opening status and exact distance await community verification.',
        noResults: 'No restaurants listed in this area yet',
        sorts: { popularity: 'Overall', budget: 'Budget', rating: 'Rating', new: 'New listings' }
      },

      map: {
        ranking: 'Ranking',
        currentArea: 'Current area',
        restaurantCount: '{{count}} restaurants',
        score: '',
        walkAbout: 'About {{time}} min walk',
        wantToGo: 'Save for later',
        viewDetails: 'View details',
        noMatch: 'No matching restaurants nearby',
        tryFilters: 'Try another filter',
        reset: 'Reset filters'
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
          searchPlaceholder: 'Search restaurant names...',
          noSearchResults: 'No matching restaurants found',
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
