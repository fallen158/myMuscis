import Taro, { useState } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import utils from '../../utils/index'
interface ChangeFunc {
  (value: string): void
}
interface ClickFunc {
  (): void
}

interface BlurFunc {
  (): void
}
interface IProps {
  focus: boolean
  value?: string
  onChange?: ChangeFunc
  onClick?: ClickFunc
  onBlur?: BlurFunc
}

const SearchBar: React.FC<IProps> = (props) => {
  const [value, setValue] = useState<string>('')
  const onChange = (value: string) => {
    setValue(value)
  }
  const handleInputFocus = () => {
    const pages = Taro.getCurrentPages()
    if (pages[pages.length - 1].route === 'pages/find/index') {
      utils.handleNavigateTo('/pages/searchPage/index')
    }
  }
  return props.focus ? (
    <AtSearchBar
      actionName="搜索"
      placeholder="请输入歌手或歌曲名"
      focus={props.focus}
      value={props.value || value}
      onChange={props.onChange || onChange}
      onActionClick={props.onClick}
      onBlur={props.onBlur}
    />
  ) : (
    <AtSearchBar
      actionName="搜索"
      placeholder="请输入歌手或歌曲名"
      focus={props.focus}
      value={value}
      onChange={onChange}
      onFocus={handleInputFocus}
    />
  )
}

export default SearchBar
