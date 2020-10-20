const tempValueHistory: any = {
  showPageL1: 0,
  showPageL2: 0
}

const tempValue = (state: any = tempValueHistory, action: any) => {
  switch (action.type) {
  case 'setShowPageL1': return { ...state, showPageL1: action.neo }
  case 'setShowPageL2': return { ...state, showPageL2: action.neo }
  default: return state
  }
}

export default tempValue
