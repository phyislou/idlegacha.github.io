import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  // 系统数据
  setNowArea, // 当前显示的地区
  setNowChoosenAibo, // 当前选择的队员栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信
  setNowChoosenTeam, // 当前选择的队伍栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信
  setQuestIsExploring, // 每个关卡当前是否正在探索当中
  setQuestProgress, // 正在进行探索的关卡
  setTogglePage, // 切换页面
  // 临时数据
  setShowAiboChoosePage, // 是否显示伙伴选择页面
  setShowGachaPage, // 是否显示召唤页面
  // 用户数据
  setAiboNum, // 用户召唤的伙伴量，用于给每个伙伴一个不重复的id
  setAiboRecord, // 记录：伙伴收集情况
  setAiboStore, // 用户的伙伴列表
  setAiboTeam, // 记录：伙伴队伍情况
  setClearedQuest, // 当前玩家正在打第几关，也就是说页面需要渲染到第几关，之后的关卡不再渲染
  setMapRecordEasy, // 简单难度下地图的完成情况
  setUserDimenstal // 用户的次元结晶
} from './actions'
import './App.less'
import './css/font-awesome.css'
import { aiboInfo, mapInfo } from './staticData'
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

// 延时，定时器
function useInterval (callback: any, delay: any) {
  const savedCallback = useRef()

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback
  })

  // 建立 interval
  useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

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

interface exploringQuestType {
  questId: number,
  teamId: number,
  nowProgress: number
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

const HomePage = connect(
  // 用state来更新UI组件
  (state: any) => ({
    // 系统数据
    nowChoosenTeam: state.systemValue.nowChoosenTeam,
    // 用户数据
    aiboNum: state.userValue.aiboNum,
    aiboStore: state.userValue.aiboStore,
    aiboTeam: state.userValue.aiboTeam,
    userDimenstal: state.userValue.userDimenstal
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setNowChoosenAibo: (para: number) => dispatch(setNowChoosenAibo(para)),
    setNowChoosenTeam: (para: number) => dispatch(setNowChoosenTeam(para)),
    // 临时数据
    setShowAiboChoosePage: (para: boolean) => dispatch(setShowAiboChoosePage(para)),
    // 用户数据
    setAiboNum: (para: number) => dispatch(setAiboNum(para)),
    setAiboStore: (para: userAiboType[]) => dispatch(setAiboStore(para)),
    setClearedQuest: (para: number) => dispatch(setClearedQuest(para)),
    setUserDimenstal: (para: number) => dispatch(setUserDimenstal(para))
  })
)((props: HomePageProps) => {
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
})

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

const AiboTeamPage = connect(
  // 用state来更新UI组件
  (state: any) => ({
    aiboStore: state.userValue.aiboStore,
    aiboTeam: state.userValue.aiboTeam,
    nowChoosenTeam: state.systemValue.nowChoosenTeam
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    setShowAiboChoosePage: (para: boolean) => dispatch(setShowAiboChoosePage(para)),
    setNowChoosenAibo: (para: number) => dispatch(setNowChoosenAibo(para)),
    setNowChoosenTeam: (para: number) => dispatch(setNowChoosenTeam(para))
  })
)((props: AiboTeamPageProps) => (
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
))

// 建立城镇页面
const MarketPage = connect(
  // 用state来更新UI组件
  (state: any) => ({
    // 系统数据
    showGachaPage: state.tempValue.showGachaPage
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setShowGachaPage: (para: boolean) => dispatch(setShowGachaPage(para))
  })
)((props: any) => (
  <div className='pageArea'>
    <Button variant='outlined' className='marginAuto' onClick={() => props.setShowGachaPage(true)}>召唤</Button>
  </div>
))

// 建立地图页面
interface MapPageProps extends QuestComponentProps, AiboTeamPageProps {
  setNowArea: (para: number) => void
}

const MapPage = connect(
  // 用state来更新UI组件
  (state: any) => ({
    // 系统数据
    nowArea: state.systemValue.nowArea,
    // 用户数据
    clearedQuest: state.userValue.clearedQuest
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setNowArea: (para: any) => dispatch(setNowArea(para)),
    // 用户数据
    setClearedQuest: (para: any) => dispatch(setClearedQuest(para))
  })
)((props: any) => (
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
          />
        ))}
      </div>
      {/* 伙伴队伍模块 */}
      <div className='flex-1 width100 wrapScroll'>
        <AiboTeamPage />
      </div>
    </div>
  </div>
))

// 建立每个quest的组件
interface QuestComponentProps {
  nowArea: number,
  mapRecordEasy: boolean[][][],
  setMapRecordEasy: (para: boolean[][][]) => void,
  clearedQuest: number,
  setClearedQuest: (para: number) => void,
  questIsExploring: boolean[][][],
  setQuestIsExploring: (para: boolean[][][]) => void,
  questProgress: exploringQuestType[],
  setQuestProgress: (para: exploringQuestType[]) => void,
  userDimenstal: number,
  setUserDimenstal: (para: number) => void
}

