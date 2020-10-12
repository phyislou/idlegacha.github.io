const systemValueHistory: any = localStorage.getItem('systemValue') === null ? {
  nowArea: 0,
  nowChoosenTeam: 0,
  nowChoosenAibo: 0,
  questProgress: [],
  togglePage: 1
} : JSON.parse(localStorage.getItem('systemValue') as string)

const systemValue = (state: any = systemValueHistory, action: any) => {
  switch (action.type) {
  case 'setNowArea': return { ...state, nowArea: action.neo }
  case 'setNowChoosenTeam': return { ...state, nowChoosenTeam: action.neo }
  case 'setNowChoosenAibo': return { ...state, nowChoosenAibo: action.neo }
  case 'setQuestProgress': return { ...state, nowChoosenAibo: action.neo }
  case 'setTogglePage': return { ...state, togglePage: action.neo }
  default: return state
  }
}

export default systemValue
