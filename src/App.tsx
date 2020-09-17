import React, { useState, useEffect, useRef, Suspense } from 'react'
import './App.css'
import './css/font-awesome.css'

// 伙伴数据
interface aiboType {
  id: number,
  name?: string,
  star?: number,
  elements?: string,
  ab1?: string | null,
  ab2?: string | null,
  hp?: number,
  atk?: number,
  def?: number
}

const aiboInfo: aiboType[] = [
  { id: 1, name: '绿色史莱姆', star: 1, elements: '风', ab1: '分裂', ab2: null, hp: 335, atk: 28, def: 24 },
  { id: 2, name: '蓝色史莱姆', star: 1, elements: '水', ab1: '迸发', ab2: null, hp: 260, atk: 28, def: 20 },
  { id: 3, name: '红色史莱姆', star: 1, elements: '火', ab1: '弹射', ab2: null, hp: 200, atk: 32, def: 12 },
  { id: 4, name: '黄色史莱姆', star: 1, elements: '地', ab1: '分裂', ab2: null, hp: 324, atk: 24, def: 32 },
  { id: 5, name: '公主史莱姆', star: 4, elements: '火', ab1: '双生分裂', ab2: '自愈', hp: 447, atk: 44, def: 28 },
  { id: 6, name: '海藻杜吉芽', star: 2, elements: '水', ab1: '吸收', ab2: null, hp: 320, atk: 40, def: 36 },
  { id: 7, name: '水藻杜吉芽', star: 1, elements: '水', ab1: '自愈', ab2: null, hp: 260, atk: 32, def: 28 },
  { id: 8, name: '黄金史莱姆', star: 2, elements: '地', ab1: '分裂', ab2: null, hp: 417, atk: 36, def: 23 },
  { id: 9, name: '阳葵', star: 1, elements: '地', ab1: '喷射', ab2: null, hp: 180, atk: 32, def: 20 },
  { id: 10, name: '紫阳葵', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 240, atk: 40, def: 24 },
  { id: 11, name: '风仙炭玻玻', star: 1, elements: '风', ab1: '治疗', ab2: null, hp: 176, atk: 28, def: 20 },
  { id: 12, name: '水仙炭玻玻', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 236, atk: 36, def: 24 },
  { id: 13, name: '斯可可', star: 2, elements: '地', ab1: '横扫', ab2: null, hp: 332, atk: 40, def: 36 },
  { id: 14, name: '水猫呜拉喵', star: 1, elements: '水', ab1: '重击', ab2: null, hp: 272, atk: 28, def: 28 },
  { id: 15, name: '山猫呜拉喵', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 316, atk: 32, def: 44 },
  { id: 16, name: '地鼠芙洛波', star: 1, elements: '地', ab1: '弹射', ab2: null, hp: 252, atk: 32, def: 24 },
  { id: 17, name: '火山芙洛波', star: 2, elements: '火', ab1: '鼓舞', ab2: null, hp: 240, atk: 28, def: 28 },
  { id: 18, name: '风精NANO', star: 1, elements: '风', ab1: '喷射', ab2: null, hp: 192, atk: 28, def: 16 },
  { id: 19, name: '土精NANO', star: 2, elements: '地', ab1: '喷射', ab2: null, hp: 252, atk: 32, def: 20 },
  { id: 20, name: '地鸟喳喳布林', star: 1, elements: '地', ab1: '嘲讽', ab2: null, hp: 244, atk: 28, def: 32 },
  { id: 21, name: '水鸟喳喳布林', star: 1, elements: '水', ab1: '挑衅', ab2: null, hp: 291, atk: 30, def: 20 },
  { id: 22, name: '杜艮', star: 1, elements: '水', ab1: '混乱', ab2: null, hp: 172, atk: 39, def: 20 },
  { id: 23, name: 'MIO', star: 3, elements: '水', ab1: '猫爪连击', ab2: '迅闪', hp: 387, atk: 44, def: 38 },
  { id: 24, name: '露库希安', star: 3, elements: '风', ab1: '自然之力', ab2: '迸发', hp: 280, atk: 48, def: 32 },
  { id: 25, name: '义贼多米诺', star: 3, elements: '风', ab1: '战术切换', ab2: '迅闪', hp: 360, atk: 52, def: 36 },
  { id: 26, name: '狂犬多米诺', star: 4, elements: '风', ab1: '嗜血狂热', ab2: '吸收', hp: 428, atk: 64, def: 36 },
  { id: 27, name: '海歌姬·赛伦', star: 3, elements: '水', ab1: '祝福之歌', ab2: '自愈', hp: 296, atk: 44, def: 28 },
  { id: 28, name: '雷素·鸣', star: 3, elements: '火', ab1: '连锁闪电', ab2: '迅闪', hp: 348, atk: 52, def: 36 },
  { id: 29, name: '基雅·库罗', star: 3, elements: '风', ab1: '鲜血献祭', ab2: '弹射', hp: 248, atk: 52, def: 40 },
  { id: 30, name: '秋风希露芙', star: 3, elements: '风', ab1: '复苏之风', ab2: '喷射', hp: 276, atk: 40, def: 28 },
  { id: 31, name: '拉克斯·蕾妮娅', star: 3, elements: '水', ab1: '霜冻之刃', ab2: '硬化', hp: 509, atk: 31, def: 67 },
  { id: 32, name: '七尾·稻荷御澄', star: 4, elements: '火', ab1: '魅惑', ab2: '横扫', hp: 487, atk: 64, def: 29 },
  { id: 33, name: '真护·天茧', star: 4, elements: '火', ab1: '龙斩一瞬', ab2: '吸收', hp: 425, atk: 56, def: 51 },
  { id: 34, name: '莉安夕', star: 4, elements: '水', ab1: '生吞', ab2: '迅闪', hp: 392, atk: 84, def: 44 },
  { id: 35, name: '卡库拉拉兹巴', star: 4, elements: '水', ab1: '原始律动', ab2: '治疗', hp: 284, atk: 52, def: 36 },
  { id: 36, name: '阿芙莉芒', star: 4, elements: '地', ab1: '邪王真眼', ab2: '弹射', hp: 300, atk: 56, def: 40 },
  { id: 37, name: '神之御子薇薇', star: 5, elements: '风', ab1: '御子的加护', ab2: '重击', hp: 408, atk: 60, def: 48 },
  { id: 38, name: '幽冥的梅菲尔', star: 5, elements: '火', ab1: '死火的预兆', ab2: '弹射', hp: 344, atk: 52, def: 48 },
  { id: 39, name: '血口荆棘·辛普拉', star: 3, elements: '火', ab1: '荆棘之种', ab2: '鼓舞', hp: 292, atk: 40, def: 36 },
  { id: 40, name: '布萝', star: 2, elements: '地', ab1: '本能', ab2: null, hp: 308, atk: 48, def: 20 },
  { id: 41, name: '妖蛾子', star: 3, elements: '地', ab1: '飞蛾扑火', ab2: '守护', hp: 300, atk: 48, def: 36 },
  { id: 42, name: '高原火角·阿卡铃', star: 3, elements: '火', ab1: '烈焰冲刺', ab2: '横扫', hp: 514, atk: 64, def: 32 },
  { id: 43, name: '大根子', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 237, atk: 39, def: 25 },
  { id: 44, name: '柯萝', star: 1, elements: '地', ab1: '重击', ab2: null, hp: 276, atk: 32, def: 32 },
  { id: 45, name: '花藕子', star: 3, elements: '风', ab1: '莲蓬扫射', ab2: '迸发', hp: 252, atk: 40, def: 28 },
  { id: 46, name: '恰斯可', star: 2, elements: '地', ab1: '爆发', ab2: null, hp: 303, atk: 32, def: 56 },
  { id: 47, name: '熔岩乌丽卡', star: 2, elements: '火', ab1: '重击', ab2: null, hp: 258, atk: 44, def: 44 },
  { id: 48, name: '乌丽卡', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 258, atk: 44, def: 44 },
  { id: 49, name: '月兔蕾雅', star: 3, elements: '水', ab1: '月光狂乱', ab2: '重击', hp: 380, atk: 48, def: 44 },
  { id: 50, name: '格莉姆', star: 2, elements: '地', ab1: '硬化', ab2: null, hp: 316, atk: 36, def: 56 },
  { id: 51, name: '格雷姆', star: 2, elements: '水', ab1: '守护', ab2: null, hp: 412, atk: 36, def: 36 },
  { id: 52, name: '格拉姆', star: 2, elements: '火', ab1: '挑衅', ab2: null, hp: 269, atk: 56, def: 32 },
  { id: 53, name: '迷迷可', star: 1, elements: '地', ab1: '挑衅', ab2: null, hp: 304, atk: 24, def: 36 },
  { id: 54, name: '宝石迷迷可', star: 4, elements: '火', ab1: '撒币', ab2: '嘲讽', hp: 528, atk: 44, def: 48 },
  { id: 55, name: '多萝', star: 2, elements: '地', ab1: '群居', ab2: null, hp: 307, atk: 31, def: 28 },
  { id: 56, name: '死亡缠绕·萝丝娜', star: 4, elements: '地', ab1: '死亡缠绕', ab2: '毒雾', hp: 442, atk: 42, def: 42 },
  { id: 57, name: '必达信使·哈托莉', star: 3, elements: '风', ab1: '战场速递', ab2: '迅闪', hp: 410, atk: 40, def: 40 },
  { id: 58, name: '白浪激流·克洛琪', star: 3, elements: '水', ab1: '泥潭', ab2: '重击', hp: 380, atk: 52, def: 41 },
  { id: 59, name: '桑图艾尔', star: 3, elements: '地', ab1: '重击', ab2: '战术突刺', hp: 410, atk: 42, def: 42 },
  { id: 60, name: '冰川大亨·夏洛蒂', star: 3, elements: '水', ab1: '未知召唤', ab2: '混乱', hp: 407, atk: 43, def: 44 },
  { id: 61, name: '彩虹史莱姆', star: 3, elements: '风', ab1: '元素分裂', ab2: '自愈', hp: 467, atk: 45, def: 39 },
  { id: 62, name: '沼江夜鸣·鵺', star: 4, elements: '风', ab1: '震颤音波', ab2: '迅闪', hp: 422, atk: 50, def: 50 },
  { id: 63, name: '罪骨公主·斯卡莉安', star: 4, elements: '地', ab1: '灵魂痛击', ab2: '横扫', hp: 392, atk: 71, def: 44 },
  { id: 64, name: '野林之歌·木野子', star: 3, elements: '火', ab1: '最佳舞台', ab2: '混乱', hp: 301, atk: 46, def: 28 },
  { id: 65, name: '命运之女·拉米娅', star: 4, elements: '地', ab1: '水晶爆裂', ab2: '喷射', hp: 290, atk: 63, def: 30 },
  { id: 66, name: '幻翼天角·菲娜', star: 5, elements: '水', ab1: '生命绽放', ab2: '自愈', hp: 467, atk: 57, def: 51 },
  { id: 67, name: '蜂刺骑士·修瓦莉', star: 3, elements: '风', ab1: '团结冲锋', ab2: '突刺', hp: 331, atk: 47, def: 36 },
  { id: 68, name: '热布萝', star: 2, elements: '火', ab1: '本能', ab2: null, hp: 281, atk: 49, def: 24 },
  { id: 69, name: '草原乌丽卡', star: 2, elements: '风', ab1: '硬化', ab2: null, hp: 253, atk: 43, def: 45 },
  { id: 70, name: '艾露玛', star: 4, elements: '水', ab1: '源初之水', ab2: '突刺', hp: 405, atk: 49, def: 46 },
  { id: 71, name: '露科亚', star: 4, elements: '地', ab1: '生灵俱灭', ab2: '嘲讽', hp: 522, atk: 56, def: 47 },
  { id: 72, name: '康娜', star: 5, elements: '风', ab1: '裁决之雷', ab2: '迅闪', hp: 453, atk: 60, def: 45 },
  { id: 73, name: '托尔', star: 5, elements: '火', ab1: '巨龙吐息', ab2: '横扫', hp: 477, atk: 63, def: 53 },
  { id: 74, name: '卡布缇莫', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 340, atk: 36, def: 42 },
  { id: 75, name: '白银迷迷可', star: 2, elements: '地', ab1: '挑衅', ab2: null, hp: 358, atk: 34, def: 43 },
  { id: 76, name: '旅人熊·莫利贝尔', star: 3, elements: '地', ab1: '熊抱', ab2: '迅闪', hp: 409, atk: 51, def: 46 },
  { id: 77, name: '幽夜之影·洛莉安', star: 5, elements: '地', ab1: '赤色印记', ab2: '喷射', hp: 362, atk: 63, def: 42 },
  { id: 78, name: '自由之翼·格里芬', star: 4, elements: '风', ab1: '皇家阵列', ab2: '迅闪', hp: 505, atk: 53, def: 44 },
  { id: 79, name: '山王卿·曼缇柯尔', star: 4, elements: '地', ab1: '剧毒蛰击', ab2: '重击', hp: 291, atk: 60, def: 34 },
  { id: 80, name: '小恶魔', star: 2, elements: '火', ab1: '混乱', ab2: null, hp: 315, atk: 42, def: 34 },
  { id: 81, name: '云元素', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 322, atk: 36, def: 22 },
  { id: 82, name: '赤月之牙·希瓦', star: 4, elements: '火', ab1: '回旋爪击', ab2: '影袭', hp: 423, atk: 60, def: 34 },
  { id: 83, name: '蜜桃子·沫沫', star: 3, elements: '水', ab1: '营养果实', ab2: '鼓舞', hp: 298, atk: 46, def: 28 },
  { id: 84, name: '纯白史莱姆', star: 2, elements: '水', ab1: '分裂', ab2: null, hp: 511, atk: 22, def: 16 },
  { id: 85, name: '土偶芙洛波', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 275, atk: 38, def: 32 },
  { id: 86, name: '海兵虾', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 210, atk: 41, def: 25 },
  { id: 87, name: '铁背海龟', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 336, atk: 39, def: 39 },
  { id: 88, name: '树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38 },
  { id: 89, name: '夜之守·加尔戈萝', star: 3, elements: '地', ab1: '石像形态', ab2: '守护', hp: 398, atk: 42, def: 52 },
  { id: 90, name: '水手蟹', star: 2, elements: '水', ab1: '水泡', ab2: null, hp: 320, atk: 37, def: 35 },
  { id: 91, name: '海之光·佩拉姬娅', star: 3, elements: '水', ab1: '麻痹触手', ab2: '迅闪', hp: 393, atk: 51, def: 41 },
  { id: 92, name: '月光蝶·千秋', star: 4, elements: '风', ab1: '月光蝶', ab2: '守护', hp: 296, atk: 55, def: 36 },
  { id: 93, name: '布丁史莱姆', star: 2, elements: '火', ab1: '自愈', ab2: null, hp: 311, atk: 44, def: 30 },
  { id: 94, name: '潮汐之主·克拉肯', star: 5, elements: '水', ab1: '深海巨触', ab2: '拉扯', hp: 471, atk: 64, def: 63 },
  { id: 95, name: '火元素·焰', star: 3, elements: '火', ab1: '引燃', ab2: '爆发', hp: 328, atk: 53, def: 36 },
  { id: 96, name: '惑仔', star: 1, elements: '地', ab1: '孵化', ab2: null, hp: 170, atk: 28, def: 19 },
  { id: 97, name: '昆西', star: 4, elements: '水', ab1: '破坏死光', ab2: '挑衅', hp: 478, atk: 51, def: 54 },
  { id: 98, name: '长春', star: 4, elements: '风', ab1: '全弹发射', ab2: '喷射', hp: 325, atk: 57, def: 31 },
  { id: 99, name: '列克星敦', star: 5, elements: '火', ab1: '空中打击', ab2: '迸发', hp: 360, atk: 67, def: 45 },
  { id: 100, name: '提尔比茨', star: 5, elements: '地', ab1: '炮塔建造', ab2: '重击', hp: 440, atk: 64, def: 55 },
  { id: 101, name: '哈克', star: 3, elements: '水', ab1: '飞羽落刃', ab2: '鼓舞', hp: 342, atk: 49, def: 41 },
  { id: 102, name: '亚巴朵尔', star: 5, elements: '风', ab1: '第五号角', ab2: '毒液', hp: 289, atk: 69, def: 54 },
  { id: 103, name: '淘淘猪·牡丹', star: 4, elements: '风', ab1: '蓄力挥砍', ab2: '嘲讽', hp: 512, atk: 59, def: 41 },
  { id: 104, name: '苍月之羽·奥杰塔', star: 4, elements: '风', ab1: '压制连打', ab2: '本能', hp: 450, atk: 42, def: 61 },
  { id: 105, name: '永夜之灯·桑兰卓', star: 5, elements: '风', ab1: '三个奇迹', ab2: '黑暗打击', hp: 483, atk: 52, def: 53 },
  { id: 106, name: '龙眠卿·艾穆莉斯', star: 5, elements: '水', ab1: '极寒风暴', ab2: '水泡', hp: 382, atk: 72, def: 33 },
  { id: 107, name: '斩骨血刃·德莉尔', star: 3, elements: '地', ab1: '料理', ab2: '迅闪', hp: 360, atk: 49, def: 48 },
  { id: 108, name: '翠风执事·阿黛拉', star: 4, elements: '风', ab1: '风猫龙卷', ab2: '迅闪', hp: 400, atk: 66, def: 33 },
  { id: 109, name: '密林游侠·米提希尔', star: 4, elements: '风', ab1: '游击散射', ab2: '重击', hp: 272, atk: 45, def: 30 },
  { id: 110, name: '欲眼策师·萨莉丝', star: 4, elements: '火', ab1: '爱的供养', ab2: '自愈', hp: 442, atk: 68, def: 34 },
  { id: 111, name: '星云史莱姆', star: 5, elements: '地', ab1: '星云坠落', ab2: '陨石轰击', hp: 310, atk: 72, def: 24 },
  { id: 112, name: '浮游奇想·梅莉露', star: 4, elements: '风', ab1: '大变活人', ab2: '重击', hp: 311, atk: 35, def: 40 },
  { id: 113, name: '法夫纳', star: 5, elements: '地', ab1: '龙之杀意', ab2: '混乱', hp: 366, atk: 67, def: 55 },
  { id: 114, name: '伊露露', star: 5, elements: '火', ab1: '灼烧炎酸', ab2: '影袭', hp: 463, atk: 62, def: 34 },
  { id: 115, name: '时海航歌·萨莉亚', star: 5, elements: '火', ab1: '无畏船员', ab2: '幽灵大炮', hp: 444, atk: 66, def: 44 },
  { id: 116, name: '活化史莱姆', star: 3, elements: '火', ab1: '活性化', ab2: '重击', hp: 465, atk: 45, def: 39 },
  { id: 117, name: '鼠娘子·铃兰', star: 4, elements: '地', ab1: '江湖救急', ab2: '鞭挞', hp: 392, atk: 61, def: 33 },
  { id: 118, name: '卡露迪翁', star: 5, elements: '风', ab1: '万物复苏', ab2: '鼓舞', hp: 369, atk: 56, def: 39 },
  { id: 119, name: '百貌之星·莉欧娜', star: 3, elements: '水', ab1: '伪装', ab2: '影袭', hp: 355, atk: 50, def: 42 },
  { id: 120, name: '克洛洛', star: 2, elements: '水', ab1: '毒液', ab2: null, hp: 307, atk: 32, def: 25 },
  { id: 121, name: '轰牙咆哮·金格尔', star: 5, elements: '火', ab1: '王者之威', ab2: '爆发', hp: 463, atk: 71, def: 62 },
  { id: 122, name: '地灵神·修诺多古', star: 4, elements: '地', ab1: '土偶召唤', ab2: '喷射', hp: 350, atk: 52, def: 50 },
  { id: 123, name: '森林土偶', star: 3, elements: '地', ab1: '森林图腾', ab2: '分裂', hp: 441, atk: 42, def: 52 },
  { id: 125, name: '海洋土偶', star: 3, elements: '地', ab1: '驱散', ab2: '分裂', hp: 441, atk: 42, def: 52 },
  { id: 126, name: '尖啸隐者·曼德拉', star: 3, elements: '地', ab1: '尖叫', ab2: '嘲讽', hp: 440, atk: 44, def: 52 },
  { id: 126, name: '幽冥土偶', star: 2, elements: '地', ab1: '诅咒', ab2: null, hp: 441, atk: 42, def: 52 },
  { id: 127, name: '雨林树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38 },
  { id: 128, name: '冥土从兽·阿米特', star: 3, elements: '水', ab1: '紧咬', ab2: '迅闪', hp: 390, atk: 50, def: 40 },
  { id: 129, name: '冥土侍长·安普斯', star: 4, elements: '水', ab1: '灵魂称重', ab2: '影袭', hp: 425, atk: 59, def: 45 },
  { id: 130, name: '冥土之主·奥赛睿', star: 5, elements: '地', ab1: '落雷审判', ab2: '诅咒', hp: 320, atk: 64, def: 48 },
  { id: 131, name: '劳工哥布林', star: 2, elements: '地', ab1: '临时工事', ab2: null, hp: 340, atk: 36, def: 40 },
  { id: 132, name: '哥布林·毁灭者', star: 3, elements: '地', ab1: '击退连射', ab2: '弹射', hp: 250, atk: 48, def: 28 },
  { id: 133, name: '文明星火·奇美拉', star: 5, elements: '风', ab1: '深渊魔焰', ab2: '迸发', hp: 325, atk: 61, def: 45 },
  { id: 134, name: '轰鸣大地·西可萝', star: 4, elements: '地', ab1: '大地烈波', ab2: '吸收', hp: 425, atk: 54, def: 55 }
]

// 记录用户伙伴的数据类型
interface userAiboType extends aiboType {
  aiboId: number,
  level?: number,
  exp?: number
}

// 用于卡池概率的控制
const star5 = [
  37, 38, 66, 72, 73, 77, 94, 99, 100, 102, 105, 106, 111, 113, 114, 115,
  118, 121, 130, 133
]
const star4 = [
  5, 26, 32, 33, 34, 35, 36, 54, 56, 62, 63, 65, 70, 71, 78, 79,
  82, 92, 97, 98, 103, 104, 108, 109, 110, 112, 117, 122, 129, 134
]
const star3 = [
  23, 24, 25, 27, 28, 29, 30, 31, 39, 41, 42, 45, 49, 57, 58, 59,
  60, 61, 64, 67, 76, 83, 89, 91, 95, 101, 107, 116, 119, 123, 125, 126,
  128, 132
]
const star2 = [
  6, 8, 10, 12, 13, 15, 17, 19, 40, 43, 46, 47, 48, 50, 51, 52,
  55, 68, 69, 74, 75, 80, 81, 84, 85, 86, 87, 88, 90, 93, 120, 126,
  127, 131
]
const star1 = [
  1, 2, 3, 4, 7, 9, 11, 14, 16, 18, 20, 21, 22, 44, 53, 96
]

// 请求数据
function getData (dataAddr: string, assignFunc: (result: any) => void) {
  // 抓取json数据
  fetch(dataAddr, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((response) => response.json())// 解析为Promise
    .then((result) => {
      assignFunc(result)// 赋值到组件内数据
      // console.log(result)
    })
    .catch((err) => {console.log(err)})
}

// 延时
function useInterval (callback: (...para:any) => void, delay: number) {
  const latestCallback = useRef(() => {})
  // 保存新回调
  useEffect(() => {
    latestCallback.current = callback
  })
  // 建立 interval
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => latestCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }
    return undefined
  }, [delay])
}

