import React, { useState, useEffect, Suspense } from 'react'
import './App.css'
import './css/font-awesome.css'

// 人物数据
interface charaType {
  id: string,
  name?: string,
  star?: number,
  elements?: string,
  ab1?: string | null,
  ab2?: string | null,
  hp?: number,
  atk?: number,
  def?: number
}

const charaInfo: charaType[] = [
  { id: '001', name: '绿色史莱姆', star: 1, elements: '风', ab1: '分裂', ab2: null, hp: 335, atk: 28, def: 24 },
  { id: '002', name: '蓝色史莱姆', star: 1, elements: '水', ab1: '迸发', ab2: null, hp: 260, atk: 28, def: 20 },
  { id: '003', name: '红色史莱姆', star: 1, elements: '火', ab1: '弹射', ab2: null, hp: 200, atk: 32, def: 12 },
  { id: '004', name: '黄色史莱姆', star: 1, elements: '地', ab1: '分裂', ab2: null, hp: 324, atk: 24, def: 32 },
  { id: '005', name: '公主史莱姆', star: 4, elements: '火', ab1: '双生分裂', ab2: '自愈', hp: 447, atk: 44, def: 28 },
  { id: '006', name: '海藻杜吉芽', star: 2, elements: '水', ab1: '吸收', ab2: null, hp: 320, atk: 40, def: 36 },
  { id: '007', name: '水藻杜吉芽', star: 1, elements: '水', ab1: '自愈', ab2: null, hp: 260, atk: 32, def: 28 },
  { id: '008', name: '黄金史莱姆', star: 2, elements: '地', ab1: '分裂', ab2: null, hp: 417, atk: 36, def: 23 },
  { id: '009', name: '阳葵', star: 1, elements: '地', ab1: '喷射', ab2: null, hp: 180, atk: 32, def: 20 },
  { id: '010', name: '紫阳葵', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 240, atk: 40, def: 24 },
  { id: '011', name: '风仙炭玻玻', star: 1, elements: '风', ab1: '治疗', ab2: null, hp: 176, atk: 28, def: 20 },
  { id: '012', name: '水仙炭玻玻', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 236, atk: 36, def: 24 },
  { id: '013', name: '斯可可', star: 2, elements: '地', ab1: '横扫', ab2: null, hp: 332, atk: 40, def: 36 },
  { id: '014', name: '水猫呜拉喵', star: 1, elements: '水', ab1: '重击', ab2: null, hp: 272, atk: 28, def: 28 },
  { id: '015', name: '山猫呜拉喵', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 316, atk: 32, def: 44 },
  { id: '016', name: '地鼠芙洛波', star: 1, elements: '地', ab1: '弹射', ab2: null, hp: 252, atk: 32, def: 24 },
  { id: '017', name: '火山芙洛波', star: 2, elements: '火', ab1: '鼓舞', ab2: null, hp: 240, atk: 28, def: 28 },
  { id: '018', name: '风精NANO', star: 1, elements: '风', ab1: '喷射', ab2: null, hp: 192, atk: 28, def: 16 },
  { id: '019', name: '土精NANO', star: 2, elements: '地', ab1: '喷射', ab2: null, hp: 252, atk: 32, def: 20 },
  { id: '020', name: '地鸟喳喳布林', star: 1, elements: '地', ab1: '嘲讽', ab2: null, hp: 244, atk: 28, def: 32 },
  { id: '021', name: '水鸟喳喳布林', star: 1, elements: '水', ab1: '挑衅', ab2: null, hp: 291, atk: 30, def: 20 },
  { id: '022', name: '杜艮', star: 1, elements: '水', ab1: '混乱', ab2: null, hp: 172, atk: 39, def: 20 },
  { id: '023', name: 'MIO', star: 3, elements: '水', ab1: '猫爪连击', ab2: '迅闪', hp: 387, atk: 44, def: 38 },
  { id: '024', name: '露库希安', star: 3, elements: '风', ab1: '自然之力', ab2: '迸发', hp: 280, atk: 48, def: 32 },
  { id: '025', name: '义贼多米诺', star: 3, elements: '风', ab1: '战术切换', ab2: '迅闪', hp: 360, atk: 52, def: 36 },
  { id: '026', name: '狂犬多米诺', star: 4, elements: '风', ab1: '嗜血狂热', ab2: '吸收', hp: 428, atk: 64, def: 36 },
  { id: '027', name: '海歌姬·赛伦', star: 3, elements: '水', ab1: '祝福之歌', ab2: '自愈', hp: 296, atk: 44, def: 28 },
  { id: '028', name: '雷素·鸣', star: 3, elements: '火', ab1: '连锁闪电', ab2: '迅闪', hp: 348, atk: 52, def: 36 },
  { id: '029', name: '基雅·库罗', star: 3, elements: '风', ab1: '鲜血献祭', ab2: '弹射', hp: 248, atk: 52, def: 40 },
  { id: '030', name: '秋风希露芙', star: 3, elements: '风', ab1: '复苏之风', ab2: '喷射', hp: 276, atk: 40, def: 28 },
  { id: '031', name: '拉克斯·蕾妮娅', star: 3, elements: '水', ab1: '霜冻之刃', ab2: '硬化', hp: 509, atk: 31, def: 67 },
  { id: '032', name: '七尾·稻荷御澄', star: 4, elements: '火', ab1: '魅惑', ab2: '横扫', hp: 487, atk: 64, def: 29 },
  { id: '033', name: '真护·天茧', star: 4, elements: '火', ab1: '龙斩一瞬', ab2: '吸收', hp: 425, atk: 56, def: 51 },
  { id: '034', name: '莉安夕', star: 4, elements: '水', ab1: '生吞', ab2: '迅闪', hp: 392, atk: 84, def: 44 },
  { id: '035', name: '卡库拉拉兹巴', star: 4, elements: '水', ab1: '原始律动', ab2: '治疗', hp: 284, atk: 52, def: 36 },
  { id: '036', name: '阿芙莉芒', star: 4, elements: '地', ab1: '邪王真眼', ab2: '弹射', hp: 300, atk: 56, def: 40 },
  { id: '037', name: '神之御子薇薇', star: 5, elements: '风', ab1: '御子的加护', ab2: '重击', hp: 408, atk: 60, def: 48 },
  { id: '038', name: '幽冥的梅菲尔', star: 5, elements: '火', ab1: '死火的预兆', ab2: '弹射', hp: 344, atk: 52, def: 48 },
  { id: '039', name: '血口荆棘·辛普拉', star: 3, elements: '火', ab1: '荆棘之种', ab2: '鼓舞', hp: 292, atk: 40, def: 36 },
  { id: '040', name: '布萝', star: 2, elements: '地', ab1: '本能', ab2: null, hp: 308, atk: 48, def: 20 },
  { id: '041', name: '妖蛾子', star: 3, elements: '地', ab1: '飞蛾扑火', ab2: '守护', hp: 300, atk: 48, def: 36 },
  { id: '042', name: '高原火角·阿卡铃', star: 3, elements: '火', ab1: '烈焰冲刺', ab2: '横扫', hp: 514, atk: 64, def: 32 },
  { id: '043', name: '大根子', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 237, atk: 39, def: 25 },
  { id: '044', name: '柯萝', star: 1, elements: '地', ab1: '重击', ab2: null, hp: 276, atk: 32, def: 32 },
  { id: '045', name: '花藕子', star: 3, elements: '风', ab1: '莲蓬扫射', ab2: '迸发', hp: 252, atk: 40, def: 28 },
  { id: '046', name: '恰斯可', star: 2, elements: '地', ab1: '爆发', ab2: null, hp: 303, atk: 32, def: 56 },
  { id: '047', name: '熔岩乌丽卡', star: 2, elements: '火', ab1: '重击', ab2: null, hp: 258, atk: 44, def: 44 },
  { id: '048', name: '乌丽卡', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 258, atk: 44, def: 44 },
  { id: '049', name: '月兔蕾雅', star: 3, elements: '水', ab1: '月光狂乱', ab2: '重击', hp: 380, atk: 48, def: 44 },
  { id: '050', name: '格莉姆', star: 2, elements: '地', ab1: '硬化', ab2: null, hp: 316, atk: 36, def: 56 },
  { id: '051', name: '格雷姆', star: 2, elements: '水', ab1: '守护', ab2: null, hp: 412, atk: 36, def: 36 },
  { id: '052', name: '格拉姆', star: 2, elements: '火', ab1: '挑衅', ab2: null, hp: 269, atk: 56, def: 32 },
  { id: '053', name: '迷迷可', star: 1, elements: '地', ab1: '挑衅', ab2: null, hp: 304, atk: 24, def: 36 },
  { id: '054', name: '宝石迷迷可', star: 4, elements: '火', ab1: '撒币', ab2: '嘲讽', hp: 528, atk: 44, def: 48 },
  { id: '055', name: '多萝', star: 2, elements: '地', ab1: '群居', ab2: null, hp: 307, atk: 31, def: 28 },
  { id: '056', name: '死亡缠绕·萝丝娜', star: 4, elements: '地', ab1: '死亡缠绕', ab2: '毒雾', hp: 442, atk: 42, def: 42 },
  { id: '057', name: '必达信使·哈托莉', star: 3, elements: '风', ab1: '战场速递', ab2: '迅闪', hp: 410, atk: 40, def: 40 },
  { id: '058', name: '白浪激流·克洛琪', star: 3, elements: '水', ab1: '泥潭', ab2: '重击', hp: 380, atk: 52, def: 41 },
  { id: '059', name: '桑图艾尔', star: 3, elements: '地', ab1: '重击', ab2: '战术突刺', hp: 410, atk: 42, def: 42 },
  { id: '060', name: '冰川大亨·夏洛蒂', star: 3, elements: '水', ab1: '未知召唤', ab2: '混乱', hp: 407, atk: 43, def: 44 },
  { id: '061', name: '彩虹史莱姆', star: 3, elements: '风', ab1: '元素分裂', ab2: '自愈', hp: 467, atk: 45, def: 39 },
  { id: '062', name: '沼江夜鸣·鵺', star: 4, elements: '风', ab1: '震颤音波', ab2: '迅闪', hp: 422, atk: 50, def: 50 },
  { id: '063', name: '罪骨公主·斯卡莉安', star: 4, elements: '地', ab1: '灵魂痛击', ab2: '横扫', hp: 392, atk: 71, def: 44 },
  { id: '064', name: '野林之歌·木野子', star: 3, elements: '火', ab1: '最佳舞台', ab2: '混乱', hp: 301, atk: 46, def: 28 },
  { id: '065', name: '命运之女·拉米娅', star: 4, elements: '地', ab1: '水晶爆裂', ab2: '喷射', hp: 290, atk: 63, def: 30 },
  { id: '066', name: '幻翼天角·菲娜', star: 5, elements: '水', ab1: '生命绽放', ab2: '自愈', hp: 467, atk: 57, def: 51 },
  { id: '067', name: '蜂刺骑士·修瓦莉', star: 3, elements: '风', ab1: '团结冲锋', ab2: '突刺', hp: 331, atk: 47, def: 36 },
  { id: '068', name: '热布萝', star: 2, elements: '火', ab1: '本能', ab2: null, hp: 281, atk: 49, def: 24 },
  { id: '069', name: '草原乌丽卡', star: 2, elements: '风', ab1: '硬化', ab2: null, hp: 253, atk: 43, def: 45 },
  { id: '070', name: '艾露玛', star: 4, elements: '水', ab1: '源初之水', ab2: '突刺', hp: 405, atk: 49, def: 46 },
  { id: '071', name: '露科亚', star: 4, elements: '地', ab1: '生灵俱灭', ab2: '嘲讽', hp: 522, atk: 56, def: 47 },
  { id: '072', name: '康娜', star: 5, elements: '风', ab1: '裁决之雷', ab2: '迅闪', hp: 453, atk: 60, def: 45 },
  { id: '073', name: '托尔', star: 5, elements: '火', ab1: '巨龙吐息', ab2: '横扫', hp: 477, atk: 63, def: 53 },
  { id: '074', name: '卡布缇莫', star: 2, elements: '地', ab1: '重击', ab2: null, hp: 340, atk: 36, def: 42 },
  { id: '075', name: '白银迷迷可', star: 2, elements: '地', ab1: '挑衅', ab2: null, hp: 358, atk: 34, def: 43 },
  { id: '076', name: '旅人熊·莫利贝尔', star: 3, elements: '地', ab1: '熊抱', ab2: '迅闪', hp: 409, atk: 51, def: 46 },
  { id: '077', name: '幽夜之影·洛莉安', star: 5, elements: '地', ab1: '赤色印记', ab2: '喷射', hp: 362, atk: 63, def: 42 },
  { id: '078', name: '自由之翼·格里芬', star: 4, elements: '风', ab1: '皇家阵列', ab2: '迅闪', hp: 505, atk: 53, def: 44 },
  { id: '079', name: '山王卿·曼缇柯尔', star: 4, elements: '地', ab1: '剧毒蛰击', ab2: '重击', hp: 291, atk: 60, def: 34 },
  { id: '080', name: '小恶魔', star: 2, elements: '火', ab1: '混乱', ab2: null, hp: 315, atk: 42, def: 34 },
  { id: '081', name: '云元素', star: 2, elements: '水', ab1: '治疗', ab2: null, hp: 322, atk: 36, def: 22 },
  { id: '082', name: '赤月之牙·希瓦', star: 4, elements: '火', ab1: '回旋爪击', ab2: '影袭', hp: 423, atk: 60, def: 34 },
  { id: '083', name: '蜜桃子·沫沫', star: 3, elements: '水', ab1: '营养果实', ab2: '鼓舞', hp: 298, atk: 46, def: 28 },
  { id: '084', name: '纯白史莱姆', star: 2, elements: '水', ab1: '分裂', ab2: null, hp: 511, atk: 22, def: 16 },
  { id: '085', name: '土偶芙洛波', star: 2, elements: '风', ab1: '群居', ab2: null, hp: 275, atk: 38, def: 32 },
  { id: '086', name: '海兵虾', star: 2, elements: '火', ab1: '喷射', ab2: null, hp: 210, atk: 41, def: 25 },
  { id: '087', name: '铁背海龟', star: 2, elements: '水', ab1: '硬化', ab2: null, hp: 336, atk: 39, def: 39 },
  { id: '088', name: '树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38 },
  { id: '089', name: '夜之守·加尔戈萝', star: 3, elements: '地', ab1: '石像形态', ab2: '守护', hp: 398, atk: 42, def: 52 },
  { id: '090', name: '水手蟹', star: 2, elements: '水', ab1: '水泡', ab2: null, hp: 320, atk: 37, def: 35 },
  { id: '091', name: '海之光·佩拉姬娅', star: 3, elements: '水', ab1: '麻痹触手', ab2: '迅闪', hp: 393, atk: 51, def: 41 },
  { id: '092', name: '月光蝶·千秋', star: 4, elements: '风', ab1: '月光蝶', ab2: '守护', hp: 296, atk: 55, def: 36 },
  { id: '093', name: '布丁史莱姆', star: 2, elements: '火', ab1: '自愈', ab2: null, hp: 311, atk: 44, def: 30 },
  { id: '094', name: '潮汐之主·克拉肯', star: 5, elements: '水', ab1: '深海巨触', ab2: '拉扯', hp: 471, atk: 64, def: 63 },
  { id: '095', name: '火元素·焰', star: 3, elements: '火', ab1: '引燃', ab2: '爆发', hp: 328, atk: 53, def: 36 },
  { id: '096', name: '惑仔', star: 1, elements: '地', ab1: '孵化', ab2: null, hp: 170, atk: 28, def: 19 },
  { id: '097', name: '昆西', star: 4, elements: '水', ab1: '破坏死光', ab2: '挑衅', hp: 478, atk: 51, def: 54 },
  { id: '098', name: '长春', star: 4, elements: '风', ab1: '全弹发射', ab2: '喷射', hp: 325, atk: 57, def: 31 },
  { id: '099', name: '列克星敦', star: 5, elements: '火', ab1: '空中打击', ab2: '迸发', hp: 360, atk: 67, def: 45 },
  { id: '100', name: '提尔比茨', star: 5, elements: '地', ab1: '炮塔建造', ab2: '重击', hp: 440, atk: 64, def: 55 },
  { id: '101', name: '哈克', star: 3, elements: '水', ab1: '飞羽落刃', ab2: '鼓舞', hp: 342, atk: 49, def: 41 },
  { id: '102', name: '亚巴朵尔', star: 5, elements: '风', ab1: '第五号角', ab2: '毒液', hp: 289, atk: 69, def: 54 },
  { id: '103', name: '淘淘猪·牡丹', star: 4, elements: '风', ab1: '蓄力挥砍', ab2: '嘲讽', hp: 512, atk: 59, def: 41 },
  { id: '104', name: '苍月之羽·奥杰塔', star: 4, elements: '风', ab1: '压制连打', ab2: '本能', hp: 450, atk: 42, def: 61 },
  { id: '105', name: '永夜之灯·桑兰卓', star: 5, elements: '风', ab1: '三个奇迹', ab2: '黑暗打击', hp: 483, atk: 52, def: 53 },
  { id: '106', name: '龙眠卿·艾穆莉斯', star: 5, elements: '水', ab1: '极寒风暴', ab2: '水泡', hp: 382, atk: 72, def: 33 },
  { id: '107', name: '斩骨血刃·德莉尔', star: 3, elements: '地', ab1: '料理', ab2: '迅闪', hp: 360, atk: 49, def: 48 },
  { id: '108', name: '翠风执事·阿黛拉', star: 4, elements: '风', ab1: '风猫龙卷', ab2: '迅闪', hp: 400, atk: 66, def: 33 },
  { id: '109', name: '密林游侠·米提希尔', star: 4, elements: '风', ab1: '游击散射', ab2: '重击', hp: 272, atk: 45, def: 30 },
  { id: '110', name: '欲眼策师·萨莉丝', star: 4, elements: '火', ab1: '爱的供养', ab2: '自愈', hp: 442, atk: 68, def: 34 },
  { id: '111', name: '星云史莱姆', star: 5, elements: '地', ab1: '星云坠落', ab2: '陨石轰击', hp: 310, atk: 72, def: 24 },
  { id: '112', name: '浮游奇想·梅莉露', star: 4, elements: '风', ab1: '大变活人', ab2: '重击', hp: 311, atk: 35, def: 40 },
  { id: '113', name: '法夫纳', star: 5, elements: '地', ab1: '龙之杀意', ab2: '混乱', hp: 366, atk: 67, def: 55 },
  { id: '114', name: '伊露露', star: 5, elements: '火', ab1: '灼烧炎酸', ab2: '影袭', hp: 463, atk: 62, def: 34 },
  { id: '115', name: '时海航歌·萨莉亚', star: 5, elements: '火', ab1: '无畏船员', ab2: '幽灵大炮', hp: 444, atk: 66, def: 44 },
  { id: '116', name: '活化史莱姆', star: 3, elements: '火', ab1: '活性化', ab2: '重击', hp: 465, atk: 45, def: 39 },
  { id: '117', name: '鼠娘子·铃兰', star: 4, elements: '地', ab1: '江湖救急', ab2: '鞭挞', hp: 392, atk: 61, def: 33 },
  { id: '118', name: '卡露迪翁', star: 5, elements: '风', ab1: '万物复苏', ab2: '鼓舞', hp: 369, atk: 56, def: 39 },
  { id: '119', name: '百貌之星·莉欧娜', star: 3, elements: '水', ab1: '伪装', ab2: '影袭', hp: 355, atk: 50, def: 42 },
  { id: '120', name: '克洛洛', star: 2, elements: '水', ab1: '毒液', ab2: null, hp: 307, atk: 32, def: 25 },
  { id: '121', name: '轰牙咆哮·金格尔', star: 5, elements: '火', ab1: '王者之威', ab2: '爆发', hp: 463, atk: 71, def: 62 },
  { id: '122', name: '地灵神·修诺多古', star: 4, elements: '地', ab1: '土偶召唤', ab2: '喷射', hp: 350, atk: 52, def: 50 },
  { id: '123', name: '森林土偶', star: 3, elements: '地', ab1: '森林图腾', ab2: '分裂', hp: 441, atk: 42, def: 52 },
  { id: '125', name: '海洋土偶', star: 3, elements: '地', ab1: '驱散', ab2: '分裂', hp: 441, atk: 42, def: 52 },
  { id: '126', name: '尖啸隐者·曼德拉', star: 3, elements: '地', ab1: '尖叫', ab2: '嘲讽', hp: 440, atk: 44, def: 52 },
  { id: '126', name: '幽冥土偶', star: 2, elements: '地', ab1: '诅咒', ab2: null, hp: 441, atk: 42, def: 52 },
  { id: '127', name: '雨林树精', star: 2, elements: '地', ab1: '吸收', ab2: null, hp: 426, atk: 30, def: 38 },
  { id: '128', name: '冥土从兽·阿米特', star: 3, elements: '水', ab1: '紧咬', ab2: '迅闪', hp: 390, atk: 50, def: 40 },
  { id: '129', name: '冥土侍长·安普斯', star: 4, elements: '水', ab1: '灵魂称重', ab2: '影袭', hp: 425, atk: 59, def: 45 },
  { id: '130', name: '冥土之主·奥赛睿', star: 5, elements: '地', ab1: '落雷审判', ab2: '诅咒', hp: 320, atk: 64, def: 48 },
  { id: '131', name: '劳工哥布林', star: 2, elements: '地', ab1: '临时工事', ab2: null, hp: 340, atk: 36, def: 40 },
  { id: '132', name: '哥布林·毁灭者', star: 3, elements: '地', ab1: '击退连射', ab2: '弹射', hp: 250, atk: 48, def: 28 },
  { id: '133', name: '文明星火·奇美拉', star: 5, elements: '风', ab1: '深渊魔焰', ab2: '迸发', hp: 325, atk: 61, def: 45 },
  { id: '134', name: '轰鸣大地·西可萝', star: 4, elements: '地', ab1: '大地烈波', ab2: '吸收', hp: 425, atk: 54, def: 55 }
]

const star5 = [
  '037', '038', '066', '072', '073', '077', '094', '099', '100', '102', '105', '106', '111', '113', '114', '115',
  '118', '121', '130', '133'
]
const star4 = [
  '005', '026', '032', '033', '034', '035', '036', '054', '056', '062', '063', '065', '070', '071', '078', '079',
  '082', '092', '097', '098', '103', '104', '108', '109', '110', '112', '117', '122', '129', '134'
]
const star3 = [
  '023', '024', '025', '027', '028', '029', '030', '031', '039', '041', '042', '045', '049', '057', '058', '059',
  '060', '061', '064', '067', '076', '083', '089', '091', '095', '101', '107', '116', '119', '123', '125', '126',
  '128', '132'
]
const star2 = [
  '006', '008', '010', '012', '013', '015', '017', '019', '040', '043', '046', '047', '048', '050', '051', '052',
  '055', '068', '069', '074', '075', '080', '081', '084', '085', '086', '087', '088', '090', '093', '120', '126',
  '127', '131'
]
const star1 = [
  '001', '002', '003', '004', '007', '009', '011', '014', '016', '018', '020', '021', '022', '044', '053', '096'
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

// 绘制抽奖人物卡
interface GachaDrawProps extends charaType {
  ind: number
}

function GachaDraw (props: GachaDrawProps) {
  if (props.id === '0') {return null}
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
  }
  return (
    <div className={cardClass}>{props.ind + 1 + '.' + props.name}</div>
  )
}

// 整个抽奖页面
interface GachaPageProps {
  userMoney: number,
  setUserMoney: any
}

function GachaPage (props: GachaPageProps) {
  // 控制主题的变量
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [gachaTimes, setGachaTimes] = useState(1)
  const [bonusTimes, setBonusTimes] = useState(0)
  const [gachaResult, setGachaResult] = useState([])

  // 更改抽奖次数
  function changeGacha (num: number) {
    let nowTimes = gachaTimes + num
    if (nowTimes < 1) {nowTimes = 1}// 判断抽奖次数不足的情况
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
      alert('金币不足！')
      return 0
    } else {
      // 先扣钱
      props.setUserMoney(restMoney)
      const gsArr: charaType[] = []
      for (let i = 0; i < num; i++) {
        let gcTemp = gacha()// 随机得到一个id
        let gsTemp = charaInfo.find((x) => x.id === gcTemp)// 在人物表中查找该id
        if (gsTemp === undefined) {gsTemp = { id: '0' }}// 如果发生错误，没有找到的处理
        gsArr.push(gsTemp)
      }
      setGachaResult(gsArr)
    }
  }

  return (
    <div className="App">
      <div>金币：{props.userMoney}</div>
      <div>抽奖次数：{gachaTimes}{bonusTimes > 0 ? '+' + bonusTimes : null}</div>
      <div className='button' onClick={() => {changeGacha(1)}}>增加一次</div>
      <div className='button' onClick={() => {changeGacha(-1)}}>减少一次</div>
      <div className='button' onClick={() => {changeGacha(10)}}>增加十次</div>
      <div className='button' onClick={() => {changeGacha(-10)}}>减少十次</div>
      <div className='button' onClick={() => {onGacha(gachaTimes)}}>开始抽奖</div>
      {gachaResult.map((val: charaType, ind: number) => <GachaDraw
        key={ind + '-' + val.id/* 这里考虑到diff的效率，用两个字段拼接作为key */}
        id={val.id} star={val.star} name={val.name} ind={ind}
      />)}
    </div>
  )
}

function App () {
  const [userMoney, setUserMoney] = useState(5432)
  return (
    <GachaPage userMoney={userMoney} setUserMoney={setUserMoney}/>
  )
}

export default App
