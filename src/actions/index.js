let nextTextId = 0

export const setText = (text) => ({
  type: 'SET_TEXT',
  id: nextTextId++,
  text
})

export const toggleText = (id) => ({
  type: 'TOGGLE_TEXT',
  id
})

export const setUserDimenstal = (para) => ({ type: 'setUserDimenstal', neo: para })

export const setAiboStore = (para) => ({ type: 'setAiboStore', neo: para })

export const setAiboNum = (para) => ({ type: 'setAiboNum', neo: para })

export const setAiboRecord = (para) => ({ type: 'setAiboRecord', neo: para })

export const setAiboTeam = (para) => ({ type: 'setAiboTeam', neo: para })

export const setTogglePage = (para) => ({ type: 'setTogglePage', neo: para })

export const setNowArea = (para) => ({ type: 'setNowArea', neo: para })

export const setMapRecordEasy = (para) => ({ type: 'setMapRecordEasy', neo: para })

export const setClearedQuest = (para) => ({ type: 'setClearedQuest', neo: para })

export const setQuestProgress = (para) => ({ type: 'setQuestProgress', neo: para })

export const setNowChoosenTeam = (para) => ({ type: 'setNowChoosenTeam', neo: para })

export const setNowChoosenAibo = (para) => ({ type: 'setNowChoosenAibo', neo: para })
