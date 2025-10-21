// 线索配置文件

// 第一轮线索配置
export const firstRoundConfig = {
  id: 'first-round',
  title: '第一轮线索查看器',
  mainImage: '/clues/first-round/第一轮线索集合.jpg',
  mainImageAlt: '第一轮线索集合',
  basePath: '/clues/first-round/',
  clueImages: [
    { id: 1, title: '第一轮线索 1', filename: '1大楼.jpg' },
    { id: 2, title: '第一轮线索 2', filename: '2大楼.jpg' },
    { id: 3, title: '第一轮线索 3', filename: '3大楼.jpg' },
    { id: 4, title: '第一轮线索 4', filename: '4大楼.jpg' },
    { id: 5, title: '第一轮线索 5', filename: '5大楼.jpg' },
    { id: 6, title: '第一轮线索 6', filename: '6大楼.jpg' },
    { id: 7, title: '第一轮线索 7', filename: '7大楼.jpg' },
    { id: 8, title: '第一轮线索 8', filename: '8大楼.jpg' },
    { id: 9, title: '第一轮线索 9', filename: '9任鸿辉办公室.jpg' },
    { id: 10, title: '第一轮线索 10', filename: '10任鸿辉办公室.jpg' },
    { id: 11, title: '第一轮线索 11', filename: '11任鸿辉办公室.jpg' },
    { id: 12, title: '第一轮线索 12', filename: '12任鸿辉办公室.jpg' },
    { id: 13, title: '第一轮线索 13', filename: '13任鸿辉办公室.jpg' },
    { id: 14, title: '第一轮线索 14', filename: '14休息室.jpg' },
    { id: 15, title: '第一轮线索 15', filename: '15休息室.jpg' },
    { id: 16, title: '第一轮线索 16', filename: '16休息室.jpg' }
  ],
  hotspots: [
    { id: 1, x: 3, y: 0, width: 11.5, height: 50 },
    { id: 2, x: 14.5, y: 0, width: 11.5, height: 50 },
    { id: 3, x: 26, y: 0, width: 11.5, height: 50 },
    { id: 4, x: 37.5, y: 0, width: 11.5, height: 50 },
    { id: 5, x: 49, y: 0, width: 11.5, height: 50 },
    { id: 6, x: 60.5, y: 0, width: 11.5, height: 50 },
    { id: 7, x: 72, y: 0, width: 11.5, height: 50 },
    { id: 8, x: 83.5, y: 0, width: 11.5, height: 50 },
    { id: 9, x: 3, y: 50, width: 11, height: 50 },
    { id: 10, x: 13.5, y: 50, width: 11, height: 50 },
    { id: 11, x: 24, y: 50, width: 11, height: 50 },
    { id: 12, x: 34.5, y: 50, width: 11, height: 50 },
    { id: 13, x: 46, y: 50, width: 11, height: 50 },
    { id: 14, x: 66, y: 50, width: 11, height: 50 },
    { id: 15, x: 77, y: 50, width: 11, height: 50 },
    { id: 16, x: 88, y: 50, width: 11, height: 50 }
  ]
};

// 第二轮线索配置
export const secondRoundConfig = {
  id: 'second-round',
  title: '第二轮线索查看器',
  mainImage: '/clues/second-round/第二轮线索集合.jpg',
  mainImageAlt: '第二轮线索集合',
  basePath: '/clues/second-round/',
  clueImages: [
    { id: 1, title: '第二轮线索 1', filename: '1大楼.jpg' },
    { id: 2, title: '第二轮线索 2', filename: '2大楼.jpg' },
    { id: 3, title: '第二轮线索 3', filename: '3大楼.jpg' },
    { id: 4, title: '第二轮线索 4', filename: '4大楼.jpg' },
    { id: 5, title: '第二轮线索 5', filename: '5大楼.jpg' },
    { id: 6, title: '第二轮线索 6', filename: '6大楼.jpg' },
    { id: 7, title: '第二轮线索 7', filename: '7大楼.jpg' },
    { id: 8, title: '第二轮线索 8', filename: '8大楼.jpg' },
    { id: 9, title: '第二轮线索 9', filename: '9大楼.jpg' },
    { id: 10, title: '第二轮线索 10', filename: '10大楼.jpg' },
    { id: 11, title: '第二轮线索 11', filename: '11任鸿辉办公室.jpg' },
    { id: 12, title: '第二轮线索 12', filename: '12任鸿辉办公室.jpg' },
    { id: 13, title: '第二轮线索 13', filename: '13休息室.jpg' },
    { id: 14, title: '第二轮线索 14', filename: '14休息室.jpg' },
    { id: 15, title: '第二轮线索 15', filename: '15休息室.jpg' },
    { id: 16, title: '第二轮线索 16', filename: '16休息室.jpg' }
  ],
  // 第二轮热点布局：1-10号排成5列2行，11-12号中间，13-16号右侧
  hotspots: [
    // 第一组：1-10号（大楼）- 5列2行布局，左边留3%空隙，宽度统一为11
    { id: 1, x: 3, y: 0, width: 10.5, height: 50 },
    { id: 2, x: 3, y: 50, width: 10.5, height: 50 },
    { id: 3, x: 13.5, y: 0, width: 10.5, height: 50 },
    { id: 4, x: 13.5, y: 50, width: 10.5, height: 50 },
    { id: 5, x: 24, y: 0, width: 10.5, height: 50 },
    { id: 6, x: 24, y: 50, width: 10.5, height: 50 },
    { id: 7, x: 34.5, y: 0, width: 10.5, height: 50 },
    { id: 8, x: 34.5, y: 50, width: 10.5, height: 50 },
    { id: 9, x: 45, y: 0, width: 10.5, height: 50 },
    { id: 10, x: 45, y: 50, width: 10.5, height: 50 },
    // 第二组：11-12号（任鸿辉办公室）- 中间一列，左边留3%空隙
    { id: 11, x: 61, y: 0, width: 11, height: 50 },
    { id: 12, x: 61, y: 50, width: 11, height: 50 },
    // 第三组：13-16号（休息室）- 右侧两列，左边留3%空隙
    { id: 13, x: 76.5, y: 0, width: 10.5, height: 50 },
    { id: 14, x: 87.5, y: 0, width: 10.5, height: 50 },
    { id: 15, x: 76.5, y: 50, width: 10.5, height: 50 },
    { id: 16, x: 87.5, y: 50, width: 10.5, height: 50 }
  ]
};

// 所有线索配置的映射
export const clueConfigs = {
  'first-round': firstRoundConfig,
  'second-round': secondRoundConfig
};

// 菜单配置
export const menuItems = [
  {
    id: 'first-round',
    title: '第一轮线索',
    description: '查看第一轮线索集合',
    config: firstRoundConfig
  },
  {
    id: 'second-round',
    title: '第二轮线索',
    description: '查看第二轮线索集合',
    config: secondRoundConfig
  }
];