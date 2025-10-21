import { useState, useRef, useEffect } from 'react'
import './MainView.css'

function MainView({ config, onHotspotClick, onBackToMenu }) {
  const [hotspots, setHotspots] = useState([])
  const [imageRect, setImageRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const imageRef = useRef(null)

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

  // 设置热点区域数据
  useEffect(() => {
    if (config && config.hotspots) {
      setHotspots(config.hotspots)
    }
  }, [config])

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
  }, [config])

  const handleHotspotClick = (clueId) => {
    onHotspotClick(clueId)
  }

  if (!config) {
    return <div className="main-view-loading">加载中...</div>
  }

  return (
    <div className="main-view">
      <div className="main-view-header">
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          ← 返回菜单
        </button>
        <h1 className="main-view-title">{config.title}</h1>
      </div>

      <div className="main-image-container">
        <img 
          ref={imageRef}
          src={config.mainImage} 
          alt={config.mainImageAlt}
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
            title={`线索 ${hotspot.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MainView