const QuestComponent = connect(
  // 用state来更新UI组件
  (state: any) => ({
    nowArea: state.systemValue.nowArea,
    mapRecordEasy: state.userValue.mapRecordEasy,
    clearedQuest: state.userValue.clearedQuest,
    questIsExploring: state.systemValue.questIsExploring,
    questProgress: state.userValue.questProgress,
    userDimenstal: state.userValue.userDimenstal
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    setMapRecordEasy: (para: boolean[][][]) => dispatch(setMapRecordEasy(para)),
    setClearedQuest: (para: number) => dispatch(setClearedQuest(para)),
    setQuestIsExploring: (para: boolean[][][]) => dispatch(setQuestIsExploring(para)),
    setQuestProgress: (para: exploringQuestType[]) => dispatch(setQuestProgress(para)),
    setUserDimenstal: (para: number) => dispatch(setUserDimenstal(para))
  })
)((props: QuestComponentProps & { questInfo: questType }) => {// 类型，在MapPage流传下来的类型上再加上MapPage自己给过来的类型questType
  const [isExploring, setIsExploring] = useState(props.questIsExploring[0][props.nowArea][props.questInfo.index])
  const [isCompleted, setIsCompleted] = useState(props.mapRecordEasy[0][props.nowArea][props.questInfo.index])
  const [exploringProgress, setExploringProgress] = useState(0)

  useInterval(
    () => {
      if (exploringProgress >= 100) {
        console.log('完成')

        // 重新将探索进度置0
        setExploringProgress(0)

        // 重新将正在探索的标志位置false
        setIsExploring(false)
        let questIsExploringTemp = props.questIsExploring
        questIsExploringTemp[0][props.nowArea][props.questInfo.index] = false
        setQuestIsExploring(questIsExploringTemp)

        // 将地图完成记录置为完成状态
        if (!isCompleted) {
          setIsCompleted(true)
          let mapRecordTemp = props.mapRecordEasy
          mapRecordTemp[0][props.nowArea][props.questInfo.index] = true
          setMapRecordEasy(mapRecordTemp)
        }

        // 最后设置次元结晶、经验、清关标志位等
        props.setUserDimenstal(props.userDimenstal + props.questInfo.gold)
        props.clearedQuest === props.questInfo.id && props.setClearedQuest(props.clearedQuest + 1)

      } else {
        let willProgress = exploringProgress + Math.random() * 10
        setExploringProgress(willProgress > 100 ? 100 : willProgress)
      }
    },
    isExploring ? 80 : null
  )

  function exploringStart () {
    // 点击关卡，判断当前关卡是否已经处在闯关过程中
    if (!isExploring) {
      // 如果未在闯关过程中，则显示一个闯关过程，进度条完成后返回成功失败的结果
      setIsExploring(true)
      let questIsExploringTemp = props.questIsExploring
      questIsExploringTemp[0][props.nowArea][props.questInfo.index] = true
      setQuestIsExploring(questIsExploringTemp)
    }
  }

  return (
    <div className='areaDiv' onClick={() => exploringStart()}>
      {isCompleted && <Avatar>完成</Avatar>// 显示完成图标
      }{props.questInfo.name}
      {isExploring && <div>{`----当前进度${Math.round(exploringProgress * 100) / 100}%`}</div>
      /* <ProgressLabel
        nowProgress={0}
        setNowProgress={(nowProgress: number) => setNowProgress(props.questInfo.index, nowProgress)}
        setNowRecordEasy={() => setNowRecordEasy(props.nowArea, props.questInfo.index)}
      /> */}
    </div>
  )
})

/*
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
*/

// 建立底部导航栏
const Navigation = connect(
  // 用state来更新UI组件
  (state: any) => ({
    togglePage: state.systemValue.togglePage
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    setTogglePage: (para: any) => dispatch(setTogglePage(para))
  })
)((props: any) => (
  <BottomNavigation value={props.togglePage} showLabels onChange={
    (event: object, value: any) => props.setTogglePage(value)
  } style={{ width: '100%' }}>
    <BottomNavigationAction label='成就' value={0} icon={<CollectionsBookmarkIcon />} />
    <BottomNavigationAction label='房间' value={1} icon={<HomeIcon />} />
    <BottomNavigationAction label='城镇' value={2} icon={<LocationCityIcon />} />
    <BottomNavigationAction label='地图' value={3} icon={<MapIcon />} />
  </BottomNavigation>
))

