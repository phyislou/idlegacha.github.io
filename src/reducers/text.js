const text = (state = [], action) => {
  switch (action.type) {
  case 'SET_TEXT':
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ]
  case 'TOGGLE_TEXT':
    return state.map((todo) =>
      (todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  default:
    return state
  }
}

export default text
