import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import './styles/base.scss'
import MainProvider from './providers/MainProvider'
import App from './App'

ReactDOM.render(<MainProvider><App /></MainProvider>, document.getElementById('root'))