const App = connect(
  // 用state来更新UI组件
  (state: any) => ({
    // 系统数据
    nowArea: state.systemValue.nowArea,
    nowChoosenAibo: state.systemValue.nowChoosenAibo,
    nowChoosenTeam: state.systemValue.nowChoosenTeam,
    togglePage: state.systemValue.togglePage,
    // 临时数据
    showAiboChoosePage: state.tempValue.showAiboChoosePage,
    showGachaPage: state.tempValue.showGachaPage,
    // 用户数据
    aiboNum: state.userValue.aiboNum,
    aiboRecord: state.userValue.aiboRecord,
    aiboStore: state.userValue.aiboStore,
    aiboTeam: state.userValue.aiboTeam,
    clearedQuest: state.userValue.clearedQuest,
    mapRecordEasy: state.userValue.mapRecordEasy,
    questProgress: state.userValue.questProgress,
    userDimenstal: state.userValue.userDimenstal
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setNowArea: (para: number) => dispatch(setNowArea(para)),
    setNowChoosenAibo: (para: number) => dispatch(setNowChoosenAibo(para)),
    setNowChoosenTeam: (para: number) => dispatch(setNowChoosenTeam(para)),
    setTogglePage: (para: number) => dispatch(setTogglePage(para)),
    // 临时数据
    setShowAiboChoosePage: (para: boolean) => dispatch(setShowAiboChoosePage(para)),
    setShowGachaPage: (para: boolean) => dispatch(setShowGachaPage(para)),
    // 用户数据
    setAiboNum: (para: number) => dispatch(setAiboNum(para)),
    setAiboRecord: (para: boolean[]) => dispatch(setAiboRecord(para)),
    setAiboStore: (para: userAiboType[]) => dispatch(setAiboStore(para)),
    setAiboTeam: (para: number[][]) => dispatch(setAiboTeam(para)),
    setClearedQuest: (para: number) => dispatch(setClearedQuest(para)),
    setMapRecordEasy: (para: boolean[][][]) => dispatch(setMapRecordEasy(para)),
    setQuestProgress: (para: number[][][]) => dispatch(setQuestProgress(para)),
    setUserDimenstal: (para: number) => dispatch(setUserDimenstal(para))
  })
)((props: any) =>
// 首先从缓存中读出历史数据，如果没有缓存，则使用初始值
  (
    <div className='App'>
      {/* 用于弹出的页面 */}
      {(props.showGachaPage || props.showAiboChoosePage) && <div className='boxPageMask'>
        {/* 召唤页面 */}
        {props.showGachaPage && (<div>
          <GachaPage
            userDimenstal={props.userDimenstal}
            setUserDimenstal={props.setUserDimenstal}
            setShowGachaPage={props.setShowGachaPage}
            aiboStore={props.aiboStore}
            setAiboStore={props.setAiboStore}
            aiboNum={props.aiboNum}
            setAiboNum={props.setAiboNum}
            aiboRecord={props.aiboRecord}
            setAiboRecord={props.setAiboRecord}
          />
        </div>)}
        {/* 选择伙伴页面 */}
        {props.showAiboChoosePage && (<div>
          <AiboChoosePage
            aiboStore={props.aiboStore}
            setShowAiboChoosePage={props.setShowAiboChoosePage}
            nowChoosenAibo={props.nowChoosenAibo}
            nowChoosenTeam={props.nowChoosenTeam}
            aiboTeam={props.aiboTeam}
            setAiboTeam={props.setAiboTeam}
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
        {'当前拥有的次元结晶：' + props.userDimenstal}
      </div>
      {/* 显示的页面主体 */}
      <div className='pageContain'>
        {props.togglePage === 0 && (<AchievePage
          aiboRecord={props.aiboRecord}
        />)}
        {props.togglePage === 1 && (<HomePage />)}
        {props.togglePage === 2 && (<MarketPage />)}
        {props.togglePage === 3 && (<MapPage />)}
      </div>
      {/* 导航栏 */}
      <div className='infoBar'>
        <Navigation />
      </div>
    </div>
  )
)

const App3 = () => {
  const [isInterval, setIsInterval] = useState(false)// 是否在计数状态
  const [nowProgress, setNowProgress] = useState(0)// 当前计数的值

  useInterval(
    () => {
      if (nowProgress >= 100) {
        console.log('完成')
      } else {
        let willProgress = nowProgress + Math.random() * 10
        setNowProgress(willProgress > 100 ? 100 : willProgress)
      }
    },
    (isInterval && nowProgress < 100) ? 200 : null
  )

  return (<>
    <Button onClick={() => {
      if (!isInterval) {
        setIsInterval(true)
      } else {
        setIsInterval(false)
      }
    }}>{isInterval ? '停止' : '开始'}</Button>
    <div>{`当前值为：${nowProgress}`}</div>
  </>)
}

export default App
