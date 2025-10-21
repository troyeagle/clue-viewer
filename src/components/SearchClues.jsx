import { useState, useEffect } from 'react'
import { clueConfigs } from '../config/clueConfig'
import './SearchClues.css'

function SearchClues({ onSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allClues, setAllClues] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // 初始化所有线索数据
  useEffect(() => {
    const clues = []
    Object.values(clueConfigs).forEach(config => {
      config.clueImages.forEach((clue, index) => {
        clues.push({
          id: clue.id,
          title: clue.title,
          filename: clue.filename,
          configId: config.id,
          config: config,
          index: index
        })
      })
    })
    setAllClues(clues)
  }, [])

  // 搜索功能
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const term = searchTerm.toLowerCase()
    const results = allClues.filter(clue => 
      clue.title.toLowerCase().includes(term) ||
      clue.filename.toLowerCase().includes(term)
    )
    setSearchResults(results)
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