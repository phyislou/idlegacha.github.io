import { aiboInfo, mapRecordInitEasy, questProgressInit } from '../staticData'

const userValueHistory: any = localStorage.getItem('userValue') === null ? {
  userDimenstal: 0,
  aiboStore: [],
  aiboNum: 0,
  aiboRecord: [...Array(aiboInfo.length)].map(() => false),
  aiboTeam: [...Array(4)].map(() => [...Array(4)].map(() => 0)),
  togglePage: [false, true, false, false],
  nowArea: 0,
  mapRecordEasy: mapRecordInitEasy,
  clearedQuest: 1,
  questProgress: questProgressInit,
  nowChoosenTeam: 0
} : JSON.parse(localStorage.getItem('userValue') as string)

const userValue = (state: any = userValueHistory, action: any) => {
  switch (action.type) {
  case 'setUserDimenstal': return { ...state, userDimenstal: action.neo }
  case 'setAiboStore': return { ...state, aiboStore: action.neo }
  case 'setAiboNum': return { ...state, aiboNum: action.neo }
  case 'setAiboRecord': return { ...state, aiboRecord: action.neo }
  case 'setAiboTeam': return { ...state, aiboTeam: action.neo }
  case 'setTogglePage': return { ...state, togglePage: action.neo }
  case 'setNowArea': return { ...state, nowArea: action.neo }
  case 'setMapRecordEasy': return { ...state, mapRecordEasy: action.neo }
  case 'setClearedQuest': return { ...state, clearedQuest: action.neo }
  case 'setQuestProgress': return { ...state, questProgress: action.neo }
  case 'setNowChoosenTeam': return { ...state, nowChoosenTeam: action.neo }
  default: return state
  }
}

export default userValue