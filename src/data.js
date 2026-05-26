export const EMPLOYEES = [
  { id: 'E1042', name: '林婉清', age: 28, email: 'lin.wanqing@gongfeng.cn', dept: '人力资源部', title: 'HRBP',     joined: '2022-03-14', avatar: '#FCD34D' },
  { id: 'E1043', name: '陈昊然', age: 34, email: 'chen.haoran@gongfeng.cn', dept: '研发中心',   title: '后端工程师', joined: '2021-07-02', avatar: '#A7F3D0' },
  { id: 'E1044', name: '苏梦琪', age: 26, email: 'su.mengqi@gongfeng.cn',   dept: '市场部',     title: '品牌经理',   joined: '2023-01-09', avatar: '#FBCFE8' },
  { id: 'E1045', name: '王立群', age: 41, email: 'wang.liqun@gongfeng.cn',  dept: '财务部',     title: '财务主管',   joined: '2018-11-20', avatar: '#BFDBFE' },
  { id: 'E1046', name: '赵子睿', age: 30, email: 'zhao.zirui@gongfeng.cn',  dept: '研发中心',   title: '前端工程师', joined: '2022-08-18', avatar: '#FDE68A' },
  { id: 'E1047', name: '黄诗韵', age: 24, email: 'huang.shiyun@gongfeng.cn',dept: '运营部',     title: '运营专员',   joined: '2024-04-01', avatar: '#C7D2FE' },
  { id: 'E1048', name: '周明远', age: 38, email: 'zhou.mingyuan@gongfeng.cn',dept:'研发中心',   title: '架构师',     joined: '2019-05-13', avatar: '#FCA5A5' },
  { id: 'E1049', name: '徐若彤', age: 27, email: 'xu.ruotong@gongfeng.cn',  dept: '设计部',     title: '产品设计',   joined: '2023-06-21', avatar: '#FDBA74' },
];

export const CATEGORIES = [
  { id: 'C01', name: 'IT 设备',  desc: '电脑 / 服务器 / 外设',   count: 24, color: '#4F6BED' },
  { id: 'C02', name: '办公耗材', desc: '打印纸 / 墨盒 / 文具',    count: 12, color: '#16A34A' },
  { id: 'C03', name: '网络设备', desc: '路由 / 交换机 / AP',      count: 8,  color: '#A855F7' },
  { id: 'C04', name: '会议设备', desc: '投影 / 摄像头 / 麦克风',  count: 6,  color: '#F59E0B' },
  { id: 'C05', name: '安防设备', desc: '门禁 / 监控 / 烟感',      count: 0,  color: '#EF4444' },
];

export const DEVICES = [
  { id: 'D2001', name: 'MacBook Pro 14"', model: 'M3 Pro / 18GB',    catId: 'C01', status: '在用', assignee: '陈昊然', sn: 'C02XK9JFLVDQ' },
  { id: 'D2002', name: 'Dell XPS 15',     model: '9530 / i7-13700H', catId: 'C01', status: '在用', assignee: '赵子睿', sn: 'DPX52301A' },
  { id: 'D2003', name: 'iMac 24"',        model: 'M3 / 16GB',        catId: 'C01', status: '闲置', assignee: '-',     sn: 'F4VKQ87M' },
  { id: 'D2004', name: 'ThinkPad X1',     model: 'Carbon Gen 11',    catId: 'C01', status: '维修', assignee: '王立群', sn: 'PF3X8K2P' },
  { id: 'D2005', name: 'HP LaserJet',     model: 'M404dn',           catId: 'C02', status: '在用', assignee: '行政',   sn: 'CNB3F19281' },
  { id: 'D2006', name: 'A4 打印纸',       model: '70g · 5000 张',    catId: 'C02', status: '库存', assignee: '行政',   sn: '-' },
  { id: 'D2007', name: 'Cisco 交换机',    model: 'C9300-48P',        catId: 'C03', status: '在用', assignee: 'IT',     sn: 'FCW2438G0HN' },
  { id: 'D2008', name: 'Ubiquiti AP',     model: 'U6-Pro',           catId: 'C03', status: '在用', assignee: 'IT',     sn: 'F492BF7C' },
  { id: 'D2009', name: 'Logitech Rally',  model: 'Bar Mini',         catId: 'C04', status: '在用', assignee: '会议室A', sn: 'LRB-2210-88' },
  { id: 'D2010', name: 'Epson 投影仪',    model: 'EB-L520U',         catId: 'C04', status: '在用', assignee: '会议室B', sn: 'X3K8 2200017' },
];

export const API_LOGS = [
  { ts: '14:32:18', method: 'GET',    url: '/api/employees',              ip: '10.0.32.18', status: 200, ms: 42 },
  { ts: '14:32:09', method: 'POST',   url: '/api/auth/login',             ip: '10.0.32.18', status: 200, ms: 188 },
  { ts: '14:31:47', method: 'DELETE', url: '/api/employees/E1042',        ip: '10.0.32.18', status: 200, ms: 67 },
  { ts: '14:30:55', method: 'POST',   url: '/api/categories',             ip: '10.0.32.18', status: 400, ms: 12,  err: '名称已存在' },
  { ts: '14:29:30', method: 'GET',    url: '/api/devices?categoryId=C01', ip: '10.0.32.18', status: 200, ms: 58 },
  { ts: '14:28:11', method: 'PUT',    url: '/api/employees/E1045',        ip: '10.0.32.18', status: 200, ms: 94 },
  { ts: '14:27:02', method: 'GET',    url: '/api/categories/C05/devices', ip: '10.0.32.18', status: 200, ms: 31 },
  { ts: '14:25:48', method: 'DELETE', url: '/api/categories/C01',         ip: '10.0.32.18', status: 409, ms: 23,  err: '分类下存在设备，无法删除' },
  { ts: '14:24:33', method: 'GET',    url: '/api/employees/E9999',        ip: '10.0.32.18', status: 404, ms: 14,  err: '员工不存在' },
  { ts: '14:23:00', method: 'GET',    url: '/api/devices',                ip: '10.0.32.18', status: 401, ms: 8,   err: '未授权，请重新登录' },
  { ts: '14:20:15', method: 'POST',   url: '/api/devices',                ip: '10.0.32.18', status: 200, ms: 76 },
  { ts: '14:18:02', method: 'GET',    url: '/api/categories',             ip: '10.0.32.18', status: 200, ms: 19 },
];