// 抽奖
function gacha () {
  let randomNum = Math.random()
  if (randomNum > 0.64421) { // (3+12*sqrt(2))/31
    return star1[Math.floor((Math.random() * star1.length))]
  } else if (randomNum > 0.39263) {// (15-2*sqrt(2))/31
    return star2[Math.floor((Math.random() * star2.length))]
  } else if (randomNum > 0.21474) {// (1+4*sqrt(2))/31
    return star3[Math.floor((Math.random() * star3.length))]
  } else if (randomNum > 0.08895) {// (7-3*sqrt(2))/31
    return star4[Math.floor((Math.random() * star4.length))]
  } else {
    return star5[Math.floor((Math.random() * star5.length))]
  }
}

// 绘制按钮组件
interface ButtonProps {
  buttonName: string,
  onClick: (paras: any) => any
}

function Button (props: ButtonProps) {
  return (
    <div className='buttonContain'>
      <div className='button' onClick={props.onClick}>{props.buttonName}</div>
    </div>
  )
}

// 绘制抽奖人物卡
interface AiboCardProps extends aiboType {
  onClick?: () => void
}

function AiboCard (props: AiboCardProps) {
  if (props.id === 0) {return null}
  let cardClass = ''
  switch (props.star) {
  case 1:
    cardClass = 'cardStar1'
    break
  case 2:
    cardClass = 'cardStar2'
    break
  case 3:
    cardClass = 'cardStar3'
    break
  case 4:
    cardClass = 'cardStar4'
    break
  case 5:
    cardClass = 'cardStar5'
    break
  default:
    cardClass = 'cardUnkown'
  }
  return (
    <div className={'cardBase ' + cardClass} onClick={props.onClick}>{props.name}</div>
  )

  /* if (props.onClick) {
    return (
      <div className={'cardBase ' + cardClass}>{props.name}</div>
    )
  } else {
    return (
      <div className={'cardBase ' + cardClass}>{props.name}</div>
    )
  } */
}

