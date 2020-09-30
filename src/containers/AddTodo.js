import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

// eslint-disable-next-line react/prop-types
const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={
          // eslint-disable-next-line no-return-assign
          (node) => input = node
        } />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
