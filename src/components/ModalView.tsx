/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */

import React, { useContext, useEffect } from 'react'
import { HideModalAction } from '../Actions'
import { DispatchContext } from '../App'
import ReactDOM from 'react-dom'

interface Props {
    fullScreen: boolean
}

export const ModalView: React.FunctionComponent<Props> = (props) => {
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    function keyListener (e) {
      if (e.keyCode === 27) {
        dispatch(HideModalAction())
      }
    }

    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  })

  const close = (e) => {
    if (e.target.id === 'modal-wrapper' || e.target.id === 'close-button') {
      dispatch(HideModalAction())
    }
  }

  return ReactDOM.createPortal(
    <div id='modal-wrapper' onClick={close} role='dialog' aria-modal={true}>
      <div id='modal' className={props.fullScreen ? 'full-screen' : null}>
        <button
          onClick={close}
          id='close-button'
          className='close'
        >
            x
        </button>
        {props.children}
      </div>
    </div>,
    document.body
  )
}
