import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import 'react-image-crop/dist/ReactCrop.css'

hydrate(<App/>, document.getElementById('root'))
