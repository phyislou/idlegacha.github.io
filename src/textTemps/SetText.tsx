import React from 'react'
import { connect } from 'react-redux'
import { setText } from '../actions'

interface SetTextIf {
  dispatch: (para: any) => void
}

// eslint-disable-next-line react/prop-types
const SetText = (props: SetTextIf) => {
  let input: any

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        props.dispatch(setText(input.value))
        input.value = ''
      }}>
        <input ref={
          // eslint-disable-next-line no-return-assign
          (node) => input = node
        } />
        <button type="submit">
          Set Text
        </button>
      </form>
    </div>
  )
}

export default connect()(SetText)
