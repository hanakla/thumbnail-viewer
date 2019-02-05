import { App } from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'

window.addEventListener('DOMContentLoaded', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.id = 'root'

  ReactDOM.render(React.createElement(App), div)
})
