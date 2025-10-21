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
    // 根据配置决定是否直接打开轮播组件
    if (config.directToCarousel) {
      setCurrentImageIndex(0)
      setCurrentView('carousel')
    } else {
      setCurrentView('main')
    }
  }

  const handleHotspotClick = (hotspotId) => {
    setCurrentImageIndex(hotspotId - 1) // hotspotId 从1开始，数组索引从0开始
    setCurrentView('carousel')
  }

  const handleBackToMain = () => {
    // 如果配置为直接打开轮播组件，返回菜单；否则返回主视图
    if (selectedConfig && selectedConfig.directToCarousel) {
      setCurrentView('menu')
      setSelectedConfig(null)
    } else {
      setCurrentView('main')
    }
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
