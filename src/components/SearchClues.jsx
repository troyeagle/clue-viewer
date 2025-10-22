import { useState, useEffect } from 'react'
import { clueConfigs } from '../config/clueConfig'
import { memorieConfigs, memorySearchKeywords } from '../config/memorieConfig'
import './SearchClues.css'

function SearchClues({ onSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allClues, setAllClues] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // 初始化所有线索数据（包括记忆）
  useEffect(() => {
    const clues = []
    // 添加线索配置
    Object.values(clueConfigs).forEach(config => {
      config.clueImages.forEach((clue, index) => {
        clues.push({
          id: clue.id,
          title: clue.title,
          filename: clue.filename,
          configId: config.id,
          config: config,
          index: index,
          type: 'clue'
        })
      })
    })
    // 添加记忆配置
    Object.values(memorieConfigs).forEach(config => {
      config.clueImages.forEach((memory, index) => {
        clues.push({
          id: memory.id,
          title: memory.title,
          filename: memory.filename,
          configId: config.id,
          config: config,
          index: index,
          type: 'memory'
        })
      })
    })
    setAllClues(clues)
  }, [])

  // 搜索功能（包括关键词映射）
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const term = searchTerm.toLowerCase()
    let results = []
    
    // 直接搜索线索和记忆
    results = allClues.filter(clue => 
      clue.title.toLowerCase().includes(term) ||
      clue.filename.toLowerCase().includes(term)
    )
    
    // 通过关键词映射搜索记忆
    Object.entries(memorySearchKeywords).forEach(([keyword, configIds]) => {
      if (keyword.toLowerCase().includes(term)) {
        const keywordConfigIds = Array.isArray(configIds) ? configIds : [configIds]
        keywordConfigIds.forEach(configId => {
          const memoryClues = allClues.filter(clue => 
            clue.configId === configId && clue.type === 'memory'
          )
          results = [...results, ...memoryClues]
        })
      }
    })
    
    // 去重
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.configId === result.configId && r.id === result.id)
    )
    
    setSearchResults(uniqueResults)
  }, [searchTerm, allClues])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClueClick = (clue) => {
    // 调用父组件的回调函数，传递配置和索引
    onSearchResult(clue.config, clue.index)
    // 清空搜索
    setSearchTerm('')
    setSearchResults([])
    setIsSearching(false)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <div className="search-clues">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="搜索线索文件名..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={handleClearSearch}>
            ✕
          </button>
        )}
      </div>
      
      {isSearching && searchResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            找到 {searchResults.length} 个结果
          </div>
          <div className="search-results-list">
            {searchResults.map((clue) => (
              <div 
                key={`${clue.configId}-${clue.id}`}
                className="search-result-item"
                onClick={() => handleClueClick(clue)}
              >
                <div className="search-result-title">{clue.title}</div>
                <div className="search-result-filename">{clue.filename}</div>
                <div className="search-result-config">{clue.config.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isSearching && searchResults.length === 0 && searchTerm.trim() !== '' && (
        <div className="search-no-results">
          未找到匹配的线索
        </div>
      )}
    </div>
  )
}

export default SearchClues