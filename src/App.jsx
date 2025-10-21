import { useState } from 'react'
import StartMenu from './components/StartMenu'
import MainView from './components/MainView'
import Carousel from './components/Carousel'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('menu') // 'menu', 'main', 'carousel'
  const [selectedConfig, setSelectedConfig] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleSelectClue = (config) => {
    setSelectedConfig(config)
    setCurrentView('main')
  }

  const handleHotspotClick = (hotspotId) => {
    setCurrentImageIndex(hotspotId - 1) // hotspotId 从1开始，数组索引从0开始
    setCurrentView('carousel')
  }

  const handleBackToMain = () => {
    setCurrentView('main')
  }

  const handleBackToMenu = () => {
    setCurrentView('menu')
    setSelectedConfig(null)
  }

  return (
    <div className="app">
      {currentView === 'menu' && (
        <StartMenu onSelectClue={handleSelectClue} />
      )}

      {currentView === 'main' && selectedConfig && (
        <MainView 
          config={selectedConfig}
          onHotspotClick={handleHotspotClick}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {currentView === 'carousel' && selectedConfig && (
        <Carousel 
          config={selectedConfig}
          initialIndex={currentImageIndex}
          onBackToMain={handleBackToMain}
        />
      )}
    </div>
  )
}

export default App
