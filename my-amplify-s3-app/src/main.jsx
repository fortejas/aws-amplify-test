import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Amplify } from 'aws-amplify'
import AWSConfig from "./aws-config.js"
Amplify.configure(AWSConfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
