import { personaInfo, mapInfo } from '../staticData'

let userValueHistory: any

if (localStorage.getItem('userValue') === null) {
  // 用户的地图数据，给出一个和地图静态数据相同结构的数据
  let userMapInfoTemp: any = {}
  Object.keys(mapInfo).forEach((key) => {
    userMapInfoTemp[key] = {
      id: key,
      isShow: false,
      completeEasy: false,
      isExploring: false,
      exploringTeam: null,
      exploringProgress: 0
    }
  })
  // 然后将开头的数据显示出来
  ;['root', '1', '1-1', '1-1-1'].forEach((fixKey) => {
    userMapInfoTemp[fixKey].isShow = true
  })

  // 伙伴种类的信息
  let userPersonaInfoTemp: any = {}
  Object.values(personaInfo).forEach((val) => {
    userPersonaInfoTemp[val.id] = {
      id: val.id,
      have: false
    }
  })

  // 队伍的信息
  let aiboTeamTemp: any = {}
  for (let key = 1; key < 5; key++) {
    aiboTeamTemp[key] = {
      id: key,
      isExploring: false,
      exploringQuest: null,
      member: [...Array(4)].map(() => 0)
    }
  }

  userValueHistory = {
    aiboNum: 0,
    aiboStore: {},
    aiboTeam: aiboTeamTemp,
    userPersonaInfo: userPersonaInfoTemp,
    userDimenstal: 10000,
    userMapInfo: userMapInfoTemp
  }
} else {
  userValueHistory = JSON.parse(localStorage.getItem('userValue') as string)
}

const userValue = (state: any = userValueHistory, action: any) => {
  switch (action.type) {
  case 'setAiboNum': return { ...state, aiboNum: action.neo }
  case 'setAiboStore': return { ...state, aiboStore: action.neo }
  case 'setAiboTeam': return { ...state, aiboTeam: action.neo }
  case 'setUserPersonaInfo': return { ...state, userPersonaInfo: action.neo }
  case 'setUserDimenstal': return { ...state, userDimenstal: action.neo }
  case 'setUserMapInfo': return { ...state, userMapInfo: action.neo }
  default: return state
  }
}

export default userValue