// 整个抽奖页面
interface GachaPageProps {
  userMoney: number,
  setUserMoney: (para: number) => void,
  setShowGachaPage: (para: boolean) => void,
  aiboStore: userAiboType[],
  setAiboStore: (para: userAiboType[]) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  aiboRecord: boolean[],
  setAiboRecord: (para: boolean[]) => void
}

function GachaPage (props: GachaPageProps) {
  // 将要抽奖的次数
  const [gachaTimes, setGachaTimes] = useState(0)
  // 额外抽奖的次数
  const [bonusTimes, setBonusTimes] = useState(0)
  // 存放抽奖结果
  const [gachaResult, setGachaResult] = useState([])
  // 控制显示提示框
  const [showHintBox, setShowHintBox] = useState(false)

  // 更改抽奖次数
  function changeGacha (num: number) {
    let nowTimes = gachaTimes + num
    if (nowTimes < 0) {nowTimes = 0}// 判断抽奖次数不足的情况
    if (nowTimes * 100 > props.userMoney) {
      nowTimes = Math.floor(props.userMoney / 100)
    }// 判断抽奖金额超过持有金额的情况
    setGachaTimes(nowTimes)
    setBonusTimes(Math.floor(nowTimes / 10))
  }

  // 随机抽奖
  function onGacha (num: number) {
    // 首先判断钱是否足够
    let restMoney = props.userMoney - 100 * num
    if (restMoney < 0) {
      setShowHintBox(true)
      return 0
    } else {
      // 先扣钱
      props.setUserMoney(restMoney)
      setGachaTimes(0)
      setBonusTimes(0)
      // 然后开始抽卡
      const gsArr: aiboType[] = []
      for (let i = 0; i < num; i++) {
        let gcTemp = gacha()// 随机得到一个id
        let gsTemp = aiboInfo.find((x) => x.id === gcTemp)// 在人物表中查找该id
        if (gsTemp === undefined) {gsTemp = { id: 0 }}// 如果发生错误，没有找到的处理
        gsArr.push(gsTemp)
      }
      // 抽完后先更新用户伙伴数据
      const ucArr: userAiboType[] = []
      const mrArr = props.aiboRecord
      for (let i = 0; i < gsArr.length; i++) {
        ucArr.push({ ...gsArr[i], aiboId: props.aiboNum + i + 1, level: 1, exp: 0 })
        // 顺带检测伙伴记录
        if (!mrArr[gsArr[i].id - 1]) {// 对于抽到的这张卡，如果在伙伴记录中没有，则置为有
          mrArr[gsArr[i].id - 1] = true
        }
      }
      props.setAiboStore([...props.aiboStore, ...ucArr])// 更新持有伙伴列表
      props.setAiboNum(props.aiboNum + gsArr.length)// 更新持有伙伴量
      props.setAiboRecord(mrArr)// 更新伙伴记录
      // 最后显示抽卡结果
      setGachaResult(gsArr)
    }
  }

  return (
    <div className='boxPageMask'>
      <div className='largeBoxBody'>
        {showHintBox && (
          <div className='component-hint'>
            <div className='hint-mask'></div>
            <div className='hint-box'>
              <div className='hint-content'>金币不足！</div>
              <div className='hint-close fa fa-close fa-3h' onClick={() => {
                setShowHintBox(false)
                setGachaTimes(0)
                setBonusTimes(0)
              }}></div>
            </div>
          </div>
        )}
        <Button buttonName='关闭抽奖页面' onClick={() => props.setShowGachaPage(false)}/>
        <div>金币：{props.userMoney}</div>
        <div>抽奖次数：{gachaTimes}{bonusTimes > 0 ? '+' + bonusTimes : null}</div>
        <div className='gachaTimesOpera'>
          <Button buttonName='减少十次' onClick={() => {changeGacha(-10)}}/>
          <Button buttonName='减少一次' onClick={() => {changeGacha(-1)}}/>
          <Button buttonName='增加一次' onClick={() => {changeGacha(1)}}/>
          <Button buttonName='增加十次' onClick={() => {changeGacha(10)}}/>
        </div>
        <Button buttonName='开始抽奖' onClick={() => {onGacha(gachaTimes)}}/>
        <div className='gachaResultList'>
          {gachaResult.map((val: aiboType, ind: number) => <AiboCard
            key={ind + '-' + val.id/* 这里考虑到diff的效率，用两个字段拼接作为key */}
            id={val.id} star={val.star} name={val.name} />)}
        </div>
      </div>
    </div>
  )
}

