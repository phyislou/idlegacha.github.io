import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  // 系统数据
  setNowArea, // 当前显示的地区
  setNowCountry, // 当前显示的国度
  setNowChoosenAibo, // 当前选择的队员栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信
  setNowChoosenTeam, // 当前选择的队伍栏位，用于房间页-伙伴队伍以及伙伴选择页面之间的通信
  setTogglePage, // 切换页面
  // 临时数据
  setShowAiboChoosePage, // 是否显示伙伴选择页面
  setShowGachaPage, // 是否显示召唤页面
  // 用户数据
  setAiboNum, // 用户召唤的伙伴量，用于给每个伙伴一个不重复的id
  setAiboStore, // 用户的伙伴列表
  setAiboTeam, // 记录：伙伴队伍情况
  setUserAiboInfo, // 记录：伙伴收集情况
  setUserDimenstal, // 用户的次元结晶
  setUserMapInfo // 用户自己的地图关卡信息，包括每个关卡是否显示出来、简单难度下地图的完成情况、当前是否正在探索当中等等
} from './actions'
import './App.less'
import './css/font-awesome.css'
import { personaType, personaInfo, mapInfo, mapStructure } from './staticData'
import {
  Avatar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Checkbox,
  ClickAwayListener,
  Fade,
  GridList,
  GridListTile,
  GridListTileBar,
  Grow,
  IconButton,
  LinearProgress,
  ListSubheader,
  Paper,
  Tooltip,
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

// 记录用户伙伴的数据类型
interface aiboType {
  aiboId: number,
  personaId: number,
  sortId: number,
  level: number,
  exp: number
}

// connect函数的第一个参数
const connectState = connect(
  // 用state来更新UI组件
  (state: {
    // 系统数据
    systemValue: {
      nowArea: string,
      nowCountry: string,
      nowChoosenAibo: number | null,
      nowChoosenTeam: number | null,
      togglePage: number
    },
    // 临时数据
    tempValue: {
      showAiboChoosePage: boolean,
      showGachaPage: boolean
    },
    // 用户数据
    userValue: {
      aiboNum: number,
      aiboStore: {[index: number]: aiboType },
      aiboTeam: {[index: number]:{
        id: number,
        isExploring: boolean,
        exploringQuest: string | null,
        member: number[]
      }},
      userPersonaInfo: {[index: number]: {
        id: number,
        have: boolean
      }},
      userDimenstal: number,
      userMapInfo: {[index: string]: {
        id: string,
        isShow: boolean,
        completeEasy: boolean,
        isExploring: boolean,
        exploringTeam: number | null,
        exploringProgress: number
      }}
    }
  }) => ({
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
    userPersonaInfo: state.userValue.userPersonaInfo,
    aiboStore: state.userValue.aiboStore,
    aiboTeam: state.userValue.aiboTeam,
    userDimenstal: state.userValue.userDimenstal,
    userMapInfo: state.userValue.userMapInfo
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setNowArea: (para: string) => dispatch(setNowArea(para)),
    setNowChoosenAibo: (para: number) => dispatch(setNowChoosenAibo(para)),
    setNowChoosenTeam: (para: number) => dispatch(setNowChoosenTeam(para)),
    setTogglePage: (para: number) => dispatch(setTogglePage(para)),
    // 临时数据
    setShowAiboChoosePage: (para: boolean) => dispatch(setShowAiboChoosePage(para)),
    setShowGachaPage: (para: boolean) => dispatch(setShowGachaPage(para)),
    // 用户数据
    setAiboNum: (para: number) => dispatch(setAiboNum(para)),
    setUserAiboInfo: (para: boolean[]) => dispatch(setUserAiboInfo(para)),
    setAiboStore: (para: {[index: number]: aiboType }) => dispatch(setAiboStore(para)),
    setAiboTeam: (para: any) => dispatch(setAiboTeam(para)),
    setUserDimenstal: (para: number) => dispatch(setUserDimenstal(para)),
    setUserMapInfo: (para: any) => dispatch(setUserMapInfo(para))
  })
)

/*
// 数组查找id对象的方法
const getId = (arr: any[]) => (key: any) => arr.find((x) => x.id === key) || { id: key }
// 数组更新id对象的方法
const setId = (arr: any[]) => (obj: any) => arr.find((x) => x.id === obj.id) ? arr.map((x) => x.id === obj.id ? obj : x) : [...arr, obj]
 */

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

// 用于卡池概率的控制
const star5 = [
  37, 38, 66, 72, 73, 77, 94, 99,
  100, 102, 105, 106, 111, 113, 114, 115,
  118, 121, 131, 134]
const star4 = [
  5, 26, 32, 33, 34, 35, 36, 54,
  56, 62, 63, 65, 70, 71, 78, 79,
  82, 92, 97, 98, 103, 104, 108, 109,
  110, 112, 117, 122, 130, 135]
const star3 = [
  23, 24, 25, 27, 28, 29, 30, 31,
  39, 41, 42, 45, 49, 57, 58, 59,
  60, 61, 64, 67, 76, 83, 89, 91,
  95, 101, 107, 116, 119, 123, 125, 126,
  129, 133]
const star2 = [
  6, 8, 10, 12, 13, 15, 17, 19,
  40, 43, 46, 47, 48, 50, 51, 52,
  55, 68, 69, 74, 75, 80, 81, 84,
  85, 86, 87, 88, 90, 93, 120, 127,
  128, 132]
const star1 = [
  1, 2, 3, 4, 7, 9, 11, 14,
  16, 18, 20, 21, 22, 44, 53, 96]

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
const AiboCard = connectState((props: {
  personaId: number,
  onClick?: () => void,
  aiboId: number,
  aiboStore: {[index: number]: aiboType },
  userPersonaInfo:{[index: number]: {
    id: number,
    have: boolean
  }}
}) => {
  if (props.userPersonaInfo[props.personaId]?.have) {
    // 根据输入星级选择该渲染的类型
    let cardClass = 'cardUnkown'
    switch (personaInfo[props.personaId].star) {
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
    for (let i = 0; i < personaInfo[props.personaId].star; i++) {
      stars.push(<div key={i} className='fa fa-star fa-2s'></div>)
    }
    return (
      <Button variant='outlined' className={'cardBase ' + cardClass} onClick={props.onClick}>
        <div className='cardName'>{personaInfo[props.personaId].name}</div>
        {props.aiboId && <div className='cardLevel'>{`lv.${props.aiboStore[props.aiboId].level}`}</div>}
        <div className='cardStars'>{stars}</div>
      </Button>
    )
  } else {
    return <Button variant='contained' disabled className={'cardBase'} onClick={props.onClick}>{'未获得'}</Button>
  }
})

// 整个召唤页面
const GachaPage = connectState((props: {
  userDimenstal: number,
  setUserDimenstal: (para: number) => void,
  setShowGachaPage: (para: boolean) => void,
  aiboStore: {[index: number]: aiboType },
  setAiboStore: (para: {[index: number]: aiboType }) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  userPersonaInfo: any,
  setUserAiboInfo: (para: boolean[]) => void
}) => {
  // 确定一次召唤的消耗量，之后应该改成全局的常量
  const gachaCost = 1000
  // 将要召唤的次数
  const [gachaTimes, setGachaTimes] = useState(0)
  // 额外召唤的次数
  const [bonusTimes, setBonusTimes] = useState(0)
  // 存放召唤结果
  const [gachaResult, setGachaResult] = useState({})
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
      // 抽完后先更新用户伙伴数据
      const ucArr: {[index: number]: aiboType } = {}
      const mrArr = props.userPersonaInfo
      for (let i = props.aiboNum + 1; i < props.aiboNum + 1 + num; i++) {
        let gachaId = gacha()
        ucArr[i] = { aiboId: i, personaId: gachaId, sortId: i, level: 1, exp: 0 }
        // 顺带检测伙伴记录
        !mrArr[gachaId].have && (mrArr[gachaId].have = true)// 对于抽到的这张卡，如果在伙伴记录中没有，则置为有
      }
      props.setAiboStore({ ...props.aiboStore, ...ucArr })// 更新持有伙伴列表
      props.setAiboNum(props.aiboNum + num)// 更新持有伙伴量
      props.setUserAiboInfo(mrArr)// 更新伙伴记录
      // 最后显示抽卡结果
      setGachaResult(ucArr)
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
        {Object.values(gachaResult).map((val: any) => <AiboCard
          key={val.aiboId}
          personaId={val.personaId}/>)}
      </div>
    </Paper>
  )
})

// 建立伙伴选择页面
const AiboChoosePage = connectState((props: {
  aiboStore: {[index: number]: aiboType },
  setShowAiboChoosePage: (para: boolean) => void,
  nowChoosenTeam: number,
  nowChoosenAibo: number,
  aiboTeam: {[index: number]:{id: number, isExploring: boolean, exploringQuest: string | null, member: any[]}},
  setAiboTeam: (para: any) => void
}) => {
  const [showWarningPage, setShowWarningPage] = useState(false)

  // 确定要放进当前队伍人员栏位里的伙伴后执行操作并关闭本页面
  const setAiboTeamAndClosePage = (getAiboId: number | null) => {
    let tempAiboTeam = props.aiboTeam
    tempAiboTeam[props.nowChoosenTeam].member[props.nowChoosenAibo] = getAiboId
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
          setAiboTeamAndClosePage(null)
        }}>清除该栏位的伙伴</Button>
        <div className='flexStart wrapScroll'>
          {Object.values(props.aiboStore)
            .sort((a, b) => a.sortId - b.sortId)
            .map((val) => <AiboCard key={val.aiboId} onClick={() => {
              // 选择了某张伙伴卡后，首先判断该卡是否已在队伍里面，是的话则弹出警告页面
              if (props.aiboTeam[props.nowChoosenTeam].member.find((x) => x === val.aiboId)) {
                setShowWarningPage(true)
              } else {
                setAiboTeamAndClosePage(val.aiboId)
              }
            }} personaId={val.personaId} aiboId={val.aiboId} />)}
        </div>
      </Paper>
    </>
  )
})

