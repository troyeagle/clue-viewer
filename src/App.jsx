import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('main') // 'main' 或 'carousel'
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hotspots, setHotspots] = useState([])
  const [imageRect, setImageRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const imageRef = useRef(null)

  // 第一轮线索图片数据
  const clueImages = [
    { id: 1, title: '第一轮线索 1', filename: '1大楼.jpg' },
    { id: 2, title: '第一轮线索 2', filename: '2大楼.jpg' },
    { id: 3, title: '第一轮线索 3', filename: '3大楼.jpg' },
    { id: 4, title: '第一轮线索 4', filename: '4大楼.jpg' },
    { id: 5, title: '第一轮线索 5', filename: '5大楼.jpg' },
    { id: 6, title: '第一轮线索 6', filename: '6大楼.jpg' },
    { id: 7, title: '第一轮线索 7', filename: '7大楼.jpg' },
    { id: 8, title: '第一轮线索 8', filename: '8大楼.jpg' },
    { id: 9, title: '第一轮线索 9', filename: '9任鸿辉办公室.jpg' },
    { id: 10, title: '第一轮线索 10', filename: '10任鸿辉办公室.jpg' },
    { id: 11, title: '第一轮线索 11', filename: '11任鸿辉办公室.jpg' },
    { id: 12, title: '第一轮线索 12', filename: '12任鸿辉办公室.jpg' },
    { id: 13, title: '第一轮线索 13', filename: '13任鸿辉办公室.jpg' },
    { id: 14, title: '第一轮线索 14', filename: '14休息室.jpg' },
    { id: 15, title: '第一轮线索 15', filename: '15休息室.jpg' },
    { id: 16, title: '第一轮线索 16', filename: '16休息室.jpg' }
  ]

  // 计算图片实际位置和尺寸
  const updateImageRect = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      const containerRect = imageRef.current.parentElement.getBoundingClientRect()
      setImageRect({
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
      })
    }
  }

  // 模拟热点区域数据（相对于图片的百分比位置）- 2x8布局
  useEffect(() => {
    // 这里是模拟的热点区域坐标，相对于图片本身的百分比位置
    const mockHotspots = [
      { id: 1, x: 3, y: 0, width: 11.5, height: 50 },
        { id: 2, x: 14.5, y: 0, width: 11.5, height: 50 },
        { id: 3, x: 26, y: 0, width: 11.5, height: 50 },
        { id: 4, x: 37.5, y: 0, width: 11.5, height: 50 },
        { id: 5, x: 49, y: 0, width: 11.5, height: 50 },
        { id: 6, x: 60.5, y: 0, width: 11.5, height: 50 },
        { id: 7, x: 72, y: 0, width: 11.5, height: 50 },
        { id: 8, x: 83.5, y: 0, width: 11.5, height: 50 },
        { id: 9, x: 3, y: 50, width: 11, height: 50 },
         { id: 10, x: 13.5, y: 50, width: 11, height: 50 },
         { id: 11, x: 24, y: 50, width: 11, height: 50 },
         { id: 12, x: 34.5, y: 50, width: 11, height: 50 },
         { id: 13, x: 46, y: 50, width: 11, height: 50 },
       { id: 14, x: 66, y: 50, width: 11, height: 50 },
       { id: 15, x: 77, y: 50, width: 11, height: 50 },
       { id: 16, x: 88, y: 50, width: 11, height: 50 }
    ]
    setHotspots(mockHotspots)
  }, [])

  // 监听图片加载和窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      updateImageRect()
    }

    const handleImageLoad = () => {
      updateImageRect()
    }

    if (imageRef.current) {
      imageRef.current.addEventListener('load', handleImageLoad)
    }

    window.addEventListener('resize', handleResize)
    // 初始计算
    setTimeout(updateImageRect, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleImageLoad)
      }
    }
  }, [currentView])

  const handleHotspotClick = (clueId) => {
    setCurrentImageIndex(clueId - 1)
    setCurrentView('carousel')
  }

  const handleBackToMain = () => {
    setCurrentView('main')
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : clueImages.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < clueImages.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="app">
      <div className="header">
        <h1>第一轮线索查看器</h1>
        {currentView === 'carousel' && (
          <button className="back-btn" onClick={handleBackToMain}>
            ← 返回集合
          </button>
        )}
      </div>

      {currentView === 'main' && (
        <div className="main-image-container">
          <img 
            ref={imageRef}
            src="/clues/第一轮线索集合.jpg" 
            alt="第一轮线索集合"
            className="main-image"
          />
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="hotspot"
              style={{
                left: imageRect.left + (imageRect.width * hotspot.x / 100),
                top: imageRect.top + (imageRect.height * hotspot.y / 100),
                width: imageRect.width * hotspot.width / 100,
                height: imageRect.height * hotspot.height / 100,
                position: 'absolute'
              }}
              onClick={() => handleHotspotClick(hotspot.id)}
              title={`第一轮线索 ${hotspot.id}`}
            />
          ))}
        </div>
      )}

      {currentView === 'carousel' && (
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button className="carousel-btn prev-btn" onClick={handlePrevImage}>
              ‹
            </button>
            <div className="carousel-content">
              <img 
                src={`/clues/${clueImages[currentImageIndex].filename}`}
                alt={clueImages[currentImageIndex].title}
                className="carousel-image"
              />
              <div className="carousel-info">
                <h3>{clueImages[currentImageIndex].title}</h3>
                <p>{currentImageIndex + 1} / {clueImages.length}</p>
              </div>
            </div>
            <button className="carousel-btn next-btn" onClick={handleNextImage}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
