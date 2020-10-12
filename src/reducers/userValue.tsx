import { aiboInfo, userMapInfo } from '../staticData'

const userValueHistory: any = localStorage.getItem('userValue') === null ? {
  userDimenstal: 0,
  aiboStore: [],
  aiboNum: 0,
  aiboRecord: [...Array(aiboInfo.length)].map(() => false),
  aiboTeam: [...Array(4)].map(() => [...Array(4)].map(() => 0)),
  userMapInfo: userMapInfo,
  clearedQuest: 1
} : JSON.parse(localStorage.getItem('userValue') as string)

const userValue = (state: any = userValueHistory, action: any) => {
  switch (action.type) {
  case 'setAiboNum': return { ...state, aiboNum: action.neo }
  case 'setAiboRecord': return { ...state, aiboRecord: action.neo }
  case 'setAiboStore': return { ...state, aiboStore: action.neo }
  case 'setAiboTeam': return { ...state, aiboTeam: action.neo }
  case 'setUserMapInfo': return { ...state, userMapInfo: action.neo }
  case 'setClearedQuest': return { ...state, clearedQuest: action.neo }
  case 'setUserDimenstal': return { ...state, userDimenstal: action.neo }
  default: return state
  }
}

export default userValue
