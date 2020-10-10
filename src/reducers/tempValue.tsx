/* const tempValueHistory: any = localStorage.getItem('tempValue') === null ? {
  showGachaPage: false,
  showAiboChoosePage: false
} : JSON.parse(localStorage.getItem('tempValue') as string) */

const tempValueHistory: any = {
  showGachaPage: false,
  showAiboChoosePage: false
}

const tempValue = (state: any = tempValueHistory, action: any) => {
  switch (action.type) {
  case 'setShowGachaPage': return { ...state, showGachaPage: action.neo }
  case 'setShowAiboChoosePage': return { ...state, showAiboChoosePage: action.neo }
  default: return state
  }
}

export default tempValue
