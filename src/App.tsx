import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  setText,
  toggleText
} from './actions'
import './App.less'
import './css/font-awesome.css'
import { aiboInfo, mapInfo, mapRecordInitEasy, questProgressInit } from './staticData'
import {
  Avatar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Checkbox,
  GridList,
  GridListTile,
  GridListTileBar,
  Grow,
  IconButton,
  LinearProgress,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { LinearProgressProps } from '@material-ui/core/LinearProgress'
import {
  Info as InfoIcon,
  StarRate as StarRateIcon,
  CollectionsBookmark as CollectionsBookmarkIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Map as MapIcon
} from '@material-ui/icons'
import Img from './1.jpg'
import { prependOnceListener } from 'process'

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

// 记录用户伙伴的数据类型
interface userAiboType extends aiboType {
  aiboId: number,
  level?: number,
  exp?: number
}

// 每个关卡的数据类型
interface questType {
  index: number,
  name: string,
  remark: string,
  id: number,
  HP: number,
  gold: number
}

// 用来给给定字段排序
// enum sortableAttr {id, star, hp, atk, def, dimenstal, aiboId, level, exp}

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
const getData = (dataAddr: string, assignFunc: (result: any) => void) => {
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

// 延时，定时器
const useInterval = (callback: (...para: any) => void, delay: number) => {
  const latestCallback = useRef()
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

// 处理一次召唤，设置概率
const gacha = () => {
  let randomNum = Math.random()
  if (randomNum > 15 / 31) { // (3+12*sqrt(2))/31
    return star1[Math.floor((Math.random() * star1.length))]
  } else if (randomNum > 7 / 31) {// (15-2*sqrt(2))/31
    return star2[Math.floor((Math.random() * star2.length))]
  } else if (randomNum > 3 / 31) {// (1+4*sqrt(2))/31
    return star3[Math.floor((Math.random() * star3.length))]
  } else if (randomNum > 1 / 31) {// (7-3*sqrt(2))/31
    return star4[Math.floor((Math.random() * star4.length))]
  } else {
    return star5[Math.floor((Math.random() * star5.length))]
  }
}

// 绘制召唤人物卡
interface AiboCardProps extends aiboType {
  onClick?: () => void
}

const AiboCard = (props: AiboCardProps) => {
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
      <div className='cardName'>{props.name}</div>
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

const GachaPage = (props: GachaPageProps) => {
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
  const changeGacha = (num: number) => {
    let nowTimes = gachaTimes + num
    if (nowTimes < 0) {nowTimes = 0}// 判断召唤次数不足的情况
    if (nowTimes * gachaCost > props.userDimenstal) {
      nowTimes = Math.floor(props.userDimenstal / gachaCost)
    }// 判断召唤金额超过持有金额的情况
    setGachaTimes(nowTimes)
    setBonusTimes(Math.floor(nowTimes / 10))
  }

  // 随机召唤
  const onGacha = (num: number) => {
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
    <Paper elevation={10} className='largeBoxBody'>
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
    </Paper>
  )
}

// 建立伙伴选择页面
interface AiboChoosePageProps {
  aiboStore: userAiboType[],
  setShowAiboChoosePage: (para: boolean) => void,
  nowChoosenTeam: number,
  nowChoosenAibo: number,
  aiboTeam: number[][],
  setAiboTeam: (para: number[][]) => void
}

const AiboChoosePage = (props: AiboChoosePageProps) => {
  const [showWarningPage, setShowWarningPage] = useState(false)

  // 确定要放进当前队伍人员栏位里的伙伴后执行操作并关闭本页面
  const setAiboTeamAndClosePage = (getAiboId: number) => {
    let tempAiboTeam = props.aiboTeam
    tempAiboTeam[props.nowChoosenTeam][props.nowChoosenAibo] = getAiboId
    props.setAiboTeam(tempAiboTeam)
    props.setShowAiboChoosePage(false)
  }

  return (
    <>
      {showWarningPage && (
        <div className='boxPageMask'>
          <div className='middleBoxBody'>
            <Button variant='outlined' onClick={() => setShowWarningPage(false)}>关闭警告</Button>
            {'队伍中已存在该伙伴'}
          </div>
        </div>
      )}
      <Paper elevation={10} className='largeBoxBody'>
        <Button variant='outlined' onClick={() => props.setShowAiboChoosePage(false)}>关闭选择页面</Button>
        <Button variant='outlined' onClick={() => {
          setAiboTeamAndClosePage(0)
        }}>清除该栏位的伙伴</Button>
        <div className='flexStart wrapScroll'>
          {props.aiboStore.map((val) => <AiboCard key={val.aiboId} onClick={() => {
          // 选择了某张伙伴卡后，首先判断该卡是否已在队伍里面，是的话则弹出警告页面
            if (props.aiboTeam[props.nowChoosenTeam].find((x) => x === val.aiboId)) {
              setShowWarningPage(true)
            } else {
              setAiboTeamAndClosePage(val.aiboId)
            }
          }} id={val.id} star={val.star} name={val.name} />)}
        </div>
      </Paper>
    </>
  )
}

// 建立成就页面
interface AchievePageProps {
  aiboRecord: boolean[]
}

const AchievePage = (props: AchievePageProps) => (
  <div className='pageArea flexWrap'>
    {props.aiboRecord.map((val, ind) => val ? (
      <AiboCard key={ind} id={aiboInfo[ind].id} star={aiboInfo[ind].star} name={aiboInfo[ind].name} />
    ) : (
      <AiboCard key={ind} id={aiboInfo[ind].id} star={0} name={'未获得'} />
    ))/* 判断传入的伙伴记录中是否存在某个伙伴，存在则显示名字，反之不显示 */}
  </div>
)

// 建立房间页面
interface HomePageProps extends AiboTeamPageProps {
  aiboStore: userAiboType[],
  setAiboStore: (para: userAiboType[]) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  userDimenstal: number,
  setUserDimenstal: (para: number) => void
}

const HomePage = (props: HomePageProps) => {
  // 当前选择的伙伴，用于伙伴详细信息模块
  const [chosenAiboInfo, setChosenAiboInfo] = useState(null)
  // 新建一个map，用来存放每个伙伴是否被选中的状态
  const [selectedList, setSelectedList] = useState(new Set())
  // 用来显示多选框，以及操作栏
  const [showCheckbox, setShowCheckbox] = useState(false)
  // 用来显示送别选择的伙伴后获得多少次元水晶
  const [howManyDimenstal, setHowManyDimenstal] = useState(0)

  return (
    <div className='pageArea flexRow'>
      {/* 伙伴列表模块 */}
      <div className='flex-1 flexCol height100 containBorder'>
        <div className='flex-1 flexCenter borderBottom'>
          {'拥有伙伴列表'}
          <Button variant='contained' onClick={() => {
            // 点击显示或隐藏多选框
            setShowCheckbox(!showCheckbox)
            // 重置“送别选择的伙伴后获得的次元水晶”
            setHowManyDimenstal(0)
          }}>编辑</Button>
        </div>
        {/* 显示操作栏 */}
        {showCheckbox && (<div className='flex-1 flexCenter borderBottom'>
          <Button variant='contained' onClick={() => {
          // 惜别当前选定的伙伴
            props.setAiboStore(props.aiboStore.filter((x) => !selectedList.has(x.aiboId)))
            // 增加当前的次元水晶
            props.setUserDimenstal(props.userDimenstal + howManyDimenstal)
            // 重置“送别选择的伙伴后获得的次元水晶”
            setHowManyDimenstal(0)
            // 重置多选框
            setSelectedList(new Set())
          }}>{`送别所选伙伴，返还${howManyDimenstal}次元结晶`}</Button>
          <Button variant='contained' onClick={() => {
            let selectedListTemp = selectedList
            let howManyDimenstalTemp = howManyDimenstal
            props.aiboStore.forEach((val) => {
              if (val.star === 1 && !selectedListTemp.has(val.aiboId)) {
                selectedListTemp.add(val.aiboId)
                howManyDimenstalTemp = howManyDimenstalTemp + val.dimenstal
              }
            })
            setSelectedList(selectedListTemp)
            setHowManyDimenstal(howManyDimenstalTemp)
          }}>选择所有一星同伴</Button>
          <Button variant='contained' onClick={() => {
            let selectedListTemp = selectedList
            let howManyDimenstalTemp = howManyDimenstal
            props.aiboStore.forEach((val) => {
              if (val.star === 2 && !selectedListTemp.has(val.aiboId)) {
                selectedListTemp.add(val.aiboId)
                howManyDimenstalTemp = howManyDimenstalTemp + val.dimenstal
              }
            })
            setSelectedList(selectedListTemp)
            setHowManyDimenstal(howManyDimenstalTemp)
          }}>选择所有两星同伴</Button>
          <SortButton
            buttonName='按星级排序'
            sortAttr='star'
            aiboStore={props.aiboStore}
            setAiboStore={props.setAiboStore}
          />
        </div>)}
        <div className='flex-15 flexStart wrapScroll'>
          {props.aiboStore.map((val, ind) =>
            <div key={val.aiboId}>
              {/* 给每个伙伴建立多选框 */showCheckbox && (
                <Checkbox
                  checked={selectedList.has(val.aiboId)}
                  onChange={() => {
                    let selectedListTemp = selectedList
                    if (selectedListTemp.has(val.aiboId)) {
                      selectedListTemp.delete(val.aiboId)
                      val.dimenstal && setHowManyDimenstal(howManyDimenstal - val.dimenstal)
                    } else {
                      selectedListTemp.add(val.aiboId)
                      val.dimenstal && setHowManyDimenstal(howManyDimenstal + val.dimenstal)
                    }
                    setSelectedList(selectedListTemp)

                    /* setHowManyDimenstal(
                      props.aiboStore.reduce((allDS, nowAibo) => {
                        if (nowAibo.dimenstal && selectedList.has(nowAibo.aiboId)) {
                          return allDS + nowAibo.dimenstal
                        } else {
                          return allDS
                        }
                      }, 0)
                    ) */
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )}
              <AiboCard onClick={() => {
                setChosenAiboInfo(val)
              }} id={val.id} star={val.star} name={val.name} />
            </div>)}
        </div>
      </div>
      <div className='flex-1 flexCol height100'>
        {/* 伙伴详细信息模块 */}
        <div className='flex-3 flexStart wrapScroll containBorder'>
          {chosenAiboInfo /* 先判断是否选择了某个伙伴，否则仅显示提示 */
            ? <AiboInfoPage chosenAiboInfo={chosenAiboInfo} deleteAibo={() => {
              // 惜别当前选定的伙伴
              props.setAiboStore(props.aiboStore.filter((x) => x.aiboId !== chosenAiboInfo.aiboId))
              // 增加当前的次元水晶
              props.setUserDimenstal(props.userDimenstal + chosenAiboInfo.dimenstal)
              // 关闭当前信息页面
              setChosenAiboInfo(null)
            }} />
            : <div>{'点击左侧伙伴显示详细信息'}</div>
          }
        </div>
        {/* 伙伴队伍模块 */}
        <div className='flex-2 width100 wrapScroll'>
          <AiboTeamPage
            aiboStore={props.aiboStore}
            aiboTeam={props.aiboTeam}
            nowChoosenTeam={props.nowChoosenTeam}
            setShowAiboChoosePage={props.setShowAiboChoosePage}
            setNowChoosenAibo={props.setNowChoosenAibo}
            setNowChoosenTeam={props.setNowChoosenTeam}
          />
        </div>
      </div>
    </div>
  )
}

// 排序按钮
interface SortButtonProps {
  buttonName: string,
  sortAttr: string,
  aiboStore: userAiboType[],
  setAiboStore: (para: userAiboType[]) => void
}

const SortButton = (props: SortButtonProps) => {
  const [isReverse, setIsReverse] = useState(false)

  return (
    <Button variant='contained' onClick={() => {
      let aiboStoreTemp = props.aiboStore
      props.sortAttr === 'star' && (() => {
        console.log(isReverse)
        isReverse
          ? aiboStoreTemp.sort((a, b) => (a.star && b.star) ? (b.star - a.star) : 0)
          : aiboStoreTemp.sort((a, b) => (a.star && b.star) ? (a.star - b.star) : 0)
      })()
      console.log(aiboStoreTemp[0])
      setIsReverse(!isReverse)
      props.setAiboStore(aiboStoreTemp)
    }}>{props.buttonName}</Button>
  )
}

// 伙伴信息页面
interface AiboInfoPageProps {
  chosenAiboInfo: userAiboType,
  deleteAibo: () => void
}

const AiboInfoPage = (props: AiboInfoPageProps) => (
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

// 伙伴队伍模块（用于房间和地图两个页面）
interface AiboTeamPageProps {
  aiboStore: userAiboType[],
  aiboTeam: number[][],
  nowChoosenTeam: number,
  setShowAiboChoosePage: (para: boolean) => void
  setNowChoosenAibo: (para: number) => void,
  setNowChoosenTeam: (para: number) => void
}

const AiboTeamPage = (props: AiboTeamPageProps) => (
  <div className='flexCol width100 height100 containBorder'>
    <div className='flex-1 flexCenter borderBottom'>{'队伍列表'}</div>
    <div className='flex-7 flexStart wrapScroll'>
      {props.aiboTeam.map((teamVal, teamInd) => <div key={teamInd} className='teamBorder'>
        {`队伍：${teamInd + 1}${props.nowChoosenTeam === teamInd ? '（已选中）' : ''}：`}
        {teamVal.map((aiboVal, aiboInd) => {
          let chara = props.aiboStore.find((x) => x.aiboId === aiboVal)
          return (
            <Button variant='outlined' key={aiboInd} onClick={() => {
              props.setNowChoosenTeam(teamInd)
              props.setNowChoosenAibo(aiboInd)
              props.setShowAiboChoosePage(true)
            }}>{'队员' + (aiboInd + 1) + '：' + (chara?.name/* 链式判断 */ || '无')}</Button>
          )
        })}
      </div>)}
    </div>
  </div>
)

// 建立城镇页面
interface MarketPageProps {
  setShowGachaPage: (para: boolean) => void,
}

const MarketPage = (props: MarketPageProps) => (
  <div className='pageArea'>
    <Button variant='outlined' className='marginAuto' onClick={() => {props.setShowGachaPage(true)}}>召唤</Button>
  </div>
)

// 建立地图页面
interface MapPageProps extends QuestComponentProps, AiboTeamPageProps {
  setNowArea: (para: number) => void
}

const MapPage = (props: MapPageProps) => (
  <div className='pageArea flexRow'>
    {/* 地区列表模块 */}
    <div className='flex-1 flexCol height100 containBorder'>
      <div className='flex-1 flexCenter borderBottom'>{'地区列表'}</div>
      <div className='flex-15 flexStart wrapScroll'>
        {mapInfo[0].areas.map((val) => (
          val.quests[0].id/* 这个值即为当前地区中第一个关卡的id */ > props.clearedQuest/* 判断其是否大于用户已完成的进度 */ ? null : (
            <div key={val.index} className='areaDiv' onClick={() => {props.setNowArea(val.index)}}>{val.name}</div>
          )
        ))}
      </div>
    </div>
    {/* 地区关卡模块与队伍模块 */}
    <div className='flex-3 flexCol height100'>
      {/* 地区关卡模块 */}
      <div className='flex-3 flexStart wrapScroll containBorder'>
        {mapInfo[0].areas[props.nowArea].quests.map((val) => (
          val.id/* 这个值即为当前关卡的id */ > props.clearedQuest/* 判断其是否大于用户已完成的进度 */ ? null : <QuestComponent
            key={val.index}
            questInfo={val}
            nowArea={props.nowArea}
            mapRecordEasy={props.mapRecordEasy}
            setMapRecordEasy={props.setMapRecordEasy}
            clearedQuest={props.clearedQuest}
            setClearedQuest={props.setClearedQuest}
            questProgress={props.questProgress}
            setQuestProgress={props.setQuestProgress}
            userDimenstal={props.userDimenstal}
            setUserDimenstal={props.setUserDimenstal}
          />
        ))}
      </div>
      {/* 伙伴队伍模块 */}
      <div className='flex-1 width100 wrapScroll'>
        <AiboTeamPage
          aiboStore={props.aiboStore}
          aiboTeam={props.aiboTeam}
          nowChoosenTeam={props.nowChoosenTeam}
          setShowAiboChoosePage={props.setShowAiboChoosePage}
          setNowChoosenAibo={props.setNowChoosenAibo}
          setNowChoosenTeam={props.setNowChoosenTeam}
        />
      </div>
    </div>
  </div>
)

// 建立每个quest的组件
interface QuestComponentProps {
  nowArea: number,
  mapRecordEasy: boolean[][][],
  setMapRecordEasy: (para: boolean[][][]) => void,
  clearedQuest: number,
  setClearedQuest: (para: number) => void,
  questProgress: number[][][],
  setQuestProgress: (para: number[][][]) => void,
  userDimenstal: number,
  setUserDimenstal: (para: number) => void
}

const QuestComponent = (props: QuestComponentProps & { questInfo: questType }) => {// 类型，在MapPage流传下来的类型上再加上MapPage自己给过来的类型questType
  const [nowProgress, setNowProgress] = useState(props.questProgress[0][props.nowArea][props.questInfo.index])

  const setNowRecordEasy = (indexArea: number, indexQuest: number) => {
    if (!props.mapRecordEasy[0][indexArea][indexQuest]) {
      let mapRecordEasyTemp = props.mapRecordEasy
      mapRecordEasyTemp[0][indexArea][indexQuest] = true
      props.setMapRecordEasy(mapRecordEasyTemp)
    }
  }

  return (
    <div className='areaDiv' onClick={() => {
    // 点击关卡，判断当前关卡是否已经处在闯关过程中
      if (nowProgress < 0) {
      // 如果未在闯关过程中，则显示一个闯关过程，进度条完成后返回成功失败的结果
        setNowProgress(0)
        const timer = setInterval(() => {
          setNowProgress(nowProgress >= 100 ? (() => {
            setNowProgress(-1)
            console.log('进度条完成')
            clearInterval(timer)
            return 100
          })() : (() => {
            console.log(nowProgress)
            let willProgress = nowProgress + Math.random() * 10
            return willProgress > 100 ? 100 : willProgress
          })())
        }, 300)
      }
      // 先默认成功，成功后设置次元结晶、经验、清关标志位等
      props.setUserDimenstal(props.userDimenstal + props.questInfo.gold)
      props.clearedQuest === props.questInfo.id && props.setClearedQuest(props.clearedQuest + 1)
    }}>
      {props.questInfo.name}
      {
        props.mapRecordEasy[0][props.nowArea][props.questInfo.index] && <Avatar>完成</Avatar>// 显示完成图标
      }
      {(nowProgress > -1) && <div>{`----当前进度${Math.round(nowProgress * 100) / 100}%`}</div>
      /* <ProgressLabel
        nowProgress={0}
        setNowProgress={(nowProgress: number) => setNowProgress(props.questInfo.index, nowProgress)}
        setNowRecordEasy={() => setNowRecordEasy(props.nowArea, props.questInfo.index)}
      /> */}
    </div>
  )
}

// 进度条组件
const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => (
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

// 处理进度条的显示
interface ProgressLabelProps {
  nowProgress: number,
  setNowProgress: (para: number) => void,
  setNowRecordEasy: () => void
}

const ProgressLabel = (props: ProgressLabelProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      props.setNowProgress(props.nowProgress >= 100 ? (() => {
        props.setNowProgress(-1)
        props.setNowRecordEasy()
        console.log('进度条完成')
        clearInterval(timer)
        return 100
      })() : (() => {
        let willProgress = props.nowProgress + Math.random() * 10
        return willProgress > 100 ? 100 : willProgress
      })())
    }, 300)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div style={{ width: '80%' }}>
      <LinearProgressWithLabel value={props.nowProgress} />
    </div>
  )
}

// 建立底部导航栏
interface NavigationProps {
  setTogglePage: (para: boolean[]) => void
}

const Navigation = (props: NavigationProps) => {
  const [value, setValue] = useState('recents')

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
    <BottomNavigation value={value} showLabels onChange={handleChange} style={{ width: '100%' }}>
      <BottomNavigationAction label='成就' value='achi' icon={<CollectionsBookmarkIcon />} />
      <BottomNavigationAction label='房间' value='room' icon={<HomeIcon />} />
      <BottomNavigationAction label='城镇' value='town' icon={<LocationCityIcon />} />
      <BottomNavigationAction label='地图' value='maps' icon={<MapIcon />} />
    </BottomNavigation>
  )
}

const App = () => {
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
  const aiboTeamHistory = localStorage.getItem('aiboTeam') === null ? [...Array(4)].map(() => [...Array(4)].map(() => 0)) : JSON.parse(localStorage.getItem('aiboTeam') as string)
  const togglePageHistory = localStorage.getItem('togglePage') === null ? [false, true, false, false] : JSON.parse(localStorage.getItem('togglePage') as string)
  const nowAreaHistory = localStorage.getItem('nowArea') === null ? 0 : JSON.parse(localStorage.getItem('nowArea') as string)
  const mapRecordHistory = localStorage.getItem('mapRecordEasy') === null ? mapRecordInitEasy : JSON.parse(localStorage.getItem('mapRecordEasy') as string)
  const clearedQuestHistory = localStorage.getItem('clearedQuest') === null ? 1 : JSON.parse(localStorage.getItem('clearedQuest') as string)
  const questProgressHistory = localStorage.getItem('questProgress') === null ? questProgressInit : JSON.parse(localStorage.getItem('questProgress') as string)
  const nowChoosenTeamHistory = localStorage.getItem('nowChoosenTeam') === null ? 0 : JSON.parse(localStorage.getItem('nowChoosenTeam') as string)
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
  // 当前选择的队伍以及队员栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信，应该可以用redux
  const [nowChoosenTeam, setNowChoosenTeam] = useState(nowChoosenTeamHistory)
  const [nowChoosenAibo, setNowChoosenAibo] = useState(0)
  // 当前显示的地区
  const [nowArea, setNowArea] = useState(nowAreaHistory)
  // 简单难度下地图的完成情况
  const [mapRecordEasy, setMapRecordEasy] = useState(mapRecordHistory)
  // 当前玩家正在打第几关，也就是说页面需要渲染到第几关，之后的关卡不再渲染
  const [clearedQuest, setClearedQuest] = useState(clearedQuestHistory)
  // 地图的完成进度，用来描绘进度条，为-1则不显示进度条
  const [questProgress, setQuestProgress] = useState(questProgressHistory)

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
    localStorage.setItem('questProgress', JSON.stringify(questProgress))
    localStorage.setItem('nowChoosenTeam', JSON.stringify(nowChoosenTeam))
    localStorage.setItem('initGame', 'alreadyInit')
  }, 5000)

  return (
    <div className='App'>
      {/* 用于弹出的页面 */}
      {(showGachaPage || showAiboChoosePage) && <div className='boxPageMask'>
        {/* 召唤页面 */}
        {showGachaPage && (<div>
          <GachaPage
            userDimenstal={userDimenstal}
            setUserDimenstal={setUserDimenstal}
            setShowGachaPage={setShowGachaPage}
            aiboStore={aiboStore}
            setAiboStore={setAiboStore}
            aiboNum={aiboNum}
            setAiboNum={setAiboNum}
            aiboRecord={aiboRecord}
            setAiboRecord={setAiboRecord}
          />
        </div>)}
        {/* 选择伙伴页面 */}
        {showAiboChoosePage && (<div>
          <AiboChoosePage
            aiboStore={aiboStore}
            setShowAiboChoosePage={setShowAiboChoosePage}
            nowChoosenAibo={nowChoosenAibo}
            nowChoosenTeam={nowChoosenTeam}
            aiboTeam={aiboTeam}
            setAiboTeam={setAiboTeam}
          />
        </div>)}
        {/* 惜别伙伴页面 */}
        {/* {showAiboDeletePage && (<AiboDeletePage
          aiboStore={aiboStore}
          setShowAiboChoosePage={setShowAiboChoosePage}
          nowChoosenAibo={nowChoosenAibo}
          aiboTeam={aiboTeam}
          setAiboTeam={setAiboTeam}
        />)} */}
      </div>}
      {/* 个人信息栏 */}
      <div className='infoBar'>
        {'当前拥有的次元结晶：' + userDimenstal}
      </div>
      {/* 显示的页面主体 */}
      <div className='pageContain'>
        {togglePage[0] && (<AchievePage
          aiboRecord={aiboRecord}
        />)}
        {togglePage[1] && (<HomePage
          aiboStore={aiboStore}
          setAiboStore={setAiboStore}
          aiboNum={aiboNum}
          setAiboNum={setAiboNum}
          aiboTeam={aiboTeam}
          nowChoosenTeam={nowChoosenTeam}
          setShowAiboChoosePage={setShowAiboChoosePage}
          setNowChoosenAibo={setNowChoosenAibo}
          setNowChoosenTeam={setNowChoosenTeam}
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
          questProgress={questProgress}
          setQuestProgress={setQuestProgress}
          userDimenstal={userDimenstal}
          setUserDimenstal={setUserDimenstal}
          aiboStore={aiboStore}
          aiboTeam={aiboTeam}
          nowChoosenTeam={nowChoosenTeam}
          setShowAiboChoosePage={setShowAiboChoosePage}
          setNowChoosenAibo={setNowChoosenAibo}
          setNowChoosenTeam={setNowChoosenTeam}
        />)}
      </div>
      {/* 导航栏 */}
      <div className='infoBar'>
        <Navigation setTogglePage={setTogglePage} />
      </div>
    </div>
  )
}

const App3 = () => {
  const [isInterval, setIsInterval] = useState(false)// 是否在计数状态
  const [nowProgress, setNowProgress] = useState(0)// 当前计数的值
  const ref = useRef()

  return (<>
    <Button onClick={() => {
      if (!isInterval) {
        ref.current = setInterval(() => {
          console.log(`值为：${nowProgress}`)
          setNowProgress(nowProgress + 10)
        }, 500)
        setIsInterval(true)
      } else {
        clearInterval(ref.current)
        setIsInterval(false)
      }
    }}>{isInterval ? '停止计时' : '开始计时'}</Button>
    <div>{`当前值为：${nowProgress}`}</div>
  </>)
}

const SetText = connect()(({ dispatch }: any) => {
  let input: any

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(setText(input.value))
        input.value = ''
      }}>
        <input ref={
          // eslint-disable-next-line no-return-assign
          (node) => input = node
        } />
        <button type="submit">
          Set Text
        </button>
      </form>
    </div>
  )
})

const Text = (props: {
  onClick: () => void,
  text: string
}) => (
  <li
    onClick={props.onClick}
  >
    {props.text}
  </li>
)

const ShowText = connect(
  // 用state来更新UI组件
  (state: any) => ({
    text: state.text
  }),
  // UI组件的行为作为action，由dispatch来更新state
  (dispatch: any) => ({
    toggleText: (id: any) => dispatch(toggleText(id))
  })
)((
  // UI组件本体，输入参数由上面两个函数的输出决定
  text: { id: number, completed: boolean, text: string }[],
  toggleText: (id: any) => void
) => (
  <ul>
    {text?.map ? text.map((val) => (
      <Text
        key={val.id}
        {...val}
        onClick={() => toggleText(val.id)}
      />
    )) : 'nullval'}
  </ul>
))

const App4 = () => (
  <div>
    <SetText />
    <ShowText />
  </div>
)

export default App4
