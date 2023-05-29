import { useState } from 'react'
import './App.css'

import { MyUploads } from './component/MyUploads'
import { Nav } from './component/Nav'
import { Gallery } from './component/Gallery'


function App() {

  let [route, setRoute] = useState(location.pathname)

  const nav = <Nav setRoute={setRoute} />

  if (route === 'uploads') {
    return <MyUploads nav={nav} />
  }

  return (
    <>
      <p>{nav}</p>
      <h1>Public Gallery</h1>

      <Gallery level={"public"} />
    </>
  )
}

export default App
