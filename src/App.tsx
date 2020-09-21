import React, { useState, useEffect, useRef, Suspense } from 'react'
import './App.less'
import './css/font-awesome.css'
import { BottomNavigation, BottomNavigationAction, Button } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import StarRateIcon from '@material-ui/icons/StarRate'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import MapIcon from '@material-ui/icons/Map'
import Img from './1.jpg'

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
  def?: number,
  dimenstal?: number
}

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
    name: '威斯托大区',
    areas: [
      {
        index: 0,
        name: '卡利托斯市区',
        remark: '繁华的盆地城市',
        quests: [
          {
            index: 0,
            id: 1,
            name: '1-1-1: 金德利商场',
            remark: '街坊间很有口碑的商店，开在热闹的集市中心',
            HP: 600
          },
          {
            index: 1,
            id: 2,
            name: '1-1-2: 东门门口',
            remark: '出城的要道',
            HP: 600
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
            id: 3,
            name: '1-2-1: 风息牧场',
            remark: '市郊的大型牧场',
            HP: 600
          },
          {
            index: 1,
            id: 4,
            name: '1-2-2: 雅梵丽的白色风车',
            remark: '卡利托斯的著名地标，在城内也能看到',
            HP: 600
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
            id: 5,
            name: '1-3-1: 陶理斯兄弟旅馆',
            remark: '镇边路口附近的旅馆，价格实惠，客流量也很大',
            HP: 600
          },
          {
            index: 1,
            id: 6,
            name: '1-3-2: 鹰旋高台',
            remark: '山崖断裂形成的高台，能够望见整个辰辉镇',
            HP: 600
          }
        ]
      }
    ]
  },
  {
    index: 1,
    name: '布伦提亚大区',
    areas: [
      {
        index: 0,
        name: '海滨灯塔',
        remark: '给来航船只导航的灯塔，现在已经弃用了',
        quests: [
          {
            index: 0,
            id: 7,
            name: '2-1-1: 灯塔外围',
            remark: '灯塔外围',
            HP: 600
          },
          {
            index: 1,
            id: 8,
            name: '2-1-2: 灯塔一层',
            remark: '灯塔一层',
            HP: 600
          }
        ]
      }
    ]
  }
]

// 地图完成情况的初始记录，格式应该与上面的地图信息相同
const mapRecordInitEasy = [[[false, false], [false, false], [false, false]], [[false, false]]]

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

// 召唤
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
/* interface ButtonProps {
  buttonName: string,
  onClick: (paras: any) => any
}

function Button (props: ButtonProps) {
  return (
    <div className='buttonContain'>
      <div className='button' onClick={props.onClick}>{props.buttonName}</div>
    </div>
  )
} */

// 绘制召唤人物卡
interface AiboCardProps extends aiboType {
  onClick?: () => void
}

function AiboCard (props: AiboCardProps) {
  if (props.id === 0 || !props.star) {
    return <Button variant='contained' disabled className={'cardBase'} onClick={props.onClick}>{'未获得'}</Button>
  }
  // 根据输入星级选择该渲染的类型
  let cardClass = 'cardUnkown'
  switch (props.star) {
  case 1:
    cardClass = 'cardLevel1'
    break
  case 2:
    cardClass = 'cardLevel2'
    break
  case 3:
    cardClass = 'cardLevel3'
    break
  case 4:
    cardClass = 'cardLevel4'
    break
  case 5:
    cardClass = 'cardLevel5'
    break
  }
  // 判断并绘制需要几颗星星
  let stars = []
  for (let i = 0; i < props.star; i++) {
    stars.push(<div key={i} className='fa fa-star fa-2s'></div>)
  }
  return (
    <Button variant='outlined' className={'cardBase ' + cardClass} onClick={props.onClick}>
      {props.name}
      <div className='cardStars'>
        {stars}
      </div></Button>
  )
}

// 整个召唤页面
interface GachaPageProps {
  userDimenstal: number,
  setUserDimenstal: (para: number) => void,
  setShowGachaPage: (para: boolean) => void,
  aiboStore: userAiboType[],
  setAiboStore: (para: userAiboType[]) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  aiboRecord: boolean[],
  setAiboRecord: (para: boolean[]) => void
}

