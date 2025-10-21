import { useState } from 'react'
import { menuItems } from '../config/clueConfig'
import './StartMenu.css'

function StartMenu({ onSelectClue }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item.id)
    // 添加一个小延迟以显示选中效果
    setTimeout(() => {
      onSelectClue(item.config)
    }, 200)
  }

  return (
    <div className="start-menu">
      <div className="start-menu-container">
        <h1 className="start-menu-title">线索查看器</h1>
        <p className="start-menu-subtitle">选择要查看的线索集合</p>
        
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${
                selectedItem === item.id ? 'selected' : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className="menu-item-content">
                <h3 className="menu-item-title">{item.title}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="start-menu-footer">
          <p>点击上方选项开始查看线索</p>
        </div>
      </div>
    </div>
  )
}

export default StartMenu