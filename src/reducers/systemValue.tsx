const systemValueHistory: any = localStorage.getItem('systemValue') === null ? {
  togglePage: [false, true, false, false],
  nowArea: 0,
  nowChoosenTeam: 0,
  nowChoosenAibo: 0
} : JSON.parse(localStorage.getItem('systemValue') as string)

const systemValue = (state: any = systemValueHistory, action: any) => {
  switch (action.type) {
  case 'setTogglePage': return { ...state, togglePage: action.neo }
  case 'setNowArea': return { ...state, nowArea: action.neo }
  case 'setNowChoosenTeam': return { ...state, nowChoosenTeam: action.neo }
  case 'setNowChoosenAibo': return { ...state, nowChoosenAibo: action.neo }
  default: return state
  }
}

export default systemValue
