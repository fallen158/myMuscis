import Taro, { useState } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'

const SearchBar = () => {
  const [value, setValue] = useState('')
  const onChange = (value) => {
    setValue(value)
  }
  const onActionClick = () => {
    console.log('开始搜索')
  }
  return (
    <AtSearchBar
      actionName="搜索"
      placeholder="请输入歌手或歌曲名"
      value={value}
      onChange={onChange}
      onActionClick={onActionClick}
    />
  )
}

export default SearchBar