function GachaPage (props: GachaPageProps) {
  // 确定一次召唤的消耗量，之后应该改成全局的常量
  const gachaCost = 1000
  // 将要召唤的次数
  const [gachaTimes, setGachaTimes] = useState(0)
  // 额外召唤的次数
  const [bonusTimes, setBonusTimes] = useState(0)
  // 存放召唤结果
  const [gachaResult, setGachaResult] = useState([])
  // 控制显示提示框
  const [showHintBox, setShowHintBox] = useState(false)

  // 更改召唤次数
  function changeGacha (num: number) {
    let nowTimes = gachaTimes + num
    if (nowTimes < 0) {nowTimes = 0}// 判断召唤次数不足的情况
    if (nowTimes * gachaCost > props.userDimenstal) {
      nowTimes = Math.floor(props.userDimenstal / gachaCost)
    }// 判断召唤金额超过持有金额的情况
    setGachaTimes(nowTimes)
    setBonusTimes(Math.floor(nowTimes / 10))
  }

  // 随机召唤
  function onGacha (num: number) {
    // 首先判断钱是否足够
    let restDimenstal = props.userDimenstal - num * gachaCost
    if (restDimenstal < 0) {
      setShowHintBox(true)
      return 0
    } else {
      // 先扣钱
      props.setUserDimenstal(restDimenstal)
      setGachaTimes(0)
      setBonusTimes(0)
      // 然后开始抽卡
      const gsArr: aiboType[] = []
      for (let i = 0; i < num; i++) {
        let gcTemp = gacha()// 随机得到一个id
        let gsTemp = aiboInfo.find((x) => x.id === gcTemp)// 在人物表中查找该id
        if (gsTemp === undefined) {
          gsTemp = { id: 0, name: '', star: 0, elements: '', ab1: '', ab2: '', hp: 0, atk: 0, def: 0, dimenstal: 0 }
        }// 如果发生错误，没有找到的处理
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
              <div className='hint-content'>次元结晶不足！</div>
              <div className='hint-close fa fa-close fa-3h' onClick={() => {
                setShowHintBox(false)
                setGachaTimes(0)
                setBonusTimes(0)
              }}></div>
            </div>
          </div>
        )}
        <Button variant='outlined' onClick={() => props.setShowGachaPage(false)}>关闭召唤页面</Button>
        <div>{'召唤一次消耗' + gachaCost + '次元结晶，满十连赠送一次。'}</div>
        <div>召唤后剩余次元结晶：{props.userDimenstal - gachaTimes * gachaCost}</div>
        <div>召唤次数：{gachaTimes}{bonusTimes > 0 ? '+' + bonusTimes : null}</div>
        <div className='gachaTimesOpera'>
          <Button variant='outlined' onClick={() => {changeGacha(-10)}}>减少十次</Button>
          <Button variant='outlined' onClick={() => {changeGacha(-1)}}>减少一次</Button>
          <Button variant='outlined' onClick={() => {changeGacha(1)}}>增加一次</Button>
          <Button variant='outlined' onClick={() => {changeGacha(10)}}>增加十次</Button>
        </div>
        <Button variant='outlined' onClick={() => {onGacha(gachaTimes)}}>开始召唤</Button>
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
  const [showWarningPage, setShowWarningPage] = useState(false)

  // 确定要放进当前队伍人员栏位里的伙伴后执行操作并关闭本页面
  function setAiboTeamAndClosePage (getAiboId: number) {
    let tempAiboTeam = props.aiboTeam
    tempAiboTeam[props.nowChoosenAibo] = getAiboId
    props.setAiboTeam(tempAiboTeam)
    props.setShowAiboChoosePage(false)
  }

  return (
    <div className='boxPageMask'>
      {showWarningPage && (
        <div className='boxPageMask'>
          <div className='middleBoxBody'>
            <Button variant='outlined' onClick={() => setShowWarningPage(false)}>关闭警告</Button>
            {'队伍中已存在该伙伴'}
          </div>
        </div>)}
      <div className='largeBoxBody'>
        <Button variant='outlined' onClick={() => props.setShowAiboChoosePage(false)}>关闭选择页面</Button>
        <Button variant='outlined' onClick={() => {
          setAiboTeamAndClosePage(0)
        }}>清除该栏位的伙伴</Button>
        <div className='HP-aiboList'>
          {props.aiboStore.map((val) => <AiboCard key={val.aiboId} onClick={() => {
            // 选择了某张伙伴卡后，首先判断该卡是否已在队伍里面，是的话则弹出警告页面
            if (props.aiboTeam.find((x) => x === val.aiboId)) {
              setShowWarningPage(true)
            } else {
              setAiboTeamAndClosePage(val.aiboId)
            }
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
  setNowChoosenAibo: (para: number) => void,
  userDimenstal: number,
  setUserDimenstal: (para: number) => void
}

function HomePage (props: HomePageProps) {
  const [chosenAiboInfo, setChosenAiboInfo] = useState(null)

  return (
    <div className='pageArea'>
      {/* 伙伴列表模块 */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }} className='HP-border'>
        <div style={{ flex: 1 }} className='HP-head'>
          <div>{'拥有伙伴列表'}</div>
        </div>
        <div style={{ flex: 15 }} className='HP-aiboList'>
          {props.aiboStore.map((val) => <AiboCard key={val.aiboId} onClick={() => {
            setChosenAiboInfo(val)
          }} id={val.id} star={val.star} name={val.name} />)}
        </div>
      </div>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        {/* 伙伴详细信息模块 */}
        <div style={{ flex: 3 }} className='HP-aiboList HP-border'>
          {chosenAiboInfo /* 先判断是否选择了某个伙伴，否则仅显示提示 */
            ? <AiboInfoPage chosenAiboInfo={chosenAiboInfo} deleteAibo={() => {
              // 惜别当前选定的元素
              let tempAiboStore = props.aiboStore.filter((x) => x.aiboId !== chosenAiboInfo.aiboId)
              props.setAiboStore(tempAiboStore)
              // 增加当前的次元水晶
              props.setUserDimenstal(props.userDimenstal + chosenAiboInfo.dimenstal)
              // 关闭当前信息页面
              setChosenAiboInfo(null)
            }} />
            : <div>{'点击左侧伙伴显示详细信息'}</div>
          }
        </div>
        {/* 伙伴队伍模块 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }} className='HP-border'>
          <div style={{ flex: 1 }} className='HP-head'>
            <div>{'队伍列表'}</div>
          </div>
          <div style={{ flex: 7 }} className='HP-aiboList'>
            <AiboTeamPage aiboStore={props.aiboStore} aiboTeam={props.aiboTeam}
              setShowAiboChoosePage={props.setShowAiboChoosePage} setNowChoosenAibo={props.setNowChoosenAibo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// 伙伴信息页面
interface AiboInfoPageProps {
  chosenAiboInfo: userAiboType,
  deleteAibo: () => void
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
      <Button variant='outlined' onClick={props.deleteAibo}>{'惜别当前伙伴：返还' + props.chosenAiboInfo.dimenstal + '次元结晶'}</Button>
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
          <Button variant='outlined' key={ind} onClick={() => {
            props.setNowChoosenAibo(ind)
            props.setShowAiboChoosePage(true)
          }}>{'队员' + (ind + 1) + '：' + (chara?.name/* 链式判断 */ || '无')}</Button>
        )
      })}
    </div>
  )
}