// 建立伙伴选择页面
interface AiboChoosePageProps {
  aiboStore: userAiboType[],
  setShowAiboChoosePage: (para: boolean) => void,
  nowChoosenAibo: number,
  aiboTeam: number[],
  setAiboTeam: (para: number[]) => void
}

function AiboChoosePage (props: AiboChoosePageProps) {
  return (
    <div className='boxPageMask'>
      <div className='largeBoxBody'>
        <Button buttonName='关闭选择页面' onClick={() => props.setShowAiboChoosePage(false)}/>
        <div className='HP-aiboList'>
          {props.aiboStore.map((val) => <AiboCard key={val.aiboId} onClick={() => {
            let tempAiboTeam = props.aiboTeam
            tempAiboTeam[props.nowChoosenAibo] = val.aiboId
            props.setAiboTeam(tempAiboTeam)
            props.setShowAiboChoosePage(false)
          }} id={val.id} star={val.star} name={val.name} />)}
        </div>
      </div>
    </div>
  )
}

// 建立成就页面
interface AchievePageProps {
  aiboRecord: boolean[]
}

function AchievePage (props: AchievePageProps) {
  return (
    <div className='pageArea'>
      <div className='AP-recordList'>
        {props.aiboRecord.map((val, ind) => val ? (
          <AiboCard key={ind} id={aiboInfo[ind].id} star={aiboInfo[ind].star} name={aiboInfo[ind].name} />
        ) : (
          <AiboCard key={ind} id={aiboInfo[ind].id} star={0} name={'未获得'} />
        ))/* 判断传入的伙伴记录中是否存在某个伙伴，存在则显示名字，反之不显示 */}
      </div>
    </div>
  )
}

