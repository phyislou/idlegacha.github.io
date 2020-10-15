const systemValueHistory: any = localStorage.getItem('systemValue') === null ? {
  nowArea: '1-1',
  nowCountry: '1',
  nowChoosenTeam: null,
  nowChoosenAibo: null,
  togglePage: 1
} : JSON.parse(localStorage.getItem('systemValue') as string)

const systemValue = (state: any = systemValueHistory, action: any) => {
  switch (action.type) {
  case 'setNowArea': return { ...state, nowArea: action.neo }
  case 'setNowCountry': return { ...state, nowCountry: action.neo }
  case 'setNowChoosenTeam': return { ...state, nowChoosenTeam: action.neo }
  case 'setNowChoosenAibo': return { ...state, nowChoosenAibo: action.neo }
  case 'setTogglePage': return { ...state, togglePage: action.neo }
  default: return state
  }
}

export default systemValue
