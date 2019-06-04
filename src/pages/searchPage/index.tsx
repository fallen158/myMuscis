import Taro, { useState, useEffect } from '@tarojs/taro'
import SearchBar from '../../conmponents/SearchBar/index'
import { View } from '@tarojs/components'
import utils from '../../utils/index'
const Index = () => {
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '搜索'
    })
  })
  const handleChangeValue = (value: string) => {
    setValue(value)
  }
  const hanldeClickSubmit = () => {
    console.log(value)
    console.log('开始搜索')
  }
  const handleBlurEvent = () => {
    console.log('失去焦点')
    utils.navigateBack()
  }
  return (
    <View>
      <SearchBar
        focus={true}
        onChange={handleChangeValue}
        value={value}
        onClick={hanldeClickSubmit}
        onBlur={handleBlurEvent}
      />
    </View>
  )
}

export default Index