// 建立成就页面
const AchievePage = connectState((props: { userPersonaInfo: {[index: number]: {
  id: number,
  have: boolean
}}}) => (
  <div className='pageArea flexWrap'>
    {Object.values(props.userPersonaInfo).map((val) => val.have ? (
      <AiboCard key={val.id} personaId={val.id} />
    ) : (
      <AiboCard key={val.id} personaId={val.id} />
    ))/* 判断传入的伙伴记录中是否存在某个伙伴，存在则显示名字，反之不显示 */}
  </div>
))

// 建立房间页面
const HomePage = connectState((props: {
  aiboStore: {[index: number]: aiboType },
  setAiboStore: (para: {[index: number]: aiboType }) => void,
  aiboNum: number,
  setAiboNum: (para: number) => void,
  aiboTeam: {[index: number]:{id: number, isExploring: boolean, exploringQuest: string | null, member: any[]}},
  userDimenstal: number,
  setUserDimenstal: (para: number) => void
}) => {
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
            let aiboStoreTemp = props.aiboStore
            selectedList.forEach((val: number) => {delete aiboStoreTemp[val]})
            props.setAiboStore(aiboStoreTemp)
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
            Object.entries(props.aiboStore).forEach(([key, val]) => {
              if (personaInfo[val.personaId].star === 1 && !selectedListTemp.has(val.aiboId)) {
                selectedListTemp.add(val.aiboId)
                howManyDimenstalTemp = howManyDimenstalTemp + personaInfo[val.personaId].dimenstal
              }
            })
            setSelectedList(selectedListTemp)
            setHowManyDimenstal(howManyDimenstalTemp)
          }}>选择所有一星同伴</Button>
          <Button variant='contained' onClick={() => {
            let selectedListTemp = selectedList
            let howManyDimenstalTemp = howManyDimenstal
            Object.entries(props.aiboStore).forEach(([key, val]) => {
              if (personaInfo[val.personaId].star === 2 && !selectedListTemp.has(val.aiboId)) {
                selectedListTemp.add(val.aiboId)
                howManyDimenstalTemp = howManyDimenstalTemp + personaInfo[val.personaId].dimenstal
              }
            })
            setSelectedList(selectedListTemp)
            setHowManyDimenstal(howManyDimenstalTemp)
          }}>选择所有两星同伴</Button>
          <SortButton
            buttonName='按星级排序'
            sortAttr='star'
          />
        </div>)}
        <div className='flex-15 flexStart wrapScroll'>
          {Object.values(props.aiboStore)
            .sort((a, b) => a.sortId - b.sortId)
            .map((val) =>
              <div key={val.aiboId} style={{ display: 'flex' }}>
                {/* 给每个伙伴建立多选框 */showCheckbox && <CheckBox
                  val={val}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  howManyDimenstal={howManyDimenstal}
                  setHowManyDimenstal={setHowManyDimenstal}
                />}
                <AiboCard onClick={() => {
                  setChosenAiboInfo(val)
                }} personaId={val.personaId} aiboId={val.aiboId} />
              </div>)}
        </div>
      </div>
      <div className='flex-1 flexCol height100'>
        {/* 伙伴详细信息模块 */}
        <div className='flex-3 flexStart wrapScroll containBorder'>
          {chosenAiboInfo /* 先判断是否选择了某个伙伴，否则仅显示提示 */
            ? <AiboInfoPage chosenAiboInfo={chosenAiboInfo} deleteAibo={() => {
              // 惜别当前选定的伙伴
              let aiboStoreTemp = props.aiboStore
              delete aiboStoreTemp[chosenAiboInfo.aiboId]
              props.setAiboStore(aiboStoreTemp)
              // 增加当前的次元水晶
              props.setUserDimenstal(props.userDimenstal + (personaInfo[chosenAiboInfo.personaId]?.dimenstal || 0))
              // 关闭当前信息页面
              setChosenAiboInfo(null)
            }} />
            : <div>{'点击左侧伙伴显示详细信息'}</div>
          }
        </div>
        {/* 伙伴队伍模块 */}
        <div className='flex-2 width100 wrapScroll'>
          <AiboTeamPage />
        </div>
      </div>
    </div>
  )
})