// 建立房间页面
interface HomePageProps {
  aiboStore: userAiboType[],
  setAiboStore: (para: userAiboType[]) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  aiboTeam: number[],
  setAiboTeam: (para: userAiboType[]) => void,
  setShowAiboChoosePage: (para: boolean) => void,
  setNowChoosenAibo: (para: number) => void
}

function HomePage (props: HomePageProps) {
  const [chosenAiboInfo, setChosenAiboInfo] = useState(null)

  return (
    <div className='pageArea'>
      {/* 伙伴列表模块 */}
      <div style={{ flex: 2 }} className='HP-aiboList'>
        {props.aiboStore.map((val) => <AiboCard key={val.aiboId} onClick={() => {
          setChosenAiboInfo(val)
        }} id={val.id} star={val.star} name={val.name} />)}
      </div>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        {/* 伙伴详细信息模块 */}
        <div style={{ flex: 3 }} className='HP-aiboList'>
          <AiboInfoPage chosenAiboInfo={chosenAiboInfo} />
        </div>
        {/* 伙伴队伍模块 */}
        <div style={{ flex: 2 }} className='HP-aiboList'>
          <AiboTeamPage aiboStore={props.aiboStore} aiboTeam={props.aiboTeam} setShowAiboChoosePage={props.setShowAiboChoosePage} setNowChoosenAibo={props.setNowChoosenAibo}/>
        </div>
      </div>
    </div>
  )
}