// 建立城镇页面
interface MarketPageProps {
  setShowGachaPage: (para: boolean) => void,
}

function MarketPage (props: MarketPageProps) {
  return (
    <div className='pageArea'><Button variant='outlined' className='marginAuto' onClick={() => {props.setShowGachaPage(true)}}>召唤</Button></div>
  )
}

// 进度条组件
function LinearProgressWithLabel (props: LinearProgressProps & { value: number }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

function LinearWithValueLabel () {
  const useStyles = makeStyles({
    root: {
      width: '80%'
    }
  })

  const classes = useStyles()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress: number) => (prevProgress < 100 ? prevProgress + 10 : (function () {
        // qes:执行两遍？
        console.log('finsh')
        clearInterval(timer)
        return 100
      }())))
    }, 300)
    // 正常情况不会在这里return
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  )
}

// 建立地图页面
interface MapPageProps {
  nowArea: number,
  setNowArea: (para: number) => void,
  mapRecordEasy: boolean[][][],
  setMapRecordEasy: (para: boolean[][][]) => void,
  clearedQuest: number,
  setClearedQuest: (para: number) => void
}

function MapPage (props: MapPageProps) {
  function battle () {

  }

  return (
    <div className='pageArea'>
      {/* 地区列表模块 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className='HP-border'>
        <div style={{ flex: 1 }} className='HP-head'>
          <div>{'地区列表'}</div>
        </div>
        <div style={{ flex: 15 }} className='HP-aiboList'>
          {mapInfo[0].areas.map((val) => (
            val.quests[0].id/* 这个值即为当前地区中第一个关卡的id */ > props.clearedQuest/* 判断其是否大于用户已完成的进度 */ ? null : (
              <div key={val.index} className='areaDiv' onClick={() => {props.setNowArea(val.index)}}>{val.name}</div>
            )
          ))}
        </div>
      </div>
      {/* 地区关卡模块 */}
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        {mapInfo[0].areas[props.nowArea].quests.map((val) => (
          val.id/* 这个值即为当前关卡的id */ > props.clearedQuest/* 判断其是否大于用户已完成的进度 */ ? null : (
            <div key={val.index} className='areaDiv' onClick={() => {}}>{val.name}
              <LinearWithValueLabel />
            </div>
          )
        ))}
      </div>
    </div>
  )
}

