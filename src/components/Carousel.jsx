import { useState, useEffect } from 'react'
import './Carousel.css'

function Carousel({ config, initialIndex = 0, onBackToMain }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex)

  // 当初始索引改变时更新当前索引
  useEffect(() => {
    setCurrentImageIndex(initialIndex)
  }, [initialIndex])

  const handlePrevImage = () => {
    if (config && config.clueImages) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : config.clueImages.length - 1
      )
    }
  }

  const handleNextImage = () => {
    if (config && config.clueImages) {
      setCurrentImageIndex((prev) => 
        prev < config.clueImages.length - 1 ? prev + 1 : 0
      )
    }
  }

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (event.key === 'ArrowRight') {
        handleNextImage()
      } else if (event.key === 'Escape') {
        onBackToMain()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [config])

  if (!config || !config.clueImages || config.clueImages.length === 0) {
    return <div className="carousel-loading">加载中...</div>
  }

  const currentImage = config.clueImages[currentImageIndex]
  const basePath = config.basePath || '/clues/'

  return (
    <div className="carousel">
      <div className="carousel-header">
        <button className="back-btn" onClick={onBackToMain}>
          ← 返回集合
        </button>
        <h2 className="carousel-title">{config.title}</h2>
      </div>

      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button 
            className="carousel-btn prev-btn" 
            onClick={handlePrevImage}
            aria-label="上一张图片"
          >
            ‹
          </button>
          
          <div className="carousel-content">
            <div className="carousel-image-container">
              <img 
                src={`${basePath}${currentImage.filename}`}
                alt={currentImage.title}
                className="carousel-image"
              />
            </div>
            
            <div className="carousel-info">
              <h3 className="carousel-image-title">{currentImage.title}</h3>
              <div className="carousel-progress">
                <span className="carousel-current">{currentImageIndex + 1}</span>
                <span className="carousel-separator"> / </span>
                <span className="carousel-total">{config.clueImages.length}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="carousel-btn next-btn" 
            onClick={handleNextImage}
            aria-label="下一张图片"
          >
            ›
          </button>
        </div>
        
        {/* 缩略图导航 */}
        <div className="carousel-thumbnails">
          {config.clueImages.map((image, index) => (
            <button
              key={image.id}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`跳转到 ${image.title}`}
            >
              <img 
                src={`${basePath}${image.filename}`}
                alt={image.title}
                className="thumbnail-image"
              />
              <span className="thumbnail-number">{image.id}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="carousel-help">
        <p>使用 ← → 键导航，ESC 键返回</p>
      </div>
    </div>
  )
}

export default Carousel