// 伙伴信息页面
interface AiboInfoPageProps {
  chosenAiboInfo: userAiboType,
}

function AiboInfoPage (props: AiboInfoPageProps) {
  return (
    props.chosenAiboInfo && (<div>
      <div>名字：{props.chosenAiboInfo.name}</div>
      <div>等级：{props.chosenAiboInfo.level}</div>
      <div>经验：{props.chosenAiboInfo.exp}</div>
      <div>星级：{props.chosenAiboInfo.star}</div>
      <div>属性：{props.chosenAiboInfo.elements}</div>
      <div>能力1：{props.chosenAiboInfo.ab1 || '无'}</div>
      <div>能力2：{props.chosenAiboInfo.ab2 || '无'}</div>
      <div>生命：{props.chosenAiboInfo.hp}</div>
      <div>攻击：{props.chosenAiboInfo.atk}</div>
      <div>防御：{props.chosenAiboInfo.def}</div>
    </div>)
  )
}

// 伙伴队伍模块
interface AiboTeamPageProps {
  aiboStore: userAiboType[],
  aiboTeam: number[],
  setShowAiboChoosePage: (para: boolean) => void
  setNowChoosenAibo: (para: number) => void
}

function AiboTeamPage (props: AiboTeamPageProps) {
  return (
    <div>
      {props.aiboTeam.map((val, ind) => {
        let chara = props.aiboStore.find((x) => x.aiboId === val)
        return (
          <div key={ind} className='button' onClick={() => {
            props.setNowChoosenAibo(ind)
            props.setShowAiboChoosePage(true)
          }}>
            {'队员' + (ind + 1) + '：' + (chara?.name/* 链式判断 */ || '无')}
          </div>
        )
      })}
    </div>
  )
}

