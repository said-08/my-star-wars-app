import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import MyAlbum from "./pages/MyAlbum"
import GetSheet from "./pages/GetSheet"
import NotFound from "./components/NotFound"
import { AlbumProvider } from "./context/AlbumContext"
import Section from "./pages/Section"

const App = () => {

  return (
    <AlbumProvider>
      <div className="pt-[4.75rem] lg:pt-[5.25rem]">
        <Header></Header>
        <Routes>
          <Route path="/" element={<MyAlbum/>}/>
          <Route path="/obtener-lamina" element={<GetSheet/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/section/:section" element={<Section />} />
        </Routes>
        
      </div>
    </AlbumProvider>
  )
}

export default App
