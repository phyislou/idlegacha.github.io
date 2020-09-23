const aiboInfo = [
  { id: 1, name: '绿色史莱姆', star: 1, elements: '风', ab1: '分裂', ab2: null, hp: 335, atk: 28, def: 24, dimenstal: 150 },
  { id: 2, name: '蓝色史莱姆', star: 1, elements: '水', ab1: '迸发', ab2: null, hp: 260, atk: 28, def: 20, dimenstal: 187 },
  { id: 3, name: '红色史莱姆', star: 1, elements: '火', ab1: '弹射', ab2: null, hp: 200, atk: 32, def: 12, dimenstal: 487 },
  { id: 4, name: '黄色史莱姆', star: 1, elements: '地', ab1: '分裂', ab2: null, hp: 324, atk: 24, def: 32, dimenstal: 300 },
  { id: 5, name: '公主史莱姆', star: 4, elements: '火', ab1: '双生分裂', ab2: '自愈', hp: 447, atk: 44, def: 28, dimenstal: 2350 },
  { id: 6, name: '海藻杜吉芽', star: 2, elements: '水', ab1: '吸收', ab2: null, hp: 320, atk: 40, def: 36, dimenstal: 518 },
  { id: 7, name: '水藻杜吉芽', star: 1, elements: '水', ab1: '自愈', ab2: null, hp: 260, atk: 32, def: 28, dimenstal: 280 },
  { id: 8, name: '黄金史莱姆', star: 2, elements: '地', ab1: '分裂', ab2: null, hp: 417, atk: 36, def: 23, dimenstal: 3600 },
  { id: 9, name: '阳葵', star: 1, elements: '地', ab1: '喷射', ab2: null, hp: 180, atk: 32, def: 20, dimenstal: 202 },
  { id: 10, name: '紫阳葵', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 240, atk: 40, def: 24, dimenstal: 505 },
  { id: 11, name: '风仙炭玻玻', star: 1, elements: '风', ab1: '治疗', ab2: null, hp: 176, atk: 28, def: 20, dimenstal: 165 },
  { id: 12, name: '水仙炭玻玻', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 236, atk: 36, def: 24, dimenstal: 600 },
  { id: 13, name: '斯可可', star: 2, elements: '地', ab1: '横扫', ab2: null, hp: 332, atk: 40, def: 36, dimenstal: 275 },
  { id: 14, name: '水猫呜拉喵', star: 1, elements: '水', ab1: '重击', ab2: null, hp: 272, atk: 28, def: 28, dimenstal: 400 },
  { id: 15, name: '山猫呜拉喵', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 316, atk: 32, def: 44, dimenstal: 590 },
  { id: 16, name: '地鼠芙洛波', star: 1, elements: '地', ab1: '弹射', ab2: null, hp: 252, atk: 32, def: 24, dimenstal: 260 },
  { id: 17, name: '火山芙洛波', star: 2, elements: '火', ab1: '鼓舞', ab2: null, hp: 240, atk: 28, def: 28, dimenstal: 628 },
  { id: 18, name: '风精NANO', star: 1, elements: '风', ab1: '喷射', ab2: null, hp: 192, atk: 28, def: 16, dimenstal: 331 },
  { id: 19, name: '土精NANO', star: 2, elements: '地', ab1: '喷射', ab2: null, hp: 252, atk: 32, def: 20, dimenstal: 443 },
  { id: 20, name: '地鸟喳喳布林', star: 1, elements: '地', ab1: '嘲讽', ab2: null, hp: 244, atk: 28, def: 32, dimenstal: 471 },
  { id: 21, name: '水鸟喳喳布林', star: 1, elements: '水', ab1: '挑衅', ab2: null, hp: 291, atk: 30, def: 20, dimenstal: 155 },
  { id: 22, name: '杜艮', star: 1, elements: '水', ab1: '混乱', ab2: null, hp: 172, atk: 39, def: 20, dimenstal: 913 },
  { id: 23, name: 'MIO', star: 3, elements: '水', ab1: '猫爪连击', ab2: '迅闪', hp: 387, atk: 44, def: 38, dimenstal: 876 },
  { id: 24, name: '露库希安', star: 3, elements: '风', ab1: '自然之力', ab2: '迸发', hp: 280, atk: 48, def: 32, dimenstal: 2411 },
  { id: 25, name: '义贼多米诺', star: 3, elements: '风', ab1: '战术切换', ab2: '迅闪', hp: 360, atk: 52, def: 36, dimenstal: 954 },
  { id: 26, name: '狂犬多米诺', star: 4, elements: '风', ab1: '嗜血狂热', ab2: '吸收', hp: 428, atk: 64, def: 36, dimenstal: 1814 },
  { id: 27, name: '海歌姬·赛伦', star: 3, elements: '水', ab1: '祝福之歌', ab2: '自愈', hp: 296, atk: 44, def: 28, dimenstal: 1211 },
  { id: 28, name: '雷素·鸣', star: 3, elements: '火', ab1: '连锁闪电', ab2: '迅闪', hp: 348, atk: 52, def: 36, dimenstal: 1255 },
  { id: 29, name: '基雅·库罗', star: 3, elements: '风', ab1: '鲜血献祭', ab2: '弹射', hp: 248, atk: 52, def: 40, dimenstal: 978 },
  { id: 30, name: '秋风希露芙', star: 3, elements: '风', ab1: '复苏之风', ab2: '喷射', hp: 276, atk: 40, def: 28, dimenstal: 1751 },
  { id: 31, name: '拉克斯·蕾妮娅', star: 3, elements: '水', ab1: '霜冻之刃', ab2: '硬化', hp: 509, atk: 31, def: 67, dimenstal: 1210 },
  { id: 32, name: '七尾·稻荷御澄', star: 4, elements: '火', ab1: '魅惑', ab2: '横扫', hp: 487, atk: 64, def: 29, dimenstal: 2070 },
  { id: 33, name: '真护·天茧', star: 4, elements: '火', ab1: '龙斩一瞬', ab2: '吸收', hp: 425, atk: 56, def: 51, dimenstal: 2000 },
  { id: 34, name: '莉安夕', star: 4, elements: '水', ab1: '生吞', ab2: '迅闪', hp: 392, atk: 84, def: 44, dimenstal: 2155 },
  { id: 35, name: '卡库拉拉兹巴', star: 4, elements: '水', ab1: '原始律动', ab2: '治疗', hp: 284, atk: 52, def: 36, dimenstal: 1705 },
  { id: 36, name: '阿芙莉芒', star: 4, elements: '地', ab1: '邪王真眼', ab2: '弹射', hp: 300, atk: 56, def: 40, dimenstal: 1961 },
  { id: 37, name: '神之御子薇薇', star: 5, elements: '风', ab1: '御子的加护', ab2: '重击', hp: 408, atk: 60, def: 48, dimenstal: 4295 },
  { id: 38, name: '幽冥的梅菲尔', star: 5, elements: '火', ab1: '死火的预兆', ab2: '弹射', hp: 344, atk: 52, def: 48, dimenstal: 4264 },
  { id: 39, name: '血口荆棘·辛普拉', star: 3, elements: '火', ab1: '荆棘之种', ab2: '鼓舞', hp: 292, atk: 40, def: 36, dimenstal: 1654 },
  { id: 40, name: '布萝', star: 2, elements: '地', ab1: '本能', ab2: null, hp: 308, atk: 48, def: 20, dimenstal: 379 },
  { id: 41, name: '妖蛾子', star: 3, elements: '地', ab1: '飞蛾扑火', ab2: '守护', hp: 300, atk: 48, def: 36, dimenstal: 850 },
  { id: 42, name: '高原火角·阿卡铃', star: 3, elements: '火', ab1: '烈焰冲刺', ab2: '横扫', hp: 514, atk: 64, def: 32, dimenstal: 820 },
  { id: 43, name: '大根子', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 237, atk: 39, def: 25, dimenstal: 250 },
  { id: 44, name: '柯萝', star: 1, elements: '地', ab1: '重击', ab2: null, hp: 276, atk: 32, def: 32, dimenstal: 232 },
  { id: 45, name: '花藕子', star: 3, elements: '风', ab1: '莲蓬扫射', ab2: '迸发', hp: 252, atk: 40, def: 28, dimenstal: 1510 },
  { id: 46, name: '恰斯可', star: 2, elements: '地', ab1: '爆发', ab2: null, hp: 303, atk: 32, def: 56, dimenstal: 662 },
  { id: 47, name: '熔岩乌丽卡', star: 2, elements: '火', ab1: '重击', ab2: null, hp: 258, atk: 44, def: 44, dimenstal: 291 },
  { id: 48, name: '乌丽卡', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 258, atk: 44, def: 44, dimenstal: 287 },
  { id: 49, name: '月兔蕾雅', star: 3, elements: '水', ab1: '月光狂乱', ab2: '重击', hp: 380, atk: 48, def: 44, dimenstal: 776 },
  { id: 50, name: '格莉姆', star: 2, elements: '地', ab1: '硬化', ab2: null, hp: 316, atk: 36, def: 56, dimenstal: 333 },
  { id: 51, name: '格雷姆', star: 2, elements: '水', ab1: '守护', ab2: null, hp: 412, atk: 36, def: 36, dimenstal: 601 },
  { id: 52, name: '格拉姆', star: 2, elements: '火', ab1: '挑衅', ab2: null, hp: 269, atk: 56, def: 32, dimenstal: 545 },
  { id: 53, name: '迷迷可', star: 1, elements: '地', ab1: '挑衅', ab2: null, hp: 304, atk: 24, def: 36, dimenstal: 245 },
  { id: 54, name: '宝石迷迷可', star: 4, elements: '火', ab1: '撒币', ab2: '嘲讽', hp: 528, atk: 44, def: 48, dimenstal: 3479 },
  { id: 55, name: '多萝', star: 2, elements: '地', ab1: '群居', ab2: null, hp: 307, atk: 31, def: 28, dimenstal: 388 },
  { id: 56, name: '死亡缠绕·萝丝娜', star: 4, elements: '地', ab1: '死亡缠绕', ab2: '毒雾', hp: 442, atk: 42, def: 42, dimenstal: 1548 },
  { id: 57, name: '必达信使·哈托莉', star: 3, elements: '风', ab1: '战场速递', ab2: '迅闪', hp: 410, atk: 40, def: 40, dimenstal: 781 },
  { id: 58, name: '白浪激流·克洛琪', star: 3, elements: '水', ab1: '泥潭', ab2: '重击', hp: 380, atk: 52, def: 41, dimenstal: 1087 },
  { id: 59, name: '桑图艾尔', star: 3, elements: '地', ab1: '重击', ab2: '战术突刺', hp: 410, atk: 42, def: 42, dimenstal: 981 },
  { id: 60, name: '冰川大亨·夏洛蒂', star: 3, elements: '水', ab1: '未知召唤', ab2: '混乱', hp: 407, atk: 43, def: 44, dimenstal: 1900 },
  { id: 61, name: '彩虹史莱姆', star: 3, elements: '风', ab1: '元素分裂', ab2: '自愈', hp: 467, atk: 45, def: 39, dimenstal: 2000 },
  { id: 62, name: '沼江夜鸣·鵺', star: 4, elements: '风', ab1: '震颤音波', ab2: '迅闪', hp: 422, atk: 50, def: 50, dimenstal: 1961 },
  { id: 63, name: '罪骨公主·斯卡莉安', star: 4, elements: '地', ab1: '灵魂痛击', ab2: '横扫', hp: 392, atk: 71, def: 44, dimenstal: 2158 },
  { id: 64, name: '野林之歌·木野子', star: 3, elements: '火', ab1: '最佳舞台', ab2: '混乱', hp: 301, atk: 46, def: 28, dimenstal: 872 },
  { id: 65, name: '命运之女·拉米娅', star: 4, elements: '地', ab1: '水晶爆裂', ab2: '喷射', hp: 290, atk: 63, def: 30, dimenstal: 2226 },
  { id: 66, name: '幻翼天角·菲娜', star: 5, elements: '水', ab1: '生命绽放', ab2: '自愈', hp: 467, atk: 57, def: 51, dimenstal: 3537 },
  { id: 67, name: '蜂刺骑士·修瓦莉', star: 3, elements: '风', ab1: '团结冲锋', ab2: '突刺', hp: 331, atk: 47, def: 36, dimenstal: 1200 },
  { id: 68, name: '热布萝', star: 2, elements: '火', ab1: '本能', ab2: null, hp: 281, atk: 49, def: 24, dimenstal: 361 },
  { id: 69, name: '草原乌丽卡', star: 2, elements: '风', ab1: '硬化', ab2: null, hp: 253, atk: 43, def: 45, dimenstal: 297 },
  { id: 70, name: '艾露玛', star: 4, elements: '水', ab1: '源初之水', ab2: '突刺', hp: 405, atk: 49, def: 46, dimenstal: 2210 },
  { id: 71, name: '露科亚', star: 4, elements: '地', ab1: '生灵俱灭', ab2: '嘲讽', hp: 522, atk: 56, def: 47, dimenstal: 2700 },
  { id: 72, name: '康娜', star: 5, elements: '风', ab1: '裁决之雷', ab2: '迅闪', hp: 453, atk: 60, def: 45, dimenstal: 3297 },
  { id: 73, name: '托尔', star: 5, elements: '火', ab1: '巨龙吐息', ab2: '横扫', hp: 477, atk: 63, def: 53, dimenstal: 3660 },
  { id: 74, name: '卡布缇莫', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 340, atk: 36, def: 42, dimenstal: 546 },
  { id: 75, name: '白银迷迷可', star: 2, elements: '地', ab1: '挑衅', ab2: null, hp: 358, atk: 34, def: 43, dimenstal: 1210 },
  { id: 76, name: '旅人熊·莫利贝尔', star: 3, elements: '地', ab1: '熊抱', ab2: '迅闪', hp: 409, atk: 51, def: 46, dimenstal: 1147 },
  { id: 77, name: '幽夜之影·洛莉安', star: 5, elements: '地', ab1: '赤色印记', ab2: '喷射', hp: 362, atk: 63, def: 42, dimenstal: 4065 },
  { id: 78, name: '自由之翼·格里芬', star: 4, elements: '风', ab1: '皇家阵列', ab2: '迅闪', hp: 505, atk: 53, def: 44, dimenstal: 1740 },
  { id: 79, name: '山王卿·曼缇柯尔', star: 4, elements: '地', ab1: '剧毒蛰击', ab2: '重击', hp: 291, atk: 60, def: 34, dimenstal: 2166 },
  { id: 80, name: '小恶魔', star: 2, elements: '火', ab1: '混乱', ab2: null, hp: 315, atk: 42, def: 34, dimenstal: 605 },
  { id: 81, name: '云元素', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 322, atk: 36, def: 22, dimenstal: 281 },
  { id: 82, name: '赤月之牙·希瓦', star: 4, elements: '火', ab1: '回旋爪击', ab2: '影袭', hp: 423, atk: 60, def: 34, dimenstal: 2115 },
  { id: 83, name: '蜜桃子·沫沫', star: 3, elements: '水', ab1: '营养果实', ab2: '鼓舞', hp: 298, atk: 46, def: 28, dimenstal: 893 },
  { id: 84, name: '纯白史莱姆', star: 2, elements: '水', ab1: '分裂', ab2: null, hp: 511, atk: 22, def: 16, dimenstal: 430 },
  { id: 85, name: '土偶芙洛波', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 275, atk: 38, def: 32, dimenstal: 567 },
  { id: 86, name: '海兵虾', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 210, atk: 41, def: 25, dimenstal: 342 },
  { id: 87, name: '铁背海龟', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 336, atk: 39, def: 39, dimenstal: 1350 },
  { id: 88, name: '树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38, dimenstal: 598 },
  { id: 89, name: '夜之守·加尔戈萝', star: 3, elements: '地', ab1: '石像形态', ab2: '守护', hp: 398, atk: 42, def: 52, dimenstal: 1009 },
  { id: 90, name: '水手蟹', star: 2, elements: '水', ab1: '水泡', ab2: null, hp: 320, atk: 37, def: 35, dimenstal: 812 },
  { id: 91, name: '海之光·佩拉姬娅', star: 3, elements: '水', ab1: '麻痹触手', ab2: '迅闪', hp: 393, atk: 51, def: 41, dimenstal: 1255 },
  { id: 92, name: '月光蝶·千秋', star: 4, elements: '风', ab1: '月光蝶', ab2: '守护', hp: 296, atk: 55, def: 36, dimenstal: 1904 },
  { id: 93, name: '布丁史莱姆', star: 2, elements: '火', ab1: '自愈', ab2: null, hp: 311, atk: 44, def: 30, dimenstal: 950 },
  { id: 94, name: '潮汐之主·克拉肯', star: 5, elements: '水', ab1: '深海巨触', ab2: '拉扯', hp: 471, atk: 64, def: 63, dimenstal: 3204 },
  { id: 95, name: '火元素·焰', star: 3, elements: '火', ab1: '引燃', ab2: '爆发', hp: 328, atk: 53, def: 36, dimenstal: 1255 },
  { id: 96, name: '惑仔', star: 1, elements: '地', ab1: '孵化', ab2: null, hp: 170, atk: 28, def: 19, dimenstal: 379 },
  { id: 97, name: '昆西', star: 4, elements: '水', ab1: '破坏死光', ab2: '挑衅', hp: 478, atk: 51, def: 54, dimenstal: 1858 },
  { id: 98, name: '长春', star: 4, elements: '风', ab1: '全弹发射', ab2: '喷射', hp: 325, atk: 57, def: 31, dimenstal: 1962 },
  { id: 99, name: '列克星敦', star: 5, elements: '火', ab1: '空中打击', ab2: '迸发', hp: 360, atk: 67, def: 45, dimenstal: 3405 },
  { id: 100, name: '提尔比茨', star: 5, elements: '地', ab1: '炮塔建造', ab2: '重击', hp: 440, atk: 64, def: 55, dimenstal: 3337 },
  { id: 101, name: '哈克', star: 3, elements: '水', ab1: '飞羽落刃', ab2: '鼓舞', hp: 342, atk: 49, def: 41, dimenstal: 1935 },
  { id: 102, name: '亚巴朵尔', star: 5, elements: '风', ab1: '第五号角', ab2: '毒液', hp: 289, atk: 69, def: 54, dimenstal: 3940 },
  { id: 103, name: '淘淘猪·牡丹', star: 4, elements: '风', ab1: '蓄力挥砍', ab2: '嘲讽', hp: 512, atk: 59, def: 41, dimenstal: 1510 },
  { id: 104, name: '苍月之羽·奥杰塔', star: 4, elements: '风', ab1: '压制连打', ab2: '本能', hp: 450, atk: 42, def: 61, dimenstal: 1653 },
  { id: 105, name: '永夜之灯·桑兰卓', star: 5, elements: '风', ab1: '三个奇迹', ab2: '黑暗打击', hp: 483, atk: 52, def: 53, dimenstal: 3674 },
  { id: 106, name: '龙眠卿·艾穆莉斯', star: 5, elements: '水', ab1: '极寒风暴', ab2: '水泡', hp: 382, atk: 72, def: 33, dimenstal: 4125 },
  { id: 107, name: '斩骨血刃·德莉尔', star: 3, elements: '地', ab1: '料理', ab2: '迅闪', hp: 360, atk: 49, def: 48, dimenstal: 762 },
  { id: 108, name: '翠风执事·阿黛拉', star: 4, elements: '风', ab1: '风猫龙卷', ab2: '迅闪', hp: 400, atk: 66, def: 33, dimenstal: 333 },
  { id: 109, name: '密林游侠·米提希尔', star: 4, elements: '风', ab1: '游击散射', ab2: '重击', hp: 272, atk: 45, def: 30, dimenstal: 1988 },
  { id: 110, name: '欲眼策师·萨莉丝', star: 4, elements: '火', ab1: '爱的供养', ab2: '自愈', hp: 442, atk: 68, def: 34, dimenstal: 1900 },
  { id: 111, name: '星云史莱姆', star: 5, elements: '地', ab1: '星云坠落', ab2: '陨石轰击', hp: 310, atk: 72, def: 24, dimenstal: 4190 },
  { id: 112, name: '浮游奇想·梅莉露', star: 4, elements: '风', ab1: '大变活人', ab2: '重击', hp: 311, atk: 35, def: 40, dimenstal: 1859 },
  { id: 113, name: '法夫纳', star: 5, elements: '地', ab1: '龙之杀意', ab2: '混乱', hp: 366, atk: 67, def: 55, dimenstal: 3900 },
  { id: 114, name: '伊露露', star: 5, elements: '火', ab1: '灼烧炎酸', ab2: '影袭', hp: 463, atk: 62, def: 34, dimenstal: 3500 },
  { id: 115, name: '时海航歌·萨莉亚', star: 5, elements: '火', ab1: '无畏船员', ab2: '幽灵大炮', hp: 444, atk: 66, def: 44, dimenstal: 4185 },
  { id: 116, name: '活化史莱姆', star: 3, elements: '火', ab1: '活性化', ab2: '重击', hp: 465, atk: 45, def: 39, dimenstal: 1046 },
  { id: 117, name: '鼠娘子·铃兰', star: 4, elements: '地', ab1: '江湖救急', ab2: '鞭挞', hp: 392, atk: 61, def: 33, dimenstal: 1723 },
  { id: 118, name: '卡露迪翁', star: 5, elements: '风', ab1: '万物复苏', ab2: '鼓舞', hp: 369, atk: 56, def: 39, dimenstal: 3920 },
  { id: 119, name: '百貌之星·莉欧娜', star: 3, elements: '水', ab1: '伪装', ab2: '影袭', hp: 355, atk: 50, def: 42, dimenstal: 1182 },
  { id: 120, name: '克洛洛', star: 2, elements: '水', ab1: '毒液', ab2: null, hp: 307, atk: 32, def: 25, dimenstal: 222 },
  { id: 121, name: '轰牙咆哮·金格尔', star: 5, elements: '火', ab1: '王者之威', ab2: '爆发', hp: 463, atk: 71, def: 62, dimenstal: 3600 },
  { id: 122, name: '地灵神·修诺多古', star: 4, elements: '地', ab1: '土偶召唤', ab2: '喷射', hp: 350, atk: 52, def: 50, dimenstal: 2600 },
  { id: 123, name: '森林土偶', star: 3, elements: '地', ab1: '森林图腾', ab2: '分裂', hp: 441, atk: 42, def: 52, dimenstal: 1800 },
  { id: 125, name: '海洋土偶', star: 3, elements: '地', ab1: '驱散', ab2: '分裂', hp: 441, atk: 42, def: 52, dimenstal: 2000 },
  { id: 126, name: '尖啸隐者·曼德拉', star: 3, elements: '地', ab1: '尖叫', ab2: '嘲讽', hp: 440, atk: 44, def: 52, dimenstal: 2000 },
  { id: 126, name: '幽冥土偶', star: 2, elements: '地', ab1: '诅咒', ab2: null, hp: 441, atk: 42, def: 52, dimenstal: 880 },
  { id: 127, name: '雨林树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38, dimenstal: 598 },
  { id: 128, name: '冥土从兽·阿米特', star: 3, elements: '水', ab1: '紧咬', ab2: '迅闪', hp: 390, atk: 50, def: 40, dimenstal: 100 },
  { id: 129, name: '冥土侍长·安普斯', star: 4, elements: '水', ab1: '灵魂称重', ab2: '影袭', hp: 425, atk: 59, def: 45, dimenstal: 2100 },
  { id: 130, name: '冥土之主·奥赛睿', star: 5, elements: '地', ab1: '落雷审判', ab2: '诅咒', hp: 320, atk: 64, def: 48, dimenstal: 3600 },
  { id: 131, name: '劳工哥布林', star: 2, elements: '地', ab1: '临时工事', ab2: null, hp: 340, atk: 36, def: 40, dimenstal: 150 },
  { id: 132, name: '哥布林·毁灭者', star: 3, elements: '地', ab1: '击退连射', ab2: '弹射', hp: 250, atk: 48, def: 28, dimenstal: 150 },
  { id: 133, name: '文明星火·奇美拉', star: 5, elements: '风', ab1: '深渊魔焰', ab2: '迸发', hp: 325, atk: 61, def: 45, dimenstal: 4080 },
  { id: 134, name: '轰鸣大地·西可萝', star: 4, elements: '地', ab1: '大地烈波', ab2: '吸收', hp: 425, atk: 54, def: 55, dimenstal: 150 }
]

// 地图关卡信息
const mapInfo = [
  {
    index: 0,
    name: '威斯敏托大区',
    remark: '身处盆地的城市',
    areas: [
      {
        index: 0,
        name: '卡利托斯市区',
        remark: '繁华的盆地城市',
        quests: [
          {
            index: 0,
            name: '市场',
            remark: '街坊间很有口碑的市场，对于整个集市中心而言相对物美价廉',
            id: 1,
            HP: 600,
            gold: 80000
          },
          {
            index: 1,
            name: '东门门口',
            remark: '出城的要道',
            id: 2,
            HP: 600,
            gold: 800
          },
          {
            index: 2,
            name: '旅舍',
            remark: '城门口的旅舍，有些寒酸破败了',
            id: 3,
            HP: 600,
            gold: 800
          },
          {
            index: 3,
            name: '卡利托斯护城河',
            remark: '经过护城河了，前方就是城市外面',
            id: 4,
            HP: 600,
            gold: 800
          },
          {
            index: 4,
            name: '卫兵石像',
            remark: '纪念曾经的战役所铸立的石像，也被用来当作导航的航标',
            id: 5,
            HP: 600,
            gold: 800
          },
          {
            index: 5,
            name: '滴水桥',
            remark: '前面已经能够望得见洛洛利亚森林了',
            id: 6,
            HP: 600,
            gold: 800
          }
        ]
      },
      {
        index: 1,
        name: '洛洛利亚森林外部',
        remark: '卡利托斯与外界连通的主干道',
        quests: [
          {
            index: 0,
            name: '风息牧场',
            remark: '市郊的大型牧场',
            id: 7,
            HP: 600,
            gold: 800
          },
          {
            index: 1,
            name: '白色风车',
            remark: '卡利托斯的著名地标，在城内也能看到',
            id: 8,
            HP: 600,
            gold: 800
          },
          {
            index: 2,
            name: '曲水溪',
            remark: '森林内唯一的水源',
            id: 9,
            HP: 600,
            gold: 800
          },
          {
            index: 3,
            name: '破损的祭坛',
            remark: '历史悠久的祭坛，似乎是用来祭祀雨神的',
            id: 10,
            HP: 600,
            gold: 800
          },
          {
            index: 4,
            name: '林中小屋',
            remark: '看上去有点阴森森的',
            id: 11,
            HP: 600,
            gold: 800
          },
          {
            index: 5,
            name: '峡谷支道',
            remark: '穿过茂密的森林，终于快要走出去了',
            id: 12,
            HP: 600,
            gold: 800
          }
        ]
      },
      {
        index: 2,
        name: '辰辉镇',
        remark: '四通八达的交通要镇，商业发达',
        quests: [
          {
            index: 0,
            name: '陶理斯兄弟旅馆',
            remark: '镇边路口附近的旅馆，价格实惠，客流量也很大',
            id: 13,
            HP: 600,
            gold: 800
          },
          {
            index: 1,
            name: '登山索道',
            remark: '附近的登山客热衷的去处',
            id: 14,
            HP: 600,
            gold: 800
          },
          {
            index: 2,
            name: '鹰旋高台',
            remark: '山崖断裂形成的高台，能够望见整个辰辉镇',
            id: 15,
            HP: 600,
            gold: 800
          }
        ]
      }
    ]
  },
  {
    index: 1,
    name: '布伦提亚大区',
    remark: '大陆的东海岸',
    areas: [
      {
        index: 0,
        name: '海滨灯塔',
        remark: '给来航船只导航的灯塔，现在已经弃用了',
        quests: [
          {
            index: 0,
            name: '灯塔外围',
            remark: '灯塔外围',
            id: 16,
            HP: 600,
            gold: 800
          },
          {
            index: 1,
            name: '2-1-2: 灯塔一层',
            remark: '灯塔一层',
            id: 17,
            HP: 600,
            gold: 800
          }
        ]
      }
    ]
  }
]

// 专门用来构造和地图数据结构（地图->地区->关卡）相同的动态数据
function mapStructureInit (padding) {
  return mapInfo.map((mapCursor) =>
    mapCursor.areas.map((areaCursor) =>
      areaCursor.quests.map(() => padding)
    )
  )
}
// 地图完成情况的初始记录，格式应该与上面的地图信息相同
const mapRecordInitEasy = mapStructureInit(false)
// 每个quest探索进度的初始记录，格式应该与上面的地图信息相同
const questProgressInit = mapStructureInit(-1)
// qes:仅仅用来保存结构，应该用更好的方法。

export { aiboInfo, mapInfo, mapRecordInitEasy, questProgressInit }
