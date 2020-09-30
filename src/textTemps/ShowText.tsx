import React from 'react'
import { connect } from 'react-redux'
import { toggleText } from '../actions'

interface TextIf {
  onClick: () => void,
  text: string
}

const Text = (props: TextIf) => (
  <li
    onClick={props.onClick}
  >
    {props.text}
  </li>
)

interface ShowTextIf {
  text: {id: number, completed: boolean, text: string}[],
  toggleText: () => void
}

const ShowText = (props: ShowTextIf) => (
  <ul>
    {props.text !== undefined && props.text.map((val) => (
      <Text
        key={val.id}
        {...val}
        onClick={() => toggleText(val.id)}
      />)
    )}
  </ul>
)

const mapStateToProps = (state: any) => ({
  text: state.text
})

const mapDispatchToProps = (dispatch: any) => ({
  toggleText: (id: any) => dispatch(toggleText(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowText)
