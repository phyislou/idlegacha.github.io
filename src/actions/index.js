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