// 建立市场页面
interface MarketPageProps {
  setShowGachaPage: (para: boolean) => void,
}

function MarketPage (props: MarketPageProps) {
  return (
    <div className='pageArea'><Button buttonName='抽奖' onClick={() => {props.setShowGachaPage(true)}}/></div>
  )
}

function MapPage () {
  return (
    <div className='pageArea'>MapPage</div>
  )
}

function App () {

  /* 界面类的变量 */
  // 控制主题的变量
  // const [isDarkMode, setIsDarkMode] = useState(false)
  // 是否显示抽奖页面
  const [showGachaPage, setShowGachaPage] = useState(false)
  // 是否显示伙伴选择页面
  const [showAiboChoosePage, setShowAiboChoosePage] = useState(false)
  // 切换页面
  const [togglePage, setTogglePage] = useState([false, true, false, false])
  // 当前选择的队员栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信，应该可以用redux
  const [nowChoosenAibo, setNowChoosenAibo] = useState(0)

  /* 用户的个人数据 */
  // 首先从缓存中读出历史数据
  /* 不再添加变量后再用这个
  const [
    userMoneyHistory, aiboStoreHistory,
    aiboNumHistory, aiboRecordHistory
  ] = localStorage.getItem('initGame') === null ? [
    54321, [], 0, [...Array(aiboInfo.length)].map(() => false)
  ] : [
    JSON.parse(localStorage.getItem('userMoney') as string),
    JSON.parse(localStorage.getItem('aiboStore') as string),
    JSON.parse(localStorage.getItem('aiboNum') as string),
    JSON.parse(localStorage.getItem('aiboRecord') as string)
  ] */
  const userMoneyHistory = localStorage.getItem('userMoney') === null ? 54321 : JSON.parse(localStorage.getItem('userMoney') as string)
  const aiboStoreHistory = localStorage.getItem('aiboStore') === null ? [] : JSON.parse(localStorage.getItem('aiboStore') as string)
  const aiboNumHistory = localStorage.getItem('aiboNum') === null ? 0 : JSON.parse(localStorage.getItem('aiboNum') as string)
  const aiboRecordHistory = localStorage.getItem('aiboRecord') === null ? [...Array(aiboInfo.length)].map(() => false) : JSON.parse(localStorage.getItem('aiboRecord') as string)
  const aiboTeamHistory = localStorage.getItem('aiboTeam') === null ? [...Array(4)].map(() => null) : JSON.parse(localStorage.getItem('aiboTeam') as string)

  /* 然后写到变量中 */
  // 用户金币
  const [userMoney, setUserMoney] = useState(userMoneyHistory)
  // 用户的伙伴列表
  const [aiboStore, setAiboStore] = useState(aiboStoreHistory)
  // 用户召唤的伙伴量
  const [aiboNum, setAiboNum] = useState(aiboNumHistory)
  // 记录：伙伴收集情况
  const [aiboRecord, setAiboRecord] = useState(aiboRecordHistory)
  // 记录：伙伴队伍情况
  const [aiboTeam, setAiboTeam] = useState(aiboTeamHistory)
  // console.log([userMoney, aiboStore, aiboNum, aiboRecord])

  // 定时器，每隔几秒保存数据
  useInterval(() => {
    localStorage.setItem('userMoney', JSON.stringify(userMoney))
    localStorage.setItem('aiboStore', JSON.stringify(aiboStore))
    localStorage.setItem('aiboNum', JSON.stringify(aiboNum))
    localStorage.setItem('aiboRecord', JSON.stringify(aiboRecord))
    localStorage.setItem('aiboTeam', JSON.stringify(aiboTeam))
    localStorage.setItem('initGame', 'alreadyInit')
  }, 5000)

  return (
    <div className='App'>
      {/* 导航栏 */}
      <div className='navArea'>
        <Button buttonName='成就' onClick={() => {setTogglePage([true, false, false, false])}}/>
        <Button buttonName='房间' onClick={() => {setTogglePage([false, true, false, false])}}/>
        <Button buttonName='市场' onClick={() => {setTogglePage([false, false, true, false])}}/>
        <Button buttonName='地图' onClick={() => {setTogglePage([false, false, false, true])}}/>
      </div>
      {/* 用于弹出的页面 */}
      <div>
        {showGachaPage && (<GachaPage
          userMoney={userMoney}
          setUserMoney={setUserMoney}
          setShowGachaPage={setShowGachaPage}
          aiboStore={aiboStore}
          setAiboStore={setAiboStore}
          aiboNum={aiboNum}
          setAiboNum={setAiboNum}
          aiboRecord={aiboRecord}
          setAiboRecord={setAiboRecord}
        />)}
        {showAiboChoosePage && (<AiboChoosePage
          aiboStore={aiboStore}
          setShowAiboChoosePage={setShowAiboChoosePage}
          nowChoosenAibo={nowChoosenAibo}
          aiboTeam={aiboTeam}
          setAiboTeam={setAiboTeam}
        />)}
      </div>
      {/* 显示的页面主体 */}
      <div>
        {togglePage[0] && (<AchievePage
          aiboRecord={aiboRecord}
        />)}
        {togglePage[1] && (<HomePage
          aiboStore={aiboStore}
          setAiboStore={setAiboStore}
          aiboNum={aiboNum}
          setAiboNum={setAiboNum}
          aiboTeam={aiboTeam}
          setAiboTeam={setAiboTeam}
          setShowAiboChoosePage={setShowAiboChoosePage}
          setNowChoosenAibo={setNowChoosenAibo}
        />)}
        {togglePage[2] && (<MarketPage
          setShowGachaPage={setShowGachaPage}
        />)}
        {togglePage[3] && (<MapPage />)}
      </div>
    </div>
  )
}

export default App