// 建立底部导航栏
interface NavigationProps {
  setTogglePage: (para: boolean[]) => void
}

function Navigation (props: NavigationProps) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      border: 'solid 1px black',
      bottom: 0
    }
  })
  const classes = useStyles()
  const [value, setValue] = React.useState('recents')

  const handleChange = (event: any, newValue: any) => {
    switch (newValue) {
    case 'achi':
      props.setTogglePage([true, false, false, false])
      break
    case 'room':
      props.setTogglePage([false, true, false, false])
      break
    case 'town':
      props.setTogglePage([false, false, true, false])
      break
    case 'maps':
      props.setTogglePage([false, false, false, true])
    }
    setValue(newValue)
  }

  return (
    <BottomNavigation value={value} showLabels onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label='成就' value='achi' icon={<CollectionsBookmarkIcon />} />
      <BottomNavigationAction label='房间' value='room' icon={<HomeIcon />} />
      <BottomNavigationAction label='城镇' value='town' icon={<LocationCityIcon />} />
      <BottomNavigationAction label='地图' value='maps' icon={<MapIcon />} />
    </BottomNavigation>
  )
}

function App () {
  // 首先从缓存中读出历史数据，如果没有缓存，则使用初始值
  /* 不再添加变量后再用这个
  const [
    userDimenstalHistory, aiboStoreHistory,
    aiboNumHistory, aiboRecordHistory
  ] = localStorage.getItem('initGame') === null ? [
    54321, [], 0, [...Array(aiboInfo.length)].map(() => false)
  ] : [
    JSON.parse(localStorage.getItem('userDimenstal') as string),
    JSON.parse(localStorage.getItem('aiboStore') as string),
    JSON.parse(localStorage.getItem('aiboNum') as string),
    JSON.parse(localStorage.getItem('aiboRecord') as string)
  ] */
  const userDimenstalHistory = localStorage.getItem('userDimenstal') === null ? 50000 : JSON.parse(localStorage.getItem('userDimenstal') as string)
  const aiboStoreHistory = localStorage.getItem('aiboStore') === null ? [] : JSON.parse(localStorage.getItem('aiboStore') as string)
  const aiboNumHistory = localStorage.getItem('aiboNum') === null ? 0 : JSON.parse(localStorage.getItem('aiboNum') as string)
  const aiboRecordHistory = localStorage.getItem('aiboRecord') === null ? [...Array(aiboInfo.length)].map(() => false) : JSON.parse(localStorage.getItem('aiboRecord') as string)
  const aiboTeamHistory = localStorage.getItem('aiboTeam') === null ? [...Array(4)].map(() => 0) : JSON.parse(localStorage.getItem('aiboTeam') as string)
  const togglePageHistory = localStorage.getItem('togglePage') === null ? [false, true, false, false] : JSON.parse(localStorage.getItem('togglePage') as string)
  const nowAreaHistory = localStorage.getItem('nowArea') === null ? 0 : JSON.parse(localStorage.getItem('nowArea') as string)
  const mapRecordHistory = localStorage.getItem('mapRecordEasy') === null ? mapRecordInitEasy : JSON.parse(localStorage.getItem('mapRecordEasy') as string)
  const clearedQuestHistory = localStorage.getItem('clearedQuest') === null ? 1 : JSON.parse(localStorage.getItem('clearedQuest') as string)
  // const areaStateHistory = localStorage.getItem('areaState') === null ? [...Array(mapInfo.length)].map(() => false) : JSON.parse(localStorage.getItem('areaState') as string)
  // const questStateHistory = localStorage.getItem('questState') === null ? [...Array(4)].map(() => 0) : JSON.parse(localStorage.getItem('questState') as string)

  /* 然后写到变量中 */
  /* 界面类的变量 */
  // 控制主题的变量
  // const [isDarkMode, setIsDarkMode] = useState(false)
  // 是否显示召唤页面
  const [showGachaPage, setShowGachaPage] = useState(false)
  // 是否显示伙伴选择页面
  const [showAiboChoosePage, setShowAiboChoosePage] = useState(false)
  // 是否显示惜别伙伴页面
  // const [showAiboDeletePage, setShowAiboDeletePage] = useState(false)
  // 切换页面
  const [togglePage, setTogglePage] = useState(togglePageHistory)
  // 当前选择的队员栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信，应该可以用redux
  const [nowChoosenAibo, setNowChoosenAibo] = useState(0)
  // 当前显示的地区
  const [nowArea, setNowArea] = useState(nowAreaHistory)
  // 简单难度下地图的完成情况
  const [mapRecordEasy, setMapRecordEasy] = useState(mapRecordHistory)
  // 当前玩家正在打第几关，也就是说页面需要渲染到第几关，之后的关卡不再渲染
  const [clearedQuest, setClearedQuest] = useState(clearedQuestHistory)

  /* 用户的个人数据 */
  // 用户的次元结晶
  const [userDimenstal, setUserDimenstal] = useState(userDimenstalHistory)
  // 用户的伙伴列表
  const [aiboStore, setAiboStore] = useState(aiboStoreHistory)
  // 用户召唤的伙伴量，用于给每个伙伴一个不重复的id
  const [aiboNum, setAiboNum] = useState(aiboNumHistory)
  // 记录：伙伴收集情况
  const [aiboRecord, setAiboRecord] = useState(aiboRecordHistory)
  // 记录：伙伴队伍情况
  const [aiboTeam, setAiboTeam] = useState(aiboTeamHistory)
  // console.log([userDimenstal, aiboStore, aiboNum, aiboRecord])

  // 定时器，每隔几秒保存数据
  useInterval(() => {
    localStorage.setItem('userDimenstal', JSON.stringify(userDimenstal))
    localStorage.setItem('aiboStore', JSON.stringify(aiboStore))
    localStorage.setItem('aiboNum', JSON.stringify(aiboNum))
    localStorage.setItem('aiboRecord', JSON.stringify(aiboRecord))
    localStorage.setItem('aiboTeam', JSON.stringify(aiboTeam))
    localStorage.setItem('togglePage', JSON.stringify(togglePage))
    localStorage.setItem('nowArea', JSON.stringify(nowArea))
    localStorage.setItem('mapRecordEasy', JSON.stringify(mapRecordEasy))
    localStorage.setItem('clearedQuest', JSON.stringify(clearedQuest))
    localStorage.setItem('initGame', 'alreadyInit')
  }, 5000)

  return (
    <div className='App'>
      {/* 个人信息栏 */}
      <div className='infoArea'>
        {'当前拥有的次元结晶：' + userDimenstal}
      </div>
      {/* 用于弹出的页面 */}
      <div>
        {/* 召唤页面 */}
        {showGachaPage && (<GachaPage
          userDimenstal={userDimenstal}
          setUserDimenstal={setUserDimenstal}
          setShowGachaPage={setShowGachaPage}
          aiboStore={aiboStore}
          setAiboStore={setAiboStore}
          aiboNum={aiboNum}
          setAiboNum={setAiboNum}
          aiboRecord={aiboRecord}
          setAiboRecord={setAiboRecord}
        />)}
        {/* 选择伙伴页面 */}
        {showAiboChoosePage && (<AiboChoosePage
          aiboStore={aiboStore}
          setShowAiboChoosePage={setShowAiboChoosePage}
          nowChoosenAibo={nowChoosenAibo}
          aiboTeam={aiboTeam}
          setAiboTeam={setAiboTeam}
        />)}
        {/* 惜别伙伴页面 */}
        {/* {showAiboDeletePage && (<AiboDeletePage
          aiboStore={aiboStore}
          setShowAiboChoosePage={setShowAiboChoosePage}
          nowChoosenAibo={nowChoosenAibo}
          aiboTeam={aiboTeam}
          setAiboTeam={setAiboTeam}
        />)} */}
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
          userDimenstal={userDimenstal}
          setUserDimenstal={setUserDimenstal}
        />)}
        {togglePage[2] && (<MarketPage
          setShowGachaPage={setShowGachaPage}
        />)}
        {togglePage[3] && (<MapPage
          nowArea={nowArea}
          setNowArea={setNowArea}
          mapRecordEasy={mapRecordEasy}
          setMapRecordEasy={setMapRecordEasy}
          clearedQuest={clearedQuest}
          setClearedQuest={setClearedQuest}
        />)}
      </div>
      {/* 导航栏 */}
      <div className='navArea'>
        <Navigation setTogglePage={setTogglePage} />
      </div>
    </div>
  )
}

export default App