// 多选框
const CheckBox = connectState((props: {
  aiboTeam: {[index: number]:{id: number, isExploring: boolean, exploringQuest: string | null, member: any[]}},
  val: aiboType,
  selectedList: Set<number>,
  setSelectedList: (para: Set<number>) => void,
  howManyDimenstal: number,
  setHowManyDimenstal: (para: number) => void
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={props.selectedList.has(props.val.aiboId)}
      onChange={() => {
        // 点击复选框后首先判断当前伙伴是否已经在队伍当中，如果是则不能选中
        let selectedListTemp = props.selectedList
        if (selectedListTemp.has(props.val.aiboId)) {
          selectedListTemp.delete(props.val.aiboId)
          props.setHowManyDimenstal(props.howManyDimenstal - (personaInfo[props.val.personaId]?.dimenstal || 0))
        } else {
          selectedListTemp.add(props.val.aiboId)
          props.setHowManyDimenstal(props.howManyDimenstal + (personaInfo[props.val.personaId]?.dimenstal || 0))
        }
        props.setSelectedList(selectedListTemp)
      }}
      disabled={Object.values(props.aiboTeam).find((val) => val.member.find((y: any) => y === props.val.aiboId)) !== undefined}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
})

// 排序按钮
const SortButton = connectState((props: {
  buttonName: string,
  sortAttr: string,
  aiboStore: {[index: number]: aiboType },
  setAiboStore: (para: {[index: number]: aiboType }) => void
}) => {
  const [isReverse, setIsReverse] = useState(false)

  const sortBy = (attr: string) => {
    let aiboStoreTemp: {[index: number]: aiboType } = {}
    let aiboStoreArray: aiboType[] = []
    if (isReverse) {
      aiboStoreArray = Object.values(props.aiboStore).sort((a, b) => personaInfo[b.personaId].star - personaInfo[a.personaId].star)
    } else {
      aiboStoreArray = Object.values(props.aiboStore).sort((a, b) => personaInfo[a.personaId].star - personaInfo[b.personaId].star)
    }
    // 更改每个伙伴的排序编号
    for (let i = 0; i < aiboStoreArray.length; i++) {
      aiboStoreArray[i].sortId = i
    }
    aiboStoreArray.forEach((val) => {aiboStoreTemp[val.aiboId] = val})
    props.setAiboStore(aiboStoreTemp)
    setIsReverse(!isReverse)
  }

  return (
    <Button variant='contained' onClick={() => {
      props.sortAttr === 'star' && sortBy('star')// 之后可以按照标志排序
    }}>{props.buttonName}</Button>
  )
})

// 伙伴信息页面
const AiboInfoPage = (props: {
  chosenAiboInfo: aiboType,
  deleteAibo: () => void
}) => (
  personaInfo[props.chosenAiboInfo.personaId] && (<div>
    <div>名字：{personaInfo[props.chosenAiboInfo.personaId].name}</div>
    <div>等级：{props.chosenAiboInfo.level}</div>
    <div>经验：{props.chosenAiboInfo.exp}</div>
    <div>星级：{personaInfo[props.chosenAiboInfo.personaId].star}</div>
    <div>属性：{personaInfo[props.chosenAiboInfo.personaId].elements}</div>
    <div>能力1：{personaInfo[props.chosenAiboInfo.personaId].ab1 || '无'}</div>
    <div>能力2：{personaInfo[props.chosenAiboInfo.personaId].ab2 || '无'}</div>
    <div>生命：{personaInfo[props.chosenAiboInfo.personaId].hp}</div>
    <div>攻击：{personaInfo[props.chosenAiboInfo.personaId].atk}</div>
    <div>防御：{personaInfo[props.chosenAiboInfo.personaId].def}</div>
    <Button variant='outlined' onClick={props.deleteAibo}>{'惜别当前伙伴：返还' + personaInfo[props.chosenAiboInfo.personaId].dimenstal + '次元结晶'}</Button>
  </div>)
)

// 伙伴队伍模块（用于房间和地图两个页面）
const AiboTeamPage = connectState((props: {
  aiboStore: {[index: number]: aiboType },
  aiboTeam: {[index: number]:{id: number, isExploring: boolean, exploringQuest: string | null, member: any[]}},
  nowChoosenTeam: number,
  setShowAiboChoosePage: (para: boolean) => void
  setNowChoosenAibo: (para: number) => void,
  setNowChoosenTeam: (para: number) => void
}) => (
  <div className='flexCol width100 height100 containBorder'>
    <div className='flex-1 flexCenter borderBottom'>{'队伍列表'}</div>
    <div className='flex-7 flexStart wrapScroll'>
      {Object.values(props.aiboTeam)?.map((team) => <div key={team.id} className='teamBorder'>
        {`队伍${team.id}${props.nowChoosenTeam === team.id ? '(now)' : ''}${team.isExploring ? `(正在探索${team.exploringQuest})` : ''}:`}
        {team.member.map((memberId, ind) => (
          <Button variant='outlined' key={ind} onClick={() => {
            props.setNowChoosenTeam(team.id)
            props.setNowChoosenAibo(ind)
            props.setShowAiboChoosePage(true)
          }}>{(ind + 1) + ':' + (personaInfo[Object.values(props.aiboStore).find((val) => val.aiboId === memberId)?.personaId || 0]?.name || '无')}</Button>
        ))}
      </div>)}
    </div>
  </div>
))

// 建立城镇页面
const MarketPage = connectState((props: any) => (
  <div className='pageArea'>
    <Button variant='outlined' className='marginAuto' onClick={() => props.setShowGachaPage(true)}>召唤</Button>
  </div>
))

// 建立地图页面
const MapPage = connect(
  // 用state来更新UI组件
  (state: any) => ({
    // 系统数据
    nowArea: state.systemValue.nowArea,
    // 用户数据
    userMapInfo: state.userValue.userMapInfo
  }),
  // UI组件的行为作为action，通过dispatch来更新state
  (dispatch: any) => ({
    // 系统数据
    setNowArea: (para: string) => dispatch(setNowArea(para)),
    // 用户数据
    setUserMapInfo: (para: any) => dispatch(setUserMapInfo(para))
  })
)((props: {
  nowArea: string,
  userMapInfo: any,
  setNowArea: (para: string) => void,
  setUserMapInfo: (para: any) => void
}) => (
  <div className='pageArea flexRow'>
    {/* 地区列表模块 */}
    <div className='flex-1 flexCol height100 containBorder'>
      <div className='flex-1 flexCenter borderBottom'>{'当前国度：' + mapInfo['1']?.name}</div>
      <div className='flex-15 flexStart wrapScroll'>
        {mapStructure['1']?.chlidId?.map((id: string) => // 链式判断是否取到了国度、chlidId，没有取到直接返回null
          props.userMapInfo[id]?.isShow ? (
            <div key={id} className='areaDiv' onClick={() => {props.setNowArea(id)}}>{mapInfo[id].name}</div>
          ) : null
        ) || null}
      </div>
    </div>
    {/* 地区关卡模块与队伍模块 */}
    <div className='flex-3 flexCol height100'>
      {/* 地区关卡模块 */}
      <div className='flex-3 flexStart wrapScroll containBorder'>
        {mapStructure[props.nowArea]?.chlidId?.map((id: string) => (
          props.userMapInfo[id]?.isShow ? (
            <QuestComponent key={id} id={id} />
          ) : null
        )) || null}
      </div>
      {/* 伙伴队伍模块 */}
      <div className='flex-1 width100 wrapScroll'>
        <AiboTeamPage />
      </div>
    </div>
  </div>
))

// 建立每个quest的组件
const QuestComponent = connectState((props: any & { id: string }) => {// 类型，在MapPage流传下来的类型上再加上MapPage自己给过来的类型id
  const [userQuestInfo, setUserQuestInfo] = useState(props.userMapInfo[props.id] || {
    id: props.id,
    isShow: false,
    completeEasy: false,
    isExploring: false,
    exploringTeam: null,
    exploringProgress: 0
  })

  // 为了让地图信息能够一次性修改完成，将所有要修改的数据放到一个对象中
  let willChangeQuest: {[index: string]: any} = {}
  // 为了让地图信息能够一次性修改完成，将所有要修改的数据放到一个对象中
  let willChangeAibo: {[index: number]: aiboType} = {}

  // 给出一个关卡id，然后依次查找地图逻辑的链表，将找到的地图对象的isShow置为true，直到查到下一个quest为止
  const showNextQuest = (nowId: string) => {
    let nextId = mapStructure[nowId]?.nextId
    console.log(nextId)
    if (nextId) {
      willChangeQuest[nextId] = {
        ...props.userMapInfo[nextId],
        isShow: true
      }
      // 如果找到的不是quest（可能是country、area），则迭代找
      if (mapInfo[nextId]?.type !== 'quest') {
        showNextQuest(nextId)
      }
    }
  }

  useInterval(
    () => {
      if (userQuestInfo.exploringProgress >= 100) {
        console.log('完成')

        // 如果是第一次通关，则将下一关的进度显示出来
        if (!userQuestInfo.completeEasy) {
          showNextQuest(props.id)
        }

        // 结算经验
        let aiboTeamTemp = props.aiboTeam[userQuestInfo.exploringTeam]
        aiboTeamTemp.member.forEach((key: number) => {
          if (key) {
            willChangeAibo[key] = {
              ...props.aiboStore[key],
              exp: props.aiboStore[key].exp + mapInfo[props.id].exp,
              level: Math.ceil(Math.log((props.aiboStore[key].exp + mapInfo[props.id].exp + 1) * (Math.sqrt(Math.sqrt(Math.E)) - 1) / 100 - 1) * 4)
            }
          }
        })
        props.setAiboStore({ ...props.aiboStore, ...willChangeAibo })
        willChangeAibo = {}// 清空临时变量

        // 修改参与探索的队伍信息
        aiboTeamTemp = {
          ...aiboTeamTemp,
          isExploring: false,
          exploringQuest: null
        }
        props.setAiboTeam({ ...props.aiboTeam, [props.nowChoosenTeam]: aiboTeamTemp })

        // 重新将探索进度置0，将正在探索的标志位置false
        willChangeQuest[props.id] = {
          ...userQuestInfo,
          completeEasy: true,
          isExploring: false,
          exploringTeam: null,
          exploringProgress: 0
        }
        setUserQuestInfo(willChangeQuest[props.id])
        props.setUserMapInfo({ ...props.userMapInfo, ...willChangeQuest })// 一次性将所有改动写入数据
        willChangeQuest = {}// 清空临时变量

        // 最后设置次元结晶
        props.setUserDimenstal(props.userDimenstal + mapInfo[props.id]?.dimenstal || 0)
      } else {
        let willProgress = userQuestInfo.exploringProgress + Math.random() * 10
        setUserQuestInfo({ ...userQuestInfo, exploringProgress: willProgress > 100 ? 100 : willProgress })
      }
    },
    userQuestInfo.isExploring ? 80 : null
  )

  return (
    <div className='areaDiv' onClick={() => {
      // 点击关卡，判断当前关卡是否已经处在闯关过程中
      if (!userQuestInfo.isExploring) {
        // 如果未在闯关过程中，则显示一个闯关过程，进度条完成后返回成功失败的结果
        let userQuestTemp = {
          ...userQuestInfo,
          isExploring: true,
          exploringTeam: props.nowChoosenTeam,
          exploringProgress: 0
        }
        setUserQuestInfo(userQuestTemp)
        props.setUserMapInfo({ ...props.userMapInfo, [props.id]: userQuestTemp })

        // 并修改队伍信息
        let aiboTeamTemp = props.aiboTeam[props.nowChoosenTeam]
        aiboTeamTemp = {
          ...aiboTeamTemp,
          isExploring: true,
          exploringQuest: props.id
        }
        props.setAiboTeam({ ...props.aiboTeam, [props.nowChoosenTeam]: aiboTeamTemp })
      }
    }}>
      {userQuestInfo.completeEasy && <Avatar>完成</Avatar>// 显示完成图标
      }{mapInfo[props.id]?.name}
      {userQuestInfo.isExploring && <div>{`--队伍${userQuestInfo.exploringTeam}正在探索--进度${Math.round(userQuestInfo.exploringProgress * 100) / 100}%`}</div>
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
  <Box display='flex' alignItems='center'>
    <Box width='100%' mr={1}>
      <LinearProgress variant='determinate' {...props} />
    </Box>
    <Box minWidth={35}>
      <Typography variant='body2' color='textSecondary'>{`${Math.round(
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
const Navigation = connectState((props: any) => (
  <BottomNavigation value={props.togglePage} showLabels onChange={
    (event: object, value: any) => props.setTogglePage(value)
  } style={{ width: '100%' }}>
    <BottomNavigationAction label='成就' value={0} icon={<CollectionsBookmarkIcon />} />
    <BottomNavigationAction label='房间' value={1} icon={<HomeIcon />} />
    <BottomNavigationAction label='城镇' value={2} icon={<LocationCityIcon />} />
    <BottomNavigationAction label='地图' value={3} icon={<MapIcon />} />
  </BottomNavigation>
))

const App = connectState((props: any) =>
// 首先从缓存中读出历史数据，如果没有缓存，则使用初始值
  (
    <div className='App'>
      {/* 用于弹出的页面 */}
      {(props.showGachaPage || props.showAiboChoosePage) && <div className='boxPageMask'>
        {/* 召唤页面 */}
        {props.showGachaPage && (<div>
          <GachaPage />
        </div>)}
        {/* 选择伙伴页面 */}
        {props.showAiboChoosePage && (<div>
          <AiboChoosePage />
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
        {props.togglePage === 0 && (<AchievePage />)}
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

export default App
