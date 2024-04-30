import './react-basics.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import O_Container from './react-basics/O_Container.jsx'

const root = createRoot(document.querySelector('#app'))
root.render(<O_Container />)
